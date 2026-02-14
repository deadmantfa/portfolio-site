'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface ScrollContextType {
  scrollProgress: number
  activeEpoch: number
  activeSkill: any | null
  setActiveSkill: (skill: any | null) => void
}

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeEpoch, setActiveEpoch] = useState(0)
  const [activeSkill, setActiveSkill] = useState<any | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0
      setScrollProgress(progress)

      const sections = document.querySelectorAll('section')
      let currentEpoch = 0
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          currentEpoch = Math.max(0, index - 1)
        }
      })
      setActiveEpoch(currentEpoch)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollProgress, activeEpoch, activeSkill, setActiveSkill }}>
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
