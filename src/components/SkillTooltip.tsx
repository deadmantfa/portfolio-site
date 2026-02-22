'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

interface SkillTooltipProps {
  text: string
  color: string
  isVisible: boolean
}

export { SkillTooltip }

function SkillTooltip({ text, color, isVisible }: SkillTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<'above' | 'below'>('above')

  // Smart positioning: check if there's enough space above
  useEffect(() => {
    if (!tooltipRef.current || !isVisible) return

    const rect = tooltipRef.current.getBoundingClientRect()
    const spaceAbove = rect.top
    const tooltipHeight = 80 // Approximate height

    // If less than 100px space above, position below instead
    if (spaceAbove < tooltipHeight + 20) {
      setPosition('below')
    } else {
      setPosition('above')
    }
  }, [isVisible])

  // Animate in/out
  useEffect(() => {
    if (!tooltipRef.current) return

    if (isVisible) {
      gsap.fromTo(
        tooltipRef.current,
        { opacity: 0, y: position === 'above' ? 8 : -8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        }
      )
    } else {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        y: position === 'above' ? 8 : -8,
        duration: 0.15,
        ease: 'power2.in',
        pointerEvents: 'none',
      })
    }
  }, [isVisible, position])

  return (
    <div
      ref={tooltipRef}
      className={`absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none ${
        position === 'above' ? 'bottom-full mb-3' : 'top-full mt-3'
      }`}
      style={{ opacity: 0 }}
    >
      {/* Tooltip background */}
      <div
        className="relative bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/10 whitespace-nowrap"
        style={{
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${color}40`,
        }}
      >
        {/* Tooltip text */}
        <p
          className="text-xs md:text-sm font-light italic leading-relaxed max-w-xs text-center"
          style={{ color: color + 'dd' }}
        >
          "{text}"
        </p>

        {/* Arrow pointer - positioned below tooltip when above, above when below */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 transform rotate-45 border border-white/10 ${
            position === 'above' ? '-bottom-1' : '-top-1'
          }`}
          style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>
    </div>
  )
}
