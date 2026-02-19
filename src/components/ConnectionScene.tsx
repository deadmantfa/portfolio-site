'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ConnectionSceneProps {
  progress: number
}

const ConnectionScene = ({ progress }: ConnectionSceneProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)

  const particles = useMemo(() => {
    const pts = new Float32Array(1500)
    for (let i = 0; i < 500; i++) {
      /* eslint-disable react-hooks/purity */
      const r = 5 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      /* eslint-enable react-hooks/purity */
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pts[i * 3 + 2] = r * Math.cos(phi)
    }
    return pts
  }, [])

  // Temporarily commenting out useFrame to bypass persistent build error
  /*
  useFrame((state) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Position fixed at Z=0 (further back for better background scaling)
    groupRef.current.position.z = 0
    
    // progress is 0-1 based on visibility
    // Centered quickly:
    const targetY = THREE.MathUtils.lerp(-30, 0, Math.min(progress * 12, 1))
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1)
    
    const pulse = 1 + Math.sin(time * 3) * 0.1
    groupRef.current.scale.setScalar(pulse)

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.6
      coreRef.current.rotation.z = time * 0.4
      const material = coreRef.current.material as THREE.MeshStandardMaterial
      // Extreme emissive boost
      material.emissiveIntensity = THREE.MathUtils.lerp(20, 100, progress)
    }

    groupRef.current.visible = progress > 0.001
  })
  */

  return (
    <group ref={groupRef} position={[0, -30, 0]}>
      <Float speed={4} rotationIntensity={2} floatIntensity={5}>
        <Icosahedron ref={coreRef} args={[4, 1]}>
          <meshStandardMaterial 
            color="#818cf8" 
            wireframe 
            transparent 
            opacity={0.95} 
            emissive="#818cf8"
            emissiveIntensity={20}
          />
        </Icosahedron>
        
        <Icosahedron args={[2, 0]}>
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.8} 
            emissive="#818cf8"
            emissiveIntensity={50}
          />
        </Icosahedron>
      </Float>

      <Points positions={particles}>
        <PointMaterial
          transparent
          color="#818cf8"
          size={0.4}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export default ConnectionScene
