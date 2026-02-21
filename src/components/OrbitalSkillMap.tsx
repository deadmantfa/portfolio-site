'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import { skillModules } from '@/data/skills'
import { OrbitalRing } from './OrbitalRing'
import { CATEGORY_CONFIG, type CategoryKey } from '@/utils/orbital'

interface OrbitalSkillMapProps {
  progress: number
  exitProgress: number
}

export function OrbitalSkillMap({
  progress,
  exitProgress,
}: OrbitalSkillMapProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const centerHubRef = useRef<THREE.Mesh>(null!)
  const particlesRef = useRef<THREE.Points>(null!)
  const { viewport } = useThree()

  const gsapState = useRef({ tiltProgress: 0 })
  const gsapTweenRef = useRef<gsap.core.Tween | null>(null)

  // Trigger GSAP animation when skills section scrolls into view
  const hasScrolledIn = progress > 0.15

  useEffect(() => {
    if (hasScrolledIn && gsapTweenRef.current === null) {
      gsapTweenRef.current = gsap.to(gsapState.current, {
        tiltProgress: 1,
        duration: 1.8,
        ease: 'expo.out',
      })
    }
  }, [hasScrolledIn])

  // Responsive viewport scale
  const viewportScale = Math.min(viewport.width / 15, 1)

  // Skill distribution by category
  const skillsByCategory = useMemo(() => {
    const result: Record<CategoryKey, typeof skillModules> = {
      leadership: [],
      frontend: [],
      backend: [],
      infrastructure: [],
    }

    skillModules.forEach((skill) => {
      if (skill.category in result) {
        result[skill.category as CategoryKey].push(skill)
      }
    })

    return result
  }, [])

  // Particle positions for background effect (lighter than SkillNebula)
  const particlePositions = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Random distribution in a sphere
      const radius = Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.cos(phi)
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }

    return positions
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Apply GSAP-driven tilt animation
    const tilt = THREE.MathUtils.lerp(
      Math.PI / 2.4,
      0,
      gsapState.current.tiltProgress,
    )
    groupRef.current.rotation.x = tilt

    // Gentle floating motion
    const floatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
    groupRef.current.position.y = floatY

    // Exit scaling
    const s = 1 - exitProgress * 0.97
    groupRef.current.scale.set(s, s, s)

    // Center hub pulse animation
    if (centerHubRef.current?.material instanceof THREE.MeshStandardMaterial) {
      centerHubRef.current.material.emissiveIntensity =
        2.0 + Math.sin(state.clock.elapsedTime * 1.5) * 0.5
    }
  })

  const CATEGORIES: CategoryKey[] = [
    'leadership',
    'frontend',
    'backend',
    'infrastructure',
  ]

  return (
    <group ref={groupRef}>
      {/* Background particles */}
      <Points ref={particlesRef} positions={particlePositions} stride={3}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.15 * (1 - exitProgress)}
        />
      </Points>

      {/* Center hub sphere */}
      <mesh ref={centerHubRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={2.0}
          metalness={0.9}
          roughness={0.1}
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.95 * (1 - exitProgress * 0.5)}
        />
      </mesh>

      {/* Concentric orbital rings */}
      {CATEGORIES.map((category) => (
        <OrbitalRing
          key={category}
          skills={skillsByCategory[category]}
          radius={CATEGORY_CONFIG[category].radius}
          color={CATEGORY_CONFIG[category].color}
          rotationSpeed={CATEGORY_CONFIG[category].rotationSpeed}
          viewportScale={viewportScale}
        />
      ))}
    </group>
  )
}
