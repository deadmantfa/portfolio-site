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
    description: 'Directed technology strategy and innovation, implementing AI solutions and modern architectures.',
    highlights: ['Reduced system runtime by 85%', 'Increased user engagement by 60%', 'Managed third-party integrations (Payment Gateways)']
  },
  {
    year: '2019 - 2021',
    role: 'Chief Technology Officer',
    company: 'Food Darzee (3CAD Hospitality LLP)',
    description: 'Spearheaded new product verticals and ERP systems, automating processes and enhancing efficiency.',
    highlights: ['Improved operational efficiency by 75%', 'Integrated DevOps using GitHub Actions', 'Managed PayTM, PhonePe integrations']
  },
  {
    year: '2019',
    role: 'Chief Technology Officer',
    company: 'EasyTech Innovations',
    description: 'Handled client delivery for multiple ERP systems and managed the SAAS product OnFees.',
    highlights: ['Enhanced user satisfaction by 100% (OnFees)', 'Improved project success rates by 60%']
  },
  {
    year: '2015 - 2018',
    role: 'Chief Technology Officer',
    company: 'IndieFolio Network',
    description: 'Architected and maintained 20+ online properties without downtime.',
    highlights: ['Created serverless image handler (AWS Lambda)', 'Developed color search algorithm using Elasticsearch']
  },
  {
    year: '2015',
    role: 'Sr. Web Developer',
    company: 'CouponDunia',
    description: 'Architected and developed CashBoss Android App and backend.',
    highlights: ['Implemented Restful APIs for Android', 'Developed Yii2 based backend']
  },
  {
    year: '2013 - 2014',
    role: 'Software Architect',
    company: 'ePaisa Services',
    description: 'Managed and designed web and mobile applications, ensuring PCI DSS compliance.',
    highlights: ['Maintained and managed applications and web servers', 'Aligned technology with market trends']
  }
]