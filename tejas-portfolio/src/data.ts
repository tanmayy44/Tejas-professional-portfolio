export type Project = {
  number: string;
  category: string;
  name: string;
  description: string;
  chips: string[];
  href: string;
  linkText?: string;
  visual: "gauge" | "heatmap" | "chat";
};

export type Certification = {
  title: string;
  issuer: string;
  url: string;
};

export const portfolio = {
  name: "Tejas Patil",
  fullName: "Tejas Sanjay Patil",
  firstName: "TEJAS",
  role: "SPORTS DATA ANALYST · BUSINESS ANALYTICS",
  tagline: [
    "Read the match.",
    "Find the signal.",
    "Elevate decision-making.",
  ],
  intro:
    "Sports Data Analyst and Business Analytics professional specializing in sports match tagging, roster workflows, data quality control, Python, SQL, Power BI, and Tableau — translating sports metrics and business operations into actionable, high-impact decisions.",
  manifesto:
    "Quality analysis bridges the gap between raw data and decisive action. Whether tagging match events, structuring roster workflows, or building predictive models, precision and integrity are non-negotiable. Curious by default. Rigorous by discipline. Dedicated to continuous learning.",
  stats: [
    { value: "01", suffix: "", label: "Sports analyst role (Spiideo)" },
    { value: "04", suffix: "", label: "Analytics specializations" },
    { value: "100", suffix: "%", label: "Commitment to data integrity" },
  ],
  projects: [
    {
      number: "01",
      category: "FULL-STACK ANALYTICS & AI",
      name: "CURRICULAB\nSTUDY PLATFORM",
      description: "Student-centric study management system featuring Supabase database integration, LLM APIs for interactive academic guidance, and Google Classroom API synchronization.",
      chips: ["PYTHON", "SUPABASE", "LLM APIS", "GOOGLE CLASSROOM API", "SYSTEM DESIGN"],
      href: "https://curriculab-sj6g.onrender.com/",
      linkText: "View Live Application ↗",
      visual: "chat",
    },
    {
      number: "02",
      category: "PREDICTIVE MODELING",
      name: "HOUSE PRICE\nPREDICTION",
      description: "Comprehensive machine learning regression pipeline evaluating residential property metrics with exploratory analysis, feature engineering, and model validation.",
      chips: ["PYTHON", "PANDAS", "SCIKIT-LEARN", "MATPLOTLIB", "NUMPY"],
      href: "https://github.com/tejasp50/tejas-professional-portfolio",
      linkText: "View Repository ↗",
      visual: "gauge",
    },
    {
      number: "03",
      category: "HEALTHCARE ANALYTICS",
      name: "HEART HEALTH\nANALYSIS",
      description: "Exploratory biometric data analysis uncovering clinical risk correlations and patient health indicators through statistical distributions and visual analytics.",
      chips: ["PYTHON", "PANDAS", "NUMPY", "SEABORN", "DATA VIZ"],
      href: "https://github.com/tejasp50/tejas-professional-portfolio",
      linkText: "View Analysis ↗",
      visual: "heatmap",
    },
    {
      number: "04",
      category: "BUSINESS INTELLIGENCE",
      name: "POWER BI\nEXECUTIVE SUITE",
      description: "Interactive executive analytics dashboard delivering real-time operational KPI tracking, multi-dimensional DAX calculations, and departmental performance visibility.",
      chips: ["POWER BI", "EXCEL", "DAX", "SQL", "DATA STORYTELLING"],
      href: "https://github.com/tejasp50/tejas-professional-portfolio",
      linkText: "View Dashboard ↗",
      visual: "heatmap",
    },
  ] satisfies Project[],
  journey: [
    {
      year: "2026–Present",
      title: "SPORTS DATA ANALYST",
      organisation: "Spiideo · Sports match tagging, roster workflows & analytics",
      details: "Executing match tagging, roster-related workflows, and sports data quality assurance with strict confidentiality.",
    },
    {
      year: "2025–2027",
      title: "MBA · BUSINESS ADMINISTRATION",
      organisation: "Sandip University · Nashik (Business Analytics)",
      details: "Postgraduate focus on business intelligence, decision modeling, and organizational analytics.",
    },
    {
      year: "2022–2025",
      title: "BACHELOR OF COMPUTER APPLICATIONS (BCA)",
      organisation: "Sandip University · Nashik (Data Analytics, CGPA 7.01)",
      details: "Foundation in computer science, database architecture, and statistical programming.",
    },
  ],
  skills: [
    "PYTHON", "SQL / MYSQL", "POWER BI", "TABLEAU", "EXCEL", "PANDAS", "NUMPY", "MATPLOTLIB",
    "SCIKIT-LEARN", "AWS", "SPORTS MATCH TAGGING", "ROSTER WORKFLOWS", "DATA QUALITY CONTROL",
    "ETL PIPELINES", "BUSINESS INTELLIGENCE", "STATISTICAL MODELING",
  ],
  codingStats: [
    { value: "PY", suffix: "↗", label: "Python & Analysis" },
    { value: "SQL", suffix: "★", label: "Relational Queries" },
    { value: "BI", suffix: "+", label: "Power BI & Tableau" },
    { value: "ML", suffix: "★", label: "Scikit-Learn & Models" },
  ],
  certifications: [
    {
      title: "DATA ANALYST CERTIFICATE",
      issuer: "PHYSICS WALLAH (PW SKILLS)",
      url: "https://pwskills.com/learn/certificate/8d99c2f3-38db-42de-9faa-f9abde9f366f",
    },
    {
      title: "GENERATIVE AI SPECIALIZATION",
      issuer: "SIXLADDERS · COMPLETION",
      url: "https://drive.google.com/file/d/1Ayj9zpOZeUZc5lqndEjZdOcYiyXvfsd-/view?usp=sharing",
    },
    {
      title: "POWER BI TRAINING PROGRAM",
      issuer: "RUBICON SKILL DEVELOPMENT PVT. LTD",
      url: "https://drive.google.com/file/d/1iXE5qB5HfknPRDMRHjfifrIA8ZCLZDju/view?usp=sharing",
    },
    {
      title: "MACHINE LEARNING (ORANGE TOOL)",
      issuer: "SCHOOL OF MACHINE LEARNING",
      url: "https://drive.google.com/file/d/1fbML3FbijJ8ZpFOQjWkALKI-Y920ugwB/view?usp=sharing",
    },
  ] satisfies Certification[],
  phone: "+91 9673662750",
  location: "Nashik, Maharashtra, India",
  email: "tejaspatil78787@gmail.com",
  github: "https://github.com/tejasp50",
  repoUrl: "https://github.com/tejasp50/tejas-professional-portfolio",
  linkedin: "https://www.linkedin.com/in/tejas-patil-5967a3325/",
  resume: "./resume.pdf",
};

export const sectionOrder = [
  { id: "hero", label: "Hello" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Toolkit" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;