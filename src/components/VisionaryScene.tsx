'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const ArchitecturalGrid = () => {
  const pointsRef = useRef<THREE.Points>(null!)
  const lineRef = useRef<THREE.LineSegments>(null!)

  const count = 20
  const [particles, connections] = useMemo(() => {
    const positions = new Float32Array(count * count * 3)
    const lineIndices: number[] = []
    
    let k = 0
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i / count - 0.5) * 10
        const z = (j / count - 0.5) * 10
        positions.set([x, 0, z], k * 3)
        
        // Horizontal connection
        if (i < count - 1) {
          lineIndices.push(k, k + count)
        }
        // Vertical connection
        if (j < count - 1) {
          lineIndices.push(k, k + 1)
        }
        k++
      }
    }
    
    return [positions, new Uint16Array(lineIndices)]
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count * count; i++) {
      const x = positions[i * 3]
      const z = positions[i * 3 + 2]
      
      // Wave motion
      const y = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 0.5
      positions[i * 3 + 1] = y
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    lineRef.current.geometry.attributes.position.needsUpdate = true
    
    // Subtle rotation
    pointsRef.current.rotation.y = time * 0.05
    lineRef.current.rotation.y = time * 0.05
  })

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#6366f1" transparent opacity={0.4} />
      </points>
      
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={connections.length}
            array={connections}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
      </lineSegments>
    </group>
  )
}

export default ArchitecturalGrid