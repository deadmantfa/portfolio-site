'use client'

import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import * as THREE from 'three'

interface SkillResources {
  geometry: THREE.BoxGeometry
}

const SkillResourceContext = createContext<SkillResources | undefined>(undefined)

export const SkillResourceProvider = ({ children }: { children: ReactNode }) => {
  const resources = useMemo(() => {
    const geo = new THREE.BoxGeometry(3.5, 1.2, 0.05)
    return { geometry: geo }
  }, [])

  return (
    <SkillResourceContext.Provider value={resources}>
      {children}
    </SkillResourceContext.Provider>
  )
}

export const useSkillResources = () => {
  const context = useContext(SkillResourceContext)
  if (context === undefined) {
    throw new Error('useSkillResources must be used within a SkillResourceProvider')
  }
  return context
}
