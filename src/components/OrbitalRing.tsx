'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { SkillModule } from '@/data/skills'
import { OrbitalNode } from './OrbitalNode'
import { distributeSkillsOnRing } from '@/utils/orbital'

interface OrbitalRingProps {
  skills: SkillModule[]
  radius: number
  color: string
  rotationSpeed: number
  viewportScale: number
}

export function OrbitalRing({
  skills,
  radius,
  color,
  rotationSpeed,
  viewportScale,
}: OrbitalRingProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scaledRadius = radius * viewportScale
  const nodes = useMemo(
    () => distributeSkillsOnRing(skills, scaledRadius),
    [skills, scaledRadius],
  )

  // Generate circle geometry for the orbit path visualization
  const circlePoints = useMemo(() => {
    const points: THREE.Vector3[] = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * scaledRadius,
          0,
          Math.sin(angle) * scaledRadius,
        ),
      )
    }
    return points
  }, [scaledRadius])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += rotationSpeed * delta
  })

  return (
    <group ref={groupRef}>
      {/* Orbit ring visualization */}
      <Line
        points={circlePoints}
        color={color}
        lineWidth={1}
        opacity={0.25}
        transparent
      />

      {/* Skill nodes distributed on the ring */}
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * node.radius
        const z = Math.sin(node.angle) * node.radius
        return (
          <OrbitalNode
            key={`${node.skill.name}-${i}`}
            skill={node.skill}
            position={[x, 0, z]}
            color={color}
            hovered={hoveredIndex === i}
            anyHovered={hoveredIndex !== null}
            onHover={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
          />
        )
      })}
    </group>
  )
}
