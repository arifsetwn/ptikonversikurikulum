import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Helper to convert an image URL (relative or absolute) to a Base64 Data URI.
 * Eliminates CORS and Tainted Canvas issues in html2canvas on shared hosting.
 */
async function fetchImageAsBase64(url: string): Promise<string> {
  if (!url || url.startsWith('data:')) return url;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string) || url);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn('Failed to fetch image as base64:', url, err);
    return url;
  }
}

/**
 * Replaces modern CSS oklch(...) color functions with standard fallbacks.
 */
function replaceOklchInCss(css: string): string {
  return css.replace(/oklch\([^)]+\)/gi, '#2563eb');
}

/**
 * Pre-sanitizes document stylesheet tags before html2canvas parses CSS rules.
 * Returns a restoration function to restore original style tags post-rendering.
 */
function sanitizeDocumentOklch(): () => void {
  const originalStyles: { element: HTMLStyleElement; content: string }[] = [];

  // Sanitize all <style> elements in the active document
  const styleTags = Array.from(document.querySelectorAll('style'));
  styleTags.forEach((styleEl) => {
    if (styleEl.innerHTML && styleEl.innerHTML.includes('oklch')) {
      originalStyles.push({ element: styleEl, content: styleEl.innerHTML });
      styleEl.innerHTML = replaceOklchInCss(styleEl.innerHTML);
    }
  });

  // Sanitize any elements with inline oklch style attributes
  const elementsWithInlineStyle = Array.from(document.querySelectorAll('[style*="oklch"]')) as HTMLElement[];
  const originalInlineStyles: { element: HTMLElement; content: string }[] = [];
  elementsWithInlineStyle.forEach((el) => {
    const inlineStyle = el.getAttribute('style') || '';
    originalInlineStyles.push({ element: el, content: inlineStyle });
    el.setAttribute('style', replaceOklchInCss(inlineStyle));
  });

  return () => {
    originalStyles.forEach(({ element, content }) => {
      element.innerHTML = content;
    });
    originalInlineStyles.forEach(({ element, content }) => {
      element.setAttribute('style', content);
    });
  };
}

/**
 * Captures an HTML element and exports it directly as a downloadable PDF file client-side.
 * Compatible with shared hosting (cPanel/Hostinger/Apache), subfolder base paths, and mobile browsers.
 */
export async function generatePdfFromElement(
  elementId: string,
  fileName: string = 'Simulasi_Konversi_Kurikulum_TI.pdf'
): Promise<boolean> {
  let restoreStyles: (() => void) | null = null;
  try {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      console.error(`Element with id ${elementId} not found.`);
      return false;
    }

    // 1. Gather positions of block elements (rows, headers, containers) relative to targetElement top
    const targetRect = targetElement.getBoundingClientRect();
    const breakableElements = Array.from(
      targetElement.querySelectorAll('tr, h3, .border, p, div')
    ) as HTMLElement[];

    const elementPositions: { topPx: number; bottomPx: number }[] = [];
    breakableElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const topPx = rect.top - targetRect.top;
      const bottomPx = rect.bottom - targetRect.top;
      if (topPx >= 0 && bottomPx > topPx) {
        elementPositions.push({ topPx, bottomPx });
      }
    });

    elementPositions.sort((a, b) => a.topPx - b.topPx);

    // 2. Pre-sanitize document style tags BEFORE html2canvas parses CSS rules
    restoreStyles = sanitizeDocumentOklch();

    // 3. Render targetElement using html2canvas
    const canvas = await html2canvas(targetElement, {
      scale: 2, // High resolution
      useCORS: true,
      allowTaint: false, // Prevent tainted canvas security exceptions
      logging: false,
      backgroundColor: '#ffffff',
      onclone: async (clonedDoc) => {
        const clonedTarget = clonedDoc.getElementById(elementId);
        if (!clonedTarget) return;

        // Convert all <img> tags inside cloned document to inline Base64 data URIs
        const imgElements = Array.from(clonedTarget.querySelectorAll('img'));
        await Promise.all(
          imgElements.map(async (img) => {
            const base64 = await fetchImageAsBase64(img.src);
            img.src = base64;
          })
        );

        // Double safeguard: sanitize any remaining oklch in cloned document
        const styleElements = clonedDoc.querySelectorAll('style');
        styleElements.forEach((styleTag) => {
          if (styleTag.innerHTML && styleTag.innerHTML.includes('oklch')) {
            styleTag.innerHTML = replaceOklchInCss(styleTag.innerHTML);
          }
        });
      }
    });

    // Scale ratio between canvas pixels and DOM CSS pixels
    const scaleRatio = canvas.width / (targetElement.offsetWidth || 1);

    // Convert element positions to canvas pixel coordinates
    const canvasPositions = elementPositions.map((pos) => ({
      top: pos.topPx * scaleRatio,
      bottom: pos.bottomPx * scaleRatio,
    }));

    // Setup A4 PDF Dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidthMm = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeightMm = pdf.internal.pageSize.getHeight(); // 297mm

    const marginMm = 10; // 10mm margins
    const printableWidthMm = pdfWidthMm - marginMm * 2; // 190mm
    const printableHeightMm = pdfHeightMm - marginMm * 2; // 277mm

    // Max canvas height in px per PDF page
    const maxPageHeightCanvasPx = (printableHeightMm / printableWidthMm) * canvas.width;

    let currentY = 0;
    let pageIndex = 0;

    while (currentY < canvas.height) {
      const remainingCanvasPx = canvas.height - currentY;

      let pageBreakY = currentY + maxPageHeightCanvasPx;

      // If remaining content fits on the current page
      if (remainingCanvasPx <= maxPageHeightCanvasPx) {
        pageBreakY = canvas.height;
      } else {
        // Find optimal break point near the bottom boundary of current page to avoid cutting rows
        let bestBreakY = pageBreakY;
        const searchMinY = currentY + maxPageHeightCanvasPx * 0.6; // Only break in lower 40% of page

        for (const pos of canvasPositions) {
          if (pos.top > searchMinY && pos.top < pageBreakY && pos.bottom > pageBreakY) {
            bestBreakY = pos.top;
            break;
          }
        }

        if (bestBreakY > currentY + maxPageHeightCanvasPx * 0.3) {
          pageBreakY = bestBreakY;
        }
      }

      const sliceHeightPx = Math.min(pageBreakY - currentY, canvas.height - currentY);
      if (sliceHeightPx <= 0) break;

      // Slice portion of main canvas onto an offscreen canvas
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeightPx;

      const sliceCtx = sliceCanvas.getContext('2d');
      if (sliceCtx) {
        sliceCtx.fillStyle = '#ffffff';
        sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sliceCtx.drawImage(
          canvas,
          0,
          currentY,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          canvas.width,
          sliceHeightPx
        );
      }

      const sliceImgData = sliceCanvas.toDataURL('image/png');
      const sliceHeightMm = (sliceHeightPx / canvas.width) * printableWidthMm;

      if (pageIndex > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        sliceImgData,
        'PNG',
        marginMm,
        marginMm,
        printableWidthMm,
        sliceHeightMm
      );

      currentY = pageBreakY;
      pageIndex++;
    }

    // Direct Blob URL download for maximum shared hosting / mobile browser compatibility
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

    return true;
  } catch (err: any) {
    console.error('Failed to generate PDF via html2canvas:', err);
    return false;
  } finally {
    if (restoreStyles) {
      restoreStyles();
    }
  }
}
