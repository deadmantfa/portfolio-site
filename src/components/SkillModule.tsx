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
    
    const targetZ = hovered ? 1.5 : 0
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
    
    // Rotation logic
    if (hovered) {
      groupRef.current.rotation.y += delta * 1.5
    } else {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    // Update global state for HTML overlay
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
    <group 
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Box args={[1.8, 1.2, 0.1]}>
          <meshStandardMaterial 
            color={hovered ? "#fbbf24" : "#6366f1"}
            wireframe={!hovered}
            transparent
            opacity={hovered ? 1 : 0.3}
            emissive={hovered ? "#fbbf24" : "#6366f1"}
            emissiveIntensity={hovered ? 10 : 0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>

        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="white"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu27PSq1Xkv5H-2Ra7UC1WIzWDnvMDdg.ttf"
          fillOpacity={hovered ? 1 : 0.5}
        >
          {skill.name.toUpperCase()}
        </Text>
      </Float>
    </group>
  )
}

export default SkillModuleComponent