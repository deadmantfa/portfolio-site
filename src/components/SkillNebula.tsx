'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { skillModules } from '@/data/skills'
import SkillModuleComponent from './SkillModule'
import * as THREE from 'three'
import { SkillResourceProvider } from './SkillResourceProvider'
import { calculateHelixPosition } from '@/utils/helix'

interface SkillNebulaProps {
  progress: number
  exitProgress: number
}

const SkillNebula = ({ progress, exitProgress }: SkillNebulaProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  const moduleData = useMemo(() => {
    const total = skillModules.length
    const radiusBase = Math.min(viewport.width * 0.5, 6)
    const heightFactor = 4.5 // Increased vertical spacing

    return skillModules.map((skill, i) => {
      // Start positions (dispersed cloud)
      const startPos: [number, number, number] = [
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50
      ]
      
      const endPos = calculateHelixPosition(i, total, radiusBase, heightFactor)

      return { skill, startPos, endPos }
    })
  }, [viewport])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Smooth auto-rotation
    groupRef.current.rotation.y += delta * 0.08
    
    // Vertical travel based on progress (0 to 1)
    // Map 0..1 progress to full helix height for a dramatic "ascent"
    const totalHeight = skillModules.length * 4.5
    const targetY = (progress * totalHeight) - (totalHeight / 2)
    
    // Position handling
    const floatY = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    const exitY = exitProgress * -40 // More pronounced exit
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -targetY + floatY + exitY, 0.08)
    
    // Exit scaling
    const s = 1 - exitProgress * 0.95
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
