import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures an HTML element and exports it as a clean PDF file client-side.
 * Includes fallback logic for modern CSS color formats (e.g. Tailwind v4 oklch).
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
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedTarget = clonedDoc.getElementById(elementId);
        if (!clonedTarget) return;

        // Convert any oklch color references in computed styles to standard hex/rgb
        const elements = [clonedTarget, ...Array.from(clonedTarget.querySelectorAll('*'))];
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const style = window.getComputedStyle(htmlEl);

          // If background color contains oklch or unparseable function, replace with standard RGB
          if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
            htmlEl.style.backgroundColor = style.backgroundColor;
          }
          if (style.color && style.color.includes('oklch')) {
            htmlEl.style.color = style.color;
          }
          if (style.borderColor && style.borderColor.includes('oklch')) {
            htmlEl.style.borderColor = '#cbd5e1';
          }
        });
      }
    });

    const imgData = canvas.toDataURL('image/png');

    // Create PDF (A4 size: 210mm x 297mm)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth - 20; // 10mm margins on sides
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // 10mm top margin

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Handle multi-page documents if content overflows single page height
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (err: any) {
    console.error('Failed to generate PDF via html2canvas, trying fallback window print:', err);
    // Fallback if canvas snapshot encounters unsupported CSS engine feature
    window.print();
    return false;
  }
}
