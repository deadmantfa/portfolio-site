'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface PullQuoteProps {
  quote: string
  attribution?: string
  className?: string
}

const PullQuote = ({ quote, attribution, className = '' }: PullQuoteProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const quoteMarkRef = useRef<HTMLSpanElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const attributionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const trigger = { trigger: containerRef.current, start: 'top 88%', toggleActions: 'play none none none' }

      // Accent line draws down from top
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: trigger },
      )

      // Opening quote mark scales and fades in
      gsap.fromTo(
        quoteMarkRef.current,
        { opacity: 0, scale: 0.4, y: -8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'back.out(1.7)', scrollTrigger: trigger },
      )

      // Words stagger in — blur to sharp, slight upward drift
      const validWords = wordsRef.current.filter(Boolean)
      if (validWords.length > 0) {
        gsap.fromTo(
          validWords,
          { opacity: 0, y: 14, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.035,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: trigger,
          },
        )
      }

      // Attribution fades in last
      if (attributionRef.current) {
        gsap.fromTo(
          attributionRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: 'power2.out', scrollTrigger: trigger },
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = quote.split(' ')

  return (
    <div ref={containerRef} className={`relative pl-8 md:pl-12 ${className}`}>
      {/* Left accent line — animates scaleY from 0 to 1 */}
      <div
        ref={lineRef}
        data-accent-line
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent"
        aria-hidden="true"
      />

      {/* Decorative opening quote mark */}
      <span
        ref={quoteMarkRef}
        className="-ml-1 block font-serif text-7xl leading-none text-primary/25 -mb-2"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text — each word is individually animated */}
      <blockquote className="text-2xl font-serif italic leading-relaxed text-zinc-100 md:text-3xl">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordsRef.current[i] = el }}
            className="mr-[0.28em] inline-block will-change-transform"
          >
            {word}
          </span>
        ))}
      </blockquote>

      {attribution && (
        <p
          ref={attributionRef}
          data-attribution
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500"
        >
          &mdash; {attribution}
        </p>
      )}
    </div>
  )
}

export { PullQuote }
