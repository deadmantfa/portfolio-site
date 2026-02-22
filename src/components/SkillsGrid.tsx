'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { skillModules, type SkillModule } from '@/data/skills'
import { CATEGORY_CONFIG, type CategoryKey } from '@/utils/orbital'
import { SkillCard } from './SkillCard'
import { SkillModal } from './SkillModal'
import { useScroll } from './ScrollProvider'
import gsap from 'gsap'

export { SkillsGrid }

const FILTERS = [
  { key: 'all' as const, label: 'All' },
  { key: 'leadership' as const, label: 'Leadership' },
  { key: 'frontend' as const, label: 'Frontend' },
  { key: 'backend' as const, label: 'Backend' },
  { key: 'infrastructure' as const, label: 'Infrastructure' },
]

function getSkillCountPerCategory(): Record<string, number> {
  const counts: Record<string, number> = {
    all: skillModules.length,
    leadership: 0,
    frontend: 0,
    backend: 0,
    infrastructure: 0,
  }
  skillModules.forEach((skill) => {
    counts[skill.category] = (counts[skill.category] || 0) + 1
  })
  return counts
}

function SkillsGrid() {
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryKey>('all')
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillModule | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setActiveSkill } = useScroll()

  const skillCounts = useMemo(() => getSkillCountPerCategory(), [])

  const visibleSkills = useMemo(
    () =>
      activeFilter === 'all'
        ? skillModules
        : skillModules.filter((s) => s.category === activeFilter),
    [activeFilter]
  )

  // Trigger entrance animation when grid becomes visible
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEnteredViewport) {
          setHasEnteredViewport(true)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasEnteredViewport])

  const handleFilterChange = (filter: 'all' | CategoryKey) => {
    if (filter === activeFilter) return

    const children = gridRef.current?.children
    if (children) {
      gsap.to(children, {
        opacity: 0,
        y: 8,
        duration: 0.12,
        stagger: 0.015,
        ease: 'power1.in',
        onComplete: () => setActiveFilter(filter),
      })
    } else {
      setActiveFilter(filter)
    }
  }

  const handleOpenModal = (skill: SkillModule) => {
    setSelectedSkill(skill)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Fade in cards after filter change or on initial viewport entry
  useEffect(() => {
    if (!gridRef.current) return

    // Use longer duration for initial entrance (more impactful)
    const isInitialEntry = activeFilter === 'all' && hasEnteredViewport
    const duration = isInitialEntry ? 0.24 : 0.18
    const staggerDelay = isInitialEntry ? 0.035 : 0.025

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: isInitialEntry ? 12 : 8 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger: staggerDelay,
        ease: 'power2.out',
      }
    )
  }, [activeFilter, hasEnteredViewport])

  return (
    <div
      ref={containerRef}
      className="w-full space-y-6 pb-4"
      style={{
        perspective: '1000px',
        contain: 'layout style paint',
      }}
    >
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap justify-center">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleFilterChange(filter.key)}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-150 cursor-pointer flex items-center gap-2 ${
              activeFilter === filter.key
                ? 'text-white'
                : 'bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
            style={
              activeFilter === filter.key
                ? {
                    backgroundColor:
                      filter.key === 'all'
                        ? '#6366f1'
                        : CATEGORY_CONFIG[filter.key as CategoryKey].color,
                    color: 'white',
                  }
                : undefined
            }
          >
            {filter.label}
            <span className="text-[10px] opacity-75">
              ({skillCounts[filter.key]})
            </span>
          </button>
        ))}
      </div>

      {/* Skill Cards Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-2"
      >
        {visibleSkills.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            color={CATEGORY_CONFIG[skill.category].color}
            onActivate={() => setActiveSkill(skill)}
            onDeactivate={() => setActiveSkill(null)}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Skill Modal */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          color={CATEGORY_CONFIG[selectedSkill.category].color}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
