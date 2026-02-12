'use client'

const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Wenceslaus Dsilva",
    "jobTitle": "Chief Technology Officer",
    "url": "https://wenceslaus.pro",
    "sameAs": [
      "https://linkedin.com/in/wenceslaus-dsilva",
      "https://github.com/deadmantfa"
    ],
    "description": "20+ years of technical leadership and architectural excellence.",
    "knowsAbout": [
      "Software Architecture",
      "Cloud Computing",
      "Technical Leadership",
      "Scalable Systems",
      "Next.js",
      "Three.js"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default StructuredData
