'use client'

import { testimonials } from '@/data/testimonials'
import EditorialReveal from './EditorialReveal'
import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { Linkedin, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export { TestimonialsCarousel }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function TestimonialCard({ testimonial, isActive }: { testimonial: (typeof testimonials)[0]; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return

    if (isActive) {
      if (!prefersReducedMotion()) {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      } else {
        cardRef.current.style.opacity = '1'
        cardRef.current.style.transform = 'translateY(0)'
      }
    } else {
      if (!prefersReducedMotion()) {
        gsap.set(cardRef.current, {
          opacity: 0,
          y: 20,
        })
      } else {
        cardRef.current.style.opacity = '0'
        cardRef.current.style.transform = 'translateY(20px)'
      }
    }
  }, [isActive])

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 glass rounded-2xl p-8 md:p-10 border border-white/10 flex flex-col ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(20px)' }}
    >
      {/* Quote */}
      <p className="text-lg md:text-xl font-serif italic text-white mb-8 leading-relaxed flex-grow">
        "{testimonial.quote}"
      </p>

      {/* Author Info */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-4 flex-grow">
          {/* Avatar */}
          <div className="relative size-12 rounded-full flex-shrink-0 overflow-hidden">
            {testimonial.imagePath && !imageError ? (
              <Image
                src={testimonial.imagePath}
                alt={testimonial.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="size-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-primary">{testimonial.initials}</span>
              </div>
            )}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-white font-serif italic truncate">{testimonial.name}</p>
            <p className="text-xs md:text-sm text-zinc-400 truncate">
              {testimonial.title}
            </p>
          </div>
        </div>
        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-zinc-400 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
            aria-label={`${testimonial.name}'s LinkedIn profile`}
          >
            <Linkedin className="size-5" />
          </a>
        )}
      </div>
    </div>
  )
}

function TestimonialsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef(true)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, testimonials.length - 1))
    setCurrentIndex(clampedIndex)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-play effect
  useEffect(() => {
    if (prefersReducedMotion()) return

    const startAutoPlay = () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }

      autoPlayIntervalRef.current = setInterval(() => {
        if (autoPlayRef.current) {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }
      }, 5000) // Change slide every 5 seconds
    }

    startAutoPlay()

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [])

  // Handle pause on hover
  const handleMouseEnter = () => {
    autoPlayRef.current = false
  }

  const handleMouseLeave = () => {
    autoPlayRef.current = true
  }

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

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative bg-transparent rounded-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div className="relative h-[420px] md:h-[350px] w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} isActive={index === currentIndex} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-primary/20 hover:bg-primary/40 text-white flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-primary/20 hover:bg-primary/40 text-white flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`size-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none ${
                index === currentIndex ? 'bg-primary w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
        <span className="font-mono">{currentIndex + 1}</span>
        <span>/</span>
        <span className="font-mono">{testimonials.length}</span>
      </div>
    </div>
  )
}
