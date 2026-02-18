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
    const radiusBase = Math.min(viewport.width * 0.35, 4.5) // Tighter radius
    const heightFactor = 3.5 // More compact height factor to fit more skills in view

    return skillModules.map((skill, i) => {
      // Start positions (dispersed cloud)
      const startPos: [number, number, number] = [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40
      ]
      
      const endPos = calculateHelixPosition(i, total, radiusBase, heightFactor)

      return { skill, startPos, endPos }
    })
  }, [viewport])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Smooth auto-rotation
    groupRef.current.rotation.y += delta * 0.08
    
    // Vertical travel: Center the helix and scroll through it
    const totalHeight = skillModules.length * 3.5
    // Map progress (0..1.5 range provided by parent) to travel range. 
    // The skills are at local y in [-totalHeight/2, totalHeight/2].
    // To make a skill at y_i pass y=0 world, we need group_y = -y_i.
    // So we want group_y to go from totalHeight/2 to -totalHeight/2.
    const startY = totalHeight / 2 + 10 // Start with some padding
    const endY = -totalHeight / 2 - 10 // End with some padding
    
    // progress goes from 0 to 1.5. We'll map 0..1.2 to the main scroll.
    const scrollT = Math.min(progress / 1.3, 1)
    const currentY = THREE.MathUtils.lerp(startY, endY, scrollT)
    
    // Position handling
    const floatY = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    const exitY = exitProgress * -30
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, currentY + floatY + exitY, 0.06)
    
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
