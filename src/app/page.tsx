'use client'

import { useEffect, useState, useRef } from 'react'
import { careerData } from '@/data/career'
import { projects } from '@/data/projects'
import Link from 'next/link'
import EditorialReveal from '@/components/EditorialReveal'
import BackgroundMarkers from '@/components/BackgroundMarkers'
import { useScroll } from '@/components/ScrollProvider'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ProfileGlitch } from '@/components/ProfileGlitch'

const SkillsGrid = dynamic(() => import('@/components/SkillsGrid').then(m => m.SkillsGrid), { ssr: false })
const OpenSourceShowcase = dynamic(() => import('@/components/OpenSourceShowcase').then(m => m.OpenSourceShowcase), { ssr: false })
const TestimonialsCarousel = dynamic(() => import('@/components/TestimonialsCarousel').then(m => m.TestimonialsCarousel), { ssr: false })
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false })
const SocialLinks = dynamic(() => import('@/components/SocialLinks'), { ssr: false })

// Dynamically import the heavy 3D scene
// loading: () => null prevents flash of unstyled content or heavy loading state, 
// keeping the background markers visible
const HomeScene = dynamic(() => import('@/components/HomeScene'), { 
  ssr: false,
})

export default function Home() {
  const { setActiveCredential } = useScroll()
  
  const skillsSectionRef = useRef<HTMLDivElement>(null!)
  const labSectionRef = useRef<HTMLDivElement>(null!)
  const vaultSectionRef = useRef<HTMLDivElement>(null!)
  const contactSectionRef = useRef<HTMLDivElement>(null!)
  const [skillsProgress, setSkillsProgress] = useState(0)
  const [skillsExitProgress, setSkillsExitProgress] = useState(0)
  const [labProgress, setLabProgress] = useState(0)
  const [vaultProgress, setVaultProgress] = useState(0)
  const [contactProgress, setContactProgress] = useState(0)
  const [showScene, setShowScene] = useState(false)
  const [materializeStage, setMaterializeStage] = useState<'idle' | 'spark' | 'cloud' | 'scan' | 'complete'>('idle')

  const sequenceStarted = useRef(false)

  useEffect(() => {
    // Strict guard to prevent multiple triggers or skips
    if (sequenceStarted.current) return
    sequenceStarted.current = true
    
    const sequence = async () => {
      setMaterializeStage('idle')
      setShowScene(true)
      
      // Stage 1: Spark
      await new Promise(resolve => setTimeout(resolve, 500))
      setMaterializeStage('spark')
      
      // Stage 2: Cloud
      await new Promise(resolve => setTimeout(resolve, 1500))
      setMaterializeStage('cloud')
      
      // Stage 3: Scan
      await new Promise(resolve => setTimeout(resolve, 2500))
      setMaterializeStage('scan')
      
      // Stage 4: Complete
      await new Promise(resolve => setTimeout(resolve, 2000))
      setMaterializeStage('complete')
    }

    sequence()

    const handleScrollProgress = () => {
      if (skillsSectionRef.current) {
        const rect = skillsSectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const windowHeight = window.innerHeight
        
        // Assembly progress (0 to 1)
        if (rect.top < windowHeight && rect.bottom > 0) {
          const p = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + sectionHeight), 0), 1)
          setSkillsProgress(p)
        } else if (rect.top >= windowHeight) {
          setSkillsProgress(0)
        } else {
          setSkillsProgress(1)
        }

        // Exit progress (0 to 1 as we move past the section)
        if (rect.bottom < windowHeight) {
          const ep = Math.min(Math.max((windowHeight - rect.bottom) / windowHeight, 0), 1)
          setSkillsExitProgress(ep)
        } else {
          setSkillsExitProgress(0)
        }
      }

      if (labSectionRef.current) {
        const rect = labSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight) {
          const p = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1)
          setLabProgress(p)
        } else {
          setLabProgress(0)
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
    return () => {
      window.removeEventListener('scroll', handleScrollProgress)
    }
  }, [])

  return (
    <main className="relative min-h-screen text-white selection:bg-primary/30">
      {/* 3D Experience - Background Interaction Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundMarkers />
        {showScene && (
          <HomeScene
            progress={skillsProgress * 2.0}
            exitProgress={skillsExitProgress}
            vaultProgress={vaultProgress}
            contactProgress={contactProgress}
            materializeStage={materializeStage}
            skillsProgress={skillsProgress}
            labProgress={labProgress}
          />
        )}
      </div>

      {/* Content Layer (on top) */}
      <div className="relative z-10">
        <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center px-8 text-center bg-transparent">
          <div className="max-w-6xl">
            <p className="font-mono text-[13px] tracking-[0.3em] uppercase text-zinc-400 mb-3 animate-reveal">
              Wenceslaus Dsilva
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full glass mb-8 font-mono text-[11px] tracking-[0.4em] uppercase text-primary animate-reveal">
              Chief Technology Officer
            </div>
            <div className="mb-8 animate-reveal hidden" style={{ animationDelay: '0.1s' }}>
              <ProfileGlitch
                src="/images/hero/profile.jpg"
                alt="Wenceslaus Dsilva - CTO & Architect"
                glitchIntensity={8}
                glitchFrequency={0.15}
              />
            </div>
            <h1 className="text-[15vw] md:text-[12rem] leading-[0.8] tracking-tighter font-serif italic mb-12">
              The Visionary <br/> 
              <span className="text-primary pr-4">Architect.</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto animate-reveal" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl font-light text-zinc-400 leading-relaxed font-sans">
                20+ years of pioneering technical excellence and strategic leadership at the intersection of high-scale engineering and business innovation.
              </p>
              <div className="flex flex-col justify-end border-l border-white/10 pl-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-2">Current Epoch</p>
                <p className="text-xl text-zinc-200 font-serif italic">Driving Scalable Growth @ Rooftop</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="h-24 w-px bg-gradient-to-b from-primary/50 to-transparent"></div>
            <span className="vertical-text text-[11px] font-mono uppercase tracking-[0.5em] text-zinc-400">Explore Journey</span>
          </div>
        </section>

        <div
          id="epochs"
          className="relative pb-[20vh]"
        >
          {/* Continuous Journey Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent -translate-x-1/2 z-0 hidden md:block"></div>
          
          {careerData.map((milestone, index) => (
            <section key={index} className="flex min-h-screen w-full flex-col items-center justify-center px-8 md:px-24 bg-transparent relative">
              <div className={`w-full flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className="relative max-w-4xl w-full">
                  <div className="absolute -top-24 -left-12 opacity-[0.05] text-[15rem] md:text-[25rem] font-serif italic select-none pointer-events-none leading-none">
                    {index + 1}
                  </div>
                  <div className="glass p-8 md:p-16 rounded-[2rem] relative overflow-hidden group cursor-pointer hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary/50 outline-none transition-all pointer-events-auto">
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
                            className="inline-flex items-center gap-2 group/btn pointer-events-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-full p-1 cursor-pointer"
                            aria-label={`Read Case Study — ${project.company}`}
                            title={`View ${project.company} case study`}
                          >
                            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 group-hover/btn:text-primary transition-colors">Read Case Study</span>
                            <div className="size-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-primary/50 transition-colors text-zinc-400 group-hover/btn:text-primary">→</div>
                          </Link>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section
          id="skills"
          ref={skillsSectionRef}
          className="md:min-h-[150vh] min-h-screen flex flex-col items-center px-8 relative bg-transparent"
          style={{ isolation: 'isolate' }}
        >
          <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center pointer-events-none z-40 relative">
            <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none"></div>
            {/* Nebula Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none"></div>
            
            <div className="max-w-7xl w-full flex flex-col justify-start p-8 md:p-24 z-10 pointer-events-none overflow-visible">
              <EditorialReveal direction="down">
                <h2 className="text-6xl md:text-[8rem] font-serif italic leading-none opacity-5 uppercase tracking-tighter pointer-events-none">Ecosystem.</h2>
              </EditorialReveal>

              <div className="pointer-events-auto py-6 pb-32">
                <SkillsGrid />
              </div>
            </div>
          </div>
        </section>

        <section
          id="lab"
          ref={labSectionRef}
          className="relative py-32 md:py-24 px-6 md:px-8 flex flex-col items-center bg-transparent"
        >
          <div className="max-w-7xl w-full">
            <OpenSourceShowcase />
          </div>
        </section>

        <section id="vault" ref={vaultSectionRef} className="md:min-h-[200vh] min-h-screen flex flex-col items-center px-8 relative bg-transparent">
          <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center pointer-events-none relative">
            <div className="max-w-7xl w-full text-center z-10 pointer-events-none">
              <EditorialReveal direction="down">
                <span className="font-mono text-[11px] text-primary uppercase tracking-[0.5em] mb-4 block">The Vault</span>
                <h2 className="text-6xl md:text-[8rem] font-serif italic leading-none text-white uppercase tracking-tighter mb-12">Credentials.</h2>
              </EditorialReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-12 md:mt-24 px-6 md:px-0">
                <div
                  tabIndex={0}
                  onMouseEnter={() => setActiveCredential('edu')}
                  onMouseLeave={() => setActiveCredential(null)}
                  onFocus={() => setActiveCredential('edu')}
                  onBlur={() => setActiveCredential(null)}
                  className="glass p-8 rounded-3xl opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-all pointer-events-auto group cursor-pointer"
                  aria-label="Education: B.Sc Information Technology from St. Andrews College, Mumbai University"
                  role="button"
                >
                  <p className="text-zinc-400 group-hover:text-primary transition-colors text-sm font-mono mb-2 uppercase tracking-widest">Education</p>
                  <h3 className="text-2xl text-white font-serif italic mb-4">B.Sc Information Technology</h3>
                  <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full transition-all duration-500"></div>
                  <p className="text-zinc-400 text-xs uppercase tracking-tighter">St. Andrews College, Mumbai University</p>
                </div>

                <div
                  tabIndex={0}
                  onMouseEnter={() => setActiveCredential('cert1')}
                  onMouseLeave={() => setActiveCredential(null)}
                  onFocus={() => setActiveCredential('cert1')}
                  onBlur={() => setActiveCredential(null)}
                  className="glass p-8 rounded-3xl opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-all pointer-events-auto group cursor-pointer"
                  aria-label="Certification: Elasticsearch Certified Engineer"
                  role="button"
                >
                  <p className="text-zinc-400 group-hover:text-primary transition-colors text-sm font-mono mb-2 uppercase tracking-widest">Certification</p>
                  <h3 className="text-2xl text-white font-serif italic mb-4">Elasticsearch Engineer</h3>
                  <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full transition-all duration-500"></div>
                  <p className="text-zinc-400 text-xs uppercase tracking-tighter">Elite specialized engineering certification.</p>
                </div>

                <div
                  tabIndex={0}
                  onMouseEnter={() => setActiveCredential('cert2')}
                  onMouseLeave={() => setActiveCredential(null)}
                  onFocus={() => setActiveCredential('cert2')}
                  onBlur={() => setActiveCredential(null)}
                  className="glass p-8 rounded-3xl opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-all pointer-events-auto group cursor-pointer"
                  aria-label="Certification: Google Cloud Professional Architect"
                  role="button"
                >
                  <p className="text-zinc-400 group-hover:text-primary transition-colors text-sm font-mono mb-2 uppercase tracking-widest">Certification</p>
                  <h3 className="text-2xl text-white font-serif italic mb-4">Google Cloud Professional</h3>
                  <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full transition-all duration-500"></div>
                  <p className="text-zinc-400 text-xs uppercase tracking-tighter">Cloud Infrastructure & Solution Architecting.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="signals"
          className="relative py-32 md:py-24 px-6 md:px-8 flex flex-col items-center bg-transparent"
        >
          <div className="max-w-7xl w-full">
            <TestimonialsCarousel />
          </div>
        </section>

        <section id="contact" ref={contactSectionRef} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 text-center bg-transparent relative pointer-events-auto py-16 md:py-12">  
          <EditorialReveal direction="up" className="mb-8">
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-tight">Let&apos;s <br/> <span className="text-primary pr-4">Connect.</span></h2>
          </EditorialReveal>
          
          <div className="max-w-4xl w-full flex flex-col items-center gap-8">
            <ContactForm />
            <SocialLinks />
          </div>
          <p className="mt-12 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-700">
            <a href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy Policy</a>
            <span className="mx-3">·</span>
            <span>© {new Date().getFullYear()} Wenceslaus Dsilva</span>
          </p>
        </section>
      </div>
    </main>
  )
}
