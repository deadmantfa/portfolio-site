export interface SkillModule {
  name: string
  category: 'frontend' | 'backend' | 'infrastructure' | 'leadership'
  importance: string
}

export const skillModules: SkillModule[] = [
  {
    name: 'AWS',
    category: 'infrastructure',
    importance: 'Architecting near-infinite scalability and global distribution networks.'
  },
  {
    name: 'Python',
    category: 'backend',
    importance: 'The backbone for high-performance automation and AI-driven logic.'
  },
  {
    name: 'React',
    category: 'frontend',
    importance: 'Building immersive, high-fidelity interfaces with reactive state.'
  },
  {
    name: 'Three.js',
    category: 'frontend',
    importance: 'Pushing web boundaries with high-end architectural 3D visualizations.'
  },
  {
    name: 'Next.js',
    category: 'frontend',
    importance: 'Ensuring top-tier SEO performance and production-grade reliability.'
  },
  {
    name: 'Serverless',
    category: 'infrastructure',
    importance: 'Optimizing for cost-efficiency and auto-scaling modularity.'
  },
  {
    name: 'PHP',
    category: 'backend',
    importance: 'Legacy of building robust, battle-tested enterprise ERP systems.'
  },
  {
    name: 'TypeScript',
    category: 'backend',
    importance: 'Enforcing architectural integrity through strict type-safe foundations.'
  },
  {
    name: 'DevOps',
    category: 'infrastructure',
    importance: 'Standardizing delivery through automated CI/CD and system monitoring.'
  },
  {
    name: 'Leadership',
    category: 'leadership',
    importance: '20+ years of mentoring teams and aligning tech with business vision.'
  },
  {
    name: 'AI Strategy',
    category: 'leadership',
    importance: 'Orchestrating AI adoption and strategic integration for business growth.'
  },
  {
    name: 'Design Thinking',
    category: 'leadership',
    importance: 'Solving complex problems through user-centric architectural empathy.'
  },
  {
    name: 'Team Building',
    category: 'leadership',
    importance: 'Cultivating high-performance engineering cultures through mentorship.'
  },
  {
    name: 'Critical Thinking',
    category: 'leadership',
    importance: 'Evaluating deep-tech trade-offs with strategic architectural foresight.'
  }
]
