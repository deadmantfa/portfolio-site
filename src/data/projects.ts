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
    challenge: 'Directing technology strategy to drive project success and operational efficiency during a period of rapid scale. Faced challenges balancing rapid feature delivery with system reliability while managing infrastructure costs during growth phases of 3-5x yearly user increases.',
    impact: 'Reduced system runtime by 85% and increased user engagement by 60% through modern serverless architectures and AI solutions. Established sustainable cloud cost savings of 40% YoY while maintaining 99.9% uptime SLA.',
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
      vision: 'To build a self-healing, AI-first platform that scales human creativity through strategic technical automation, intelligent resource optimization, and predictive infrastructure management that anticipates and prevents failures before they impact users.',
      execution: 'Integrated AI-driven Machine Learning pipelines into the serverless architecture, enabling real-time personalization at scale. Implemented automated failover mechanisms, predictive scaling algorithms using historical traffic patterns, and adaptive caching strategies that reduced infrastructure complexity by 65%. Deployed real-time monitoring and anomaly detection systems that automatically adjusted resource allocation based on demand forecasting, achieving near-zero cold start latencies.',
      result: 'The platform achieved a 90% customer satisfaction score and saw a 60% surge in user engagement driven by hyper-personalization. Established itself as the go-to solution for art workshop discovery with zero critical incidents over 2 years. Reduced infrastructure costs by 40% through intelligent resource optimization while simultaneously improving response times by 35%.'
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
    challenge: 'Spearheading new product verticals and automating manual processes across a complex supply chain. Coordinated technology oversight for 3 product expansions while managing legacy system dependencies and vendor integrations.',
    impact: 'Improved operational efficiency by 75% through custom ERP systems and seamless third-party integrations. Reduced data entry errors by 90% and enabled company scaling from 1,000 to 10,000+ daily active subscribers.',
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
      vision: 'Digitize the end-to-end supply chain of a complex subscription-based food service to enable hyper-growth through operational automation, data-driven decision making, and real-time supply chain visibility across multiple distribution centers.',
      execution: 'Developed a custom ERP system that integrated CRM, logistics, and kitchen management into a single technical authority, connecting restaurants, logistics partners, and customer platforms. Implemented real-time inventory tracking using IoT sensors, dynamic pricing engines that adjusted prices based on demand and inventory levels, and automated delivery route optimization using advanced algorithms. Built sophisticated demand forecasting models that predicted subscriber behavior weeks in advance, enabling kitchen staffing optimization and ingredient procurement planning.',
      result: 'The system automated 80% of manual data entry, allowing the company to scale from 1,000 to 10,000 active daily subscribers while maintaining 99.9% on-time delivery rates. Reduced kitchen waste by 35% through predictive demand forecasting and enabled the company to expand to 3 new product verticals seamlessly. Operational efficiency gains freed up management resources to focus on customer acquisition and retention.'
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
    challenge: 'Developing a robust SAAS product to facilitate seamless student payments and admissions at scale. Built multi-tenant infrastructure supporting 50+ educational institutions with strict compliance requirements and data privacy mandates.',
    impact: 'Achieved 100% enhancement in user satisfaction by streamlining the student onboarding and payment experience. Processed over $50M in transactions in first year with zero security incidents and 99.99% payment gateway uptime.',
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
      vision: 'Create the most frictionless payment and admission experience for educational institutions in the region while maintaining institutional data privacy, regulatory compliance, and supporting diverse payment methods across geography.',
      execution: 'Built a highly modular Node.js backend with an extensible adapter pattern for integrating various banking APIs and payment gateways used across different regions. Implemented multi-tenant architecture supporting 50+ institutions with strict data isolation guarantees, customizable admission workflows, and role-based access controls. Developed sophisticated payment reconciliation engines that automatically matched transactions against institutional records, reducing manual reconciliation work by 95%. Created comprehensive admin dashboards providing real-time insights into payment flows, admission bottlenecks, and institutional performance metrics.',
      result: 'The platform processed over $50M in transactions in its first year, becoming the go-to solution for student payments across the region. Achieved 99.99% payment success rate with zero security incidents and onboarded 50+ institutions in just 3 months. Institutions reported 60% reduction in admission processing time and significant improvements in student satisfaction due to frictionless payment experience. Platform became instrumental in institutional growth, enabling schools to scale operations efficiently.'
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
    challenge: 'Scaling a creative community platform to 20+ properties while ensuring high-performance discovery and zero downtime. Architected systems for diverse creative disciplines (photography, design, illustration, video) with unique indexing and search requirements.',
    impact: 'Established a highly reliable, serverless-first architecture that supported 100,000+ creatives with hyper-personalized discovery tools. Achieved 100% platform uptime across 3 years and pioneered color-based search enabling first-of-its-kind discovery experience.',
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
      vision: 'Transform a fragmented creative community into a high-performance, discovery-driven technical authority that enables serendipitous connections across diverse creative disciplines while maintaining platform stability during explosive growth.',
      execution: 'Built a custom "Creative Quotient" (CQ) engine using machine learning for collaborative scoring that identified high-potential collaborators based on portfolio aesthetics and skill complementarity. Implemented a real-time messaging layer enabling organic collaboration at scale with full-text search and conversation threading. Pioneered color-based discovery system using Elasticsearch for multi-dimensional color vector queries, enabling creatives to find portfolios by aesthetic palette. Implemented serverless image processing using AWS Lambda that reduced infrastructure costs by 70% while supporting 20+ properties across photography, design, illustration, and video verticals.',
      result: 'The platform maintained 100% uptime during rapid 10x growth and became the leading creative network in the region. Facilitated 100,000+ creatives discovering each other through color-based search and algorithmic recommendations, with 90% user satisfaction. Platform innovations became industry benchmarks, with color-based discovery being adopted by other platforms. Successfully managed complex technical challenges of growing from 10K to 100K+ active creators while maintaining performance.'
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
      vision: 'Secure and revolutionize mobile commerce through architectural integrity and innovative feature sets in a highly regulated environment.',
      execution: 'Implemented strict security protocols alongside distributed compute solutions to balance safety with high-end features. Developed custom MFA layers and async video processing render farm, maintaining 99.99% uptime while handling millions in daily transaction volumes with full PCI DSS compliance.',
      result: 'The platform achieved full PCI compliance and successfully processed millions in transactions with zero security breaches. Pioneered mobile-first payment solutions that reduced unauthorized transaction attempts by 95% while maintaining seamless user experiences.'
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
    challenge: 'Managing and analyzing massive datasets from thousands of market and medical questionnaires with high accuracy. Handled complex multi-dimensional data validation across diverse sources with strict accuracy requirements and compliance regulations.',
    impact: 'Reduced manual data processing time by 90% through custom automation and earned "Highest Productivity" recognition. Established automation best practices that became organizational standard, reducing error rates from 15% to 0.2%.',
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
      vision: 'Eliminate human error and maximize efficiency in high-stakes data analysis environments by automating repetitive manual processes through sophisticated shell scripting and Unix-based tools.',
      execution: 'Developed comprehensive suite of Shell Scripts to automate the cleaning, transformation, and ingestion of raw data from thousands of market research and medical questionnaires. Leveraged Unix-based automation to create robust data pipelines that handled complex multi-dimensional datasets with strict accuracy requirements. Implemented automated validation routines that caught data quality issues in real-time, reducing downstream errors by 95%.',
      result: 'Achieved the highest productivity hours in the organization and earned formal recognition for exceptional performance. Standardized automation as core organizational data practice, reducing turnaround time for major reports from days to minutes while ensuring 100% data consistency and accuracy. Error rates dropped from 15% to 0.2%, establishing new benchmarks for data processing reliability in the organization.'
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
