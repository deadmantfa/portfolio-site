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
  const glowRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!cardRef.current || !quoteRef.current || !authorRef.current || !glowRef.current) return

    if (isActive) {
      if (!prefersReducedMotion()) {
        // Blur reveal animation - card entrance with blur clearing
        gsap.timeline()
          // Main card: blur fade + scale entrance
          .to(
            cardRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              backdropFilter: 'blur(0px)',
              duration: 0.7,
              ease: 'power2.out',
            },
            0
          )
          // Glow pulse effect
          .to(
            glowRef.current,
            {
              opacity: 0.8,
              scale: 1.2,
              duration: 0.5,
              ease: 'power2.out',
            },
            0.1
          )
          .to(
            glowRef.current,
            {
              opacity: 0.3,
              scale: 0.8,
              duration: 1.2,
              ease: 'sine.inOut',
              repeat: -1,
            },
            0.6
          )
          // Quote staggered entrance
          .to(
            quoteRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            0.15
          )
          // Author staggered entrance
          .to(
            authorRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            0.25
          )
      } else {
        cardRef.current.style.opacity = '1'
        cardRef.current.style.transform = 'translateY(0) scale(1)'
        cardRef.current.style.backdropFilter = 'blur(0px)'
        if (quoteRef.current) {
          quoteRef.current.style.opacity = '1'
          quoteRef.current.style.transform = 'translateY(0)'
        }
        if (authorRef.current) {
          authorRef.current.style.opacity = '1'
          authorRef.current.style.transform = 'translateY(0)'
        }
        if (glowRef.current) {
          glowRef.current.style.opacity = '0.3'
        }
      }
    } else {
      if (!prefersReducedMotion()) {
        // Set initial state with blur
        gsap.set([cardRef.current, quoteRef.current, authorRef.current], {
          opacity: 0,
          y: 12,
          scale: 0.98,
        })
        gsap.set(cardRef.current, {
          backdropFilter: 'blur(12px)',
        })
        gsap.set(glowRef.current, {
          opacity: 0,
          scale: 0.5,
        })
      } else {
        cardRef.current.style.opacity = '0'
        cardRef.current.style.transform = 'translateY(12px) scale(0.98)'
        cardRef.current.style.backdropFilter = 'blur(12px)'
        if (quoteRef.current) {
          quoteRef.current.style.opacity = '0'
          quoteRef.current.style.transform = 'translateY(12px)'
        }
        if (authorRef.current) {
          authorRef.current.style.opacity = '0'
          authorRef.current.style.transform = 'translateY(12px)'
        }
        if (glowRef.current) {
          glowRef.current.style.opacity = '0'
        }
      }
    }
  }, [isActive])

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 rounded-3xl p-8 md:p-12 flex flex-col pointer-events-auto transition-all duration-300 ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
        backdropFilter: isActive ? 'blur(0px)' : 'blur(12px)',
        background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(39, 39, 42, 0.6) 100%)',
        border: '1px solid rgb(99, 102, 241, 0.15)',
        boxShadow:
          '0 8px 32px -4px rgba(99, 102, 241, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Glow effect - primary blue pulse */}
      <div
        ref={glowRef}
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.3,
        }}
      />

      {/* Quote */}
      <p
        ref={quoteRef}
        className="text-lg md:text-2xl font-light text-white mb-10 leading-relaxed flex-grow relative z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        <span className="text-3xl md:text-4xl text-primary/40 mr-2">&#8220;</span>
        {testimonial.quote}
        <span className="text-3xl md:text-4xl text-primary/40 ml-2">&#8221;</span>
      </p>

      {/* Author Info */}
      <div
        ref={authorRef}
        className="flex items-center justify-between gap-4 pt-8 border-t border-white/10 relative z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        <div className="flex items-center gap-4 flex-grow min-w-0">
          {/* Avatar with primary color ring */}
          <div className="relative size-14 rounded-full flex-shrink-0 overflow-hidden ring-2 ring-primary/30 transition-all duration-300 hover:ring-primary/60">
            {testimonial.imagePath && !imageError ? (
              <Image
                src={testimonial.imagePath}
                alt={testimonial.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="size-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{testimonial.initials}</span>
              </div>
            )}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-white font-medium truncate">{testimonial.name}</p>
            <p className="text-xs md:text-sm text-foreground/60 truncate">{testimonial.title}</p>
          </div>
        </div>
        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 size-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary outline-none cursor-pointer"
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
  const [isHovering, setIsHovering] = useState(false)

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
        if (autoPlayRef.current && !isHovering) {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }
      }, 6000) // Change slide every 6 seconds
    }

    startAutoPlay()

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [isHovering])

  // Handle pause on hover
  const handleMouseEnter = () => {
    setIsHovering(true)
    autoPlayRef.current = false
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
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
        <p className="font-mono text-[11px] text-primary/60 uppercase tracking-[0.3em] mb-8 md:mb-12 font-semibold">
          What Others Say
        </p>
      </EditorialReveal>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative bg-transparent rounded-3xl overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div className="relative h-[480px] md:h-[400px] w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} isActive={index === currentIndex} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary outline-none cursor-pointer group/btn"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-6 group-hover/btn:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary outline-none cursor-pointer group/btn"
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-6 group-hover/btn:scale-110 transition-transform" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary outline-none cursor-pointer ${
                index === currentIndex
                  ? 'bg-primary w-8 h-2.5 shadow-lg shadow-primary/50'
                  : 'bg-white/20 hover:bg-white/40 size-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="mt-8 flex items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-2 font-mono text-white">
          <span className="text-lg font-semibold text-primary">{currentIndex + 1}</span>
          <span className="text-border">/</span>
          <span className="text-foreground/60">{testimonials.length}</span>
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/0 rounded-full" />
      </div>
    </div>
  )
}
