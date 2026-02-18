export interface CareerMilestone {
  year: string
  role: string
  company: string
  description: string
  highlights?: string[]
}

export const careerData: CareerMilestone[] = [
  {
    year: '2022 - Present',
    role: 'Chief Technology Officer',
    company: 'Rooftop',
    description: 'Directed technology strategy and innovation, implementing AI solutions and modern architectures (e.g., serverless) to drive project success and operational efficiency.',
    highlights: [
      'Reduced system runtime by 85%',
      'Increased user engagement by 60%',
      'Boosting customer satisfaction rates by 90%',
      'Integrated secure payment gateways and expanded application capabilities'
    ]
  },
  {
    year: '2019 - 2021',
    role: 'Chief Technology Officer',
    company: 'Food Darzee (3CAD Hospitality LLP)',
    description: 'Spearheaded the creation of new product verticals and ERP systems, automating processes and enhancing operational efficiency by 75%.',
    highlights: [
      'Led multiple teams, both in-house and outsourced',
      'Integrated DevOps using GitHub Actions',
      'Integrated PayTM, PhonePe, and Axis Bank gateways',
      'Automated end-to-end supply chain via custom ERP'
    ]
  },
  {
    year: '2019',
    role: 'Chief Technology Officer',
    company: 'EasyTech Innovations',
    description: 'Handled client delivery for multiple ERP systems and managed the SAAS product OnFees.',
    highlights: [
      'Enhanced user satisfaction by 100% (OnFees)',
      'Improved project success rates by 60%',
      'Streamlined management and delivery issues for multi-tenant SAAS'
    ]
  },
  {
    year: '2015 - 2018',
    role: 'Chief Technology Officer',
    company: 'IndieFolio Network',
    description: 'Architected and maintained 20+ online properties without downtime, enhancing system reliability and performance.',
    highlights: [
      'Created serverless image handler (AWS Lambda)',
      'Architected Creative Field CQ algorithm for user discovery',
      'Developed real-time messaging with WebSockets and RBAC',
      'Improved user satisfaction by 90%'
    ]
  },
  {
    year: '2015',
    role: 'Sr. Web Developer',
    company: 'CouponDunia',
    description: 'Architected and developed CashBoss Android App and backend, enhancing user engagement and operational efficiency.',
    highlights: [
      'Implemented Restful APIs for Android',
      'Developed Yii2 based backend',
      'Streamlined processes and boosting productivity'
    ]
  },
  {
    year: '2013 - 2014',
    role: 'Software Architect',
    company: 'ePaisa Services',
    description: 'Managed and designed web and mobile applications, ensuring PCI DSS compliance and optimal performance.',
    highlights: [
      'Architected Voodle: AWS-based Blender render farm',
      'Implemented Dugna Security (MFA) for payment integrity',
      'Aligned technology with market trends'
    ]
  },
  {
    year: '2009 - 2012',
    role: 'Computer Programmer',
    company: 'MADAR International School',
    description: 'Developed and maintained school management systems using Yii framework, enhancing system reliability.',
    highlights: [
      'Created scripts to configure servers and publish code',
      'Automated deployment processes across servers',
      'Improved deployment efficiency'
    ]
  },
  {
    year: '2008 - 2009',
    role: 'Analyst Programmer',
    company: 'Tata Consultancy Services',
    description: 'Delivered analyzed data using Quantum, SPSS, and other tools, enhancing data-driven decision-making.',
    highlights: [
      'Automated market questionnaire analysis via Shell Scripts',
      'Automated data analysis processes',
      'Reducing manual effort'
    ]
  },
  {
    year: '2007 - 2008',
    role: 'Analyst Programmer',
    company: 'WNS',
    description: 'Conducted data analysis using Quantum and SPSS, enhancing data-driven decision-making and improving project outcomes.',
    highlights: [
      'Automated repetitive tasks using Shell Scripts',
      'Demonstrating strong project management skills'
    ]
  },
  {
    year: '2006 - 2007',
    role: 'Junior Analyst',
    company: 'WNS',
    description: 'Worked on Data Analysis using Quantum, SPSS and other tools.',
    highlights: [
      'Earned highest productivity hours award',
      'Effectively managing multiple projects simultaneously'
    ]
  }
]
