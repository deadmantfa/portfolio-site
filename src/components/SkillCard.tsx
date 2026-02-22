'use client'

import { useRef, useState } from 'react'
import { type SkillModule } from '@/data/skills'
import { getSkillIcon } from '@/utils/skillIcons'
import gsap from 'gsap'

interface SkillCardProps {
  skill: SkillModule
  color: string
  onActivate: () => void
  onDeactivate: () => void
  onOpenModal: (skill: SkillModule) => void
}

export { SkillCard }

function SkillCard({ skill, color, onActivate, onDeactivate, onOpenModal }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const SkillIcon = getSkillIcon(skill.name)

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6,
        scale: 1.03,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
    setIsHovered(true)
    onActivate()
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
    setIsHovered(false)
    onDeactivate()
  }

  const handleClick = () => {
    onOpenModal(skill)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      ref={cardRef}
      role="button"
      aria-label={`${skill.name} skill - Click to view details`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="bg-zinc-900/60 backdrop-blur-sm border border-white/5 rounded-xl p-4 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      style={{
        borderLeft: `3px solid ${color}`,
        transformOrigin: 'center',
        willChange: 'transform',
        // Glow pulse animation on hover
        boxShadow: isHovered
          ? `0 0 20px ${color}40, inset 0 0 20px ${color}20, 0 4px 12px rgba(0,0,0,0.3)`
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* Card Content */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center">
          <SkillIcon size={36} style={{ color }} />
        </div>
        <h3 className="text-sm font-semibold text-white text-center">
          {skill.name}
        </h3>
        <div
          className="inline-flex items-center justify-center px-2 py-1 rounded text-xs font-mono uppercase tracking-wider"
          style={{
            backgroundColor: color + '22',
            color,
          }}
        >
          {skill.category}
        </div>
      </div>
    </div>
  )
}
