'use client'

import { usePathname } from 'next/navigation'

const StructuredData = () => {
  const pathname = usePathname()
  const isProjectPage = pathname?.startsWith('/work/')
  const projectSlug = isProjectPage ? pathname.split('/').pop() : null

  const safeJsonLd = (data: any) => {
    return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
  }

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

  const breadcrumbSchema = isProjectPage ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wenceslaus.pro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Work",
        "item": "https://wenceslaus.pro/#epochs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": projectSlug?.charAt(0).toUpperCase() + (projectSlug?.slice(1) || ''),
        "item": `https://wenceslaus.pro${pathname}`
      }
    ]
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
        />
      )}
    </>
  )
}

export default StructuredData
