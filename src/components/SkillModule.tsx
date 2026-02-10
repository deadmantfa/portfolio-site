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
    
    // Smooth hover displacement
    const targetZ = hovered ? 1 : 0
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
    
    // Slow rotation
    groupRef.current.rotation.y += delta * 0.2
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
    >
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* The Skill Module "Shard" */}
        <Box args={[1.5, 1.5, 0.2]}>
          <meshStandardMaterial 
            color={hovered ? "#818cf8" : "#6366f1"}
            wireframe={!hovered}
            transparent
            opacity={hovered ? 0.9 : 0.4}
            emissive={hovered ? "#818cf8" : "#6366f1"}
            emissiveIntensity={hovered ? 2 : 0.5}
          />
        </Box>

        {/* Skill Name */}
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.2}
          color="white"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu27PSq1Xkv5H-2Ra7UC1WIzWDnvMDdg.ttf"
        >
          {skill.name.toUpperCase()}
        </Text>
      </Float>
    </group>
  )
}

export default SkillModuleComponent
