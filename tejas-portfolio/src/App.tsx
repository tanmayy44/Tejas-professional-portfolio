import { useEffect, useRef, useState, useCallback } from 'react';
import './components.css';
import { RESUME_DATA } from './resumeData';
import type { ProjectItem, ProjectCaseStudy } from './resumeData';
import { downloadResumePDF, downloadResumeDocx } from './resumeGenerator';

// ── Asset imports ───────────────────────────────────────────
import heroStadium from './assets/images/hero_stadium.jpg';
import projectFootball from './assets/images/project_football.jpg';
import projectHousePrice from './assets/images/project_house_price.jpg';
import projectHeartHealth from './assets/images/project_heart_health.jpg';
import projectMovies from './assets/images/project_movies.jpg';
import projectCurriculab from './assets/images/project_curriculab.jpg';
import projectMedia from './assets/images/project_media.jpg';

// ── SVG Icons ───────────────────────────────────────────────
const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const IconEmail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconDownload = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconLocation = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const IconChevronUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconFilePdf = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

const IconFileWord = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="7 8 10 16 12 11 14 16 17 8"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ── Interactive Résumé Preview Modal ─────────────────────────
function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { personal, experience, education, skillGroups, projects, certifications } = RESUME_DATA;

  return (
    <div
      className="resume-modal-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-heading"
    >
      <div className="resume-modal-dialog" ref={modalRef} tabIndex={-1}>
        <div className="resume-modal-header">
          <div className="resume-modal-title" id="resume-modal-heading">
            <span>📄</span> Résumé Preview &amp; Single Source of Truth
          </div>
          <div className="resume-modal-actions">
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: '8px 14px', fontSize: '12px' }}
              onClick={downloadResumePDF}
            >
              <IconFilePdf /> Save PDF
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: '8px 14px', fontSize: '12px' }}
              onClick={downloadResumeDocx}
            >
              <IconFileWord /> Download Word (.docx)
            </button>
            <button
              type="button"
              className="resume-close-btn"
              onClick={onClose}
              aria-label="Close résumé preview"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="resume-modal-body">
          <div className="resume-sheet">
            <div className="resume-sheet-header">
              <h1 className="resume-sheet-name">{personal.name}</h1>
              <div className="resume-sheet-role">{personal.title}</div>
              <div className="resume-sheet-contact">
                {personal.location} &bull; Phone: {personal.phone} &bull; Email: {personal.email}<br/>
                LinkedIn: {personal.linkedinDisplay} &bull; GitHub: {personal.githubDisplay}
              </div>
            </div>

            <div className="resume-sheet-sec-title">Professional Summary</div>
            <p className="resume-sheet-p">{personal.summary}</p>

            <div className="resume-sheet-sec-title">Work Experience</div>
            {experience.map(exp => (
              <div key={exp.company} className="resume-sheet-item">
                <div className="resume-sheet-item-header">
                  <div>
                    <span className="resume-sheet-item-role">{exp.role}</span>
                    <span className="resume-sheet-item-company"> — {exp.company}</span>
                  </div>
                  <span className="resume-sheet-item-meta">{exp.location} | {exp.period}</span>
                </div>
                <ul className="resume-sheet-ul">
                  {exp.duties.map((duty, idx) => (
                    <li key={idx}>{duty}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="resume-sheet-sec-title">Education</div>
            {education.map(edu => (
              <div key={edu.degree} className="resume-sheet-item">
                <div className="resume-sheet-item-header">
                  <div>
                    <span className="resume-sheet-item-role">{edu.degree}</span>
                    <span> — {edu.institution}</span>
                  </div>
                  <span className="resume-sheet-item-meta">{edu.location} | {edu.year}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                  {edu.specialization} {edu.score ? `• ${edu.score}` : ''}
                </div>
              </div>
            ))}

            <div className="resume-sheet-sec-title">Technical Toolkit &amp; Competencies</div>
            <table className="resume-sheet-table">
              <tbody>
                {skillGroups.map(grp => (
                  <tr key={grp.title}>
                    <td className="resume-sheet-table-cat">{grp.title}:</td>
                    <td style={{ color: '#4b5563' }}>{grp.skills.map(s => s.name).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="resume-sheet-sec-title">Selected Analytics &amp; Data Engineering Projects</div>
            {projects.slice(0, 3).map(proj => (
              <div key={proj.id} className="resume-sheet-item">
                <div className="resume-sheet-item-header">
                  <span className="resume-sheet-item-role">{proj.title}</span>
                  <span style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 600 }}>[{proj.category}]</span>
                </div>
                <p className="resume-sheet-p" style={{ fontSize: '11.5px', marginTop: '2px' }}>{proj.description}</p>
                <div style={{ fontSize: '10.5px', color: '#6b7280', marginTop: '2px' }}>
                  Technologies: {proj.tech.join(' • ')}
                </div>
              </div>
            ))}

            <div className="resume-sheet-sec-title">Verified Certifications</div>
            <ul className="resume-sheet-ul">
              {certifications.map(cert => (
                <li key={cert.id || cert.title}>
                  <strong>{cert.title}</strong> — {cert.issuer}
                  {cert.completionDate && <span style={{ color: '#4b5563' }}> ({cert.completionDate}{cert.duration ? ` · ${cert.duration}` : ''})</span>}
                  {cert.credentialId && <span style={{ color: '#6b7280' }}> [ID: {cert.credentialId}]</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Live Dynamic CV Dropdown Component ────────────────────────
function CVDropdown({
  className = 'btn btn-outline-red',
  alignRight = false,
  label = 'Download CV'
}: {
  className?: string;
  alignRight?: boolean;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      <div className="cv-dropdown-wrapper" ref={dropdownRef}>
        <button
          type="button"
          className={`${className} cv-trigger-btn`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <IconDownload />
          <span>{label}</span>
          <IconChevronDown />
        </button>

        {open && (
          <div className={`cv-menu ${alignRight ? 'menu-right' : ''}`} role="menu">
            <div className="cv-menu-header">
              <div className="cv-menu-title">Live Dynamic Resume</div>
              <div className="cv-menu-sub">Auto-synced with portfolio edits</div>
            </div>

            <button
              type="button"
              className="cv-menu-item"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setPreviewOpen(true);
              }}
            >
              <div className="cv-item-icon">
                <IconEye />
              </div>
              <div className="cv-item-info">
                <span className="cv-item-label">Preview Résumé</span>
                <span className="cv-item-desc">In-browser ATS document view</span>
              </div>
            </button>

            <button
              type="button"
              className="cv-menu-item"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                downloadResumePDF();
              }}
            >
              <div className="cv-item-icon">
                <IconFilePdf />
              </div>
              <div className="cv-item-info">
                <span className="cv-item-label">Print / Save as PDF</span>
                <span className="cv-item-desc">A4 clean ATS-compliant PDF</span>
              </div>
            </button>

            <button
              type="button"
              className="cv-menu-item"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                downloadResumeDocx();
              }}
            >
              <div className="cv-item-icon">
                <IconFileWord />
              </div>
              <div className="cv-item-info">
                <span className="cv-item-label">Microsoft Word (.DOCX)</span>
                <span className="cv-item-desc">Native editable Word document</span>
              </div>
            </button>
          </div>
        )}
      </div>

      <ResumeModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}

// ── Intersection Observer Hook ──────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Navbar ──────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Certifications', 'Contact'];

function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase()));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
      },
      { threshold: 0.35 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a className="navbar-logo" onClick={() => scrollTo('home')} href="#home" aria-label="Tejas Patil Home">
            <div className="logo-mark">TP</div>
            <span className="logo-name">Tejas Patil</span>
          </a>

          <div className="navbar-links" role="menubar">
            {NAV_LINKS.map(link => (
              <button key={link} id={`nav-${link.toLowerCase()}`}
                className={`nav-link ${active === link ? 'active' : ''}`}
                onClick={() => scrollTo(link)} role="menuitem">
                {link}
              </button>
            ))}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
            <CVDropdown className="nav-cv-btn" alignRight={true} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="theme-toggle-btn mobile-theme-toggle"
              style={{ display: 'none' }}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
            <button className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(link => (
          <button key={link} className={`mobile-nav-link ${active === link ? 'active' : ''}`}
            onClick={() => scrollTo(link)}>{link}</button>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px', alignItems: 'center' }}>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{ width: '44px', height: '44px' }}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <div style={{ flex: 1 }}>
            <CVDropdown className="mobile-cv-btn" alignRight={false} />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Hero ────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero" aria-label="Hero section">
      <div className="hero-bg">
        <img src={heroStadium} alt="Football stadium lights" loading="eager" />
        <div className="hero-overlay"/>
      </div>

      <div className="hero-content" style={{ width: '100%' }}>
        <div className="hero-inner">
          <div className="hero-label">
            <span/> Sports Analyst @ Spiideo | MBA Business Analytics
          </div>

          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">
            Tejas <span className="hero-name-accent">Patil.</span>
          </h1>

          <div className="hero-role-title">
            Sports Data Analyst <span className="hero-role-divider">•</span> Business Analytics Professional
          </div>

          <p className="hero-description">
            Analyzing high-volume athletic match events at Spiideo and turning complex data into actionable performance intelligence.
            Armed with a BCA in Data Analytics and MBA candidate training, I build predictive models and executive dashboards in Python, SQL, Power BI, and Tableau.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('lab')} id="hero-explore-btn">
              Explore Match Lab <IconArrow />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')} id="hero-contact-btn">
              Contact Me
            </button>
            <CVDropdown className="btn btn-outline-red" alignRight={false} label="Download CV" />
          </div>

          <div className="hero-socials" aria-label="Social links">
            <a href="https://www.linkedin.com/in/tejas-patil-5967a3325/" target="_blank" rel="noopener noreferrer"
              className="hero-social-link" aria-label="LinkedIn profile" id="hero-linkedin">
              <IconLinkedIn />
            </a>
            <a href="https://github.com/tanmayy44" target="_blank" rel="noopener noreferrer"
              className="hero-social-link" aria-label="GitHub profile" id="hero-github">
              <IconGitHub />
            </a>
            <a href="mailto:tejaspatil78787@gmail.com"
              className="hero-social-link" aria-label="Send email" id="hero-email">
              <IconEmail />
            </a>
          </div>

          <div className="hero-stats" aria-label="Professional highlights">
            <div>
              <div className="hero-stat-value">Spiideo</div>
              <div className="hero-stat-label">Sports Analyst (Current)</div>
            </div>
            <div>
              <div className="hero-stat-value">6<span>+</span></div>
              <div className="hero-stat-label">Data Projects</div>
            </div>
            <div>
              <div className="hero-stat-value">100<span>%</span></div>
              <div className="hero-stat-label">Verified Match Tagging</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-mouse"><div className="scroll-dot"/></div>
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  );
}

// ── About ───────────────────────────────────────────────────
function About() {
  const ref = useReveal();
  return (
    <section id="about" className="section" aria-label="About section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="about-grid">
            <div className="about-image-wrap">
              <div className="about-image-placeholder" aria-label="Professional summary card">
                <span className="about-card-badge">Analytics Profile</span>
                <div className="about-card-title">
                  Tejas Sanjay Patil
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Sports Analyst based in Nashik, bridging on-pitch tactical events with rigorous business intelligence and statistical reporting.
                </p>

                <div className="about-card-metrics">
                  <div className="about-card-metric-row">
                    <span className="about-card-metric-label">Current Role:</span>
                    <span className="about-card-metric-val">Sports Analyst</span>
                  </div>
                  <div className="about-card-metric-row">
                    <span className="about-card-metric-label">Company:</span>
                    <span className="about-card-metric-val" style={{ color: 'var(--accent)' }}>Spiideo</span>
                  </div>
                  <div className="about-card-metric-row">
                    <span className="about-card-metric-label">Education:</span>
                    <span className="about-card-metric-val">MBA (Pursuing) · BCA</span>
                  </div>
                  <div className="about-card-metric-row">
                    <span className="about-card-metric-label">Key Stack:</span>
                    <span className="about-card-metric-val">Python, SQL, Power BI</span>
                  </div>
                </div>

                <div className="about-card-tagline">
                  "Turning rapid match sequences into clean, decision-ready data."
                </div>
              </div>
            </div>

            <div className="about-text">
              <div>
                <div className="section-tag">About Me</div>
                <h2 className="section-title">Where athletic passion<br/>meets practical analytics.</h2>
              </div>

              <p>
                I am a <strong>Sports Analyst at Spiideo</strong> and an <strong>MBA in Business Analytics candidate</strong> at Sandip University, Nashik. My day-to-day focus centers on high-precision sports match tagging, roster workflows, and maintaining rigorous data quality for competitive athletic analysis.
              </p>
              <p>
                Having graduated with a <strong>Bachelor of Computer Applications in Data Analytics</strong> (CGPA 7.01), I combine structured sports domain understanding with programming in <strong>Python, MySQL, Power BI, Tableau, and Excel</strong>. I enjoy untangling complex match logs, exploring passing sequences, and building dashboards that help teams make informed decisions.
              </p>

              <div className="about-attrs">
                {[
                  { icon: '⚽', label: 'Match Tagging', sub: 'High-precision event logging at Spiideo' },
                  { icon: '🎯', label: 'Data Quality & Roster', sub: 'Pipeline validation & roster synchronization' },
                  { icon: '📊', label: 'BI & Storytelling', sub: 'Interactive Power BI & Tableau dashboards' },
                  { icon: '🐍', label: 'Python Analytics', sub: 'Pandas, NumPy, and Scikit-learn modeling' },
                ].map(attr => (
                  <div key={attr.label} className="about-attr">
                    <span style={{fontSize:'20px'}}>{attr.icon}</span>
                    <div>
                      <div style={{fontWeight:600,fontSize:'13px',color:'var(--text-primary)'}}>{attr.label}</div>
                      <div style={{fontSize:'11.5px',color:'var(--text-secondary)',marginTop:'1px'}}>{attr.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{display:'flex',gap:'12px',marginTop:'8px',flexWrap:'wrap'}}>
                <button className="btn btn-primary" onClick={() => document.getElementById('lab')?.scrollIntoView({behavior:'smooth'})} id="about-lab-btn">
                  Test Match Lab <IconArrow />
                </button>
                <button className="btn btn-ghost" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})} id="about-projects-btn">
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ──────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    title: 'Programming & Data Science',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'Pandas', icon: '🐼' },
      { name: 'NumPy', icon: '🔢' },
      { name: 'Matplotlib', icon: '📊' },
      { name: 'Scikit-learn', icon: '🤖' },
    ],
  },
  {
    title: 'Business Intelligence & Storytelling',
    skills: [
      { name: 'Power BI', icon: '📊' },
      { name: 'Tableau', icon: '📈' },
      { name: 'Microsoft Excel', icon: '📗' },
      { name: 'DAX & Modeling', icon: '📉' },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'MySQL', icon: '🗄️' },
      { name: 'SQL Querying', icon: '⚡' },
      { name: 'AWS Cloud', icon: '☁️' },
    ],
  },
  {
    title: 'Sports Analytics & Operations',
    skills: [
      { name: 'Match Event Tagging', icon: '⚽' },
      { name: 'Roster Workflows', icon: '📋' },
      { name: 'Data Quality Control', icon: '🛡️' },
      { name: 'Tactical Analysis', icon: '🧭' },
    ],
  },
];

function Skills() {
  const ref = useReveal();
  return (
    <section id="skills" className="section section-alt" aria-label="Skills section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="skills-header">
            <div>
              <div className="section-tag">Skills</div>
              <h2 className="section-title">Technical Toolkit</h2>
              <p className="section-subtitle">Core technologies and domain tools I apply across sports analytics and business intelligence.</p>
            </div>
            <span className="skills-note">Tools &amp; Technologies</span>
          </div>

          <div className="skills-groups">
            {SKILL_GROUPS.map(group => (
              <div key={group.title}>
                <div className="skill-group-title">{group.title}</div>
                <div className="skills-grid">
                  {group.skills.map(skill => (
                    <div key={skill.name} className="skill-chip">
                      <span className="skill-icon">{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experience ──────────────────────────────────────────────
function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" className="section" aria-label="Experience section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="experience-header">
            <div>
              <div className="section-tag">Experience</div>
              <h2 className="section-title">Professional Journey</h2>
            </div>
            <span className="exp-note">Current Role</span>
          </div>

          <div className="exp-timeline">
            <div className="exp-dot"/>
            <div className="exp-card">
              <div className="exp-card-header">
                <div className="exp-company-logo">S</div>
                <div className="exp-title-wrap">
                  <div className="exp-company">Spiideo</div>
                  <div className="exp-role">Sports Analyst</div>
                </div>
              </div>

              <div className="exp-meta">
                <span className="exp-location"><IconLocation/> Nashik, India</span>
                <span className="exp-period"><IconCalendar/> Jun 2026 – Present</span>
                <span className="exp-badge">Current Role</span>
              </div>

              <div className="exp-duties">
                {[
                  'Execute sports match tagging and roster-related workflows to power high-fidelity sports analytics.',
                  'Maintain rigorous data quality and precision across high-volume structured match information.',
                  'Analyze athletic event data and collaborate with operational teams to streamline roster data pipelines.',
                  'Uphold strict client and proprietary sports data confidentiality standards.',
                ].map((duty, i) => (
                  <div key={i} className="exp-duty">{duty}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ────────────────────────────────────────────────
type Project = ProjectItem & {
  image: string | null;
};

const PROJECT_IMAGE_MAP: Record<string, string> = {
  'proj-curriculab': projectCurriculab,
  'proj-football': projectFootball,
  'proj-house': projectHousePrice,
  'proj-heart': projectHeartHealth,
  'proj-bi-sales': projectMovies,
  'proj-movies': projectMedia,
};

const PROJECTS: Project[] = RESUME_DATA.projects.map(p => ({
  ...p,
  image: PROJECT_IMAGE_MAP[p.id] || null,
}));

const FILTER_CATS = ['All', 'Sports Analytics', 'Machine Learning', 'Business Intelligence', 'Data Analysis'];

// ── Project Case Study Modal ────────────────────────────────
function ProjectCaseStudyModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="case-study-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-heading"
    >
      <div className="case-study-dialog" ref={modalRef} tabIndex={-1}>
        {/* Modal Header */}
        <div className="case-study-header">
          <div className="case-study-title-wrap">
            <span className={`project-cat-tag ${project.tagClass}`} style={{ position: 'static' }}>
              {project.tag}
            </span>
            <h2 className="case-study-title" id="case-study-heading">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            className="resume-close-btn"
            onClick={onClose}
            aria-label="Close Case Study"
          >
            ✕
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="case-study-body">
          {/* Visual banner */}
          {project.image && (
            <div className="case-study-media">
              <img
                src={project.image}
                alt={project.thumbnailAlt || `${project.title} visual`}
                className="case-study-img"
              />
              {project.thumbnailIsIllustration && (
                <div className="case-study-badge-note">
                  🎨 Illustrative Project Concept / Visual Mockup
                </div>
              )}
            </div>
          )}

          {/* Quick Meta Grid */}
          <div className="case-study-meta-grid">
            <div className="case-study-meta-card">
              <span className="case-study-meta-label">Domain</span>
              <span className="case-study-meta-val">{project.category}</span>
            </div>
            <div className="case-study-meta-card">
              <span className="case-study-meta-label">Core Tech</span>
              <span className="case-study-meta-val">{project.tech.join(', ')}</span>
            </div>
            <div className="case-study-meta-card">
              <span className="case-study-meta-label">Repository Status</span>
              <span className="case-study-meta-val">
                {project.hasVerifiedCodeUrl ? 'Verified Public Repo' : 'Pending Repository Link'}
              </span>
            </div>
          </div>

          {/* Structured Case Study Sections */}
          <div className="case-study-sections">
            {/* 1. Problem Statement */}
            <div className="case-study-block">
              <h3 className="case-study-sec-title">
                <span className="case-study-icon">🎯</span> Problem Statement
              </h3>
              <p className="case-study-text">{project.caseStudy.problem}</p>
            </div>

            {/* 2. Tools & Stack */}
            <div className="case-study-block">
              <h3 className="case-study-sec-title">
                <span className="case-study-icon">🛠️</span> Tools &amp; Technologies
              </h3>
              <div className="case-study-tags">
                {project.caseStudy.toolsUsed.map(tool => (
                  <span key={tool} className="tech-tag" style={{ fontSize: '12px', padding: '4px 10px' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Approach & Methodology */}
            <div className="case-study-block">
              <h3 className="case-study-sec-title">
                <span className="case-study-icon">🧭</span> Analytical Approach &amp; Workflow
              </h3>
              <ul className="case-study-list">
                {project.caseStudy.approach.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {/* 4. Verified Output & Deliverables */}
            <div className="case-study-block">
              <h3 className="case-study-sec-title">
                <span className="case-study-icon">📊</span> Verified Output &amp; Deliverables
              </h3>
              <ul className="case-study-list">
                {project.caseStudy.verifiedOutput.map((out, idx) => (
                  <li key={idx}>{out}</li>
                ))}
              </ul>
            </div>

            {/* 5. What I Learned */}
            <div className="case-study-block learning">
              <h3 className="case-study-sec-title">
                <span className="case-study-icon">💡</span> Analyst Takeaway &amp; Key Learnings
              </h3>
              <p className="case-study-text">{project.caseStudy.whatILearned}</p>
            </div>
          </div>

          {/* Case Study Footer Actions */}
          <div className="case-study-footer">
            {project.hasVerifiedDemoUrl && project.viewUrl ? (
              <a
                href={project.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Launch Live App <IconExternal />
              </a>
            ) : (
              <span className="case-study-pending-link">
                ℹ️ Live demonstration hosted in project environment
              </span>
            )}

            {project.hasVerifiedCodeUrl && project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <IconGitHub /> View Repository
              </a>
            ) : (
              <span className="case-study-pending-link">
                🔒 Dedicated GitHub repo link pending verification
              </span>
            )}

            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              style={{ marginLeft: 'auto' }}
            >
              Close Breakdown
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onOpenCaseStudy,
}: {
  project: Project;
  onOpenCaseStudy: (p: Project) => void;
}) {
  return (
    <article className="project-card" id={project.id} aria-label={project.title}>
      <div className="project-thumb">
        {project.image ? (
          <img
            src={project.image}
            alt={project.thumbnailAlt || `${project.title} screenshot`}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '28px', opacity: 0.4 }}>📊</span>
            <span style={{ opacity: 0.5 }}>Analytics Project</span>
          </div>
        )}
        <span className={`project-cat-tag ${project.tagClass}`}>{project.tag}</span>
        {project.thumbnailIsIllustration && (
          <span className="project-illus-tag" title="Illustrative concept representation">
            Concept
          </span>
        )}
        <div className="project-thumb-overlay">
          <button
            type="button"
            className="btn btn-primary"
            style={{ fontSize: '12px', padding: '8px 14px' }}
            onClick={() => onOpenCaseStudy(project)}
          >
            Case Study Breakdown <IconArrow />
          </button>
        </div>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-objective-line">
          Objective: <span>{project.objective}</span>
        </p>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.tech.map(t => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <button
            type="button"
            className="project-link-btn primary"
            onClick={() => onOpenCaseStudy(project)}
            id={`${project.id}-case-study`}
          >
            Case Study <IconArrow />
          </button>

          {project.hasVerifiedDemoUrl && project.viewUrl ? (
            <a
              href={project.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
              id={`${project.id}-view`}
              title="Open Live Application"
            >
              Live Demo <IconExternal />
            </a>
          ) : project.hasVerifiedCodeUrl && project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
              id={`${project.id}-github`}
            >
              <IconGitHub /> Code
            </a>
          ) : (
            <button
              type="button"
              className="project-link-btn pending-link"
              onClick={() => onOpenCaseStudy(project)}
              title="Repo link pending verification"
            >
              Repo Pending
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const ref = useReveal();

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="section section-alt" aria-label="Projects section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="projects-header">
            <div>
              <div className="section-tag">Projects &amp; Case Studies</div>
              <h2 className="section-title">Verified Project Case Studies</h2>
              <p className="section-subtitle">
                Deep-dives into problem statements, analytical methodology, and verified outputs across sports analytics, machine learning, and BI.
              </p>
            </div>
          </div>

          <div className="projects-filters" role="tablist" aria-label="Filter projects">
            {FILTER_CATS.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
                id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid" role="tabpanel">
            {filtered.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpenCaseStudy={proj => setActiveCaseStudy(proj)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Project Case Study Modal */}
      <ProjectCaseStudyModal
        project={activeCaseStudy}
        isOpen={activeCaseStudy !== null}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}

// ── Sports Analytics Match Lab ──────────────────────────────
type MatchEventType = 'passes' | 'tackles' | 'shots' | 'aerials';

interface MatchEvent {
  id: number;
  type: MatchEventType;
  minute: string;
  player: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  endX?: number;
  endY?: number;
  success: boolean;
  desc: string;
}

const SAMPLE_MATCH_EVENTS: MatchEvent[] = [
  // Passes (Green or Red)
  { id: 1, type: 'passes', minute: "14'", player: 'No. 8 (CM)', x: 35, y: 50, endX: 68, endY: 28, success: true, desc: 'Progressive diagonal ball to LW' },
  { id: 2, type: 'passes', minute: "22'", player: 'No. 4 (CB)', x: 20, y: 65, endX: 52, endY: 72, success: true, desc: 'Line-breaking pass to RW' },
  { id: 3, type: 'passes', minute: "37'", player: 'No. 10 (AM)', x: 62, y: 48, endX: 84, endY: 45, success: true, desc: 'Through ball into penalty box' },
  { id: 4, type: 'passes', minute: "54'", player: 'No. 6 (DM)', x: 42, y: 35, endX: 50, endY: 20, success: false, desc: 'Intercepted lateral turnover' },
  { id: 5, type: 'passes', minute: "78'", player: 'No. 8 (CM)', x: 55, y: 52, endX: 88, endY: 70, success: true, desc: 'Switch of play to overlapping FB' },

  // Tackles
  { id: 6, type: 'tackles', minute: "09'", player: 'No. 6 (DM)', x: 40, y: 42, success: true, desc: 'Clean slide tackle in central transition' },
  { id: 7, type: 'tackles', minute: "28'", player: 'No. 3 (LB)', x: 26, y: 20, success: true, desc: 'Touchline defensive recovery' },
  { id: 8, type: 'tackles', minute: "61'", player: 'No. 4 (CB)', x: 18, y: 55, success: false, desc: 'Foul committed near box edge' },
  { id: 9, type: 'tackles', minute: "83'", player: 'No. 2 (RB)', x: 32, y: 82, success: true, desc: 'Interception & tackle on counter' },

  // Shots
  { id: 10, type: 'shots', minute: "18'", player: 'No. 9 (ST)', x: 86, y: 46, success: true, desc: 'Shot on target - Low bottom right corner (0.34 xG)' },
  { id: 11, type: 'shots', minute: "41'", player: 'No. 11 (LW)', x: 78, y: 30, success: false, desc: 'Curler from outside box - Blocked (0.08 xG)' },
  { id: 12, type: 'shots', minute: "72'", player: 'No. 10 (AM)', x: 89, y: 52, success: true, desc: 'Volley on target - Saved by keeper (0.42 xG)' },

  // Aerial Duels
  { id: 13, type: 'aerials', minute: "31'", player: 'No. 5 (CB)', x: 22, y: 48, success: true, desc: 'Defensive header clearance from corner' },
  { id: 14, type: 'aerials', minute: "49'", player: 'No. 9 (ST)', x: 50, y: 50, success: false, desc: 'Goal kick contest - duel lost' },
  { id: 15, type: 'aerials', minute: "88'", player: 'No. 5 (CB)', x: 16, y: 52, success: true, desc: 'Box aerial win under pressure' },
];

function SportsAnalyticsLab() {
  const [activeFilter, setActiveFilter] = useState<MatchEventType>('passes');
  const ref = useReveal();

  const events = SAMPLE_MATCH_EVENTS.filter(e => e.type === activeFilter);
  const successCount = events.filter(e => e.success).length;
  const accuracy = Math.round((successCount / events.length) * 100);

  return (
    <section id="lab" className="section" aria-label="Interactive Match Lab">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-tag">Match Lab</div>
          <h2 className="section-title">Interactive Sports Analytics Lab</h2>
          <p className="section-subtitle">
            Demonstrating sports match event logging, spatial mapping, and tactical metrics.
            Select an event category to filter live on-pitch coordinates and breakdown logs.
          </p>

          <div className="lab-container">
            <div className="lab-header">
              <div className="lab-title-group">
                <h3>
                  Sample Match Sequence: 90' Spatial Tracking
                  <span className="lab-badge">Public Sample Data</span>
                </h3>
                <p className="lab-disclaimer">
                  *Demonstration sandbox showcasing event logging methodology. Does not contain proprietary or confidential club data.
                </p>
              </div>

              <div className="lab-filter-row" role="group" aria-label="Event filters">
                {[
                  { key: 'passes', label: 'Pass Networks (5)' },
                  { key: 'tackles', label: 'Tackles & Duels (4)' },
                  { key: 'shots', label: 'Shot Locations (3)' },
                  { key: 'aerials', label: 'Aerial Contests (3)' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`lab-filter-btn ${activeFilter === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveFilter(tab.key as MatchEventType)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lab-body">
              <div className="lab-pitch-wrapper">
                {/* Tactical Football Pitch SVG */}
                <svg
                  viewBox="0 0 100 70"
                  className="lab-pitch-svg"
                  style={{ background: '#0d2818', border: '1px solid rgba(255,255,255,0.15)' }}
                  role="img"
                  aria-label="Tactical pitch event visualization"
                >
                  {/* Pitch markings */}
                  <rect x="0" y="0" width="100" height="70" fill="#0e2f1d" />
                  <rect x="3" y="3" width="94" height="64" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  {/* Halfway line & center circle */}
                  <line x1="50" y1="3" x2="50" y2="67" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  <circle cx="50" cy="35" r="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  <circle cx="50" cy="35" r="0.8" fill="rgba(255,255,255,0.6)" />
                  {/* Left Penalty Box */}
                  <rect x="3" y="17.5" width="16" height="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  <rect x="3" y="26" width="6" height="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  {/* Right Penalty Box */}
                  <rect x="81" y="17.5" width="16" height="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  <rect x="91" y="26" width="6" height="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

                  {/* Render Events */}
                  {events.map(ev => {
                    const scaledY = (ev.y / 100) * 64 + 3;
                    const scaledX = (ev.x / 100) * 94 + 3;
                    const color = ev.success ? '#10b981' : '#f59e0b';

                    if (ev.type === 'passes' && ev.endX !== undefined && ev.endY !== undefined) {
                      const endScaledX = (ev.endX / 100) * 94 + 3;
                      const endScaledY = (ev.endY / 100) * 64 + 3;
                      return (
                        <g key={ev.id}>
                          <line
                            x1={scaledX}
                            y1={scaledY}
                            x2={endScaledX}
                            y2={endScaledY}
                            stroke={color}
                            strokeWidth="1.2"
                            strokeDasharray={ev.success ? 'none' : '2,1.5'}
                            opacity="0.85"
                          />
                          <circle cx={scaledX} cy={scaledY} r="1.4" fill="#ffffff" />
                          <circle cx={endScaledX} cy={endScaledY} r="1.8" fill={color} />
                        </g>
                      );
                    }

                    return (
                      <g key={ev.id}>
                        <circle
                          cx={scaledX}
                          cy={scaledY}
                          r="3"
                          fill={color}
                          opacity="0.85"
                          stroke="#ffffff"
                          strokeWidth="0.6"
                        />
                        <text
                          x={scaledX}
                          y={scaledY - 4}
                          fontSize="2.4"
                          fill="#ffffff"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {ev.minute}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} /> Successful / On-target
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} /> Incomplete / Contested
                  </span>
                </div>
              </div>

              <div className="lab-panel">
                <div>
                  <div className="lab-stat-grid">
                    <div className="lab-stat-box">
                      <div className="lab-stat-label">Logged Events</div>
                      <div className="lab-stat-value">{events.length}</div>
                    </div>
                    <div className="lab-stat-box">
                      <div className="lab-stat-label">Success Rate</div>
                      <div className="lab-stat-value">{accuracy}<span>%</span></div>
                    </div>
                  </div>

                  <div className="lab-event-list-title">Match Event Stream</div>
                  <div className="lab-event-list">
                    {events.map(ev => (
                      <div key={ev.id} className={`lab-event-item ${ev.success ? 'success' : 'unsuccessful'}`}>
                        <div>
                          <div className="lab-event-desc">{ev.desc}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{ev.player}</div>
                        </div>
                        <span className="lab-event-time">{ev.minute}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <strong>Analyst Workflow:</strong> Match sequences are categorized with spatial timestamps to compute progressive passing index, territorial dominance, and expected performance metrics.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Education ───────────────────────────────────────────────
function Education() {
  const ref = useReveal();
  const { education } = RESUME_DATA;

  return (
    <section id="education" className="section" aria-label="Education section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-tag">Education</div>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            Formal education in analytics and business strategy, building a rigorous foundation in quantitative reasoning and data-informed decision-making.
          </p>

          <div className="education-grid">
            {education.map(edu => (
              <div key={edu.degree} className="edu-card">
                <div className="edu-icon">{edu.degree.includes('Master') ? '🎓' : '💻'}</div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-university">{edu.institution}</div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  {edu.specialization}{edu.score ? ` · ${edu.score}` : ''}
                </p>
                <div className="edu-meta">
                  <span className="edu-year"><IconCalendar /> {edu.year}</span>
                  <span className="edu-location"><IconLocation /> {edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Certifications Section ──────────────────────────────────
function Certifications() {
  const ref = useReveal();
  const { certifications } = RESUME_DATA;

  return (
    <section id="certifications" className="section section-alt" aria-label="Certifications section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-tag">Credentials</div>
          <h2 className="section-title">Verified Professional Certifications</h2>
          <p className="section-subtitle">
            Industry and institutional certifications validating technical competencies in data analysis, generative AI, machine learning, and BI visualization.
          </p>

          <div className="certifications-grid">
            {certifications.map(cert => (
              <div key={cert.id} className="cert-card">
                <div className="cert-header">
                  <div className="cert-icon-wrapper">
                    <span>{cert.icon}</span>
                  </div>
                  <div className="cert-badges">
                    <span className="cert-badge verified">
                      ✓ {cert.isDirectDocument ? 'Verified Document' : 'Online Verification'}
                    </span>
                    {cert.isDirectDocument && (
                      <span className="cert-badge direct-doc">Document File</span>
                    )}
                  </div>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-issuer">{cert.issuer}</div>

                <div className="cert-meta-list">
                  {cert.completionDate && (
                    <div className="cert-meta-item">
                      <IconCalendar />
                      <span><strong>Completion Date:</strong> {cert.completionDate}</span>
                    </div>
                  )}
                  {cert.duration && (
                    <div className="cert-meta-item">
                      <span>⏱️ <strong>Duration:</strong> {cert.duration}</span>
                    </div>
                  )}
                  {cert.credentialId && (
                    <div className="cert-meta-item">
                      <span>🏷️ <strong>Certificate ID:</strong> {cert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="cert-actions">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-view-btn"
                    id={`view-${cert.id}`}
                    title={cert.isDirectDocument ? 'View original certificate document in new tab' : 'Open official verification page in new tab'}
                  >
                    <span>{cert.isDirectDocument ? 'View Certificate Document' : 'Verify Online'}</span>
                    <IconExternal />
                  </a>

                  {cert.credentialId && (
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      ID: {cert.credentialId}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ──────────────────────────────────────────────
function CTABanner() {
  const ref = useReveal();
  return (
    <div className="cta-section">
      <div className="cta-bg">
        <img src={heroStadium} alt="Stadium background" aria-hidden="true" loading="lazy"/>
        <div className="cta-overlay"/>
      </div>
      <div className="cta-content reveal" ref={ref}>
        <h2 className="cta-title">Let's Work <span>Together</span></h2>
        <p className="cta-sub">
          Open to impactful opportunities in Sports Analytics, Data Analysis, and Business Intelligence.
          Let's connect and elevate performance with data.
        </p>
        <div className="cta-actions">
          <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} id="cta-contact-btn">
            Contact Me <IconArrow/>
          </button>
          <CVDropdown className="btn btn-ghost" alignRight={false} label="Download CV" />
        </div>
      </div>
    </div>
  );
}

// ── Contact ─────────────────────────────────────────────────
type FormState = { name: string; email: string; subject: string; message: string };
type FormStatus = '' | 'sending' | 'success' | 'error';

function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers or restricted permissions
      const el = document.createElement('textarea');
      el.value = RESUME_DATA.personal.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const mailtoUrl = `mailto:${RESUME_DATA.personal.email}?subject=${encodeURIComponent(form.subject || 'Sports Analytics Collaboration')}&body=${encodeURIComponent(`Hi Tejas,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.location.href = mailtoUrl;
    setStatus('success');
  };

  const CHANNELS = [
    {
      id: 'contact-email-link',
      icon: <IconEmail/>,
      label: 'Email',
      value: RESUME_DATA.personal.email,
      href: `mailto:${RESUME_DATA.personal.email}`,
    },
    {
      id: 'contact-linkedin-link',
      icon: <IconLinkedIn/>,
      label: 'LinkedIn',
      value: RESUME_DATA.personal.linkedinDisplay,
      href: RESUME_DATA.personal.linkedin,
    },
    {
      id: 'contact-github-link',
      icon: <IconGitHub/>,
      label: 'GitHub',
      value: RESUME_DATA.personal.githubDisplay,
      href: RESUME_DATA.personal.github,
    },
  ];

  return (
    <section id="contact" className="section" aria-label="Contact section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Open for sports analytics opportunities, match tagging inquiries, and collaborative data projects.
          </p>

          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-intro">
                I'm always open to discussing new opportunities, match tagging workflows,
                or sports data analytics projects. Drop me a direct email or connect through LinkedIn.
              </p>

              <div className="contact-channels">
                {CHANNELS.map(ch => (
                  <div key={ch.label} style={{ display: 'flex', flexDirection: 'column' }}>
                    <a id={ch.id} href={ch.href} className="contact-channel"
                      target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer">
                      <div className="channel-icon">{ch.icon}</div>
                      <div>
                        <div className="channel-label">{ch.label}</div>
                        <div className="channel-value">{ch.value}</div>
                      </div>
                    </a>
                    {ch.label === 'Email' && (
                      <button
                        type="button"
                        className={`copy-email-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopyEmail}
                        aria-label="Copy email address to clipboard"
                        title="Copy email to clipboard"
                      >
                        {copied ? <><IconCheck/> Copied to clipboard!</> : <><IconCopy/> One-click copy email</>}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                📍 {RESUME_DATA.personal.location} &bull; 📞 {RESUME_DATA.personal.phone}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-helper-note">
                <strong>Direct Dispatch:</strong> Submitting prepares a pre-filled draft in your default email client addressed directly to {RESUME_DATA.personal.email}.
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name *</label>
                  <input id="contact-name" className="form-input" type="text" name="name"
                    placeholder="Your name" value={form.name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email *</label>
                  <input id="contact-email" className="form-input" type="email" name="email"
                    placeholder="your@email.com" value={form.email} onChange={handleChange} required/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" className="form-input" type="text" name="subject"
                  placeholder="Sports Analytics / Collaboration" value={form.subject} onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea id="contact-message" className="form-textarea" name="message"
                  placeholder="Your message..." value={form.message} onChange={handleChange} required/>
              </div>

              <div className={`form-status ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}>
                {status === 'success' && "✓ Opened your email client with your message drafted to Tejas."}
                {status === 'error' && (!form.name || !form.email || !form.message
                  ? '✗ Please fill in all required fields (Name, Email, Message).'
                  : '⚠ Preparing email draft...')}
              </div>

              <button className="form-submit" type="submit" id="contact-submit-btn"
                disabled={status === 'sending'}>
                {status === 'sending' ? 'Opening email client…' : <><IconSend/> Send via Email Client</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-mark">TP</div>
            <div>
              <div className="footer-logo-name">Tejas Patil</div>
              <div className="footer-logo-title">Sports Data Analyst | Business Analytics</div>
            </div>
          </div>

          <div className="footer-nav" aria-label="Footer navigation">
            {NAV_LINKS.map(link => (
              <button key={link} className="footer-nav-link" onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Tejas Patil. All rights reserved. · Nashik, India
          </p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/tejas-patil-5967a3325/" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn" className="footer-social-link">
              <IconLinkedIn/>
            </a>
            <a href="https://github.com/tanmayy44" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub" className="footer-social-link">
              <IconGitHub/>
            </a>
            <a href="mailto:tejaspatil78787@gmail.com"
              aria-label="Email" className="footer-social-link">
              <IconEmail/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main App Component ──────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('tp_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tp_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app">
      {/* Skip to Content for Screen Readers & Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Reading Progress Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <SportsAnalyticsLab />
        <Projects />
        <Education />
        <Certifications />
        <CTABanner />
        <Contact />
      </main>

      <Footer />

      {/* Back to Top Button */}
      <button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <IconChevronUp />
      </button>
    </div>
  );
}
