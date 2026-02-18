'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { skillModules } from '@/data/skills'
import SkillModuleComponent from './SkillModule'
import * as THREE from 'three'
import { SkillResourceProvider } from './SkillResourceProvider'

interface SkillNebulaProps {
  progress: number
  exitProgress: number
}

const SkillNebula = ({ progress, exitProgress }: SkillNebulaProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  const moduleData = useMemo(() => {
    const total = skillModules.length
    const columns = 5
    const rows = Math.ceil(total / columns)
    const spacingX = 4.5
    const spacingY = 1.8

    return skillModules.map((skill, i) => {
      // Start positions (dispersed cloud)
      const startPos: [number, number, number] = [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40
      ]
      
      // Curved Wall distribution
      const col = i % columns
      const row = Math.floor(i / columns)
      
      // Center the grid
      const xOffset = (col - (columns - 1) / 2) * spacingX
      const yOffset = ((rows - 1) / 2 - row) * spacingY
      
      // Apply curvature (Cylindrical mapping)
      const radius = 25
      const angle = (xOffset / radius)
      
      const x = Math.sin(angle) * radius
      const z = (Math.cos(angle) * radius) - radius // Curve towards camera
      const y = yOffset

      const endPos: [number, number, number] = [x - 2, y, z]

      return { skill, startPos, endPos }
    })
  }, [viewport])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Minimal rotation - mostly fixed for readability
    const targetRotation = (progress - 1) * Math.PI * 0.05
    const clampedRotation = Math.max(Math.min(targetRotation, 0.1), -0.1)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, clampedRotation, 0.05)
    
    // Subtle float
    const floatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    
    // Exit logic: sink and fade
    const exitY = exitProgress * -20
    groupRef.current.position.y = floatY + exitY
    
    // Opacity handling via scale or direct material update (if possible)
    // For now, let's scale it down slightly as it exits
    const s = 1 - exitProgress * 0.5
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <SkillResourceProvider>
      <group ref={groupRef}>
        {moduleData.map((data, i) => (
          <SkillModuleComponent 
            key={i}
            skill={data.skill} 
            index={i} 
            startPos={data.startPos}
            endPos={data.endPos}
            progress={progress}
          />
        ))}
      </group>
    </SkillResourceProvider>
  )
}

export default SkillNebula
