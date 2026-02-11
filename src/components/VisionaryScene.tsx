'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ArchitecturalGridProps {
  isBlueprint?: boolean
}

const ArchitecturalGrid = ({ isBlueprint = false }: ArchitecturalGridProps) => {
  const meshRef = useRef<THREE.Group>(null!)
  const count = 40
  
  const [positions, indices] = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    const ind = []
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i / (count - 1) - 0.5) * 80 // Even wider
        const z = (j / (count - 1) - 0.5) * 80
        const idx = (i * count + j) * 3
        pos[idx] = x
        pos[idx + 1] = 0
        pos[idx + 2] = z
        
        const k = i * count + j
        if (i < count - 1) ind.push(k, k + count)
        if (j < count - 1) ind.push(k, k + 1)
      }
    }
    return [pos, new Uint16Array(ind)]
  }, [count])

  const pointsRef = useRef<THREE.Points>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const scrollProgress = (window as any).scrollProgress || 0
    
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position
      for (let i = 0; i < count * count; i++) {
        const x = posAttr.getX(i)
        const z = posAttr.getZ(i)
        const y = Math.sin(x * 0.05 + time) * Math.cos(z * 0.05 + time) * (3 + scrollProgress * 10)
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true
      
      linesRef.current.geometry.attributes.position.array.set(posAttr.array)
      linesRef.current.geometry.attributes.position.needsUpdate = true
      
      // Smoothly interpolate opacity and color
      const targetOpacity = isBlueprint ? 0.8 : 0.4
      pointsRef.current.material.opacity = THREE.MathUtils.lerp(pointsRef.current.material.opacity, targetOpacity, 0.1)
      linesRef.current.material.opacity = THREE.MathUtils.lerp(linesRef.current.material.opacity, targetOpacity * 0.3, 0.1)
      
      const targetColor = new THREE.Color(isBlueprint ? "#14b8a6" : "#6366f1")
      pointsRef.current.material.color.lerp(targetColor, 0.1)
      linesRef.current.material.color.lerp(targetColor, 0.1)
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={isBlueprint ? 0.3 : 0.2} 
          color="#6366f1" 
          transparent 
          opacity={0.4} 
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={indices.length}
            array={indices}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#6366f1" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default ArchitecturalGrid