// Single Source of Truth for Tejas Patil's Profile & Dynamic CV Generation
// Any changes made here immediately update:
// 1. The website sections (Hero, About, Skills, Experience, Education, Projects, Certifications)
// 2. The interactive in-browser Résumé Preview Modal
// 3. The generated ATS-compliant PDF
// 4. The generated native Microsoft Word (.docx) file

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

export interface ProjectCaseStudy {
  problem: string;
  toolsUsed: string[];
  approach: string[];
  verifiedOutput: string[];
  whatILearned: string;
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
  hasVerifiedCodeUrl?: boolean;
  hasVerifiedDemoUrl?: boolean;
  thumbnailIsIllustration?: boolean;
  thumbnailAlt?: string;
  caseStudy: ProjectCaseStudy;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  url: string;
  icon: string;
  credentialId?: string;
  completionDate?: string;
  duration?: string;
  isDirectDocument?: boolean;
  localDocPath?: string;
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
    phone: '+91 9673662750',
    location: 'Nashik, Maharashtra, India',
    linkedin: 'https://www.linkedin.com/in/tejas-patil-5967a3325/',
    linkedinDisplay: 'linkedin.com/in/tejas-patil-5967a3325',
    github: 'https://github.com/tanmayy44',
    githubDisplay: 'github.com/tanmayy44',
    summary: 'Master\'s student in Business Analytics and Bachelor of Computer Applications graduate with hands-on expertise in sports match tagging, roster workflows, statistical modeling, and data visualization using Python, SQL, Power BI, and Tableau. Currently contributing as a Sports Analyst at Spiideo, ensuring data quality, match integrity, and analytical fidelity across high-volume athletic performance data pipelines.'
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
      githubUrl: null, // Pending verification from user
      hasVerifiedCodeUrl: false,
      hasVerifiedDemoUrl: true,
      thumbnailIsIllustration: true,
      thumbnailAlt: 'CurricuLab study management platform UI concept showing weekly planner, course progress, and AI assistant',
      caseStudy: {
        problem: 'Students often struggle to balance multiple course schedules, assignments, and study materials scattered across different platforms without centralized progress visibility.',
        toolsUsed: ['Python', 'Supabase (PostgreSQL)', 'LLM APIs', 'Google Classroom API', 'Render Deployment'],
        approach: [
          'Engineered backend synchronization logic to ingest course and assignment data via the Google Classroom API.',
          'Configured Supabase PostgreSQL tables and authentication for secure user and course record management.',
          'Integrated LLM API endpoints to provide context-aware academic study assistance and schedule suggestions.',
          'Deployed the web application to Render with automated builds and environment secret protection.'
        ],
        verifiedOutput: [
          'Live deployed web service accessible at curriculab-sj6g.onrender.com.',
          'Unified student dashboard featuring calendar scheduling, assignment tracking, and course progress.',
          'Secure database schema handling student profiles and synced course items.'
        ],
        whatILearned: 'Gained hands-on experience orchestrating multi-service web architectures, managing external API rate limits and authentication flows, and deploying full-stack web applications.'
      }
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
      viewUrl: null,
      githubUrl: null, // Pending specific repo link
      hasVerifiedCodeUrl: false,
      hasVerifiedDemoUrl: false,
      thumbnailIsIllustration: true,
      thumbnailAlt: 'Tactical football match passing network analysis and event visualization graphic (Sample match data)',
      caseStudy: {
        problem: 'Raw sports match event logs (passes, duels, tackles) are difficult for coaching staff and analysts to interpret without structured spatial and tactical aggregation.',
        toolsUsed: ['Python', 'Pandas', 'Matplotlib', 'mplsoccer', 'NumPy'],
        approach: [
          'Cleaned and structured pitch event coordinates (x, y) from match event datasets.',
          'Calculated passing matrix dyads and link weights between player positions to map team build-up structure.',
          'Plotted pitch visualizations including passing networks, directional pass arrows, and defensive action zones.',
          'Aggregated individual player metrics including pass completion rates under sample match conditions.'
        ],
        verifiedOutput: [
          'Reproducible Python analysis pipeline transforming tabular event logs into tactical pitch plots.',
          'Passing network diagrams revealing central playmaker connectivity and team progression corridors.',
          'Interactive match lab demonstration integrated into this portfolio with sample event data.'
        ],
        whatILearned: 'Deepened domain expertise in spatial pitch geometry, event tagging structures, and translating raw coordinate data into actionable tactical intelligence.'
      }
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
      viewUrl: null,
      githubUrl: null, // Pending specific repo link
      hasVerifiedCodeUrl: false,
      hasVerifiedDemoUrl: false,
      thumbnailIsIllustration: true,
      thumbnailAlt: 'House price regression model feature correlation and evaluation visual concept',
      caseStudy: {
        problem: 'Real estate pricing depends on numerous interrelated numerical and categorical attributes, requiring a statistical model to estimate property valuations accurately.',
        toolsUsed: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
        approach: [
          'Performed exploratory data analysis to inspect distributions, skewness, and outliers in housing variables.',
          'Preprocessed data using one-hot encoding for categorical variables and feature scaling for continuous numeric attributes.',
          'Trained and evaluated multiple regression algorithms including Linear Regression, Ridge, and Tree-based models.',
          'Measured performance using Root Mean Squared Error (RMSE) and R-squared metrics with cross-validation splits.'
        ],
        verifiedOutput: [
          'End-to-end data processing and model training pipeline in Python.',
          'Ranked feature importance breakdown highlighting key price drivers (square footage, location, overall quality).',
          'Documented evaluation metrics across baseline and tuned regression estimators.'
        ],
        whatILearned: 'Solidified fundamentals of supervised learning pipelines, data leakage prevention, feature engineering, and regression residual diagnostics.'
      }
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
      viewUrl: null,
      githubUrl: null, // Pending specific repo link
      hasVerifiedCodeUrl: false,
      hasVerifiedDemoUrl: false,
      thumbnailIsIllustration: true,
      thumbnailAlt: 'Heart health biometric data analysis charts and biometric distribution visual concept',
      caseStudy: {
        problem: 'Identifying key clinical biometric indicators associated with cardiovascular risk requires rigorous exploratory analysis and correlation assessment.',
        toolsUsed: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
        approach: [
          'Cleaned clinical biometric records, handling missing entries and validating normal physiological ranges.',
          'Calculated descriptive statistical summaries across age brackets, resting blood pressure, and serum cholesterol levels.',
          'Generated correlation heatmaps and distribution boxplots to contrast patient cohorts.',
          'Synthesized analytical observations into clear graphical takeaways on biometric distributions.'
        ],
        verifiedOutput: [
          'Statistical EDA notebook containing correlation matrices and comparative distributions.',
          'Visual summaries detailing relationship between age cohorts, cholesterol tiers, and biometric risk markers.'
        ],
        whatILearned: 'Strengthened analytical rigor for exploratory data analysis, hypothesis formulation, and outlier handling in sensitive biological datasets.'
      }
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
      viewUrl: null,
      githubUrl: null, // Pending specific repo link
      hasVerifiedCodeUrl: false,
      hasVerifiedDemoUrl: false,
      thumbnailIsIllustration: true,
      thumbnailAlt: 'Executive Power BI sales analytics dashboard visual concept showing KPIs, DAX measures, and category breakdown',
      caseStudy: {
        problem: 'Business leaders need unified, drill-down visibility into sales performance, profit margins, and regional growth without manual spreadsheet aggregation.',
        toolsUsed: ['Power BI', 'Microsoft Excel', 'DAX', 'Power Query', 'Data Modeling'],
        approach: [
          'Cleaned and transformed transactional sales data with Power Query, creating a normalized star-schema model.',
          'Formulated custom DAX measures for Year-over-Year (YoY) growth, running totals, and profit margins.',
          'Designed intuitive executive dashboards adhering to visual hierarchy principles and interactive cross-filtering.',
          'Implemented role-based KPI cards and category breakdown charts for rapid decision-making.'
        ],
        verifiedOutput: [
          'Interactive multi-page Power BI dashboard with dynamic date range slicers and category filters.',
          'Automated KPI calculation deck replacing manual recurring Excel reports.',
          'Normalized relational data model optimized for fast query performance.'
        ],
        whatILearned: 'Mastered dimensional data modeling (fact and dimension tables), complex DAX calculation logic, and executive-level business storytelling.'
      }
    },
    {
      id: 'proj-movies',
      title: 'Media & Streaming Trends Analytics',
      category: 'Business Intelligence',
      tag: 'Media Analytics',
      tagClass: 'tag-media',
      objective: 'Visualise viewership ratings, genre popularity, and platform performance.',
      description: 'Analyzed streaming catalog trends and rating distributions using Power BI and Excel dashboards to visualize audience engagement patterns.',
      tech: ['Power BI', 'Excel', 'DAX', 'Data Visualisation'],
      viewUrl: null,
      githubUrl: null, // Pending specific repo link
      hasVerifiedCodeUrl: false,
      hasVerifiedDemoUrl: false,
      thumbnailIsIllustration: true,
      thumbnailAlt: 'Media & Streaming analytics dashboard visual concept showing genre popularity, ratings, and platform comparisons',
      caseStudy: {
        problem: 'Media catalog managers and analysts need to track content performance, genre popularity trends, and audience rating distributions across streaming catalogs.',
        toolsUsed: ['Power BI', 'Microsoft Excel', 'DAX', 'Data Visualization'],
        approach: [
          'Aggregated entertainment catalog records across release years, genres, and audience rating scores.',
          'Built comparative visual metrics evaluating genre popularity shifts and monthly viewing patterns.',
          'Constructed summary analytics cards displaying average engagement, total catalog reach, and platform distributions.',
          'Designed clear visual charts highlighting high-performing content clusters.'
        ],
        verifiedOutput: [
          'Interactive media analytics dashboard featuring genre share breakdowns and platform comparisons.',
          'Consolidated trends report summarizing historical content distribution patterns.'
        ],
        whatILearned: 'Refined skills in dashboard UI layout design, audience-focused data storytelling, and categorical distribution analysis.'
      }
    }
  ] as ProjectItem[],

  certifications: [
    {
      id: 'cert-pw-skills',
      title: 'Data Analytics Course',
      issuer: 'Physics Wallah (PW Skills)',
      url: 'https://pwskills.com/learn/certificate/8d99c2f3-38db-42de-9faa-f9abde9f366f?isCareerPath=true',
      credentialId: '8d99c2f3-38db-42de-9faa-f9abde9f366f',
      completionDate: '5 June 2025',
      icon: '📊',
      isDirectDocument: false,
    },
    {
      id: 'cert-sixladders',
      title: 'Value Added Program in Generative AI',
      issuer: 'Sixladders, in collaboration with Sandip University',
      url: 'https://ladder1.ai/verify/DCB518A0435F',
      credentialId: 'DCB518A0435F',
      completionDate: '20–25 April 2026',
      duration: '6 days (intensive)',
      icon: '🤖',
      isDirectDocument: false,
    },
    {
      id: 'cert-ssml-orange',
      title: 'Machine Learning Using Orange Data Mining Tool',
      issuer: 'TheSSML (The Standard School of Machine Learning)',
      url: 'https://drive.google.com/file/d/1fbML3FbijJ8ZpFOQjWkALKI-Y920ugwB/view?usp=sharing',
      localDocPath: '/certificates/machine-learning-orange-thessml.pdf',
      completionDate: '4 April 2026',
      duration: '3 days',
      icon: '⚙️',
      isDirectDocument: true,
    },
    {
      id: 'cert-rubicon-powerbi',
      title: 'Power BI Training Program',
      issuer: 'Rubicon Skill Development Pvt. Ltd., conducted for Sandip University',
      url: 'https://drive.google.com/file/d/1iXE5qB5HfknPRDMRHjfifrIA8ZCLZDju/view?usp=sharing',
      localDocPath: '/certificates/power-bi-rubicon.pdf',
      completionDate: '16 December 2025',
      duration: '30 hours',
      icon: '📈',
      isDirectDocument: true,
    },
  ] as CertificationItem[]
};
