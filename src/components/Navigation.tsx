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

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&|;:~`'

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

  // Logo glitch refs
  const wRef = useRef<HTMLSpanElement>(null)
  const dRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const firstWrapRef = useRef<HTMLSpanElement>(null)
  const lastWrapRef = useRef<HTMLSpanElement>(null)
  const spaceWrapRef = useRef<HTMLSpanElement>(null)
  const firstCharRefs = useRef<(HTMLSpanElement | null)[]>([])
  const lastCharRefs = useRef<(HTMLSpanElement | null)[]>([])
  const decodeIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([])
  const decodeTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isDecodingRef = useRef(false)

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

  const clearDecode = () => {
    decodeIntervalsRef.current.forEach(clearInterval)
    decodeTimersRef.current.forEach(clearTimeout)
    decodeIntervalsRef.current = []
    decodeTimersRef.current = []
  }

  const startDecode = (charRefs: (HTMLSpanElement | null)[], targets: string[], baseDelay: number) => {
    charRefs.forEach((span, i) => {
      if (!span) return

      const delay = baseDelay + i * 55 // 55ms stagger per char
      const cycleMs = 50 // SLOWER speed of each random char swap (was 38) - make visible
      const cycles = 8 + Math.floor(Math.random() * 3) + i // more cycles for later chars → wave feel

      const timer = setTimeout(() => {
        if (!span) return
        span.style.opacity = '1'
        span.style.color = 'var(--color-primary)' // start in indigo
        span.textContent = GLITCH_CHARS[0] // start with a glitch char visible

        let count = 0
        const interval = setInterval(() => {
          if (!span) {
            clearInterval(interval)
            return
          }
          if (count < cycles) {
            span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            count++
          } else {
            clearInterval(interval)
            span.textContent = targets[i]
            // Settle: indigo → white with a brief flash
            gsap.to(span, { color: '#ffffff', duration: 0.25, ease: 'power1.out' })
          }
        }, cycleMs)

        decodeIntervalsRef.current.push(interval)
      }, delay)

      decodeTimersRef.current.push(timer)
    })
  }

  const handleLogoHover = (enter: boolean) => {
    if (enter) {
      if (isDecodingRef.current) return // guard against rapid hover
      isDecodingRef.current = true
      clearDecode()

      if (!prefersReducedMotion()) {
        // 1. Dot exits dramatically
        gsap.to(dotRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.18,
          ease: 'back.in(2)',
        })

        // 2. Open suffix wrappers (width 0 → fixed width)
        const openWrapper = (el: HTMLSpanElement | null, targetWidth: number, delay = 0) => {
          if (!el) return
          setTimeout(() => {
            el.style.width = `${targetWidth}px`
          }, delay * 1000)
        }

        openWrapper(firstWrapRef.current, 150, 0) // opens immediately (enceslaus)
        openWrapper(spaceWrapRef.current, 1, 0.08) // slight delay (space)
        openWrapper(lastWrapRef.current, 120, 0.12) // last name opens just after (silva)

        // 3. Trigger decode (independent of GSAP — uses setInterval)
        startDecode(firstCharRefs.current, 'enceslaus'.split(''), 40)
        startDecode(lastCharRefs.current, 'silva'.split(''), 180)
      } else {
        // Reduced motion: instant swap, no animation
        dotRef.current!.style.opacity = '0'
        // Use fixed widths instead of 'auto' to prevent cutoff
        firstWrapRef.current!.style.width = '150px'
        spaceWrapRef.current!.style.width = '1px'
        lastWrapRef.current!.style.width = '120px'
        firstCharRefs.current.forEach((el, i) => {
          if (el) {
            el.textContent = 'enceslaus'[i]
            el.style.opacity = '1'
          }
        })
        lastCharRefs.current.forEach((el, i) => {
          if (el) {
            el.textContent = 'silva'[i]
            el.style.opacity = '1'
          }
        })
      }
    } else {
      clearDecode()
      isDecodingRef.current = false

      if (!prefersReducedMotion()) {
        // 1. Chars scramble out — one last burst then fade
        const allChars = [...firstCharRefs.current, ...lastCharRefs.current].filter(Boolean)
        gsap.to(allChars, {
          opacity: 0,
          duration: 0.12,
          stagger: 0.008,
          ease: 'power1.in',
        })

        // 2. Wrappers collapse
        gsap.to([firstWrapRef.current, spaceWrapRef.current, lastWrapRef.current], {
          width: 0,
          duration: 0.2,
          delay: 0.08,
          ease: 'power2.in',
        })

        // 3. Dot returns
        gsap.to(dotRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          delay: 0.15,
          ease: 'back.out(2)',
        })
      } else {
        // Instant reset
        dotRef.current!.style.opacity = '1'
        firstWrapRef.current!.style.width = '0px'
        spaceWrapRef.current!.style.width = '0px'
        lastWrapRef.current!.style.width = '0px'
        const allChars = [...firstCharRefs.current, ...lastCharRefs.current].filter(Boolean)
        allChars.forEach((el) => {
          if (el) el.style.opacity = '0'
        })
      }

      // Reset char content to target letters for next hover
      const resetTimer = setTimeout(() => {
        firstCharRefs.current.forEach((el, i) => {
          if (el) el.textContent = 'enceslaus'[i]
        })
        lastCharRefs.current.forEach((el, i) => {
          if (el) el.textContent = 'silva'[i]
        })
      }, 300)

      decodeTimersRef.current.push(resetTimer)
    }
  }

  // Idle pulse animation on logo (hint to hover)
  useEffect(() => {
    if (prefersReducedMotion() || !dotRef.current) return

    // Create a repeating pulse animation on the dot to hint interactivity
    const pulseTimeline = gsap.timeline({ repeat: -1 })
    pulseTimeline
      .to(dotRef.current, {
        scale: 1.2,
        opacity: 0.7,
        duration: 1.2,
        ease: 'sine.inOut',
      })
      .to(dotRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'sine.inOut',
      })

    return () => {
      if (pulseTimeline && typeof pulseTimeline.kill === 'function') {
        pulseTimeline.kill()
      }
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearDecode()
  }, [])

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-7xl">
      <div className="glass px-6 py-4 rounded-full flex items-center justify-between">
        <div className="text-2xl font-serif italic font-bold tracking-tighter text-white">
          <Link
            href="/"
            aria-label="Wenceslaus Dsilva - Home"
            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg px-2"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
          >
            <span ref={wRef} className="inline-block">
              W
            </span>

            <span
              ref={firstWrapRef}
              className="inline-block overflow-hidden whitespace-nowrap align-bottom"
              style={{ width: 0 }}
            >
              {'enceslaus'.split('').map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    firstCharRefs.current[i] = el
                  }}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </span>

            <span ref={dotRef} className="text-primary inline-block">
              .
            </span>

            <span
              ref={spaceWrapRef}
              className="inline-block overflow-hidden whitespace-nowrap align-bottom"
              style={{ width: 0 }}
            >
              &nbsp;
            </span>

            <span ref={dRef} className="inline-block">
              D
            </span>

            <span
              ref={lastWrapRef}
              className="inline-block overflow-hidden whitespace-nowrap align-bottom"
              style={{ width: 0 }}
            >
              {'silva'.split('').map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    lastCharRefs.current[i] = el
                  }}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </span>
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
