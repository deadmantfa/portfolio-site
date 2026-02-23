'use client'

import { testimonials } from '@/data/testimonials'
import EditorialReveal from './EditorialReveal'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export { TestimonialsSection }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function TestimonialCard({ quote, name, title, company, initials }: { quote: string; name: string; title: string; company: string; initials: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!cardRef.current || hasAnimated || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated || !cardRef.current || prefersReducedMotion()) return

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [hasAnimated])

  return (
    <div
      ref={cardRef}
      className="glass rounded-2xl p-8 border border-white/10 pointer-events-auto"
    >
      <p className="text-xl md:text-2xl font-serif italic text-white mb-8 leading-relaxed">
        "{quote}"
      </p>

      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-mono font-bold text-primary">{initials}</span>
        </div>
        <div>
          <p className="text-white font-serif italic">{name}</p>
          <p className="text-sm text-zinc-400">
            {title} · {company}
          </p>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full">
      <EditorialReveal direction="down">
        <div className="text-6xl md:text-[8rem] font-serif italic leading-none opacity-5 uppercase tracking-tighter pointer-events-none mb-2">
          Signals.
        </div>
      </EditorialReveal>

      <EditorialReveal direction="down" delay={0.1}>
        <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.3em] mb-12">
          What Others Say
        </p>
      </EditorialReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}
