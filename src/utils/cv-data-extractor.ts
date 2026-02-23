import { careerData } from '../data/career';
import { skillModules } from '../data/skills';
import { projects } from '../data/projects';

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  experience: Array<{
    year: string;
    role: string;
    company: string;
    description: string;
    highlights: string[];
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
    leadership: string[];
  };
}

/**
 * Extracts and structures data for the CV PDF generation.
 * Pulls from existing portfolio data sources to ensure consistency.
 */
export function extractCVData(): CVData {
  const personalInfo = {
    name: 'Wenceslaus Dsilva',
    title: 'Chief Technology Officer | Strategic Architect',
    email: 'wenceslausdsilva@gmail.com',
    phone: '+91 766 618 0904',
    location: 'Mumbai, India',
    linkedin: 'linkedin.com/in/wenceslaus-dsilva',
    portfolio: 'w1d.pro'
  };

  const summary = `Executive leader with 20+ years of technical mastery and strategic foresight. Specializing in architecting high-integrity systems, driving exponential growth, and leading high-performance engineering cultures. Proven track record of optimizing infrastructure for scale (e.g., 40% cloud cost reduction YoY) and delivering innovative AI-driven solutions. Strategic visionary who balances deep technical architecture with business alignment to deliver measurable ROI.`;

  // Extract core metrics from the primary project (Rooftop)
  const rooftopProject = projects.find(p => p.slug === 'rooftop');
  const coreMetrics = rooftopProject ? rooftopProject.highlights : [];

  // Structure professional experience from careerData
  const experience = careerData.map(milestone => ({
    year: milestone.year,
    role: milestone.role,
    company: milestone.company,
    description: milestone.description,
    highlights: milestone.highlights || []
  }));

  // Categorize skills by their defined categories
  const categorizedSkills = {
    frontend: skillModules
      .filter(s => s.category === 'frontend')
      .slice(0, 8)
      .map(s => s.name),
    backend: skillModules
      .filter(s => s.category === 'backend')
      .slice(0, 8)
      .map(s => s.name),
    infrastructure: skillModules
      .filter(s => s.category === 'infrastructure')
      .slice(0, 8)
      .map(s => s.name),
    leadership: skillModules
      .filter(s => s.category === 'leadership')
      .slice(0, 8)
      .map(s => s.name),
  };

  return {
    personalInfo,
    summary,
    metrics: coreMetrics,
    experience,
    skills: categorizedSkills
  };
}
