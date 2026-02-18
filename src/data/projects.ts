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
      },
      {
        title: 'AI-Driven Content Personalization',
        problem: 'Generic user experiences led to high bounce rates and lower than optimal conversion for art workshops.',
        solution: 'Implemented a custom Machine Learning Recommendation Engine using AWS SageMaker and collaborative filtering algorithms.',
        impact: 'Boosted conversion rates by 35% and increased average session duration by 4 minutes through targeted discovery.',
        decision: 'Deployed Machine Learning models on SageMaker',
        rationale: 'To deliver hyper-personalized experiences that align with individual user artistic preferences.'
      }
    ],
    techStack: ['AWS', 'Serverless', 'AI/ML', 'SageMaker', 'Next.js', 'DevOps'],
    narrative: {
      vision: 'To build a self-healing, AI-first platform that scales human creativity through strategic technical automation.',
      execution: 'We integrated AI-driven Machine Learning pipelines into the serverless architecture, enabling real-time personalization at scale.',
      result: 'The platform achieved a 90% customer satisfaction score and saw a 60% surge in user engagement driven by hyper-personalization at scale.'
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
  },
  {
    slug: 'indiefolio',
    title: 'Architecting a Creative Ecosystem',
    company: 'IndieFolio Network',
    role: 'Chief Technology Officer',
    period: '2015 - 2018',
    challenge: 'Scaling a creative community platform to 20+ properties while ensuring high-performance discovery and zero downtime.',
    impact: 'Established a highly reliable, serverless-first architecture that supported 100,000+ creatives with hyper-personalized discovery tools.',
    highlights: [
      { label: 'Platform Uptime', value: '100%' },
      { label: 'Creative Fields', value: '110+' },
      { label: 'User Satisfaction', value: '90%' }
    ],
    adrs: [
      {
        title: 'Serverless Image Management',
        problem: 'Dynamic image resizing for thousands of creative portfolios was taxing core application servers and increasing latency.',
        solution: 'Decoupled image processing to AWS Lambda, creating a self-scaling, event-driven image handler.',
        impact: 'Reduced image processing costs by 70% and eliminated CPU bottlenecks on core web servers.',
        decision: 'Implemented AWS Lambda for image handling',
        rationale: 'To offload compute-intensive tasks from the primary application server and scale processing horizontally.'
      },
      {
        title: 'Color-Based Discovery & Color Search Engine',
        problem: 'Creatives needed a way to browse portfolios by aesthetic and color palette, which was impossible with standard text search.',
        solution: 'Integrated Elasticsearch with custom color extraction logic to pick and index dominant palettes from uploaded images.',
        impact: 'Enabled a first-of-its-kind "Color Search" feature, significantly increasing user time-on-site and discovery accuracy.',
        decision: 'Integrated Elasticsearch for color indexing',
        rationale: 'Elasticsearch provides the necessary document-level flexibility and speed for multi-dimensional color vector queries.'
      }
    ],
    techStack: ['AWS', 'Serverless', 'Elasticsearch', 'WebSockets', 'PHP', 'Nginx'],
    narrative: {
      vision: 'Transform a fragmented creative community into a high-performance, discovery-driven technical authority.',
      execution: 'We built a custom "Creative Quotient" (CQ) engine and a real-time messaging layer to foster organic collaboration at scale.',
      result: 'The platform maintained zero downtime during rapid growth and became the leading creative network in the region.'
    },
    blueprint: {
      type: 'serverless',
      nodes: 15,
      connections: 30
    }
  },
  {
    slug: 'epaisa',
    title: 'High-Integrity Payment Architecture',
    company: 'ePaisa Services',
    role: 'Software Architect',
    period: '2013 - 2014',
    challenge: 'Designing secure, high-performance mobile and web payment solutions in a highly regulated environment.',
    impact: 'Ensured 100% PCI DSS compliance while launching innovative mobile-first security and media features.',
    highlights: [
      { label: 'Security Compliance', value: 'PCI DSS' },
      { label: 'Uptime', value: '99.99%' }
    ],
    adrs: [
      {
        title: 'Dugna Security Framework',
        problem: 'Need for a highly secure, frictionless Multi-Factor Authentication (MFA) system for payment verification.',
        solution: 'Developed a custom MFA service utilizing unique mobile callback and SMS-based verification layers.',
        impact: 'Reduced unauthorized transaction attempts by 95% while maintaining a seamless user login experience.',
        decision: 'Developed custom MFA (Dugna Security)',
        rationale: 'Standard solutions were too rigid for the specific mobile-first requirements of the region at the time.'
      },
      {
        title: 'Voodle: Distributed Render Farm',
        problem: 'Users needed to generate high-quality video summaries of their images, requiring significant compute power.',
        solution: 'Architected a distributed render farm using AWS EC2 instances and Blender to process video transitions asynchronously.',
        impact: 'Allowed users to generate professional-grade videos in under 60 seconds from a mobile device.',
        decision: 'Built AWS-based Blender render farm',
        rationale: 'To provide high-end video processing capabilities without burdening the end-user\'s mobile hardware.'
      }
    ],
    techStack: ['AWS', 'EC2', 'Blender', 'PCI DSS', 'PHP', 'Node.js'],
    narrative: {
      vision: 'Secure and revolutionize mobile commerce through architectural integrity and innovative feature sets.',
      execution: 'We implemented strict security protocols alongside distributed compute solutions to balance safety with high-end features.',
      result: 'The platform achieved full PCI compliance and successfully processed millions in transactions with zero security breaches.'
    },
    blueprint: {
      type: 'monolith',
      nodes: 6,
      connections: 12
    }
  },
  {
    slug: 'tcs-wns',
    title: 'Foundational Data Automation',
    company: 'Tata Consultancy Services / WNS',
    role: 'Analyst Programmer',
    period: '2006 - 2009',
    challenge: 'Managing and analyzing massive datasets from thousands of market and medical questionnaires with high accuracy.',
    impact: 'Reduced manual data processing time by 90% through custom automation and earned "Highest Productivity" recognition.',
    highlights: [
      { label: 'Automation Gain', value: '+90%' },
      { label: 'Productivity', value: 'Top Award' }
    ],
    adrs: [
      {
        title: 'Shell Scripting for Data Pipelines',
        problem: 'Repetitive, manual analysis of large-scale datasets was prone to human error and significant delays.',
        solution: 'Developed a suite of custom Shell Scripts to automate the cleaning, transformation, and ingestion of raw data.',
        impact: 'Turnaround time for major reports decreased from days to minutes, ensuring 100% data consistency.',
        decision: 'Automated pipelines using Shell Scripting',
        rationale: 'To ensure repeatability and speed in high-volume data environments without the overhead of heavy ETL tools.'
      }
    ],
    techStack: ['Shell Scripting', 'Quantum', 'SPSS', 'Linux'],
    narrative: {
      vision: 'Eliminate human error and maximize efficiency in high-stakes data analysis environments.',
      execution: 'Leveraged Unix-based automation to create robust data pipelines that handled complex multi-dimensional datasets.',
      result: 'Achieved the highest productivity hours in the organization and standardized automation as a core data practice.'
    },
    blueprint: {
      type: 'hub-and-spoke',
      nodes: 4,
      connections: 6
    }
  },
  {
    slug: 'coupon-dunia',
    title: 'Scaling Mobile Engagement',
    company: 'CouponDunia',
    role: 'Sr. Web Developer',
    period: '2015',
    challenge: 'Architecting the backend for a high-traffic mobile application during a period of rapid user acquisition.',
    impact: 'Successfully launched the CashBoss Android ecosystem, driving a 40% increase in mobile-led user conversions.',
    highlights: [
      { label: 'Mobile Conversion', value: '+40%' },
      { label: 'API Uptime', value: '99.9%' }
    ],
    adrs: [
      {
        title: 'Modernizing with Yii2',
        problem: 'The existing backend struggled to handle the high concurrency requirements of the new CashBoss app.',
        solution: 'Migrated core services to a modular Yii2-based architecture with optimized RESTful API endpoints.',
        impact: 'The system successfully supported 10x traffic growth without a corresponding increase in infrastructure costs.',
        decision: 'Adopted Yii2 for mobile backend',
        rationale: 'Yii2 provided the optimal balance of performance, rapid development, and robust security features needed for the launch.'
      }
    ],
    techStack: ['Yii', 'PHP', 'RESTful APIs', 'MySQL'],
    narrative: {
      vision: 'Build a rock-solid, mobile-first backend to support aggressive user growth and high-concurrency engagement.',
      execution: 'We optimized the API layer for low-latency responses and implemented efficient caching strategies to handle traffic spikes.',
      result: 'CashBoss became a key driver for the company, handling hundreds of thousands of active users with peak stability.'
    },
    blueprint: {
      type: 'monolith',
      nodes: 5,
      connections: 10
    }
  }
]
