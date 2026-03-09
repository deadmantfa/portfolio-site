'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ConnectionSceneProps {
  progress: number
}

const CYCLE = 4.5
const RING_COUNT = 4

function PulseRing({ phaseOffset }: { phaseOffset: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = ((state.clock.getElapsedTime() + phaseOffset) % CYCLE) / CYCLE
    meshRef.current.scale.setScalar(t * 8)
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.max(0, 1 - t) * 0.55
  })

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.93, 1.0, 80]} />
      <meshBasicMaterial
        color="#818cf8"
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function CentralNode() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2.2) * 0.1
    meshRef.current.scale.setScalar(pulse)
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.28, 48]} />
      <meshBasicMaterial
        color="#818cf8"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

const ConnectionScene = ({ progress }: ConnectionSceneProps) => {
  'use no memo'
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!groupRef.current) return

    const targetY = THREE.MathUtils.lerp(-30, 0, Math.min(progress * 12, 1))
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1,
    )
    groupRef.current.visible = progress > 0.001
  })

  return (
    <group ref={groupRef} position={[0, -30, 0]}>
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <PulseRing key={i} phaseOffset={(CYCLE / RING_COUNT) * i} />
      ))}
      <CentralNode />
    </group>
  )
}

export default ConnectionScene
