'use client'

import { useEffect, useState, useRef } from 'react'
import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'
import SkillNebula from '@/components/SkillNebula'
import VaultScene from '@/components/VaultScene'
import ConnectionScene from '@/components/ConnectionScene'
import ContactForm from '@/components/ContactForm'
import SocialLinks from '@/components/SocialLinks'
import { careerData } from '@/data/career'
import { skillModules, SkillModule } from '@/data/skills'
import { projects } from '@/data/projects'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import EditorialReveal from '@/components/EditorialReveal'
import BackgroundMarkers from '@/components/BackgroundMarkers'
import { useScroll, ScrollContext } from '@/components/ScrollProvider'
import { useContextBridge } from '@react-three/drei'

export default function Home() {
  const { scrollProgress, activeSkill, setActiveCredential } = useScroll()
  const ContextBridge = useContextBridge(ScrollContext)
  
  const skillsSectionRef = useRef<HTMLDivElement>(null!)
  const vaultSectionRef = useRef<HTMLDivElement>(null!)
  const contactSectionRef = useRef<HTMLDivElement>(null!)
  const [skillsProgress, setSkillsProgress] = useState(0)
  const [vaultProgress, setVaultProgress] = useState(0)
  const [contactProgress, setContactProgress] = useState(0)

  useEffect(() => {
    const handleScrollProgress = () => {
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

      if (vaultSectionRef.current) {
        const rect = vaultSectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const windowHeight = window.innerHeight
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const p = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + sectionHeight), 0), 1)
          setVaultProgress(p)
        } else if (rect.top >= windowHeight) {
          setVaultProgress(0)
        } else {
          setVaultProgress(1)
        }
      }

      if (contactSectionRef.current) {
        const rect = contactSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        if (rect.top < windowHeight) {
          const p = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1)
          setContactProgress(p)
        } else {
          setContactProgress(0)
        }
      }
    }

    window.addEventListener('scroll', handleScrollProgress, { passive: true })
    handleScrollProgress()
    return () => window.removeEventListener('scroll', handleScrollProgress)
  }, [])

  return (
    <main className="relative min-h-screen text-white selection:bg-primary/30 pointer-events-none">
      {/* 3D Experience - Background Interaction Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundMarkers />
        <SceneCanvas>
          <ContextBridge>
            {/* Brighter, more consistent global lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 10]} intensity={2} color="#6366f1" />
            <pointLight position={[-10, -10, 5]} intensity={1} color="#fbbf24" />
            
            <ArchitecturalGrid />
            <SkillNebula progress={skillsProgress * 1.5} />
            <VaultScene progress={vaultProgress} />
            <ConnectionScene progress={contactProgress} />
          </ContextBridge>
        </SceneCanvas>
      </div>

      {/* Content Layer (on top) */}
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

      <div id="epochs" className="relative pb-[20vh] pointer-events-none">
        {/* Continuous Journey Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent -translate-x-1/2 z-0 hidden md:block"></div>
        
        {careerData.map((milestone, index) => (
          <section key={index} className="flex min-h-screen w-full flex-col items-center justify-center px-8 md:px-24 pointer-events-none bg-transparent relative">
            {/* Year Node */}
            <div className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
              <div className="size-3 rounded-full bg-primary shadow-[0_0_15px_rgba(111,114,241,0.5)]"></div>
              <div className="absolute left-8 px-3 py-1 rounded-full glass border-primary/20 opacity-40">
                <span className="font-mono text-[10px] text-primary whitespace-nowrap tracking-widest">{milestone.year}</span>
              </div>
            </div>

            <div className={`w-full flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="relative max-w-4xl w-full">
                <div className="absolute -top-24 -left-12 opacity-[0.05] text-[15rem] md:text-[25rem] font-serif italic select-none pointer-events-none leading-none">
                  {index + 1}
                </div>
                <div className="glass p-8 md:p-16 rounded-[2rem] relative overflow-hidden group cursor-pointer hover:border-primary/20 transition-colors pointer-events-auto">
                  <div className="absolute inset-0 tech-grid opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  
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
                    {(() => {
                      const project = projects.find(p => 
                        milestone.company.toLowerCase().includes(p.company.toLowerCase()) ||
                        p.company.toLowerCase().includes(milestone.company.toLowerCase())
                      )
                      return project && (
                        <Link 
                          href={`/work/${project.slug}`} 
                          className="inline-flex items-center gap-2 group/btn pointer-events-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-full p-1"
                          aria-label={`View ${milestone.company} case study`}
                        >
                          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 group-hover/btn:text-primary transition-colors">View Case Study</span>
                          <div className="size-8 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-primary/50 transition-colors text-zinc-500 group-hover/btn:text-primary">→</div>
                        </Link>
                      )
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

                <section id="skills" ref={skillsSectionRef} className="min-h-[300vh] flex flex-col items-center px-8 relative pointer-events-none bg-transparent">
                  <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none">
                    <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none"></div>
                    <div className="max-w-7xl w-full h-full flex flex-col justify-between p-8 md:p-24 z-10 pointer-events-none">
                      <EditorialReveal direction="down">
                        <h2 className="text-6xl md:text-[8rem] font-serif italic leading-none opacity-5 uppercase tracking-tighter pointer-events-none">Ecosystem.</h2>
                      </EditorialReveal>
                      
                      <div className="self-end max-w-sm w-full min-h-48 flex flex-col items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative z-20">
                        <AnimatePresence mode="wait">
                          {activeSkill ? (
                            <motion.div
                              key={activeSkill.name}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="text-left w-full"
                            >
                              <span className="font-mono text-[9px] text-primary uppercase tracking-[0.5em] mb-3 block">Module: {activeSkill.category}</span>
                              <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-4 uppercase tracking-tighter">{activeSkill.name}</h3>
                              <p className="text-sm md:text-base text-zinc-400 font-light italic leading-relaxed font-serif">
                                "{activeSkill.importance}"
                              </p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-left w-full opacity-40"
                            >
                              <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.5em] mb-3 font-bold">Assembly Active</p>
                              <p className="text-lg font-serif italic text-zinc-600">Dissect the monolith to reveal technical depth.</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </section>
        
                <section id="vault" ref={vaultSectionRef} className="min-h-[200vh] flex flex-col items-center px-8 relative pointer-events-none bg-transparent">
                  <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none">
                    <div className="max-w-7xl w-full text-center z-10 pointer-events-none">
                      <EditorialReveal direction="down">
                        <span className="font-mono text-[11px] text-primary uppercase tracking-[0.5em] mb-4 block">The Vault</span>
                        <h2 className="text-6xl md:text-[8rem] font-serif italic leading-none text-white uppercase tracking-tighter mb-12">Credentials.</h2>
                      </EditorialReveal>
                      
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
                      
                                                            <div 
                      
                                                              tabIndex={0} 
                      
                                                              onMouseEnter={() => setActiveCredential('edu')}
                      
                                                              onMouseLeave={() => setActiveCredential(null)}
                      
                                                              onFocus={() => setActiveCredential('edu')}
                      
                                                              onBlur={() => setActiveCredential(null)}
                      
                                                              className="glass p-8 rounded-3xl opacity-40 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-primary/50 outline-none transition-all pointer-events-auto group"
                      
                                                              aria-label="Education: B.Sc Information Technology from St. Andrews College, Mumbai University"
                      
                                                            >
                      
                                                              <p className="text-zinc-500 group-hover:text-primary transition-colors text-sm font-mono mb-2 uppercase tracking-widest">Education</p>
                      
                                                              <h3 className="text-2xl text-white font-serif italic mb-4">B.Sc Information Technology</h3>
                      
                                                              <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full transition-all duration-500"></div>
                      
                                                              <p className="text-zinc-500 text-xs uppercase tracking-tighter">St. Andrews College, Mumbai University</p>
                      
                                                            </div>
                      
                                                            <div 
                      
                                                              tabIndex={0} 
                      
                                                              onMouseEnter={() => setActiveCredential('cert1')}
                      
                                                              onMouseLeave={() => setActiveCredential(null)}
                      
                                                              onFocus={() => setActiveCredential('cert1')}
                      
                                                              onBlur={() => setActiveCredential(null)}
                      
                                                              className="glass p-8 rounded-3xl opacity-40 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-primary/50 outline-none transition-all pointer-events-auto group"
                      
                                                              aria-label="Certification: Elasticsearch Certified Engineer"
                      
                                                            >
                      
                                                              <p className="text-zinc-500 group-hover:text-primary transition-colors text-sm font-mono mb-2 uppercase tracking-widest">Certification</p>
                      
                                                              <h3 className="text-2xl text-white font-serif italic mb-4">Elasticsearch Engineer</h3>
                      
                                                              <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full transition-all duration-500"></div>
                      
                                                              <p className="text-zinc-500 text-xs uppercase tracking-tighter">Elite specialized engineering certification.</p>
                      
                                                            </div>
                      
                                                            <div 
                      
                                                              tabIndex={0} 
                      
                                                              onMouseEnter={() => setActiveCredential('cert2')}
                      
                                                              onMouseLeave={() => setActiveCredential(null)}
                      
                                                              onFocus={() => setActiveCredential('cert2')}
                      
                                                              onBlur={() => setActiveCredential(null)}
                      
                                                              className="glass p-8 rounded-3xl opacity-40 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-primary/50 outline-none transition-all pointer-events-auto group"
                      
                                                              aria-label="Certification: Google Cloud Professional Architect"
                      
                                                            >
                      
                                                              <p className="text-zinc-500 group-hover:text-primary transition-colors text-sm font-mono mb-2 uppercase tracking-widest">Certification</p>
                      
                                                              <h3 className="text-2xl text-white font-serif italic mb-4">Google Cloud Professional</h3>
                      
                                                              <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full transition-all duration-500"></div>
                      
                                                              <p className="text-zinc-500 text-xs uppercase tracking-tighter">Cloud Infrastructure & Solution Architecting.</p>
                      
                                                            </div>
                      
                                                          </div>
                      
                      
                    </div>
                  </div>
                </section>
                
                <section id="contact" ref={contactSectionRef} className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-transparent relative pointer-events-auto py-12">  
                  <EditorialReveal direction="up" className="mb-8">
                    <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-tight">Let's <br/> <span className="text-primary pr-4">Connect.</span></h2>
                  </EditorialReveal>
                  
                  <div className="max-w-4xl w-full flex flex-col items-center gap-8">
                    <ContactForm />
                    <SocialLinks />
                  </div>
                </section>
              </div>
    </div>
  </main>
)
}
