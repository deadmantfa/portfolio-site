'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { skillModules } from '@/data/skills'
import SkillModuleComponent from './SkillModule'
import * as THREE from 'three'
import { SkillResourceProvider } from './SkillResourceProvider'

interface AssemblySceneProps {
  progress: number
}

const AssemblyScene = ({ progress }: AssemblySceneProps) => {
  const groupRef = useRef<THREE.Group>(null!)

  const moduleData = useMemo(() => {
    const cols = 3
    const spacingX = 5.5
    const spacingY = 2.2
    
    return skillModules.map((skill, i) => {
      const startPos: [number, number, number] = [
        Math.sin(i * 100) * 15,
        Math.cos(i * 100) * 12,
        Math.sin(i * 50) * 8
      ]
      
      // Grid formation logic
      const row = Math.floor(i / cols)
      const col = i % cols
      const x = (col - (cols - 1) / 2) * spacingX
      const y = ((skillModules.length / cols) / 2 - row) * spacingY
      
      const endPos: [number, number, number] = [x, y, 0]
      return { skill, startPos, endPos }
    })
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Smoothly ensure group is upright
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
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

export default AssemblyScene