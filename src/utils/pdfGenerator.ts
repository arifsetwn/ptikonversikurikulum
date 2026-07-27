import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures an HTML element and exports it directly as a downloadable PDF file client-side.
 * Uses smart element-aware row slicing to prevent text cut-offs and duplicate row overlaps across PDF pages.
 */
export async function generatePdfFromElement(
  elementId: string,
  fileName: string = 'Simulasi_Konversi_Kurikulum_TI.pdf'
): Promise<boolean> {
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

    // Sort positions by topPx ascending
    elementPositions.sort((a, b) => a.topPx - b.topPx);

    // 2. Render targetElement using html2canvas
    const canvas = await html2canvas(targetElement, {
      scale: 2, // High resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedTarget = clonedDoc.getElementById(elementId);
        if (!clonedTarget) return;

        // Replace any oklch color definitions in cloned stylesheet or elements
        const styleElements = clonedDoc.querySelectorAll('style');
        styleElements.forEach((styleTag) => {
          if (styleTag.innerHTML && styleTag.innerHTML.includes('oklch')) {
            styleTag.innerHTML = styleTag.innerHTML.replace(/oklch\([^)]+\)/g, '#2563eb');
          }
        });

        // Convert computed oklch colors to standard fallbacks
        const elements = [clonedTarget, ...Array.from(clonedTarget.querySelectorAll('*'))];
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (!htmlEl.style) return;

          try {
            const style = window.getComputedStyle(htmlEl);
            if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
              htmlEl.style.backgroundColor = '#ffffff';
            }
            if (style.color && style.color.includes('oklch')) {
              htmlEl.style.color = '#0f172a';
            }
            if (style.borderColor && style.borderColor.includes('oklch')) {
              htmlEl.style.borderColor = '#cbd5e1';
            }
          } catch (e) {
            // Ignore computed style errors
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
          // If an element starts after searchMinY and crosses or ends near pageBreakY
          if (pos.top > searchMinY && pos.top < pageBreakY && pos.bottom > pageBreakY) {
            bestBreakY = pos.top;
            break;
          }
        }

        // Ensure breakY moves forward significantly to avoid infinite loop or tiny slices
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

    // Trigger direct browser file download
    pdf.save(fileName);
    return true;
  } catch (err: any) {
    console.error('Failed to generate PDF via html2canvas:', err);
    alert('Terjadi kesalahan saat membuat file PDF. Silakan coba kembali.');
    return false;
  }
}
