import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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
    description: project.challenge,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-black text-white pt-32 pb-20 px-8 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Placeholder for Editorial UI - to be implemented in Phase 2 */}
        <header className="mb-20">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.4em] mb-4 block">Case Study</span>
          <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">{project.title}</h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl">{project.challenge}</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-serif italic mb-4">The Challenge</h2>
            <p className="text-zinc-400 font-sans leading-relaxed">{project.challenge}</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-serif italic mb-4">Strategic Impact</h2>
            <p className="text-zinc-400 font-sans leading-relaxed">{project.impact}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
