'use client'

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://wenceslaus.pro/#person",
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://wenceslaus.pro/#website",
    "url": "https://wenceslaus.pro",
    "name": "Wenceslaus Dsilva Portfolio",
    "description": "The professional portfolio of Wenceslaus Dsilva, Visionary Architect.",
    "publisher": { "@id": "https://wenceslaus.pro/#person" }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

export default StructuredData
