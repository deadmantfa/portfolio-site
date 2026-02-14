'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { SkillModule } from '@/data/skills'
import { useSkillResources } from './SkillResourceProvider'
import { useScroll } from './ScrollProvider'

interface SkillModuleProps {
  skill: SkillModule
  index: number
  startPos: [number, number, number]
  endPos: [number, number, number]
  progress: number
}

const SkillModuleComponent = ({ skill, index, startPos, endPos, progress }: SkillModuleProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const { geometry, baseMaterial, hoverMaterial } = useSkillResources()
  const { setActiveSkill } = useScroll()
  
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    const t = Math.pow(progress, 1.2)
    
    // Base position from assembly
    const bx = THREE.MathUtils.lerp(startPos[0], endPos[0], t)
    const by = THREE.MathUtils.lerp(startPos[1], endPos[1], t)
    const bz = THREE.MathUtils.lerp(startPos[2], endPos[2], t)

    // Displacement on hover
    const targetZOffset = hovered ? 4 : 0
    
    // Current position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, bx, 0.1)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, by, 0.1)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, bz + targetZOffset, 0.1)
    
    // Rotation logic
    const targetRotX = THREE.MathUtils.lerp(Math.sin(index) * 0.5, 0, t)
    const targetRotY = THREE.MathUtils.lerp(Math.cos(index) * 0.5, 0, t)
    
    if (hovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1)
    }
  })

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    setActiveSkill(skill)
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
    setActiveSkill(null)
  }

  return (
    <group ref={groupRef}>
      <Float speed={hovered ? 0 : 2} rotationIntensity={hovered ? 0 : 0.2} floatIntensity={0.5}>
        <mesh 
          geometry={geometry}
          material={hovered ? hoverMaterial : baseMaterial}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />

        <Text
          position={[0, 0, 0.1]}
          fontSize={0.35}
          color="white"
          fillOpacity={1}
          strokeWidth={0.01}
          strokeColor={hovered ? "#6366f1" : "#000000"}
          strokeOpacity={hovered ? 1 : 0}
          side={THREE.FrontSide}
          pointerEvents="none"
        >
          {skill.name.toUpperCase()}
        </Text>
      </Float>
    </group>
  )
}

export default SkillModuleComponent
