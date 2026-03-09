import { projects } from '@/data/projects'

const safeJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://w1d.pro/#person',
  name: 'Wenceslaus Dsilva',
  jobTitle: 'Chief Technology Officer',
  url: 'https://w1d.pro',
  image: 'https://w1d.pro/images/hero/profile.jpg',
  description:
    'CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud infrastructure, and high-scale product engineering.',
  sameAs: [
    'https://linkedin.com/in/wenceslaus-dsilva',
    'https://github.com/deadmantfa',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'St. Andrews College, Mumbai University',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Rooftop',
  },
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
  knowsAbout: [
    'Software Architecture',
    'Cloud Computing',
    'Technical Leadership',
    'Scalable Systems',
    'Serverless Architecture',
    'AI/ML Systems',
    'Next.js',
    'Three.js',
  ],
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
