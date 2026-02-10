import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'

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
    <main className="relative min-h-screen text-white pt-32 pb-20 px-8 md:px-24 bg-black">
      {/* 3D Background */}
      <SceneCanvas>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <ArchitecturalGrid />
      </SceneCanvas>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.4em]">Case Study / 0{projects.indexOf(project) + 1}</span>
            <div className="h-px w-12 bg-primary/30"></div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em]">{project.period}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-8 leading-[0.9] tracking-tighter text-balance">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-8 items-baseline">
            <h2 className="text-2xl font-mono text-accent uppercase tracking-widest">{project.company}</h2>
            <span className="text-zinc-600 font-serif italic text-xl">{project.role}</span>
          </div>
        </header>
        
        {/* Grid Layout for Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-24">
            
            <section>
              <h3 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                The Challenge <div className="h-px flex-grow bg-white/5"></div>
              </h3>
              <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed font-sans">
                {project.challenge}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                Architectural Decisions <div className="h-px flex-grow bg-white/5"></div>
              </h3>
              <div className="space-y-12">
                {project.adrs.map((adr, i) => (
                  <div key={i} className="glass p-8 md:p-12 rounded-[2rem]">
                    <span className="text-xs font-mono text-zinc-500 block mb-4">ADR-0{i+1}</span>
                    <h4 className="text-2xl md:text-3xl font-serif italic text-white mb-4">{adr.title}</h4>
                    <p className="text-indigo-400 font-mono text-sm mb-6">{adr.decision}</p>
                    <p className="text-zinc-400 leading-relaxed">{adr.rationale}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-16">
            
            <section className="glass p-8 rounded-[2rem] border-primary/10">
              <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-8">Strategic Impact</h3>
              <div className="space-y-8">
                {project.highlights.map((h, i) => (
                  <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                    <span className="text-4xl md:text-5xl font-serif italic text-white block mb-1">{h.value}</span>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{h.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-8">Technical Ecosystem</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  )
}
