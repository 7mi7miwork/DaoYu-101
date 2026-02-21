import { jsPDF } from 'jspdf';

export const useCertificate = () => {
  const generateCertificate = ({ studentName, courseName, date, certId }) => {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Certificate dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Set background color
    pdf.setFillColor(245, 245, 250);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Add border
    pdf.setDrawColor(79, 70, 229); // Indigo color matching theme
    pdf.setLineWidth(2);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Add inner border
    pdf.setLineWidth(1);
    pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(32);
    pdf.setTextColor(79, 70, 229);
    const title = 'Certificate of Completion';
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, 50);

    // Subtitle
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(16);
    pdf.setTextColor(107, 114, 128);
    const subtitle = 'This is to certify that';
    const subtitleWidth = pdf.getTextWidth(subtitle);
    pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 75);

    // Student name
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.setTextColor(31, 41, 55);
    const nameWidth = pdf.getTextWidth(studentName);
    pdf.text(studentName, (pageWidth - nameWidth) / 2, 95);

    // Course completion text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(55, 65, 81);
    const completionText = 'has successfully completed the course';
    const completionWidth = pdf.getTextWidth(completionText);
    pdf.text(completionText, (pageWidth - completionWidth) / 2, 115);

    // Course name
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(79, 70, 229);
    const courseWidth = pdf.getTextWidth(courseName);
    pdf.text(courseName, (pageWidth - courseWidth) / 2, 135);

    // Date
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    const dateText = `Completed on: ${date}`;
    const dateWidth = pdf.getTextWidth(dateText);
    pdf.text(dateText, (pageWidth - dateWidth) / 2, 160);

    // Certificate ID
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(156, 163, 175);
    const certIdText = `Certificate ID: ${certId}`;
    pdf.text(certIdText, 20, pageHeight - 20);

    // Add decorative elements
    pdf.setDrawColor(79, 70, 229);
    pdf.setLineWidth(0.5);
    
    // Top left corner decoration
    pdf.line(15, 15, 35, 15);
    pdf.line(15, 15, 15, 35);
    
    // Top right corner decoration
    pdf.line(pageWidth - 15, 15, pageWidth - 35, 15);
    pdf.line(pageWidth - 15, 15, pageWidth - 15, 35);
    
    // Bottom left corner decoration
    pdf.line(15, pageHeight - 15, 35, pageHeight - 15);
    pdf.line(15, pageHeight - 15, 15, pageHeight - 35);
    
    // Bottom right corner decoration
    pdf.line(pageWidth - 15, pageHeight - 15, pageWidth - 35, pageHeight - 15);
    pdf.line(pageWidth - 15, pageHeight - 15, pageWidth - 15, pageHeight - 35);

    // Save the PDF
    pdf.save(`${certId}.pdf`);
  };

  return { generateCertificate };
};
