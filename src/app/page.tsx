'use client'

import { useEffect, useState, useRef } from 'react'
import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'
import Timeline from '@/components/Timeline'
import AssemblyScene from '@/components/AssemblyScene'
import { careerData } from '@/data/career'
import { skillModules, SkillModule } from '@/data/skills'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import EditorialReveal from '@/components/EditorialReveal'
import BackgroundMarkers from '@/components/BackgroundMarkers'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeEpoch, setActiveEpoch] = useState(0)
  const skillsSectionRef = useRef<HTMLDivElement>(null!)
  const [skillsProgress, setSkillsProgress] = useState(0)
  const [activeSkill, setActiveSkill] = useState<SkillModule | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(progress)
      ;(window as any).scrollProgress = progress

      // Track active epoch
      const sections = document.querySelectorAll('section')
      let currentEpoch = 0
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          // Subtract 1 because the first section is the hero
          currentEpoch = Math.max(0, index - 1)
        }
      })
      setActiveEpoch(currentEpoch)
      ;(window as any).activeEpoch = currentEpoch

      if (skillsSectionRef.current) {
        const rect = skillsSectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const windowHeight = window.innerHeight
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const p = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + sectionHeight), 0), 1)
          setSkillsProgress(p)
        } else if (rect.top >= windowHeight) {
          setSkillsProgress(0)
        } else {
          setSkillsProgress(1)
        }
      }
    }

    const interval = setInterval(() => {
      if ((window as any).activeSkill !== activeSkill) {
        setActiveSkill((window as any).activeSkill)
      }
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [activeSkill])

  return (
    <main className="relative min-h-screen text-white selection:bg-primary/30">
      {/* 3D Experience - Persistent Global Layer */}
      <div className="fixed inset-0 z-0 bg-black">
        <BackgroundMarkers />
        <SceneCanvas>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
          <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#fbbf24" />
          
          {/* All layers coexist; visibility handled by their internal logic/positions */}
          <ArchitecturalGrid />
          <Timeline />
          <AssemblyScene progress={skillsProgress * 3} />
        </SceneCanvas>
      </div>

      <div className="relative z-10 pointer-events-none">
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-8 text-center bg-transparent">
        <div className="max-w-6xl animate-reveal pointer-events-none">
          <div className="inline-block px-4 py-1.5 rounded-full glass mb-8 font-mono text-[11px] tracking-[0.4em] uppercase text-primary">
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
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-2">Current Epoch</p>
              <p className="text-xl text-zinc-200 font-serif italic">Driving Scalable Growth @ Rooftop</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="h-24 w-px bg-gradient-to-b from-primary/50 to-transparent"></div>
          <span className="vertical-text text-[11px] font-mono uppercase tracking-[0.5em] text-zinc-600">Explore Journey</span>
        </div>
      </section>

      <div className="relative z-20 space-y-[20vh] pb-[20vh] pointer-events-none">
        {careerData.map((milestone, index) => (
          <section key={index} className="flex min-h-screen w-full flex-col items-center justify-center px-8 md:px-24 pointer-events-none">
            <div className={`w-full flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="relative max-w-4xl w-full">
                <div className="absolute -top-24 -left-12 opacity-[0.05] text-[15rem] md:text-[25rem] font-serif italic select-none pointer-events-none leading-none">
                  {index + 1}
                </div>
                <div className="glass p-8 md:p-16 rounded-[2rem] relative overflow-hidden group cursor-pointer hover:border-primary/20 transition-colors pointer-events-auto">
                  <div className="absolute inset-0 tech-grid opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-12 relative z-10">
                    <span className="font-mono text-[11px] text-primary uppercase tracking-[0.3em]">{milestone.year}</span>
                    <div className="h-px w-24 bg-white/10"></div>
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.3em]">{milestone.company}</span>
                  </div>
                  <EditorialReveal direction="up" className="relative z-10">
                    <h2 className="text-5xl md:text-8xl font-serif italic text-white mb-10 leading-[0.9] tracking-tighter">{milestone.role}</h2>
                  </EditorialReveal>
                  <EditorialReveal direction="up" delay={0.2} className="relative z-10">
                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-12 max-w-2xl font-sans font-light">{milestone.description}</p>
                  </EditorialReveal>
                  <div className="flex flex-col md:flex-row justify-between items-end gap-10 pt-12 border-t border-white/5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                      {milestone.highlights?.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-primary font-mono text-xs">/0{i+1}</span>
                          <p className="text-sm text-zinc-300 font-light leading-snug">{h}</p>
                        </div>
                      ))}
                    </div>
                    {(index === 0 || index === 1 || index === 2) && (
                      <Link href={`/work/${index === 0 ? 'rooftop' : index === 1 ? 'food-darzee' : 'onfees'}`} className="inline-flex items-center gap-2 group/btn pointer-events-auto">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 group-hover/btn:text-primary transition-colors">View Case Study</span>
                        <div className="size-8 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-primary/50 transition-colors text-zinc-500 group-hover/btn:text-primary">→</div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="skills" ref={skillsSectionRef} className="min-h-[300vh] flex flex-col items-center px-8 relative pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
            <div className="absolute inset-0 tech-grid opacity-5"></div>
            <div className="max-w-5xl w-full text-center z-30 pointer-events-none">
              <EditorialReveal direction="down">
                <h2 className="text-6xl md:text-[10rem] font-serif italic mb-12 leading-none opacity-10 uppercase tracking-tighter">Ecosystem.</h2>
              </EditorialReveal>
              
              <div className="mt-24 max-w-2xl mx-auto h-48 flex flex-col items-center justify-center pointer-events-auto">
                <AnimatePresence mode="wait">
                  {activeSkill ? (
                    <motion.div
                      key={activeSkill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <span className="font-mono text-[11px] text-primary uppercase tracking-[0.5em] mb-4 block">Strategic Module: {activeSkill.category}</span>
                      <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-6 uppercase tracking-tighter">{activeSkill.name}</h3>
                      <p className="text-lg md:text-xl text-zinc-400 font-light italic max-w-lg mx-auto leading-relaxed font-serif">
                        "{activeSkill.importance}"
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center opacity-40"
                    >
                      <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.5em] mb-4 font-bold">Structural Assembly Active</p>
                      <p className="text-xl font-serif italic text-zinc-600">Dissect the monolith to reveal technical depth.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-transparent relative z-20">
          <h2 className="text-7xl md:text-[15rem] font-serif italic tracking-tighter leading-[0.7] mb-20">Let's <br/> <span className="text-primary">Connect.</span></h2>
          <a href="mailto:wenceslausdsilva@gmail.com" className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl font-serif italic hover:text-primary transition-colors font-light">
            wenceslausdsilva@gmail.com
            <div className="h-px w-0 group-hover:w-12 bg-primary transition-all duration-500"></div>
          </a>
        </section>
      </div>
    </div>
  </main>
)
}
