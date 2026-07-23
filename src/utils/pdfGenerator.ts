import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures an HTML element and exports it directly as a downloadable PDF file client-side.
 * Sanitizes Tailwind v4 oklch color formats to ensure html2canvas parsing succeeds.
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

    // Capture target element as canvas with cloned document style sanitizer
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

    const imgData = canvas.toDataURL('image/png');

    // Create PDF (A4 size: 210mm x 297mm)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const margin = 10; // 10mm margins
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // Add first page
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - margin * 2);

    // Handle multi-page documents if content overflows single page height
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - margin * 2);
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
