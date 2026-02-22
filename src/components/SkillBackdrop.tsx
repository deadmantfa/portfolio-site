'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SkillBackdropProps {
  progress: number
  exitProgress: number
}

export { SkillBackdrop }

function SkillBackdrop({ progress, exitProgress }: SkillBackdropProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Generate particles once
  const particles = useMemo(() => {
    const count = 300
    const result = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 6 + Math.random() * 12
      result.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      })
    }
    return result
  }, [])

  useFrame((_state, delta) => {
    if (!groupRef.current) return

    // Gentle rotation
    groupRef.current.rotation.y += delta * 0.04

    // Fade in as section scrolls in (appears at progress 0.3)
    const entryOpacity = Math.min(progress / 0.3, 1)

    // Scale down on exit
    const scale = 1 - exitProgress * 0.9

    groupRef.current.scale.set(scale, scale, scale)

    // Update particle opacity
    const points = groupRef.current.children[0] as THREE.Points
    if (points && points.material instanceof THREE.PointsMaterial) {
      points.material.opacity = 0.12 * entryOpacity
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(particles.flatMap((p) => [p.x, p.y, p.z])),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#6366f1"
          transparent
          opacity={0.12}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
