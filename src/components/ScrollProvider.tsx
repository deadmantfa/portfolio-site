'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface ScrollContextType {
  scrollProgress: number
  activeEpoch: number
  epochProgress: number
  activeSkill: any | null
  setActiveSkill: (skill: any | null) => void
  activeCredential: string | null
  setActiveCredential: (id: string | null) => void
}

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeEpoch, setActiveEpoch] = useState(0)
  const [epochProgress, setEpochProgress] = useState(0) // Float: 0.0 = Epoch 0 centered, 1.0 = Epoch 1 centered
  const [activeSkill, setActiveSkill] = useState<any | null>(null)
  const [activeCredential, setActiveCredential] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0
      setScrollProgress(progress)

      const epochContainer = document.getElementById('epochs')
      if (epochContainer) {
        const rect = epochContainer.getBoundingClientRect()
        const sections = epochContainer.querySelectorAll('section')
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Find the distance between the start of the first and second section to get true spacing
          let sectionSpacing = window.innerHeight
          if (sections.length > 1) {
            const s1 = sections[0].getBoundingClientRect()
            const s2 = sections[1].getBoundingClientRect()
            sectionSpacing = s2.top - s1.top
          }

          // Progress is 0 when first section top is 0, 1 when second section top is 0, etc.
          // We use -rect.top because the container starts at the top of the first section.
          const continuousProgress = -rect.top / sectionSpacing
          setEpochProgress(continuousProgress)

          let closestIndex = 0
          let minDistance = Infinity

          sections.forEach((section, index) => {
            const sRect = section.getBoundingClientRect()
            const sectionCenter = sRect.top + sRect.height / 2
            const viewportCenter = window.innerHeight / 2
            const distance = Math.abs(sectionCenter - viewportCenter)

            if (distance < minDistance) {
              minDistance = distance
              closestIndex = index
            }
          })
          setActiveEpoch(closestIndex)
        } else {
          // Still set progress for smooth entry/exit, but deactivate epoch
          setEpochProgress(rect.top > 0 ? -1 : sections.length)
          setActiveEpoch(-1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={{ 
      scrollProgress, 
      activeEpoch, 
      epochProgress,
      activeSkill, 
      setActiveSkill,
      activeCredential,
      setActiveCredential 
    }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}
