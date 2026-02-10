'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Box } from '@react-three/drei'
import { careerData } from '@/data/career'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

const TimelineNode = ({ index, slug }: { index: number, slug?: string }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const router = useRouter()
  
  const yBase = -index * 15 - 10
  
  useFrame(() => {
    const scrollProgress = (window as any).scrollProgress || 0
    const totalDist = (careerData.length + 1) * 15
    const targetY = yBase + (scrollProgress * totalDist)
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.position.x = Math.sin(index + Date.now() * 0.001) * 0.5 + (index % 2 === 0 ? 5 : -5)
    
    const dist = Math.abs(groupRef.current.position.y)
    groupRef.current.visible = dist < 20
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
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <Box args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial 
            color="#6366f1" 
            wireframe 
            transparent
            opacity={0.3}
            emissive="#6366f1" 
            emissiveIntensity={0.2} 
          />
        </Box>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#fbbf24" 
            emissiveIntensity={1} 
          />
        </Box>
      </Float>
    </group>
  )
}

const Timeline = () => {
  // Mapping career milestones to specific project slugs where available
  const getSlug = (index: number) => {
    if (index === 0) return 'rooftop'
    if (index === 1) return 'food-darzee'
    if (index === 2) return 'onfees'
    if (index === 3) return 'indiefolio' // We can add more data later
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