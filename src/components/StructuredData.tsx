import { skillModules } from '@/data/skills'

const safeJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://w1d.pro/#person',
  name: 'Wenceslaus Dsilva',
  alternateName: ['Wence Dsilva', 'deadmantfa'],
  jobTitle: 'Chief Technology Officer',
  url: 'https://w1d.pro',
  image: 'https://w1d.pro/images/hero/profile.jpg',
  description:
    'CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud infrastructure, and high-scale product engineering.',
  sameAs: [
    'https://linkedin.com/in/wenceslaus-dsilva',
    'https://github.com/deadmantfa',
    'https://x.com/deadmantfa',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'St. Andrews College, Mumbai University',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Rooftop',
    url: 'https://rooftopapp.com',
  },
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Chief Technology Officer',
      description: 'Executive technology leadership, system architecture, engineering scaling',
    },
    {
      '@type': 'Occupation',
      name: 'Software Architect',
      description: 'High-scale distributed systems, serverless architectures, and AI/ML pipelines',
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Elasticsearch Certified Engineer',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Cloud Professional Architect',
    },
  ],
  knowsAbout: skillModules.map((s) => s.name),
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://w1d.pro/#website',
  url: 'https://w1d.pro',
  name: 'Wenceslaus Dsilva Portfolio',
  description:
    'The professional portfolio of Wenceslaus Dsilva, CTO & Visionary Architect.',
  publisher: { '@id': 'https://w1d.pro/#person' },
}

export default StructuredData
export { StructuredData }

function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema as Record<string, unknown>) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema as Record<string, unknown>) }}
      />
    </>
  )
}
