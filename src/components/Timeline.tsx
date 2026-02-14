'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Box, Sphere } from '@react-three/drei'
import { careerData } from '@/data/career'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

import { useScroll } from './ScrollProvider'

const TimelineNode = ({ index, slug }: { index: number, slug?: string }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const router = useRouter()
  const { scrollProgress, activeEpoch } = useScroll()
  
  // Pushed further down and BACK (Z=-10) to avoid overlapping with skills
  const yBase = -index * 10 - 5
  
  useFrame((state) => {
    // Determine if we are nearing the skills section to hide nodes
    // Rough estimate: skills start after epoch 6.
    const skillsStartProgress = 0.7
    
    const totalDist = (careerData.length) * 10 + 10
    const targetY = yBase + (scrollProgress * totalDist)
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 3
    // Ensure Z stays back
    groupRef.current.position.z = -10
    
    const dist = Math.abs(groupRef.current.position.y)
    // Hide if too far or if we are nearing the skills section
    groupRef.current.visible = dist < 15 && scrollProgress < skillsStartProgress

    // Frame focus logic
    const isFocused = activeEpoch === index
    const targetScale = isFocused ? 1.5 : 1
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1))
    
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      const targetEmissive = isFocused ? 10 : 2
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, 0.1)
      material.opacity = isFocused ? 1 : 0.6
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (slug) {
      router.push(`/work/${slug}`)
    }
  }

  return (
    <group 
      ref={groupRef} 
      onClick={handleClick} 
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere ref={meshRef} args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color="#14b8a6" 
            emissive="#14b8a6" 
            emissiveIntensity={5} 
            toneMapped={false}
            transparent
            opacity={0.8}
          />
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