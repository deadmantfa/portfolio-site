'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

type Section = 'epochs' | 'skills' | 'contact'

const sectionLabels: Record<Section, string> = {
  epochs: 'Epochs',
  skills: 'Ecosystem',
  contact: 'Contact',
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<Record<Section, HTMLAnchorElement | null>>({
    epochs: null,
    skills: null,
    contact: null,
  })
  const logoHoverRef = useRef<HTMLSpanElement>(null)

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sections: Section[] = ['epochs', 'skills', 'contact']
    const observers = sections.map((section) => {
      const element = document.getElementById(section)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section)
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(element)
      return { observer, element }
    })

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element)
      })
    }
  }, [])

  // Animate indicator on activeSection change
  useEffect(() => {
    if (!indicatorRef.current) return

    const linkEl = activeSection ? linkRefs.current[activeSection] : null

    if (!linkEl) {
      if (!prefersReducedMotion()) {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
      return
    }

    if (!prefersReducedMotion()) {
      gsap.to(indicatorRef.current, {
        x: linkEl.offsetLeft,
        width: linkEl.offsetWidth,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
      })
    } else {
      // Instant positioning for reduced motion
      indicatorRef.current.style.transform = `translateX(${linkEl.offsetLeft}px)`
      indicatorRef.current.style.width = `${linkEl.offsetWidth}px`
      indicatorRef.current.style.opacity = '1'
    }
  }, [activeSection])

  const handleClick = (section: Section) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const linkEl = linkRefs.current[section]
    if (linkEl && !prefersReducedMotion()) {
      gsap.timeline().to(linkEl, { scale: 0.92, duration: 0.1, ease: 'power2.in' }).to(linkEl, { scale: 1, duration: 0.2, ease: 'back.out(2)' })
    }
  }

  const handleMouseEnter = (section: Section) => {
    const linkEl = linkRefs.current[section]
    if (linkEl && activeSection !== section && !prefersReducedMotion()) {
      gsap.to(linkEl, { y: -2, duration: 0.18, ease: 'power2.out' })
    }
  }

  const handleMouseLeave = (section: Section) => {
    const linkEl = linkRefs.current[section]
    if (linkEl && activeSection !== section && !prefersReducedMotion()) {
      gsap.to(linkEl, { y: 0, duration: 0.18, ease: 'power2.out' })
    }
  }

  const handleLogoHover = (enter: boolean) => {
    if (!logoHoverRef.current || prefersReducedMotion()) return

    if (enter) {
      gsap.to(logoHoverRef.current, {
        scale: 1.3,
        duration: 0.3,
        ease: 'back.out(2)',
      })
    } else {
      gsap.to(logoHoverRef.current, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-7xl">
      <div className="glass px-6 py-4 rounded-full flex items-center justify-between">
        <div className="text-2xl font-serif italic font-bold tracking-tighter text-white group">
          <Link
            href="/"
            aria-label="Wenceslaus Dsilva - Home"
            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg px-2"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
          >
            W<span ref={logoHoverRef} className="text-primary group-hover:text-white transition-colors duration-500 inline-block">.</span>D
          </Link>
        </div>

        <div className="flex items-center gap-8 md:gap-12">
          <div className="hidden relative space-x-8 md:space-x-12 text-[11px] font-mono uppercase tracking-[0.3em] md:flex">
            {/* Sliding indicator pill */}
            <span
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] bg-primary rounded-full opacity-0 shadow-[0_0_8px_var(--color-primary)]"
              aria-hidden="true"
              style={{ width: 0 }}
            />

            {/* Navigation links */}
            {(Object.keys(sectionLabels) as Section[]).map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                ref={(el) => {
                  linkRefs.current[section] = el
                }}
                onClick={handleClick(section)}
                onMouseEnter={() => handleMouseEnter(section)}
                onMouseLeave={() => handleMouseLeave(section)}
                className={`relative z-10 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded px-2 ${
                  activeSection === section ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'
                }`}
              >
                {sectionLabels[section]}
              </Link>
            ))}
          </div>

          <a
            href="/CV/Wenceslaus-Dsilva-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Curriculum Vitae (PDF)"
            className="bg-white/10 hover:bg-primary px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-foreground hover:text-background transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            CV
          </a>
        </div>
      </div>
    </nav>
  )
}

export { Navigation }
