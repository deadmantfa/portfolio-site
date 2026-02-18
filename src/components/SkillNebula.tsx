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
    const helixRadius = Math.min(viewport.width * 0.8, 10)
    const heightFactor = 4 // Vertical spacing between modules

    return skillModules.map((skill, i) => {
      // Start positions (dispersed cloud)
      const startPos: [number, number, number] = [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40
      ]
      
      // Double Helix / Vortex distribution
      const angle = (i / total) * Math.PI * 4 // 2 full rotations
      const isSecondStrand = i % 2 === 0
      const finalAngle = angle + (isSecondStrand ? Math.PI : 0)
      
      const x = Math.cos(finalAngle) * helixRadius
      const z = Math.sin(finalAngle) * helixRadius
      const y = (i - total / 2) * heightFactor

      const endPos: [number, number, number] = [x, y, z]

      return { skill, startPos, endPos }
    })
  }, [viewport])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Slow rotation
    groupRef.current.rotation.y += delta * 0.1
    
    // Vertical travel based on progress (0 to 1)
    // We want to scroll through the helix as the section progresses
    const totalHeight = skillModules.length * 4
    const travelRange = totalHeight * 0.8
    const targetY = (progress * travelRange) - (travelRange / 2)
    
    // Position handling
    const floatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    const exitY = exitProgress * -30
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -targetY + floatY + exitY, 0.1)
    
    // Responsive scale & exit fade
    const s = 1 - exitProgress * 0.8
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
