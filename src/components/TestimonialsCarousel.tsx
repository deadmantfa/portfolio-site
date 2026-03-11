'use client'

import { testimonials } from '@/data/testimonials'
import EditorialReveal from './EditorialReveal'
import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'

export { TestimonialsCarousel }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SWIPE_THRESHOLD = 50

function TestimonialCard({ 
  testimonial, 
  direction 
}: { 
  testimonial: (typeof testimonials)[0]; 
  direction: number;
}) {
  const [imageError, setImageError] = useState(false)
  const isReduced = prefersReducedMotion()

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.85,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.85,
      filter: 'blur(10px)',
    }),
  }

  return (
    <motion.div
      custom={direction}
      variants={isReduced ? {} : variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 260, damping: 25 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.4 }
      }}
      className="absolute inset-0 rounded-3xl p-6 md:p-12 flex flex-col justify-between overflow-hidden"
      style={{
        background: 'rgba(24, 24, 27, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Ink bloom — fades in once per card, no infinite animation */}
      <motion.div
        key={`bloom-${direction}`}
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
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
          <motion.a
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.25)', borderColor: 'rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="size-9 md:size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={`${testimonial.name}'s LinkedIn profile`}
          >
            <Linkedin className="size-4 md:size-5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

function TestimonialsCarousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentIndex = Math.abs(page % testimonials.length)

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }, [page])

  useEffect(() => {
    if (isAutoPlaying && !prefersReducedMotion()) {
      timerRef.current = setInterval(() => {
        paginate(1)
      }, 10000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoPlaying, paginate])

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset < -SWIPE_THRESHOLD || velocity < -500) {
      paginate(1)
    } else if (offset > SWIPE_THRESHOLD || velocity > 500) {
      paginate(-1)
    }
  }

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
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
          >
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              direction={direction}
            />
          </motion.div>
        </AnimatePresence>

        {/* Visual Progress Line */}
        <div className="absolute -bottom-10 md:-bottom-12 left-0 right-0 h-px bg-white/5 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
              setPage([idx, dir])
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
