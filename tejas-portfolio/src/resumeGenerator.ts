import { RESUME_DATA } from './resumeData';

// Generate printable HTML and trigger native browser PDF print dialog
export function downloadResumePDF() {
  const { personal, experience, education, skillGroups, projects, certifications } = RESUME_DATA;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${personal.name} — Resume</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 10pt;
    }
    .header {
      border-bottom: 2px solid #b91c1c;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .name {
      font-size: 22pt;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .subtitle {
      font-size: 11pt;
      color: #b91c1c;
      font-weight: 600;
      margin-top: 2px;
    }
    .contact-info {
      text-align: right;
      font-size: 8.5pt;
      color: #475569;
      line-height: 1.5;
    }
    .contact-info a {
      color: #0f172a;
      text-decoration: none;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-top: 11px;
      margin-bottom: 7px;
    }
    .summary-text {
      font-size: 9.2pt;
      color: #334155;
      text-align: justify;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-title {
      font-weight: 700;
      font-size: 10pt;
      color: #0f172a;
    }
    .item-company {
      font-weight: 600;
      color: #b91c1c;
    }
    .item-date {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 500;
    }
    .duties-list {
      margin-left: 16px;
      margin-bottom: 6px;
      font-size: 9pt;
      color: #334155;
    }
    .duties-list li {
      margin-bottom: 3px;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
      margin-top: 4px;
    }
    .skills-table td {
      padding: 3px 0;
      vertical-align: top;
    }
    .skill-cat {
      font-weight: 700;
      color: #1e293b;
      width: 28%;
    }
    .skill-vals {
      color: #475569;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 4px;
    }
    .project-card {
      border: 1px solid #e2e8f0;
      padding: 6px 8px;
      border-radius: 4px;
      background: #f8fafc;
    }
    .project-card-title {
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
    }
    .project-card-desc {
      font-size: 8pt;
      color: #475569;
      margin-top: 2px;
    }
    .project-card-tech {
      font-size: 7.5pt;
      color: #b91c1c;
      font-weight: 600;
      margin-top: 3px;
    }
    .cert-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      margin-top: 4px;
      font-size: 8.5pt;
    }
    .cert-item {
      color: #1e293b;
    }
    .cert-item span {
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="name">${personal.name}</h1>
      <div class="subtitle">${personal.title}</div>
    </div>
    <div class="contact-info">
      <div>${personal.location}</div>
      <div>${personal.phone} | <a href="mailto:${personal.email}">${personal.email}</a></div>
      <div>LinkedIn: ${personal.linkedinDisplay} | GitHub: ${personal.githubDisplay}</div>
    </div>
  </div>

  <div class="section-title">Professional Summary</div>
  <p class="summary-text">${personal.summary}</p>

  <div class="section-title">Work Experience</div>
  ${experience.map(exp => `
    <div style="margin-bottom: 6px;">
      <div class="item-header">
        <div>
          <span class="item-title">${exp.role}</span> &mdash; 
          <span class="item-company">${exp.company}</span>
        </div>
        <div class="item-date">${exp.location} | ${exp.period}</div>
      </div>
      <ul class="duties-list">
        ${exp.duties.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <div class="section-title">Education</div>
  ${education.map(edu => `
    <div style="margin-bottom: 5px;">
      <div class="item-header">
        <div>
          <span class="item-title">${edu.degree}</span> &mdash; 
          <span style="font-weight: 600; color: #334155;">${edu.institution}</span>
        </div>
        <div class="item-date">${edu.location} | ${edu.year}</div>
      </div>
      <div style="font-size: 8.5pt; color: #64748b; margin-top: 1px;">
        ${edu.specialization} ${edu.score ? `&bull; <strong>${edu.score}</strong>` : ''}
      </div>
    </div>
  `).join('')}

  <div class="section-title">Technical Toolkit & Competencies</div>
  <table class="skills-table">
    ${skillGroups.map(group => `
      <tr>
        <td class="skill-cat">${group.title}:</td>
        <td class="skill-vals">${group.skills.map(s => s.name).join(', ')}</td>
      </tr>
    `).join('')}
  </table>

  <div class="section-title">Key Analytics & Data Engineering Projects</div>
  <div class="projects-grid">
    ${projects.slice(0, 4).map(proj => `
      <div class="project-card">
        <div class="project-card-title">${proj.title}</div>
        <div class="project-card-desc">${proj.description}</div>
        <div class="project-card-tech">${proj.tech.join(' • ')}</div>
      </div>
    `).join('')}
  </div>

  <div class="section-title">Verified Certifications</div>
  <div class="cert-list">
    ${certifications.map(c => `
      <div class="cert-item">
        <strong>${c.title}</strong> &mdash; <span>${c.issuer}</span>
      </div>
    `).join('')}
  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>
  `;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // Fallback if popup blocked: trigger direct download
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tejas_Patil_Resume.html`;
    a.click();
  }
}

// Generate Microsoft Word (.doc format) directly from current dynamic data
export function downloadResumeDoc() {
  const { personal, experience, education, skillGroups, projects, certifications } = RESUME_DATA;

  const docContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${personal.name} Resume</title>
  <style>
    body {
      font-family: Calibri, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.35;
      color: #111827;
      margin: 20mm;
    }
    h1 {
      font-size: 22pt;
      color: #0f172a;
      margin: 0;
      padding: 0;
    }
    .subtitle {
      font-size: 12pt;
      color: #b91c1c;
      font-weight: bold;
      margin-bottom: 6pt;
    }
    .contact {
      font-size: 9.5pt;
      color: #475569;
      margin-bottom: 14pt;
      border-bottom: 2pt solid #b91c1c;
      padding-bottom: 6pt;
    }
    h2 {
      font-size: 12pt;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1pt solid #cbd5e1;
      padding-bottom: 2pt;
      margin-top: 14pt;
      margin-bottom: 6pt;
    }
    p {
      margin: 0 0 6pt 0;
      font-size: 10pt;
    }
    ul {
      margin: 3pt 0 8pt 18pt;
      padding: 0;
    }
    li {
      margin-bottom: 3pt;
      font-size: 9.5pt;
    }
    .bold { font-weight: bold; }
    .company { color: #b91c1c; font-weight: bold; }
    .date { float: right; color: #64748b; font-size: 9.5pt; }
    table { width: 100%; border-collapse: collapse; margin-top: 4pt; }
    td { padding: 3pt 0; vertical-align: top; font-size: 9.5pt; }
  </style>
</head>
<body>
  <h1>${personal.name}</h1>
  <div class="subtitle">${personal.title}</div>
  <div class="contact">
    ${personal.location} | Phone: ${personal.phone} | Email: ${personal.email}<br/>
    LinkedIn: ${personal.linkedin} | GitHub: ${personal.github}
  </div>

  <h2>Professional Summary</h2>
  <p>${personal.summary}</p>

  <h2>Professional Experience</h2>
  ${experience.map(exp => `
    <p>
      <span class="bold">${exp.role}</span> &mdash; <span class="company">${exp.company}</span>
      <span class="date">${exp.location} | ${exp.period}</span>
    </p>
    <ul>
      ${exp.duties.map(d => `<li>${d}</li>`).join('')}
    </ul>
  `).join('')}

  <h2>Education</h2>
  ${education.map(edu => `
    <p>
      <span class="bold">${edu.degree}</span> &mdash; <span>${edu.institution}</span>
      <span class="date">${edu.location} | ${edu.year}</span><br/>
      <span style="color:#64748b; font-size: 9pt;">${edu.specialization} ${edu.score ? `(${edu.score})` : ''}</span>
    </p>
  `).join('')}

  <h2>Technical Skills</h2>
  <table>
    ${skillGroups.map(grp => `
      <tr>
        <td width="30%" class="bold">${grp.title}:</td>
        <td width="70%">${grp.skills.map(s => s.name).join(', ')}</td>
      </tr>
    `).join('')}
  </table>

  <h2>Featured Analytics Projects</h2>
  ${projects.map(proj => `
    <p>
      <span class="bold">${proj.title}</span> (${proj.category})<br/>
      <span>${proj.description}</span><br/>
      <span style="color:#b91c1c; font-size: 8.5pt;">Technologies: ${proj.tech.join(', ')}</span>
    </p>
  `).join('')}

  <h2>Verified Certifications</h2>
  <ul>
    ${certifications.map(c => `
      <li><strong>${c.title}</strong> &mdash; ${c.issuer}</li>
    `).join('')}
  </ul>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff' + docContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Tejas_Patil_Resume.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
