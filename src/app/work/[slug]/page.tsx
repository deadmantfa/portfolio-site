import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProjectCaseStudyClient from '@/components/ProjectCaseStudyClient'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  const shortDescription = project.impact.length > 160
    ? project.impact.substring(0, 157) + '...'
    : project.impact

  return {
    title: `${project.title} | ${project.company} | Wenceslaus Dsilva`,
    description: shortDescription,
    keywords: [...project.techStack, project.role, project.company, 'Software Architecture', 'Case Study'],
    alternates: {
      canonical: `https://w1d.pro/work/${slug}`,
    },
    openGraph: {
      title: `${project.company} - Case Study`,
      description: shortDescription,
      type: 'article',
      section: 'Technology',
      tags: project.techStack,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.company} | CTO`,
      description: project.impact.length > 120 ? project.impact.substring(0, 117) + '...' : project.impact,
    }
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://w1d.pro' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://w1d.pro/#epochs' },
      { '@type': 'ListItem', position: 3, name: project.company, item: `https://w1d.pro/work/${slug}` },
    ],
  }).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <ProjectCaseStudyClient project={project} />
    </>
  )
}
