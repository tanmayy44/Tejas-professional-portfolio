import { useEffect, useRef, useState, useCallback } from 'react';
import './components.css';

// ── Asset imports ───────────────────────────────────────────
import heroStadium from './assets/images/hero_stadium.jpg';
import projectFootball from './assets/images/project_football.jpg';
import projectHousePrice from './assets/images/project_house_price.jpg';
import projectHeartHealth from './assets/images/project_heart_health.jpg';
import projectMovies from './assets/images/project_movies.jpg';

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
const NAV_LINKS = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

function Navbar() {
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
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const handleCV = () => {
    window.open('./resume.pdf', '_blank');
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a className="navbar-logo" onClick={() => scrollTo('home')} href="#home" aria-label="Tejas Patil home">
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
            <button className="nav-cv-btn" onClick={handleCV} aria-label="Download CV">
              <IconDownload /> Download CV
            </button>
          </div>

          <button className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(link => (
          <button key={link} className={`mobile-nav-link ${active === link ? 'active' : ''}`}
            onClick={() => scrollTo(link)}>{link}</button>
        ))}
        <button className="mobile-cv-btn" onClick={handleCV}>
          <IconDownload /> Download CV
        </button>
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
            <span/> Sports Data Analyst | Business Analytics Professional
          </div>

          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">
            Tejas <span className="hero-name-accent">Patil.</span>
          </h1>

          <p className="hero-description">
            I turn sports and business data into actionable insights through match tagging,
            roster workflows, statistical modeling, and high-impact visual dashboards.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')} id="hero-explore-btn">
              Explore My Work <IconArrow />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')} id="hero-contact-btn">
              Contact Me
            </button>
            <a className="btn btn-outline-red" href="./resume.pdf" target="_blank" rel="noopener noreferrer" id="hero-cv-btn">
              <IconDownload /> Download CV
            </a>
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
              <div className="hero-stat-value">01<span></span></div>
              <div className="hero-stat-label">Sports Analyst (Spideo)</div>
            </div>
            <div>
              <div className="hero-stat-value">6<span>+</span></div>
              <div className="hero-stat-label">Analytics Projects</div>
            </div>
            <div>
              <div className="hero-stat-value">100<span>%</span></div>
              <div className="hero-stat-label">Data Quality &amp; Precision</div>
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
              <div className="about-image-placeholder" aria-label="Sports analytics badge">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 32c7.7 0 14-6.3 14-14S39.7 4 32 4 18 10.3 18 18s6.3 14 14 14zm0 7c-9.3 0-28 4.7-28 14v7h56v-7c0-9.3-18.7-14-28-14z"/>
                </svg>
                <span className="about-image-label">Tejas Sanjay Patil</span>
              </div>
              <div className="about-accent-badge">
                Sports<br/>Analytics<br/><span style={{color:'rgba(255,255,255,0.7)',fontSize:'11px'}}>Passion · Data · Results</span>
              </div>
            </div>

            <div className="about-text">
              <div>
                <div className="section-tag">About Me</div>
                <h2 className="section-title">A mix of analytics,<br/>sports &amp; problem solving.</h2>
              </div>

              <p>
                I am an <strong>MBA in Business Administration (Business Analytics)</strong> candidate at Sandip University, Nashik,
                and a <strong>Sports Analyst at Spideo</strong>. My day-to-day focus centers on sports match tagging,
                roster workflows, and maintaining rigorous data quality for professional sports analytics.
              </p>
              <p>
                Holding a <strong>Bachelor of Computer Applications in Data Analytics</strong> (CGPA 7.01), I connect statistical modeling
                with practical business intelligence using <strong>Python, MySQL, Power BI, Tableau, and Excel</strong>.
                I transform dense match logs and enterprise datasets into clean, actionable insights that empower strategic decisions.
              </p>

              <div className="about-attrs">
                {[
                  { icon: '⚽', label: 'Sports Tagging', sub: 'Match & roster workflows' },
                  { icon: '🎯', label: 'Data Quality Control', sub: 'Accuracy & pipeline integrity' },
                  { icon: '📊', label: 'BI & Dashboards', sub: 'Power BI & Tableau storytelling' },
                  { icon: '🤖', label: 'Machine Learning', sub: 'Predictive modeling in Python' },
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
                <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} id="about-contact-btn">
                  Get In Touch <IconArrow />
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
                  <div className="exp-company">Spideo (MNC)</div>
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
type Project = {
  id: string;
  title: string;
  category: string;
  tag: string;
  tagClass: string;
  image: string | null;
  objective: string;
  description: string;
  tech: string[];
  viewUrl: string | null;
  githubUrl: string | null;
};

const PROJECTS: Project[] = [
  {
    id: 'proj-curriculab',
    title: 'CurricuLab — Study Management Platform',
    category: 'Full-Stack & AI',
    tag: 'Full-Stack & AI',
    tagClass: 'tag-sports',
    image: projectFootball,
    objective: 'Build an AI-powered student-centric study management system.',
    description: 'Collaboratively engineered an interactive platform featuring Supabase database integration, LLM APIs for AI academic assistance, and Google Classroom API synchronization.',
    tech: ['Python', 'Supabase', 'LLM APIs', 'Google Classroom API'],
    viewUrl: 'https://curriculab-sj6g.onrender.com/',
    githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
  },
  {
    id: 'proj-football',
    title: 'Football Match Analysis & Passing Networks',
    category: 'Sports Analytics',
    tag: 'Sports Analytics',
    tagClass: 'tag-sports',
    image: projectFootball,
    objective: 'Analyse match event logs to discover tactical patterns and player performance.',
    description: 'Explored football match events using Python and visualization libraries to plot passing networks, spatial heat maps, and player possession metrics.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Sports Analytics'],
    viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
    githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
  },
  {
    id: 'proj-house',
    title: 'House Price Prediction Model',
    category: 'Machine Learning',
    tag: 'Machine Learning',
    tagClass: 'tag-ml',
    image: projectHousePrice,
    objective: 'Predict residential property values using supervised regression models.',
    description: 'Engineered multi-variable features and trained regression algorithms in Scikit-learn with rigorous cross-validation and feature importance evaluation.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Regression'],
    viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
    githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
  },
  {
    id: 'proj-heart',
    title: 'Heart Health Biometric Data Analysis',
    category: 'Data Analysis',
    tag: 'Health Analytics',
    tagClass: 'tag-health',
    image: projectHeartHealth,
    objective: 'Perform exploratory analysis on cardiovascular health data to identify risk factors.',
    description: 'Conducted exploratory data analysis on cardiovascular datasets, analyzing correlations between blood pressure, cholesterol, and health outcomes.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'EDA'],
    viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
    githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
  },
  {
    id: 'proj-bi-sales',
    title: 'Executive BI & Sales Analytics Dashboard',
    category: 'Business Intelligence',
    tag: 'Business Analytics',
    tagClass: 'tag-bi',
    image: projectMovies,
    objective: 'Build a multi-dimensional Power BI dashboard for organizational KPI visibility.',
    description: 'Created dynamic executive dashboards with DAX calculations and data modeling to deliver real-time KPI tracking, revenue trends, and departmental insights.',
    tech: ['Power BI', 'Excel', 'DAX', 'SQL', 'Data Visualisation'],
    viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
    githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
  },
  {
    id: 'proj-movies',
    title: 'Media & Streaming Trends Analytics',
    category: 'Business Intelligence',
    tag: 'Media Analytics',
    tagClass: 'tag-media',
    image: projectMovies,
    objective: 'Visualise viewership ratings, genre popularity, and platform performance.',
    description: 'Analyzed streaming catalog trends and rating distributions using Power BI and Excel dashboards to visualize audience engagement patterns.',
    tech: ['Power BI', 'Excel', 'DAX', 'Data Visualisation'],
    viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
    githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
  },
];

const FILTER_CATS = ['All', 'Sports Analytics', 'Machine Learning', 'Business Intelligence', 'Data Analysis'];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.id} aria-label={project.title}>
      <div className="project-thumb">
        {project.image ? (
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy"/>
        ) : (
          <div style={{
            width:'100%', height:'100%', background:'var(--bg-card)',
            display:'flex', alignItems:'center', justifyContent:'center',
            flexDirection:'column', gap:'8px', color:'var(--text-secondary)',
            fontSize:'12px', padding:'16px', textAlign:'center',
          }}>
            <span style={{fontSize:'28px', opacity:0.4}}>📊</span>
            <span style={{opacity:0.5}}>Analytics Project</span>
          </div>
        )}
        <span className={`project-cat-tag ${project.tagClass}`}>{project.tag}</span>
        <div className="project-thumb-overlay">
          {project.viewUrl && (
            <a href={project.viewUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{fontSize:'12px',padding:'8px 14px'}}>
              View Project <IconExternal/>
            </a>
          )}
        </div>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc" style={{fontSize:'12px',color:'var(--accent)',fontWeight:600,marginBottom:'-4px'}}>
          Objective: <span style={{color:'var(--text-secondary)',fontWeight:400}}>{project.objective}</span>
        </p>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>

        <div className="project-actions">
          {project.viewUrl && (
            <a href={project.viewUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn primary" id={`${project.id}-view`}>
              {project.viewUrl.includes('render.com') ? 'Live App' : 'View Project'} <IconArrow/>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn" id={`${project.id}-github`}>
              <IconGitHub/> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [filter, setFilter] = useState('All');
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
              <div className="section-tag">Projects</div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Real-world applications across sports analytics, machine learning, and business intelligence.</p>
            </div>
          </div>

          <div className="projects-filters" role="tablist" aria-label="Filter projects">
            {FILTER_CATS.map(cat => (
              <button key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                role="tab" aria-selected={filter === cat}
                id={`filter-${cat.replace(/\s+/g,'-').toLowerCase()}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid" role="tabpanel">
            {filtered.map(p => <ProjectCard key={p.id} project={p}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Education & Certifications ──────────────────────────────
const CERTIFICATIONS = [
  {
    title: 'Data Analyst Certificate',
    issuer: 'Physics Wallah (PW Skills)',
    url: 'https://pwskills.com/learn/certificate/8d99c2f3-38db-42de-9faa-f9abde9f366f',
    icon: '📊',
  },
  {
    title: 'Generative AI Specialization',
    issuer: 'Sixladders Completion Certificate',
    url: 'https://drive.google.com/file/d/1Ayj9zpOZeUZc5lqndEjZdOcYiyXvfsd-/view?usp=sharing',
    icon: '🤖',
  },
  {
    title: 'Power BI Training Program',
    issuer: 'Rubicon Skill Development PVT. LTD',
    url: 'https://drive.google.com/file/d/1iXE5qB5HfknPRDMRHjfifrIA8ZCLZDju/view?usp=sharing',
    icon: '📈',
  },
  {
    title: 'Machine Learning (Orange Tool)',
    issuer: 'School of Machine Learning Autonomous Institute',
    url: 'https://drive.google.com/file/d/1fbML3FbijJ8ZpFOQjWkALKI-Y920ugwB/view?usp=sharing',
    icon: '⚙️',
  },
];

function Education() {
  const ref = useReveal();
  return (
    <section id="education" className="section" aria-label="Education section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-tag">Education &amp; Credentials</div>
          <h2 className="section-title">Academic Background &amp; Certifications</h2>
          <p className="section-subtitle">Formal education in analytics paired with industry-verified professional credentials.</p>

          <div className="education-grid">
            <div className="edu-card">
              <div className="edu-icon">🎓</div>
              <div className="edu-degree">Master of Business Administration (MBA)</div>
              <div className="edu-university">Sandip University, Nashik</div>
              <p style={{fontSize:'12.5px',color:'var(--text-secondary)',marginBottom:'10px'}}>
                Specialization in Business Analytics &amp; Strategic Decision-Making
              </p>
              <div className="edu-meta">
                <span className="edu-year"><IconCalendar/> 2025 – 2027</span>
                <span className="edu-location"><IconLocation/> Nashik, India</span>
              </div>
            </div>

            <div className="edu-card">
              <div className="edu-icon">💻</div>
              <div className="edu-degree">Bachelor of Computer Applications (BCA)</div>
              <div className="edu-university">Sandip University, Nashik</div>
              <p style={{fontSize:'12.5px',color:'var(--text-secondary)',marginBottom:'10px'}}>
                Specialization in Data Analytics · CGPA: 7.01
              </p>
              <div className="edu-meta">
                <span className="edu-year"><IconCalendar/> 2022 – 2025</span>
                <span className="edu-location"><IconLocation/> Nashik, India</span>
              </div>
            </div>
          </div>

          <div style={{marginTop:'48px'}}>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.2rem',marginBottom:'18px',color:'var(--text-primary)'}}>
              Verified Professional Certifications
            </h3>
            <div className="education-grid" style={{marginTop:'0'}}>
              {CERTIFICATIONS.map(cert => (
                <a key={cert.title} href={cert.url} target="_blank" rel="noopener noreferrer" className="edu-card" style={{textDecoration:'none'}}>
                  <div className="edu-icon">{cert.icon}</div>
                  <div className="edu-degree" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    {cert.title}
                    <IconExternal/>
                  </div>
                  <div className="edu-university">{cert.issuer}</div>
                  <div className="edu-meta">
                    <span className="edu-year" style={{color:'var(--accent)',fontWeight:600}}>✓ Verified Credential (Click to View)</span>
                  </div>
                </a>
              ))}
            </div>
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
          <a className="btn btn-ghost" href="./resume.pdf" target="_blank" rel="noopener noreferrer" id="cta-cv-btn">
            <IconDownload/> Download CV
          </a>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus('error'); return; }
    setStatus('sending');
    const mailtoUrl = `mailto:tejaspatil78787@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Tejas,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.location.href = mailtoUrl;
    setStatus('success');
  };

  const CHANNELS = [
    {
      id: 'contact-email-link',
      icon: <IconEmail/>,
      label: 'Email',
      value: 'tejaspatil78787@gmail.com',
      href: 'mailto:tejaspatil78787@gmail.com',
    },
    {
      id: 'contact-linkedin-link',
      icon: <IconLinkedIn/>,
      label: 'LinkedIn',
      value: 'linkedin.com/in/tejas-patil-5967a3325',
      href: 'https://www.linkedin.com/in/tejas-patil-5967a3325/',
    },
    {
      id: 'contact-github-link',
      icon: <IconGitHub/>,
      label: 'GitHub',
      value: 'github.com/tanmayy44',
      href: 'https://github.com/tanmayy44',
    },
  ];

  return (
    <section id="contact" className="section" aria-label="Contact section">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Feel free to reach out for sports analytics roles, data inquiries, or collaborations.
          </p>

          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-intro">
                I'm always open to discussing new opportunities, match tagging workflows,
                or sports data analytics projects. Drop me a message and I'll get back to you promptly.
              </p>
              <div className="contact-channels">
                {CHANNELS.map(ch => (
                  <a key={ch.label} id={ch.id} href={ch.href} className="contact-channel"
                    target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer">
                    <div className="channel-icon">{ch.icon}</div>
                    <div>
                      <div className="channel-label">{ch.label}</div>
                      <div className="channel-value">{ch.value}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{marginTop:'12px',color:'var(--text-secondary)',fontSize:'13px'}}>
                📍 Nashik, Maharashtra, India · 📞 +91 9673662750
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input id="contact-name" className="form-input" type="text" name="name"
                    placeholder="Your name" value={form.name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
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
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" className="form-textarea" name="message"
                  placeholder="Your message..." value={form.message} onChange={handleChange} required/>
              </div>

              <div className={`form-status ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}>
                {status === 'success' && "✓ Opening your email client to send message to Tejas..."}
                {status === 'error' && (!form.name || !form.email || !form.message
                  ? '✗ Please fill in all required fields.'
                  : '⚠ Opening email client...')}
              </div>

              <button className="form-submit" type="submit" id="contact-submit-btn"
                disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : <><IconSend/> Send Message</>}
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
  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
