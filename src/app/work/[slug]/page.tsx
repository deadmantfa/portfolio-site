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

  return {
    title: `${project.company} | ${project.role}`,
    description: `${project.narrative.vision} - ${project.challenge}`,
    keywords: [...project.techStack, project.role, project.company, 'Software Architecture', 'Case Study'],
    alternates: {
      canonical: `https://w1d.pro/work/${slug}`,
    },
    openGraph: {
      title: `${project.company} - Architectural Case Study`,
      description: project.narrative.vision,
      type: 'article',
      section: 'Technology',
      tags: project.techStack,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.company} | Wenceslaus Dsilva`,
      description: project.impact,
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
