'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { skillModules } from '@/data/skills'
import SkillModuleComponent from './SkillModule'
import * as THREE from 'three'

interface AssemblySceneProps {
  progress: number
}

const AssemblyScene = ({ progress }: AssemblySceneProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  // Pre-calculate initial "exploded" positions and final "monolith" positions
  const moduleData = useMemo(() => {
    // Adjust spacing based on viewport height for responsiveness
    const spacing = Math.min(viewport.height / 6, 2.5)
    
    return skillModules.map((skill, i) => {
      // Deterministic but "random-looking" starting positions for consistency
      const startPos: [number, number, number] = [
        Math.sin(i * 100) * 15,
        Math.cos(i * 100) * 15,
        (Math.random() - 0.5) * 10
      ]
      
      // Final Monolith position (vertical stack)
      const endPos: [number, number, number] = [0, (skillModules.length / 2 - i) * spacing, 0]
      
      return { skill, startPos, endPos }
    })
  }, [viewport.height])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Smooth scroll progress interpolation
    const t = Math.pow(progress, 1.5) 
    
    groupRef.current.children.forEach((child, i) => {
      const data = moduleData[i]
      if (!data) return

      // Smooth position interpolation
      child.position.x = THREE.MathUtils.lerp(child.position.x, THREE.MathUtils.lerp(data.startPos[0], data.endPos[0], t), 0.1)
      child.position.y = THREE.MathUtils.lerp(child.position.y, THREE.MathUtils.lerp(data.startPos[1], data.endPos[1], t), 0.1)
      child.position.z = THREE.MathUtils.lerp(child.position.z, THREE.MathUtils.lerp(data.startPos[2], data.endPos[2], t), 0.1)
      
      // Rotation interpolation: Chaotic to Ordered
      const targetRotX = THREE.MathUtils.lerp(i, 0, t)
      const targetRotY = THREE.MathUtils.lerp(i, 0, t)
      child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, targetRotX, 0.1)
      child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, targetRotY, 0.1)
    })

    // Subtlest group floating
    groupRef.current.rotation.y += delta * 0.1 * (1 - t)
  })

  return (
    <group ref={groupRef}>
      {moduleData.map((data, i) => (
        <group key={i}>
          <SkillModuleComponent skill={data.skill} index={i} />
        </group>
      ))}
    </group>
  )
}

export default AssemblyScene