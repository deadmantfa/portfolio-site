'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { skillModules } from '@/data/skills'
import SkillModuleComponent from './SkillModule'
import * as THREE from 'three'
import { SkillResourceProvider } from './SkillResourceProvider'

interface SkillNebulaProps {
  progress: number
}

const SkillNebula = ({ progress }: SkillNebulaProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  const moduleData = useMemo(() => {
    const total = skillModules.length
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

    return skillModules.map((skill, i) => {
      // Start positions (dispersed cloud)
      const startPos: [number, number, number] = [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      ]
      
      // Fibonacci Sphere distribution for end positions
      const y = 1 - (i / (total - 1)) * 2 // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y) // radius at y
      const theta = phi * i // golden angle increment

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      const responsiveRadius = Math.min(viewport.width * 1.2, 14)
      const endPos: [number, number, number] = [
        x * responsiveRadius,
        y * responsiveRadius * 0.8,
        z * responsiveRadius * 0.4 // Flattened
      ]

      return { skill, startPos, endPos }
    })
  }, [viewport])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Slow rotation based on progress
    const targetRotation = progress * Math.PI * 0.2
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05)
    
    // Add a gentle floating movement
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
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
