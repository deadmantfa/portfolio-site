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
    return skillModules.map((skill, i) => {
      // Random starting position (far away)
      const startPos: [number, number, number] = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ]
      
      // Final Monolith position (vertical stack)
      // Spacing modules along the Y axis
      const endPos: [number, number, number] = [0, (skillModules.length / 2 - i) * 2, 0]
      
      return { skill, startPos, endPos }
    })
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    
    // Animate each child module based on progress
    groupRef.current.children.forEach((child, i) => {
      const data = moduleData[i]
      if (!data) return

      // Interpolate position based on progress (0 to 1)
      // We can use a power function for a "snappy" assembly feel
      const t = Math.pow(progress, 2) 
      
      child.position.x = THREE.MathUtils.lerp(data.startPos[0], data.endPos[0], t)
      child.position.y = THREE.MathUtils.lerp(data.startPos[1], data.endPos[1], t)
      child.position.z = THREE.MathUtils.lerp(data.startPos[2], data.endPos[2], t)
      
      // Also interpolate rotation for a chaotic-to-ordered feel
      child.rotation.x = THREE.MathUtils.lerp(i, 0, t)
      child.rotation.y = THREE.MathUtils.lerp(i, 0, t)
    })
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
