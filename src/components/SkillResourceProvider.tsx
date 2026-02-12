'use client'

import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import * as THREE from 'three'

interface SkillResources {
  geometry: THREE.BoxGeometry
  baseMaterial: THREE.MeshStandardMaterial
  hoverMaterial: THREE.MeshStandardMaterial
}

const SkillResourceContext = createContext<SkillResources | undefined>(undefined)

export const SkillResourceProvider = ({ children }: { children: ReactNode }) => {
  const resources = useMemo(() => {
    const geo = new THREE.BoxGeometry(4, 1.4, 0.1)
    
    const baseMat = new THREE.MeshStandardMaterial({
      color: "#6366f1",
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      emissive: "#6366f1",
      emissiveIntensity: 0.5,
      metalness: 1,
      roughness: 0
    })

    const hoverMat = new THREE.MeshStandardMaterial({
      color: "#14b8a6",
      wireframe: false,
      transparent: true,
      opacity: 1,
      emissive: "#14b8a6",
      emissiveIntensity: 10,
      metalness: 1,
      roughness: 0
    })

    return { geometry: geo, baseMaterial: baseMat, hoverMaterial: hoverMat }
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
