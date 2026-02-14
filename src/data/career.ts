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
      'Boosting customer satisfaction rates by 90%'
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
      'Managed integrations with clients like PayTM, PhonePe, and Axis Bank'
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
      'Streamlined management and delivery issues'
    ]
  },
  {
    year: '2015 - 2018',
    role: 'Chief Technology Officer',
    company: 'IndieFolio Network',
    description: 'Architected and maintained 20+ online properties without downtime, enhancing system reliability and performance.',
    highlights: [
      'Created serverless image handler (AWS Lambda)',
      'Developed color search algorithm using Elasticsearch',
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
      'Maintained and managed applications and web servers',
      'Aligned technology with market trends',
      'Enhanced performance and user experience'
    ]
  },
  {
    year: '2009 - 2012',
    role: 'Computer Programmer',
    company: 'MADAR International School',
    description: 'Developed and maintained school management systems using Yii framework, enhancing system reliability.',
    highlights: [
      'Created scripts to configure servers',
      'Streamlined code publishing processes',
      'Improved deployment efficiency'
    ]
  },
  {
    year: '2008 - 2009',
    role: 'Analyst Programmer',
    company: 'Tata Consultancy Services',
    description: 'Delivered analyzed data using Quantum, SPSS, and other tools, enhancing data-driven decision-making.',
    highlights: [
      'Automated data analysis processes',
      'Implemented Shell Scripts to automate repetitive tasks',
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
      'Earned highest productivity hours in a month',
      'Effectively managing multiple projects simultaneously'
    ]
  }
]
