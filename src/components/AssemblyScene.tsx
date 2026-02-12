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
    
    const t = Math.pow(progress, 1.2) 
    
    groupRef.current.children.forEach((child, i) => {
      const data = moduleData[i]
      if (!data) return

      child.position.x = THREE.MathUtils.lerp(child.position.x, THREE.MathUtils.lerp(data.startPos[0], data.endPos[0], t), 0.1)
      child.position.y = THREE.MathUtils.lerp(child.position.y, THREE.MathUtils.lerp(data.startPos[1], data.endPos[1], t), 0.1)
      child.position.z = THREE.MathUtils.lerp(child.position.z, THREE.MathUtils.lerp(data.startPos[2], data.endPos[2], t), 0.1)
      
      // Force perfectly centered rotation upon assembly
      const targetRotX = THREE.MathUtils.lerp(Math.sin(i) * 0.5, 0, t)
      const targetRotY = THREE.MathUtils.lerp(Math.cos(i) * 0.5, 0, t)
      child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, targetRotX, 0.1)
      child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, targetRotY, 0.1)
    })

    // NO MORE GROUP ROTATION - ensures text is always forward facing
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
  })

  return (
    <SkillResourceProvider>
      <group ref={groupRef}>
        {moduleData.map((data, i) => (
          <group key={i}>
            <SkillModuleComponent skill={data.skill} index={i} />
          </group>
        ))}
      </group>
    </SkillResourceProvider>
  )
}

export default AssemblyScene