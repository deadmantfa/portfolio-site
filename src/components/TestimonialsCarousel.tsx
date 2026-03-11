'use client'

import { testimonials } from '@/data/testimonials'
import EditorialReveal from './EditorialReveal'
import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useAnimate, PanInfo } from 'framer-motion'
import { Linkedin, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'

export { TestimonialsCarousel }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SWIPE_THRESHOLD = 50

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) {
  const [imageError, setImageError] = useState(false)

  // Reset image error state when testimonial changes (no remount needed)
  useEffect(() => {
    setImageError(false)
  }, [testimonial])

  return (
    <div
      className="absolute inset-0 rounded-3xl p-6 md:p-12 flex flex-col justify-between overflow-hidden"
      style={{
        background: 'rgba(18, 18, 22, 0.96)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Ink bloom */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 22% 18%, rgba(99,102,241,0.11) 0%, transparent 58%)',
        }}
      />

      {/* Quote Icon */}
      <div className="mb-4 md:mb-6 opacity-30 relative z-10">
        <Quote className="size-8 md:size-12 text-primary" fill="currentColor" />
      </div>

      {/* Quote Content */}
      <div className="flex-grow flex flex-col justify-center mb-6 relative z-10">
        <blockquote className="text-[1.1rem] md:text-2xl font-serif italic text-zinc-100 leading-snug md:leading-relaxed">
          <span className="relative z-10">{testimonial.quote}</span>
        </blockquote>
      </div>

      {/* Author & Profile Section */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative size-12 md:size-16 rounded-xl overflow-hidden ring-1 ring-primary/30 flex-shrink-0 shadow-xl">
            {testimonial.imagePath && !imageError ? (
              <Image
                src={testimonial.imagePath}
                alt={testimonial.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="size-full bg-zinc-800 flex items-center justify-center text-lg font-serif italic text-primary">
                {testimonial.initials}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          <div className="min-w-0">
            <p className="text-white font-serif text-base md:text-xl truncate leading-tight">{testimonial.name}</p>
            <p className="text-primary/70 font-mono text-[9px] md:text-xs uppercase tracking-widest truncate mt-0.5">
              {testimonial.title}
            </p>
          </div>
        </div>

        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="size-9 md:size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-primary/25 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={`${testimonial.name}'s LinkedIn profile`}
          >
            <Linkedin className="size-4 md:size-5" />
          </a>
        )}
      </div>
    </div>
  )
}

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [scope, animate] = useAnimate()

  const transitionTo = useCallback(
    async (targetIndex: number, dir: number) => {
      if (isAnimating) return

      if (prefersReducedMotion()) {
        setCurrentIndex(targetIndex)
        return
      }

      setIsAnimating(true)

      // 1. Animate current card out
      await animate(
        scope.current,
        { x: dir > 0 ? '-40%' : '40%', opacity: 0, scale: 0.92 },
        { duration: 0.22, ease: [0.4, 0, 1, 1] },
      )

      // 2. Swap content — async, no forced layout reflow
      setCurrentIndex(targetIndex)

      // 3. Snap to incoming side (still invisible)
      animate(
        scope.current,
        { x: dir > 0 ? '40%' : '-40%', opacity: 0, scale: 0.92 },
        { duration: 0 },
      )

      // 4. Wait two frames for React to flush and paint the new content
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })

      // 5. Animate new card in
      await animate(
        scope.current,
        { x: 0, opacity: 1, scale: 1 },
        { type: 'spring', stiffness: 280, damping: 26 },
      )

      setIsAnimating(false)
    },
    [isAnimating, animate, scope],
  )

  const paginate = useCallback(
    (dir: number) => {
      const target = (currentIndex + dir + testimonials.length) % testimonials.length
      transitionTo(target, dir)
    },
    [currentIndex, transitionTo],
  )

  useEffect(() => {
    if (isAutoPlaying && !prefersReducedMotion()) {
      timerRef.current = setInterval(() => paginate(1), 10000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoPlaying, paginate])

  const handleDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) paginate(1)
      else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 500) paginate(-1)
    },
    [paginate],
  )

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div className="text-center md:text-left">
          <EditorialReveal direction="down">
            <h2 className="text-5xl md:text-8xl font-serif italic leading-none opacity-10 uppercase tracking-tighter pointer-events-none">
              Signals.
            </h2>
          </EditorialReveal>
          <EditorialReveal direction="down" delay={0.1}>
            <p className="font-mono text-[9px] md:text-[11px] text-primary uppercase tracking-[0.4em] mt-3 md:mt-4 font-bold">
              Trusted Architectural Consensus
            </p>
          </EditorialReveal>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-6">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-widest text-zinc-500">
            <span className="text-primary font-bold">{currentIndex + 1}</span>
            <span className="opacity-30">/</span>
            <span>{testimonials.length}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(-1)}
              className="size-10 md:size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary/50 transition-all text-zinc-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5 md:size-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="size-10 md:size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary/50 transition-all text-zinc-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5 md:size-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative h-[480px] md:h-[500px] w-full"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/*
          Single stable motion.div — never unmounts.
          Content swaps via prop update (flushSync) between exit and enter animations.
          No AnimatePresence = no DOM mounting/unmounting = no mobile compositor flicker.
        */}
        <motion.div
          ref={scope}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ x: 0, opacity: 1, scale: 1 }}
        >
          <TestimonialCard testimonial={testimonials[currentIndex]} />
        </motion.div>

        {/* Visual Progress Line — scaleX instead of width to avoid layout reflow */}
        <div className="absolute -bottom-10 md:-bottom-12 left-0 right-0 h-px bg-white/5 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-left bg-primary shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            initial={{ scaleX: 1 / testimonials.length }}
            animate={{ scaleX: (currentIndex + 1) / testimonials.length }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Decorative Index Track */}
      <div className="mt-16 md:mt-24 flex justify-center gap-2 md:gap-3">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const dir = idx > currentIndex ? 1 : -1
              transitionTo(idx, dir)
            }}
            className={`h-0.5 transition-all duration-700 rounded-full cursor-pointer ${
              idx === currentIndex ? 'w-12 md:w-16 bg-primary' : 'w-4 md:w-6 bg-white/10 hover:bg-white/30'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
