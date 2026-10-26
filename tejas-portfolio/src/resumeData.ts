// Single Source of Truth for Tejas Patil's Profile & Dynamic CV Generation
// Any changes made here immediately update the website sections AND the live generated PDF / DOCX resumes!

export interface EducationItem {
  degree: string;
  institution: string;
  specialization: string;
  year: string;
  location: string;
  score?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  duties: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  tagClass: string;
  objective: string;
  description: string;
  tech: string[];
  viewUrl: string | null;
  githubUrl: string | null;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  url: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon: string }[];
}

export const RESUME_DATA = {
  personal: {
    name: 'Tejas Patil',
    title: 'Sports Data Analyst | Business Analytics Professional',
    email: 'tejaspatil78787@gmail.com',
    phone: '+91 9356619163',
    location: 'Nashik, Maharashtra, India',
    linkedin: 'https://www.linkedin.com/in/tejas-patil-5967a3325/',
    linkedinDisplay: 'linkedin.com/in/tejas-patil-5967a3325',
    github: 'https://github.com/tanmayy44',
    githubDisplay: 'github.com/tanmayy44',
    summary: 'Proactive MBA candidate in Business Analytics and Bachelor of Computer Applications graduate with hands-on expertise in sports match tagging, roster workflows, statistical analysis, and interactive dashboard storytelling using Python, SQL, Power BI, and Tableau. Currently contributing as a Sports Analyst at Spiideo, ensuring data quality, match integrity, and analytical fidelity across high-volume athletic performance data pipelines.'
  },

  experience: [
    {
      role: 'Sports Analyst',
      company: 'Spiideo',
      location: 'Nashik, India',
      period: 'Jun 2026 – Present',
      badge: 'Current Role',
      duties: [
        'Execute sports match tagging and roster-related workflows to power high-fidelity sports analytics and tactical breakdowns.',
        'Maintain rigorous data quality, verification protocols, and precision across high-volume structured match information.',
        'Analyze athletic event data and collaborate with operational teams to streamline roster data pipelines and ingestion.',
        'Uphold strict client and proprietary sports data confidentiality standards and operational SLAs.'
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: 'Master of Business Administration (MBA)',
      institution: 'Sandip University, Nashik',
      specialization: 'Specialization in Business Analytics & Strategic Decision-Making',
      year: '2025 – 2027',
      location: 'Nashik, India'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Sandip University, Nashik',
      specialization: 'Specialization in Data Analytics',
      score: 'CGPA: 7.01',
      year: '2022 – 2025',
      location: 'Nashik, India'
    }
  ] as EducationItem[],

  skillGroups: [
    {
      title: 'Programming & Data Science',
      skills: [
        { name: 'Python', icon: '🐍' },
        { name: 'Pandas', icon: '🐼' },
        { name: 'NumPy', icon: '🔢' },
        { name: 'Matplotlib', icon: '📊' },
        { name: 'Scikit-learn', icon: '🤖' }
      ]
    },
    {
      title: 'Business Intelligence & Storytelling',
      skills: [
        { name: 'Power BI', icon: '📊' },
        { name: 'Tableau', icon: '📈' },
        { name: 'Microsoft Excel', icon: '📗' },
        { name: 'DAX & Modeling', icon: '📉' }
      ]
    },
    {
      title: 'Databases & Cloud',
      skills: [
        { name: 'MySQL', icon: '🗄️' },
        { name: 'SQL Querying', icon: '⚡' },
        { name: 'AWS Cloud', icon: '☁️' }
      ]
    },
    {
      title: 'Sports Analytics & Operations',
      skills: [
        { name: 'Match Event Tagging', icon: '⚽' },
        { name: 'Roster Workflows', icon: '📋' },
        { name: 'Data Quality Control', icon: '🛡️' },
        { name: 'Tactical Analysis', icon: '🧭' }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'proj-curriculab',
      title: 'CurricuLab — Study Management Platform',
      category: 'Full-Stack & AI',
      tag: 'Full-Stack & AI',
      tagClass: 'tag-sports',
      objective: 'Build an AI-powered student-centric study management system.',
      description: 'Collaboratively engineered an interactive platform featuring Supabase database integration, LLM APIs for AI academic assistance, and Google Classroom API synchronization.',
      tech: ['Python', 'Supabase', 'LLM APIs', 'Google Classroom API'],
      viewUrl: 'https://curriculab-sj6g.onrender.com/',
      githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio'
    },
    {
      id: 'proj-football',
      title: 'Football Match Analysis & Passing Networks',
      category: 'Sports Analytics',
      tag: 'Sports Analytics',
      tagClass: 'tag-sports',
      objective: 'Analyse match event logs to discover tactical patterns and player performance.',
      description: 'Explored football match events using Python and visualization libraries to plot passing networks, spatial heat maps, and player possession metrics.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Sports Analytics'],
      viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
      githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio'
    },
    {
      id: 'proj-house',
      title: 'House Price Prediction Model',
      category: 'Machine Learning',
      tag: 'Machine Learning',
      tagClass: 'tag-ml',
      objective: 'Predict residential property values using supervised regression models.',
      description: 'Engineered multi-variable features and trained regression algorithms in Scikit-learn with rigorous cross-validation and feature importance evaluation.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Regression'],
      viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
      githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio'
    },
    {
      id: 'proj-heart',
      title: 'Heart Health Biometric Data Analysis',
      category: 'Data Analysis',
      tag: 'Health Analytics',
      tagClass: 'tag-health',
      objective: 'Perform exploratory analysis on cardiovascular health data to identify risk factors.',
      description: 'Conducted exploratory data analysis on cardiovascular datasets, analyzing correlations between blood pressure, cholesterol, and health outcomes.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'EDA'],
      viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
      githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio'
    },
    {
      id: 'proj-bi-sales',
      title: 'Executive BI & Sales Analytics Dashboard',
      category: 'Business Intelligence',
      tag: 'Business Analytics',
      tagClass: 'tag-bi',
      objective: 'Create dynamic multi-page interactive dashboards for operational insights.',
      description: 'Built drill-down financial and operational dashboards in Power BI and Tableau with advanced DAX measures, automated KPIs, and trend visual storytelling.',
      tech: ['Power BI', 'Tableau', 'DAX', 'Excel'],
      viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
      githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio'
    },
    {
      id: 'proj-movies',
      title: 'IMDb Movie Performance & Trends Analysis',
      category: 'Data Analysis',
      tag: 'Entertainment Analytics',
      tagClass: 'tag-analysis',
      objective: 'Analyse box office revenue, genre popularity, and rating distributions.',
      description: 'Processed film metadata to unearth correlations between budget, runtime, director influence, and audience reception using statistical data visualisations.',
      tech: ['Python', 'Pandas', 'Seaborn', 'Statistical Analysis'],
      viewUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio',
      githubUrl: 'https://github.com/tanmayy44/Tejas-professional-portfolio'
    }
  ] as ProjectItem[],

  certifications: [
    {
      title: 'Power BI Job Simulation',
      issuer: 'PwC Switzerland / Forage',
      url: 'https://drive.google.com/file/d/15M0i-u4f56U18c9yTvh0JcTfqjC9mR1p/view?usp=sharing',
      icon: '📊'
    },
    {
      title: 'Generative AI Specialization',
      issuer: 'Sixladders Completion Certificate',
      url: 'https://drive.google.com/file/d/1Ayj9zpOZeUZc5lqndEjZdOcYiyXvfsd-/view?usp=sharing',
      icon: '🤖'
    },
    {
      title: 'Power BI Training Program',
      issuer: 'Rubicon Skill Development PVT. LTD',
      url: 'https://drive.google.com/file/d/1iXE5qB5HfknPRDMRHjfifrIA8ZCLZDju/view?usp=sharing',
      icon: '📈'
    },
    {
      title: 'Machine Learning (Orange Tool)',
      issuer: 'School of Machine Learning Autonomous Institute',
      url: 'https://drive.google.com/file/d/1fbML3FbijJ8ZpFOQjWkALKI-Y920ugwB/view?usp=sharing',
      icon: '⚙️'
    }
  ] as CertificationItem[]
};
