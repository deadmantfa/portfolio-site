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

  // Optimize description to 120-160 chars for SEO
  const shortDescription = project.narrative.vision.length > 160
    ? project.narrative.vision.substring(0, 157) + '...'
    : project.narrative.vision.length < 120
    ? project.narrative.vision + ' ' + project.challenge.substring(0, 30)
    : project.narrative.vision

  return {
    title: `${project.company} | CTO`,
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

  return <ProjectCaseStudyClient project={project} />
}
