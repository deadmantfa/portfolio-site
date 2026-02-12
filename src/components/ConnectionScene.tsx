'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ConnectionSceneProps {
  progress: number
}

const ConnectionScene = ({ progress }: ConnectionSceneProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Position the core: it starts far below and rises up
    // progress 0 means it's far below (Y=-20)
    // progress 1 means it's centered (Y=0)
    const targetY = THREE.MathUtils.lerp(-20, 0, progress)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1)
    
    // Core rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2
      coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    }

    // Dynamic visibility based on progress
    groupRef.current.visible = progress > 0.01
  })

  // Generate a small cloud of connection particles
  const particles = new Float32Array(300)
  for (let i = 0; i < 100; i++) {
    const r = 10 + Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    particles[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    particles[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    particles[i * 3 + 2] = r * Math.cos(phi)
  }

  return (
    <group ref={groupRef} position={[0, -20, -5]}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron ref={coreRef} args={[4, 1]}>
          <meshStandardMaterial 
            color="#14b8a6" 
            wireframe 
            transparent 
            opacity={0.3} 
            emissive="#14b8a6"
            emissiveIntensity={2}
          />
        </Icosahedron>
        
        <Icosahedron args={[2, 0]}>
          <meshStandardMaterial 
            color="#14b8a6" 
            transparent 
            opacity={0.1} 
            emissive="#14b8a6"
            emissiveIntensity={10}
          />
        </Icosahedron>
      </Float>

      <Points positions={particles}>
        <PointMaterial
          transparent
          color="#14b8a6"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export default ConnectionScene
