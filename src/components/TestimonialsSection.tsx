'use client'

import { testimonials } from '@/data/testimonials'
import EditorialReveal from './EditorialReveal'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Linkedin } from 'lucide-react'
import Image from 'next/image'

export { TestimonialsSection }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function TestimonialCard({ quote, name, title, company, initials, linkedinUrl, imagePath }: { quote: string; name: string; title: string; company: string; initials: string; linkedinUrl?: string; imagePath?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [imageError, setImageError] = useState(false)

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

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-grow">
          {/* Avatar with image fallback */}
          <div className="relative size-12 rounded-full flex-shrink-0 overflow-hidden">
            {imagePath && !imageError ? (
              <Image
                src={imagePath}
                alt={name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="size-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-primary">{initials}</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <p className="text-white font-serif italic">{name}</p>
            <p className="text-sm text-zinc-400">
              {title} · {company}
            </p>
          </div>
        </div>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-zinc-400 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            aria-label={`${name}'s LinkedIn profile`}
          >
            <Linkedin className="size-5" />
          </a>
        )}
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
        <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.3em] mb-8 md:mb-12">
          What Others Say
        </p>
      </EditorialReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            company={testimonial.company}
            initials={testimonial.initials}
            linkedinUrl={testimonial.linkedinUrl}
            imagePath={testimonial.imagePath}
          />
        ))}
      </div>
    </div>
  )
}
