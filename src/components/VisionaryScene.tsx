'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const VisionaryScene = () => {
  const ref = useRef<THREE.Points>(null!)
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = 1.5 * Math.sin(phi) * Math.cos(theta)
      const y = 1.5 * Math.sin(phi) * Math.sin(theta)
      const z = 1.5 * Math.cos(phi)
      positions.set([x, y, z], i * 3)
    }
    return positions
  })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export default VisionaryScene