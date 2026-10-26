import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, WidthType, Table, TableRow, TableCell } from 'docx';
import { jsPDF } from 'jspdf';
import { RESUME_DATA } from './resumeData';

// ── 1. Native Microsoft Word (.docx) Generator ──────────────────
export async function downloadResumeDocx(): Promise<void> {
  const { personal, experience, education, skillGroups, projects, certifications } = RESUME_DATA;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,    // 0.5 inch
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: [
          // Header: Name
          new Paragraph({
            text: personal.name.toUpperCase(),
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
          }),
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: personal.title,
                bold: true,
                color: 'B91C1C',
                size: 22,
              }),
            ],
          }),
          // Contact line
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: `${personal.location}  |  ${personal.phone}  |  ${personal.email}\nLinkedIn: ${personal.linkedinDisplay}  |  GitHub: ${personal.githubDisplay}`,
                size: 18,
                color: '4B5563',
              }),
            ],
          }),

          // SECTION: Professional Summary
          createSectionHeading('PROFESSIONAL SUMMARY'),
          new Paragraph({
            spacing: { after: 160 },
            children: [
              new TextRun({
                text: personal.summary,
                size: 20,
                color: '1F2937',
              }),
            ],
          }),

          // SECTION: Work Experience
          createSectionHeading('WORK EXPERIENCE'),
          ...experience.flatMap(exp => [
            new Paragraph({
              spacing: { before: 80, after: 40 },
              children: [
                new TextRun({ text: exp.role, bold: true, size: 21, color: '111827' }),
                new TextRun({ text: ` — ${exp.company}`, bold: true, size: 21, color: 'B91C1C' }),
                new TextRun({ text: `\t${exp.location} | ${exp.period}`, italics: true, size: 18, color: '6B7280' }),
              ],
            }),
            ...exp.duties.map(duty =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 40 },
                children: [new TextRun({ text: duty, size: 19, color: '374151' })],
              })
            ),
          ]),

          // SECTION: Education
          createSectionHeading('EDUCATION'),
          ...education.map(edu =>
            new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: edu.degree, bold: true, size: 20, color: '111827' }),
                new TextRun({ text: ` — ${edu.institution}`, size: 20, color: '374151' }),
                new TextRun({ text: `\t${edu.location} | ${edu.year}`, italics: true, size: 18, color: '6B7280' }),
                new TextRun({
                  text: `\n${edu.specialization}${edu.score ? ` (Score: ${edu.score})` : ''}`,
                  size: 18,
                  color: '6B7280',
                }),
              ],
            })
          ),

          // SECTION: Technical Skills
          createSectionHeading('TECHNICAL TOOLKIT'),
          ...skillGroups.map(grp =>
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({ text: `${grp.title}: `, bold: true, size: 19, color: '111827' }),
                new TextRun({ text: grp.skills.map(s => s.name).join(', '), size: 19, color: '374151' }),
              ],
            })
          ),

          // SECTION: Projects
          createSectionHeading('ANALYTICS & DATA PROJECTS'),
          ...projects.slice(0, 4).map(proj =>
            new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: proj.title, bold: true, size: 20, color: '111827' }),
                new TextRun({ text: ` (${proj.category})`, italics: true, size: 18, color: '6B7280' }),
                new TextRun({ text: `\n${proj.description}`, size: 19, color: '374151' }),
                new TextRun({ text: `\nTech Stack: ${proj.tech.join(', ')}`, size: 17, color: 'B91C1C', bold: true }),
              ],
            })
          ),

          // SECTION: Certifications
          createSectionHeading('VERIFIED CERTIFICATIONS'),
          ...certifications.map(cert =>
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 40 },
              children: [
                new TextRun({ text: `${cert.title} `, bold: true, size: 19, color: '111827' }),
                new TextRun({ text: `— ${cert.issuer}`, size: 19, color: '374151' }),
                ...(cert.credentialId ? [new TextRun({ text: ` (Credential ID: ${cert.credentialId})`, size: 17, color: '6B7280' })] : []),
              ],
            })
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Tejas_Patil_Resume.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function createSectionHeading(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    border: {
      bottom: {
        color: 'B91C1C',
        space: 2,
        style: BorderStyle.SINGLE,
        size: 12,
      },
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 21,
        color: '111827',
      }),
    ],
  });
}

// ── 2. Native ATS-Compliant PDF Generator (jsPDF) ───────────────
export function downloadResumePDF(): void {
  const { personal, experience, education, skillGroups, projects, certifications } = RESUME_DATA;

  // Standard A4 PDF (210 x 297 mm)
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  });

  const marginX = 14;
  const pageWidth = 210;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 16;

  // Helper for section divider
  const addSection = (title: string) => {
    cursorY += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(17, 24, 39);
    doc.text(title.toUpperCase(), marginX, cursorY);
    cursorY += 1.5;
    doc.setDrawColor(185, 28, 28); // Deep red rule
    doc.setLineWidth(0.4);
    doc.line(marginX, cursorY, marginX + contentWidth, cursorY);
    cursorY += 4.5;
  };

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(17, 24, 39);
  doc.text(personal.name, marginX, cursorY);
  cursorY += 5.5;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(185, 28, 28);
  doc.text(personal.title, marginX, cursorY);
  cursorY += 4.5;

  // Contact Info line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(75, 85, 99);
  const contactText = `${personal.location}  •  ${personal.phone}  •  ${personal.email}`;
  const socialText = `LinkedIn: ${personal.linkedinDisplay}  •  GitHub: ${personal.githubDisplay}`;
  doc.text(contactText, marginX, cursorY);
  cursorY += 3.8;
  doc.text(socialText, marginX, cursorY);
  cursorY += 4;

  // Summary
  addSection('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(55, 65, 81);
  const splitSummary = doc.splitTextToSize(personal.summary, contentWidth);
  doc.text(splitSummary, marginX, cursorY);
  cursorY += splitSummary.length * 4;

  // Experience
  addSection('Work Experience');
  experience.forEach(exp => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);
    doc.text(exp.role, marginX, cursorY);

    doc.setTextColor(185, 28, 28);
    const roleWidth = doc.getTextWidth(exp.role);
    doc.text(` — ${exp.company}`, marginX + roleWidth, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(`${exp.location} | ${exp.period}`, marginX + contentWidth, cursorY, { align: 'right' });
    cursorY += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(55, 65, 81);
    exp.duties.forEach(duty => {
      const splitDuty = doc.splitTextToSize(`•  ${duty}`, contentWidth - 4);
      doc.text(splitDuty, marginX + 2, cursorY);
      cursorY += splitDuty.length * 3.6;
    });
    cursorY += 1;
  });

  // Education
  addSection('Education');
  education.forEach(edu => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(17, 24, 39);
    doc.text(edu.degree, marginX, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(`${edu.location} | ${edu.year}`, marginX + contentWidth, cursorY, { align: 'right' });
    cursorY += 3.8;

    doc.setTextColor(75, 85, 99);
    doc.text(`${edu.institution} — ${edu.specialization}${edu.score ? ` (${edu.score})` : ''}`, marginX, cursorY);
    cursorY += 4.2;
  });

  // Technical Toolkit
  addSection('Technical Skills');
  doc.setFontSize(8);
  skillGroups.forEach(grp => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`${grp.title}:`, marginX, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    doc.text(grp.skills.map(s => s.name).join(', '), marginX + 48, cursorY);
    cursorY += 4;
  });

  // Projects
  addSection('Selected Projects');
  projects.slice(0, 3).forEach(proj => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 24, 39);
    doc.text(proj.title, marginX, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(185, 28, 28);
    doc.text(`[${proj.category}]`, marginX + contentWidth, cursorY, { align: 'right' });
    cursorY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const splitDesc = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(splitDesc, marginX, cursorY);
    cursorY += splitDesc.length * 3.3;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(107, 114, 128);
    doc.text(`Tech: ${proj.tech.join(', ')}`, marginX, cursorY);
    cursorY += 4;
  });

  // Certifications
  addSection('Verified Certifications');
  doc.setFontSize(8);
  certifications.forEach(cert => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`•  ${cert.title}`, marginX + 2, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const titleW = doc.getTextWidth(`•  ${cert.title}`);
    const cred = cert.credentialId ? ` (ID: ${cert.credentialId})` : '';
    doc.text(` — ${cert.issuer}${cred}`, marginX + 2 + titleW, cursorY);
    cursorY += 3.8;
  });

  // Save ATS PDF file
  doc.save(`Tejas_Patil_Resume.pdf`);
}
