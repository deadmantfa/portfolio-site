export interface ADR {
  title: string
  problem: string
  solution: string
  impact: string
  // Legacy fields for compatibility if needed
  decision?: string
  rationale?: string
}

export interface ProjectHighlight {
  label: string
  value: string
}

export interface ProjectNarrative {
  vision: string
  execution: string
  result: string
}

export interface ProjectBlueprint {
  type: 'monolith' | 'microservices' | 'serverless' | 'hub-and-spoke'
  nodes: number
  connections: number
}

export interface ProjectCaseStudy {
  slug: string
  title: string
  company: string
  role: string
  period: string
  challenge: string
  impact: string
  highlights: ProjectHighlight[]
  adrs: ADR[]
  techStack: string[]
  narrative: ProjectNarrative
  blueprint: ProjectBlueprint
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'rooftop',
    title: 'Architecting for Exponential Growth',
    company: 'Rooftop',
    role: 'Chief Technology Officer',
    period: '2022 - Present',
    challenge: 'Directing technology strategy to drive project success and operational efficiency during a period of rapid scale.',
    impact: 'Reduced system runtime by 85% and increased user engagement by 60% through modern serverless architectures and AI solutions.',
    highlights: [
      { label: 'System Runtime', value: '-85%' },
      { label: 'User Engagement', value: '+60%' },
      { label: 'Customer Satisfaction', value: '90%' }
    ],
    adrs: [
      {
        title: 'Serverless Transformation',
        problem: 'Legacy monolithic architecture struggled with variable traffic spikes and high infrastructure overhead.',
        solution: 'Migrated core compute to event-driven AWS Lambda functions and managed SQS/SNS for communication.',
        impact: 'Achieved $0 idle cost and near-infinite scalability, handling a 10x traffic spike with zero downtime.',
        decision: 'Migrated core compute to AWS Lambda',
        rationale: 'To handle highly variable traffic patterns while maintaining $0 idle cost and near-infinite scalability.'
      }
    ],
    techStack: ['AWS', 'Serverless', 'AI/ML', 'Next.js', 'DevOps'],
    narrative: {
      vision: 'To build a self-healing, cost-effective platform that can scale instantly to meet global demand without manual intervention.',
      execution: 'We decomposed the legacy monolith into a suite of focused micro-services, leveraging AWS Step Functions for complex orchestration.',
      result: 'The platform now serves millions of requests with a 99.99% reliability score, while reducing AWS monthly spend by 40%.'
    },
    blueprint: {
      type: 'serverless',
      nodes: 12,
      connections: 24
    }
  },
  {
    slug: 'food-darzee',
    title: 'ERP Modernization & Vertical Growth',
    company: 'Food Darzee',
    role: 'Chief Technology Officer',
    period: '2019 - 2021',
    challenge: 'Spearheading new product verticals and automating manual processes across a complex supply chain.',
    impact: 'Improved operational efficiency by 75% through custom ERP systems and seamless third-party integrations.',
    highlights: [
      { label: 'Ops Efficiency', value: '+75%' },
      { label: 'Delivery Uptime', value: '99.9%' }
    ],
    adrs: [
      {
        title: 'CI/CD Implementation',
        problem: 'Deployment bottlenecks and regression issues due to lack of automated testing and manual release cycles.',
        solution: 'Standardized on GitHub Actions with integrated Vitest suites and staging environments.',
        impact: 'Deployment frequency increased from weekly to multiple times daily, with a 90% reduction in production hotfixes.',
        decision: 'Standardized on GitHub Actions',
        rationale: 'To enable daily deployments and automated testing across multiple outsourced and in-house teams.'
      }
    ],
    techStack: ['PHP', 'Yii', 'GitHub Actions', 'Payment Gateways', 'ERP'],
    narrative: {
      vision: 'Digitize the end-to-end supply chain of a complex subscription-based food service to enable hyper-growth.',
      execution: 'Developed a custom ERP system that integrated CRM, logistics, and kitchen management into a single technical authority.',
      result: 'The system automated 80% of manual data entry, allowing the company to scale from 1,000 to 10,000 active daily subscribers.'
    },
    blueprint: {
      type: 'hub-and-spoke',
      nodes: 8,
      connections: 12
    }
  },
  {
    slug: 'onfees',
    title: 'SAAS Transformation for Education',
    company: 'EasyTech Innovations',
    role: 'Chief Technology Officer',
    period: '2019',
    challenge: 'Developing a robust SAAS product to facilitate seamless student payments and admissions at scale.',
    impact: 'Achieved 100% enhancement in user satisfaction by streamlining the student onboarding and payment experience.',
    highlights: [
      { label: 'User Satisfaction', value: '100%' },
      { label: 'Project Success Rate', value: '+60%' }
    ],
    adrs: [
      {
        title: 'SAAS Architecture',
        problem: 'Need to support hundreds of institutions while maintaining strict data privacy and isolation without skyrocketing costs.',
        solution: 'Implemented a shared-database, isolated-schema multi-tenant pattern.',
        impact: 'Onboarded 50+ institutions in 3 months with zero cross-tenant data leaks and optimized infrastructure usage.',
        decision: 'Implemented Multi-tenant Database pattern',
        rationale: 'To ensure data isolation and performance while supporting hundreds of educational institutions on a single platform.'
      }
    ],
    techStack: ['SAAS', 'Cloud Architecture', 'Payment Systems', 'Node.js'],
    narrative: {
      vision: 'Create the most frictionless payment and admission experience for educational institutions in the region.',
      execution: 'Built a highly modular Node.js backend with an extensible adapter pattern for various banking APIs.',
      result: 'The platform processed over $50M in transactions in its first year, becoming the go-to solution for student payments.'
    },
    blueprint: {
      type: 'microservices',
      nodes: 10,
      connections: 18
    }
  }
]
