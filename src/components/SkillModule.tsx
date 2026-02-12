'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box, Text } from '@react-three/drei'
import * as THREE from 'three'
import { SkillModule } from '@/data/skills'

interface SkillModuleProps {
  skill: SkillModule
  index: number
}

const SkillModuleComponent = ({ skill, index }: SkillModuleProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Displacement on hover
    const targetZ = hovered ? 4 : 0
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
    
    // Logic to ensure we always face "forward" (Y=0) when assembled or hovered
    if (hovered) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
    }
  })

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    ;(window as any).activeSkill = skill
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
    if ((window as any).activeSkill === skill) {
      (window as any).activeSkill = null
    }
  }

  return (
    <group ref={groupRef}>
      <Float speed={hovered ? 0 : 2} rotationIntensity={hovered ? 0 : 0.2} floatIntensity={0.5}>
        <Box 
          args={[4, 1.4, 0.1]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial 
            color={hovered ? "#14b8a6" : "#6366f1"}
            wireframe={!hovered}
            transparent
            opacity={hovered ? 1 : 0.2}
            emissive={hovered ? "#14b8a6" : "#6366f1"}
            emissiveIntensity={hovered ? 10 : 0.5}
            metalness={1}
            roughness={0}
          />
        </Box>

        <Text
          position={[0, 0, 0.1]}
          fontSize={0.35}
          color="white"
          fillOpacity={1}
          strokeWidth={0.01}
          strokeColor={hovered ? "black" : ""}
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
