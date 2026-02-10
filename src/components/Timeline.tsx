'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Box, Sphere } from '@react-three/drei'
import { careerData } from '@/data/career'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

const TimelineNode = ({ index, slug }: { index: number, slug?: string }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const router = useRouter()
  
  // Larger spacing for clarity
  const yBase = -index * 20 - 15
  
  useFrame(() => {
    const scrollProgress = (window as any).scrollProgress || 0
    const totalDist = (careerData.length + 1) * 20
    const targetY = yBase + (scrollProgress * totalDist)
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.position.x = Math.sin(Date.now() * 0.0005 + index) * 2
    
    const dist = Math.abs(groupRef.current.position.y)
    groupRef.current.visible = dist < 25
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
      <Float speed={3} rotationIntensity={4} floatIntensity={3}>
        {/* Wireframe with Basic Material to ensure it's always visible */}
        <Box args={[3, 3, 3]}>
          <meshBasicMaterial 
            color="#6366f1" 
            wireframe 
            transparent
            opacity={0.4}
          />
        </Box>
        
        {/* Core with emissive for glow */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#fbbf24" 
            emissiveIntensity={10} 
            toneMapped={false}
          />
        </Sphere>

        <Box args={[4, 0.1, 0.1]} rotation={[0, 0, Math.PI / 4]}>
          <meshBasicMaterial color="white" transparent opacity={0.5} />
        </Box>
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
