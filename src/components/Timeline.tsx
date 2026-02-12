'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Box, Sphere } from '@react-three/drei'
import { careerData } from '@/data/career'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

const TimelineNode = ({ index, slug }: { index: number, slug?: string }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const router = useRouter()
  
  // Pushed further down and BACK (Z=-10) to avoid overlapping with skills
  const yBase = -index * 10 - 5
  
  useFrame((state) => {
    const scrollProgress = (window as any).scrollProgress || 0
    const activeEpoch = (window as any).activeEpoch || 0
    const totalDist = (careerData.length) * 10 + 10
    const targetY = yBase + (scrollProgress * totalDist)
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 3
    // Ensure Z stays back
    groupRef.current.position.z = -10
    
    const dist = Math.abs(groupRef.current.position.y)
    groupRef.current.visible = dist < 15

    // Frame focus logic
    const isFocused = activeEpoch === index
    const targetScale = isFocused ? 1.5 : 1
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1))
    
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      const targetEmissive = isFocused ? 10 : 0.5
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, 0.1)
      material.opacity = isFocused ? 0.8 : 0.4
    }
  })

  const handleClick = () => {
    if (slug) {
      router.push(`/work/${slug}`)
    }
  }

  return (
    <group 
      ref={groupRef} 
      onClick={handleClick} 
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Box ref={meshRef} args={[2, 2, 2]}>
          <meshStandardMaterial 
            color="#6366f1" 
            wireframe 
            transparent 
            opacity={0.4} 
            emissive="#6366f1"
            emissiveIntensity={0.5}
          />
        </Box>
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={5} toneMapped={false} />
        </Sphere>
      </Float>
    </group>
  )
}

const Timeline = () => {
  const getSlug = (index: number) => {
    if (index === 0) return 'rooftop'
    if (index === 1) return 'food-darzee'
    if (index === 2) return 'onfees'
    return undefined
  }

  return (
    <group>
      {careerData.map((_, index) => (
        <TimelineNode key={index} index={index} slug={getSlug(index)} />
      ))}
    </group>
  )
}

export default Timeline