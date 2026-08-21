/**
 * ============================================================================
 * TYPE DEFINITIONS & DATA INTERFACES - AAYUSH RAJ PORTFOLIO
 * ============================================================================
 * Defines TypeScript interfaces for UserProfile, Project, Skills, and Modals.
 * For guides on extending these structures, see /docs/DOCUMENTATION.md.
 * ============================================================================
 */

/**
 * Interface representing a showcase project card in the Work section and modal.
 */
export interface Project {
  id: string;
  title: string;
  category: string;
  period: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  keyFeatures: string[];
  techStack: string[];
  architectureOverview?: string;
}

/**
 * Interface representing an interactive sandbox experiment.
 */
export interface LabExperiment {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  description: string;
  type: 'canvas-particles' | 'algorithm-visualizer' | 'terminal' | 'audio-synth';
  tags: string[];
  previewUrl?: string;
  githubUrl?: string;
}

/**
 * Interface representing a technical skill in the Arsenal section.
 */
export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  level: string;
  iconName: string;
  description: string;
  popularFor: string[];
}

/**
 * Interface for skill categorization tabs.
 */
export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skills: string[];
  highlight: string;
}

/**
 * Interface representing Aayush's core personal and academic profile.
 */
export interface UserProfile {
  name: string;
  alias: string;
  tagline: string;
  role: string;
  bio: string;
  philosophy: string;
  location: string;
  email: string;
  githubUser: string;
  githubUrl: string;
  linkedinUrl: string;
  status: string;
  education: {
    btech: {
      degree: string;
      specialisation: string;
      gradYear: string;
      status: string;
    };
    iitMadras: {
      degree: string;
      institution: string;
      startYear: string;
      status: string;
    };
  };
  languages: string[];
  stats: {
    projectsBuilt: string;
    learningYear: string;
  };
}
