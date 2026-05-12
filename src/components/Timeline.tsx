'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Text, useCursor } from '@react-three/drei'
import { careerData } from '@/data/career'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import { useScroll } from './ScrollProvider'

const TimelineNode = ({ index, milestone, slug }: { index: number, milestone: any, slug?: string }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const router = useRouter()
  const { epochProgress, activeEpoch } = useScroll()
  const [hovered, setHover] = useState(false)
  useCursor(hovered)
  
  // Base spacing between nodes in 3D units
  const spacing = 15
  
  useFrame((state) => {
    // Calculate target Y relative to the centered epoch
    const targetY = (index - epochProgress) * -spacing

    // Smooth movement
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.15)
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 1.5
    groupRef.current.position.z = -10
    
    // Visibility: Show if within reasonable Y range
    const distFromCenter = Math.abs(groupRef.current.position.y)
    groupRef.current.visible = distFromCenter < 25 && epochProgress >= -0.5

    // Frame focus logic
    const isFocused = activeEpoch === index
    const targetScale = isFocused ? 1.6 : 0.5
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1))
    
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      const targetEmissive = isFocused ? 8 : 0.05
      const targetOpacity = isFocused ? 1 : 0.1
      
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, 0.1)
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1)
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
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
    >
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color="#14b8a6" 
            emissive="#14b8a6" 
            emissiveIntensity={2} 
            toneMapped={false}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* 3D Label: Epoch Number + Year */}
        <group position={[2, 0, 0]}>
          <Text
            fontSize={0.4}
            color="#14b8a6"
            anchorX="left"
            anchorY="bottom"
            fillOpacity={(activeEpoch === index) ? 0.8 : 0}
          >
            {`EPOCH 0${index + 1}`}
          </Text>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.9}
            color="white"
            anchorX="left"
            anchorY="top"
            fillOpacity={(activeEpoch === index) ? 1 : 0}
          >
            {milestone.year.split(' ')[0]}
          </Text>
        </group>
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
      {careerData.map((milestone, index) => (
        <TimelineNode key={index} index={index} milestone={milestone} slug={getSlug(index)} />
      ))}
    </group>
  )
}

export default Timeline
