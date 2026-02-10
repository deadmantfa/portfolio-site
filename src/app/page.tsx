'use client'

import { useEffect, useState } from 'react'
import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'
import Timeline from '@/components/Timeline'
import { careerData } from '@/data/career'

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      ;(window as any).scrollProgress = progress
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen text-white selection:bg-primary/30">
      {/* 3D Background - Solid fixed layer */}
      <SceneCanvas>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#fbbf24" />
        <ArchitecturalGrid />
        <Timeline />
      </SceneCanvas>

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-8 text-center bg-transparent">
        <div className="max-w-6xl">
          <div className="inline-block px-4 py-1.5 rounded-full glass mb-8 font-mono text-[10px] tracking-[0.4em] uppercase text-primary">
            Chief Technology Officer
          </div>
          
          <h1 className="text-[15vw] md:text-[12rem] leading-[0.8] tracking-tighter font-serif italic mb-12">
            The Visionary <br/> 
            <span className="text-primary pr-4">Architect.</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-light text-zinc-400 leading-relaxed font-sans">
              20+ years of pioneering technical excellence and strategic leadership at the intersection of high-scale engineering and business innovation.
            </p>
            <div className="flex flex-col justify-end border-l border-white/10 pl-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Current Epoch</p>
              <p className="text-xl text-zinc-200 font-serif italic">Driving Scalable Growth @ Rooftop</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="h-24 w-px bg-gradient-to-b from-primary/50 to-transparent"></div>
          <span className="vertical-text text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-600">Explore Journey</span>
        </div>
      </section>

      {/* Career Epochs: High-End Card Layout */}
      <div className="relative z-10 space-y-[20vh] pb-[20vh]">
        {careerData.map((milestone, index) => (
          <section
            key={index}
            className="flex min-h-screen w-full flex-col items-center justify-center px-8 md:px-24"
          >
            <div className={`w-full flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="relative max-w-4xl w-full">
                {/* Visual number backdrop */}
                <div className="absolute -top-24 -left-12 opacity-[0.05] text-[15rem] md:text-[25rem] font-serif italic select-none pointer-events-none leading-none">
                  {index + 1}
                </div>

                <div className="glass p-8 md:p-16 rounded-[2rem] relative overflow-hidden group">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">{milestone.year}</span>
                    <div className="h-px w-24 bg-white/10"></div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">{milestone.company}</span>
                  </div>

                  <h2 className="text-4xl md:text-7xl font-serif italic text-white mb-6 leading-tight">
                    {milestone.role}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl font-sans">
                    {milestone.description}
                  </p>

                  {milestone.highlights && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
                      {milestone.highlights.map((h, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-primary font-mono text-xs">/0{i+1}</span>
                          <p className="text-sm text-zinc-300 font-light leading-snug">{h}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Technical authority section with specific skills usage */}
        <section id="skills" className="min-h-screen flex flex-col items-center justify-center px-8 py-32">
          <div className="max-w-5xl w-full glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <h2 className="text-6xl md:text-[10rem] font-serif italic mb-12 leading-none">The <span className="text-primary">Ecosystem.</span></h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 mt-16">
              {['Three.js', 'React', 'Next.js', 'AWS', 'Python', 'Tailwind', 'PHP', 'TypeScript'].map((skill) => (
                <div key={skill} className="bg-black/40 p-8 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors group">
                  <span className="font-mono text-[10px] text-zinc-500 mb-4 group-hover:text-primary transition-colors">MODULE</span>
                  <span className="text-lg font-serif italic tracking-wide">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing / Contact */}
        <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <h2 className="text-7xl md:text-[15rem] font-serif italic tracking-tighter leading-[0.7] mb-20">
            Let's <br/> <span className="text-primary">Connect.</span>
          </h2>
          <a
            href="mailto:wenceslausdsilva@gmail.com"
            className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl font-serif italic hover:text-primary transition-colors"
          >
            wenceslausdsilva@gmail.com
            <div className="h-px w-0 group-hover:w-12 bg-primary transition-all duration-500"></div>
          </a>
        </section>
      </div>
    </main>
  )
}
