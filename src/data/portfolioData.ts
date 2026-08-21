/**
 * =========================================================================================
 * PORTFOLIO DATA ARCHITECTURE - AAYUSH RAJ
 * =========================================================================================
 * This file contains all personal information, academic milestones, skills, and projects.
 * 
 * HOW TO EDIT YOUR INFORMATION:
 * 1. Personal & Contact info -> Modify `USER_PROFILE` or `PERSONAL_INFO` below.
 * 2. Education & Languages -> Update the `education` and `languages` arrays in `USER_PROFILE`.
 * 3. Projects -> Update `PROJECTS` array (Project 1 is live; Projects 2-4 are reserved for future work).
 * 4. Technical Skills -> Update `SKILLS` array with your proficiency levels (0 to 100).
 * 5. Full customization guide: See `/docs/DOCUMENTATION.md`.
 * =========================================================================================
 */

import { Project, UserProfile, Skill } from '../types';

/**
 * ============================================================================
 * SECTION 1: PRIMARY USER PROFILE
 * ============================================================================
 * Contains core biographical, educational, and contact details for Aayush Raj.
 */
export const USER_PROFILE: UserProfile = {
  name: 'Aayush Raj',
  alias: 'Aayush',
  tagline: 'Learner. Creator. Problem Solver.',
  role: 'Computer Science (AI) Student & IIT Madras Data Science Scholar',
  bio: "I'm Aayush, a Computer Science & Engineering student specializing in AI, also pursuing Data Science from IIT Madras. This portfolio is the very first project I have built in my life as I dive into web engineering, algorithms, and intelligent systems.",
  philosophy: "I believe great engineering is about mastering computer science fundamentals, writing clean and readable code, and continuously learning by building real projects from scratch.",
  location: 'India • Available Worldwide',
  email: 'aayushraj05@zohomail.in',
  githubUser: 'aayushraj0505',
  githubUrl: 'https://github.com/aayushraj0505',
  linkedinUrl: 'https://linkedin.com/in/aayushraj0505',
  status: 'Undergraduate Student • Open to Learning, Internships & Collaboration',
  education: {
    btech: {
      degree: 'B.Tech in Computer Science & Engineering (CSE)',
      specialisation: 'Specialisation in Artificial Intelligence (AI)',
      gradYear: 'Graduating in 2030',
      status: 'In Progress (Undergraduate)',
    },
    iitMadras: {
      degree: 'Data Science Program',
      institution: 'Indian Institute of Technology Madras (IIT Madras)',
      startYear: 'From 2025',
      status: 'Pursuing',
    },
  },
  languages: ['English', 'Hindi', 'Japanese'],
  stats: {
    projectsBuilt: '1st Project',
    learningYear: '2025 - 2030',
  },
};

/**
 * ============================================================================
 * SECTION 2: QUICK CONTACT & GOALS (Used by Terminal and Header)
 * ============================================================================
 */
export const PERSONAL_INFO = {
  name: 'Aayush Raj',
  email: 'aayushraj05@zohomail.in',
  statusText: 'Undergraduate student open for internships & engineering projects',
  location: 'India • Available worldwide',
  github: 'https://github.com/aayushraj0505',
  linkedin: 'https://linkedin.com/in/aayushraj0505',
};

export const CURRENT_GOALS = [
  { id: 'goal-1', title: 'Specialisation in Artificial Intelligence', description: 'Deepening foundational knowledge in Machine Learning, Neural Networks & AI.' },
  { id: 'goal-2', title: 'Data Science from IIT Madras', description: 'Rigorous coursework in statistics, data analysis, Python, and predictive algorithms.' },
  { id: 'goal-3', title: 'Web Engineering with React & TypeScript', description: 'Building clean, interactive user interfaces and responsive architectures.' },
  { id: 'goal-4', title: 'Language Learning: Japanese', description: 'Actively expanding multilingual communication in English, Hindi, and Japanese.' },
];

/**
 * ============================================================================
 * SECTION 3: FEATURED PROJECTS
 * ============================================================================
 * - Project 1: This Cinematic Portfolio & Interactive Lab (Aayush's first project!)
 * - Projects 2, 3, 4: Reserved for future software & AI projects.
 *   Tags and descriptions are cleanly commented so they can be unlocked anytime.
 */
export const PROJECTS: Project[] = [
  {
    id: 'intro-webpage-portfolio',
    title: 'Intro Webpage & Cinematic Portfolio',
    category: 'FIRST PROJECT • WEB & UI',
    period: '2025 - Present',
    shortDescription: 'My first project: High-performance portfolio with Obsidian Deep aesthetic, interactive physics particle game, terminal CLI, and scroll word illumination.',
    longDescription: 'The very first project built by Aayush Raj using React 19, TypeScript, and Tailwind CSS. Features custom canvas physics simulations with wave survival mechanics, interactive developer terminal CLI emulator with quick chips, dynamic skill matrix with confidence progress bars, and scroll-triggered narrative illumination.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern dark theme developer portfolio interface with interactive canvas simulation and typography',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Canvas Physics', 'Vite', 'Lucide'],
    liveUrl: '#home',
    githubUrl: 'https://github.com/aayushraj0505',
    metrics: [
      { label: 'Milestone', value: '1st Project' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Bundle Size', value: '< 35KB gzip' },
    ],
    keyFeatures: [
      'Kinetic canvas physics with cursor gravity wells and multi-wave particle arcade mechanics',
      'Interactive developer CLI terminal with custom command parsers and quick run suggestion chips',
      'Fluid typographic scale and smooth scroll-triggered text illumination engine',
      '1-Page print optimized single-sheet Curriculum Vitae (CV) export mode',
    ],
    techStack: ['TypeScript', 'React 19', 'Tailwind CSS', 'HTML5 Canvas', 'Vite', 'Lucide React'],
    architectureOverview: 'Single-page architecture with decoupled modular components, responsive state tracking, and hardware-accelerated canvas animations.',
  },
  {
    id: 'future-project-2',
    title: 'Reserved for future',
    category: 'FUTURE PROJECT',
    period: 'Roadmap',
    /* 
      DESCRIPTION & TAGS COMMENTED OUT FOR FUTURE CUSTOMIZATION:
      Uncomment and fill in these fields when you start your second project!
    */
    shortDescription: 'Reserved for upcoming engineering project. Stay tuned as I build more applications during college.',
    longDescription: 'This slot is reserved for a future software engineering, machine learning, or web systems project as Aayush progresses through his B.Tech in CSE (AI) and IIT Madras Data Science journey.',
    // Uses second image asset as requested:
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Reserved workspace slot for future engineering project',
    tags: [
      /* Uncomment tags when ready: 'React', 'Python', 'Machine Learning', 'AI' */
    ],
    githubUrl: 'https://github.com/aayushraj0505',
    metrics: [
      { label: 'Status', value: 'Reserved' },
    ],
    keyFeatures: [
      'Reserved for upcoming AI / Software project release.',
    ],
    techStack: ['Future Project'],
    architectureOverview: 'Architecture details will be published upon project launch.',
  },
  {
    id: 'future-project-3',
    title: 'Reserved for future',
    category: 'FUTURE PROJECT',
    period: 'Roadmap',
    /* 
      DESCRIPTION & TAGS COMMENTED OUT FOR FUTURE CUSTOMIZATION:
      Uncomment and fill in these fields when you start your third project!
    */
    shortDescription: 'Reserved for upcoming engineering project. Stay tuned as I build more applications during college.',
    longDescription: 'This slot is reserved for a future distributed systems or data science project as Aayush expands his technical repertoire.',
    // Uses second image asset as requested:
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Reserved workspace slot for future engineering project',
    tags: [
      /* Uncomment tags when ready: 'Data Science', 'Python', 'IIT Madras', 'PostgreSQL' */
    ],
    githubUrl: 'https://github.com/aayushraj0505',
    metrics: [
      { label: 'Status', value: 'Reserved' },
    ],
    keyFeatures: [
      'Reserved for upcoming Data Science / Backend project release.',
    ],
    techStack: ['Future Project'],
    architectureOverview: 'Architecture details will be published upon project launch.',
  },
  {
    id: 'future-project-4',
    title: 'Reserved for future',
    category: 'FUTURE PROJECT',
    period: 'Roadmap',
    /* 
      DESCRIPTION & TAGS COMMENTED OUT FOR FUTURE CUSTOMIZATION:
      Uncomment and fill in these fields when you start your fourth project!
    */
    shortDescription: 'Reserved for upcoming engineering project. Stay tuned as I build more applications during college.',
    longDescription: 'This slot is reserved for future Artificial Intelligence research or advanced developer tools.',
    // Uses second image asset as requested:
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Reserved workspace slot for future engineering project',
    tags: [
      /* Uncomment tags when ready: 'Artificial Intelligence', 'Algorithms', 'Deep Learning' */
    ],
    githubUrl: 'https://github.com/aayushraj0505',
    metrics: [
      { label: 'Status', value: 'Reserved' },
    ],
    keyFeatures: [
      'Reserved for upcoming AI Research / Intelligent System release.',
    ],
    techStack: ['Future Project'],
    architectureOverview: 'Architecture details will be published upon project launch.',
  },
];

/**
 * ============================================================================
 * SECTION 4: TECHNICAL SKILLS ARSENAL
 * ============================================================================
 * List of technologies, tools, and languages Aayush is actively learning and practicing.
 */
export const SKILLS: Skill[] = [
  {
    id: 'c-cpp',
    name: 'C / C++ & Problem Solving',
    category: 'Core Fundamentals',
    proficiency: 65,
    level: 'Learning & Practicing',
    iconName: 'Code2',
    description: 'Memory management, pointers, object-oriented concepts, and basic Data Structures & Algorithms.',
    popularFor: ['OOP', 'Pointers', 'Problem Solving'],
  },
  {
    id: 'python-ai',
    name: 'Python & Data Science Basics',
    category: 'Core Fundamentals',
    proficiency: 60,
    level: 'Learning & Practicing',
    iconName: 'Sparkles',
    description: 'Python syntax, NumPy, Pandas, and foundational mathematical principles for Data Science & AI.',
    popularFor: ['Data Analysis', 'Python 3', 'AI Foundations'],
  },
  {
    id: 'html-css',
    name: 'HTML5 & Semantic Structure',
    category: 'Core Fundamentals',
    proficiency: 85,
    level: 'Comfortable',
    iconName: 'Code2',
    description: 'Semantic markup, accessibility landmarks, clean DOM structure, and responsive forms.',
    popularFor: ['Semantic Tags', 'Accessibility', 'Clean DOM'],
  },
  {
    id: 'css-styling',
    name: 'CSS3 & Responsive Layouts',
    category: 'Core Fundamentals',
    proficiency: 75,
    level: 'Comfortable',
    iconName: 'Palette',
    description: 'Flexbox, CSS Grid, media queries, CSS variables, and modern fluid layouts.',
    popularFor: ['Flexbox', 'CSS Grid', 'Mobile Responsive'],
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Frameworks & Styling',
    proficiency: 70,
    level: 'Learning & Practicing',
    iconName: 'Sparkles',
    description: 'DOM manipulation, array methods, fetch API, async/await, and event-driven scripting.',
    popularFor: ['ES6 Syntax', 'Async/Await', 'DOM APIs'],
  },
  {
    id: 'react-ts',
    name: 'React 19 & TypeScript',
    category: 'Frameworks & Styling',
    proficiency: 65,
    level: 'Learning & Practicing',
    iconName: 'Atom',
    description: 'Functional component architecture, hooks (useState, useEffect, useRef), and strict typing.',
    popularFor: ['Components', 'Hooks', 'TypeScript'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frameworks & Styling',
    proficiency: 80,
    level: 'Comfortable',
    iconName: 'Palette',
    description: 'Utility-first styling, dark mode themes, responsive utility classes, and glassmorphism.',
    popularFor: ['Utility Classes', 'Dark Mode', 'Responsive'],
  },
  {
    id: 'git-tools',
    name: 'Git, GitHub & VS Code',
    category: 'Workflow & Tools',
    proficiency: 75,
    level: 'Comfortable',
    iconName: 'GitBranch',
    description: 'Version control, repositories, commits, branch management, and modern development tooling.',
    popularFor: ['Git Commits', 'GitHub Repos', 'VS Code'],
  },
];
