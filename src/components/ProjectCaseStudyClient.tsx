'use client'

import { useState } from 'react'
import { ProjectCaseStudy, projects } from '@/data/projects'
import Link from 'next/link'
import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'
import BlueprintOverlay from '@/components/BlueprintOverlay'
import BlueprintSchema from '@/components/BlueprintSchema'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectCaseStudyClientProps {
  project: ProjectCaseStudy
}

export default function ProjectCaseStudyClient({ project }: ProjectCaseStudyClientProps) {
  const [isBlueprintMode, setIsBlueprintMode] = useState(false)

  return (
    <main className="relative min-h-screen text-white pt-32 pb-20 px-8 md:px-24 selection:bg-primary/30">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <SceneCanvas>
          <ambientLight intensity={isBlueprintMode ? 0.05 : 0.1} />
          <pointLight position={[10, 10, 10]} intensity={isBlueprintMode ? 0.5 : 1} color={isBlueprintMode ? "#14b8a6" : "#6366f1"} />
          
          <ArchitecturalGrid isBlueprint={isBlueprintMode} />
          
          {isBlueprintMode && <BlueprintSchema blueprint={project.blueprint} />}
        </SceneCanvas>
      </div>

      {/* Blueprint Mode Overlay */}
      <AnimatePresence>
        {isBlueprintMode && <BlueprintOverlay project={project} />}
      </AnimatePresence>

      {/* Blueprint Toggle Button */}
      <button 
        onClick={() => setIsBlueprintMode(!isBlueprintMode)}
        className="fixed bottom-12 right-12 z-[100] flex flex-col items-end group"
        aria-label="Toggle Blueprint Mode"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] mb-4 text-zinc-500 group-hover:text-primary transition-colors">
          {isBlueprintMode ? 'Close Schema' : 'View Blueprint'}
        </span>
        <div className={`size-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isBlueprintMode ? 'border-primary bg-primary text-black' : 'border-white/10 text-white hover:border-primary/50'}`}>
          <div className="relative size-6">
            <motion.div 
              animate={{ rotate: isBlueprintMode ? 45 : 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isBlueprintMode ? '×' : '+'}
            </motion.div>
          </div>
        </div>
      </button>

      <div className={`relative z-10 max-w-6xl mx-auto transition-opacity duration-1000 ${isBlueprintMode ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center gap-4 group">
            <div className="size-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors text-zinc-500 group-hover:text-primary">
              ←
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-300 transition-colors">Return to Epochs</span>
          </Link>
        </nav>

        {/* Header Section */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] text-primary uppercase tracking-[0.4em]">Case Study / 0{projects.indexOf(project) + 1}</span>
            <div className="h-px w-12 bg-primary/30"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.4em]">{project.period}</span>
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
              <h3 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                The Narrative <div className="h-px flex-grow bg-white/5"></div>
              </h3>
              <div className="space-y-16">
                <div className="group">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 block">01 / Vision</span>
                  <p className="text-2xl md:text-3xl text-zinc-200 font-serif italic leading-relaxed">
                    "{project.narrative.vision}"
                  </p>
                </div>
                <div className="group">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 block">02 / Execution</span>
                  <p className="text-lg md:text-xl text-zinc-400 font-sans leading-relaxed">
                    {project.narrative.execution}
                  </p>
                </div>
                <div className="group">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 block">03 / Result</span>
                  <p className="text-lg md:text-xl text-zinc-400 font-sans leading-relaxed">
                    {project.narrative.result}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                Strategic Decisions <div className="h-px flex-grow bg-white/5"></div>
              </h3>
              <div className="space-y-12">
                {project.adrs.map((adr, i) => (
                  <div key={i} className="glass p-8 md:p-12 rounded-[2rem] hover:border-primary/20 transition-colors">
                    <span className="text-[10px] font-mono text-zinc-500 block mb-6 uppercase tracking-widest">Architectural Decision Record #0{i+1}</span>
                    <h4 className="text-3xl md:text-4xl font-serif italic text-white mb-8">{adr.title}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <span className="text-[9px] font-mono text-primary uppercase tracking-widest mb-2 block">The Problem</span>
                        <p className="text-sm text-zinc-400 leading-relaxed font-sans">{adr.problem}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-accent uppercase tracking-widest mb-2 block">The Solution</span>
                        <p className="text-sm text-zinc-400 leading-relaxed font-sans">{adr.solution}</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block">Measurable Impact</span>
                      <p className="text-sm text-zinc-200 font-mono italic">{adr.impact}</p>
                    </div>
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
                  <span key={tech} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 tracking-widest">
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
