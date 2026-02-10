'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Box } from '@react-three/drei'
import { careerData } from '@/data/career'
import * as THREE from 'three'

const TimelineNode = ({ index }: { index: number }) => {
  const groupRef = useRef<THREE.Group>(null!)
  
  // Base spacing for the 3D elements
  const yBase = -index * 15 - 10
  
  useFrame(() => {
    const scrollProgress = (window as any).scrollProgress || 0
    const totalDist = (careerData.length + 1) * 15
    const targetY = yBase + (scrollProgress * totalDist)
    
    // Smooth interpolation for the 3D markers
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    
    // Subtle horizontal drift
    groupRef.current.position.x = Math.sin(index + Date.now() * 0.001) * 0.5 + (index % 2 === 0 ? 5 : -5)
    
    const dist = Math.abs(groupRef.current.position.y)
    groupRef.current.visible = dist < 20
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        {/* Abstract Architectural Marker */}
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
  return (
    <group>
      {careerData.map((_, index) => (
        <TimelineNode key={index} index={index} />
      ))}
    </group>
  )
}

export default Timeline
