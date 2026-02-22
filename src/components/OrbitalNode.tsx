'use client'

import { useRef, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { SkillModule } from '@/data/skills'
import { useScroll } from './ScrollProvider'

interface OrbitalNodeProps {
  skill: SkillModule
  position: [number, number, number]
  color: string
  hovered: boolean
  anyHovered: boolean
  onHover: () => void
  onHoverEnd: () => void
}

export function OrbitalNode({
  skill,
  position,
  color,
  hovered,
  anyHovered,
  onHover,
  onHoverEnd,
}: OrbitalNodeProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hoveredLocal, setHoveredLocal] = useState(false)
  const { setActiveSkill } = useScroll()

  const geometry = new THREE.SphereGeometry(0.6, 24, 24)

  useFrame(() => {
    if (!meshRef.current) return

    const targetScale = hoveredLocal ? 1.5 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12,
    )

    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const material = meshRef.current.material
      const targetEmissiveIntensity = hoveredLocal ? 2.5 : 0.8
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        targetEmissiveIntensity,
        0.1,
      )
    }
  })

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHoveredLocal(true)
    onHover()
    document.body.style.cursor = 'pointer'
    setActiveSkill(skill)
  }

  const handlePointerOut = () => {
    setHoveredLocal(false)
    onHoverEnd()
    document.body.style.cursor = 'default'
    setActiveSkill(null)
  }

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (hoveredLocal) {
      handlePointerOut()
    } else {
      // @ts-expect-error - Event type mismatch between click and pointer over is handled by stopPropagation
      handlePointerOver(e)
    }
  }

  const material = new THREE.MeshStandardMaterial({
    color,
    transparent: true,
    opacity: anyHovered && !hoveredLocal ? 0.35 : 1,
    emissive: color,
    emissiveIntensity: 0.8,
    metalness: 0.8,
    roughness: 0.2,
    blending: THREE.AdditiveBlending,
  })

  return (
    <group ref={groupRef} position={position}>
      <Billboard follow={true}>
        <mesh
          ref={meshRef}
          geometry={geometry}
          material={material}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />

        <Text
          position={[0, 0, 0.3]}
          fontSize={0.24}
          color="white"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
          fillOpacity={anyHovered && !hoveredLocal ? 0.5 : 1}
          strokeWidth={hoveredLocal ? 0.025 : 0.015}
          strokeColor={hoveredLocal ? color : '#000000'}
          strokeOpacity={hoveredLocal ? 1 : 0.4}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  )
}
