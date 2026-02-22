'use client'

import { useRef, useEffect, useState } from 'react'
import { type SkillModule } from '@/data/skills'
import { getSkillIcon } from '@/utils/skillIcons'
import gsap from 'gsap'
import { X } from 'lucide-react'

interface SkillModalProps {
  skill: SkillModule | null
  color: string
  isOpen: boolean
  onClose: () => void
}

export { SkillModal }

function SkillModal({ skill, color, isOpen, onClose }: SkillModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle keyboard escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Animate in/out
  useEffect(() => {
    if (!isOpen || !skill) return

    setIsAnimating(true)

    // Create a timeline for coordinated animations
    const tl = gsap.timeline()

    // Backdrop fade in
    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        0
      )
    }

    // Modal scale up + fade in
    if (modalRef.current) {
      tl.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out' },
        0
      )
    }

    // Icon entrance with scale + rotation
    if (iconRef.current) {
      tl.fromTo(
        iconRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out',
        },
        0.1
      )
    }

    // Title entrance
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.2
      )
    }

    // Badge entrance
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out' },
        0.3
      )
    }

    // Quote entrance (line by line effect)
    if (quoteRef.current) {
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.4
      )
    }

    return () => {
      tl.kill()
    }
  }, [isOpen, skill])

  // Exit animation
  const handleClose = () => {
    if (!modalRef.current || !backdropRef.current) {
      onClose()
      return
    }

    const tl = gsap.timeline()

    // Modal scale down + fade out
    tl.to(
      modalRef.current,
      { scale: 0.9, opacity: 0, duration: 0.3, ease: 'power2.in' },
      0
    )

    // Backdrop fade out
    tl.to(
      backdropRef.current,
      { opacity: 0, duration: 0.2, ease: 'power2.in' },
      0.05
    )

    tl.then(() => {
      setIsAnimating(false)
      onClose()
    })
  }

  if (!isOpen || !skill) return null

  const SkillIcon = getSkillIcon(skill.name)

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ opacity: 0 }}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-2xl"
        style={{
          scale: 0.8,
          opacity: 0,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 ${color}40`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary outline-none"
          aria-label="Close modal"
        >
          <X size={24} className="text-zinc-400 hover:text-white transition-colors" />
        </button>

        {/* Content Container */}
        <div
          ref={contentRef}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Icon */}
          <div
            ref={iconRef}
            className="flex items-center justify-center"
            style={{ scale: 0, opacity: 0 }}
          >
            <div
              className="p-4 rounded-2xl"
              style={{
                backgroundColor: color + '22',
                border: `2px solid ${color}40`,
              }}
            >
              <SkillIcon size={64} style={{ color }} />
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef} style={{ opacity: 0, y: 20 }}>
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight mb-2">
              {skill.name}
            </h2>
          </div>

          {/* Category Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full font-mono text-sm uppercase tracking-wider border"
            style={{
              backgroundColor: color + '22',
              color,
              borderColor: color + '40',
              scale: 0.8,
              opacity: 0,
            }}
          >
            {skill.category}
          </div>

          {/* Divider */}
          <div
            className="w-16 h-px rounded-full"
            style={{ backgroundColor: color + '60' }}
          />

          {/* Quote/Importance */}
          <div ref={quoteRef} style={{ opacity: 0, y: 10 }}>
            <p
              className="text-lg md:text-xl font-light italic leading-relaxed max-w-xl font-serif"
              style={{ color: '#e4e4e7' }}
            >
              "{skill.importance}"
            </p>
          </div>

          {/* Bottom Accent Line */}
          <div
            className="w-24 h-1 rounded-full mt-4"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  )
}
