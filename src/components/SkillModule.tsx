'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { SkillModule } from '@/data/skills'
import { useSkillResources } from './SkillResourceProvider'
import { useScroll } from './ScrollProvider'

interface SkillModuleProps {
  skill: SkillModule
  startPos: [number, number, number]
  endPos: [number, number, number]
  progress: number
}

const SkillModuleComponent = ({ skill, startPos, endPos, progress }: SkillModuleProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const { geometry } = useSkillResources()
  const { setActiveSkill } = useScroll()
  
  // Create unique materials for each instance to avoid global opacity sync issues
  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1a1a1a",
    transparent: true,
    opacity: 0.08,
    emissive: "#6366f1", // Match primary color
    emissiveIntensity: 0.05,
    metalness: 0.9,
    roughness: 0.1
  }), [])

  const hoverMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.4,
    emissive: "#6366f1",
    emissiveIntensity: 1.2, // Vibrant glow on hover
    metalness: 1,
    roughness: 0
  }), [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Faster assembly: t reaches 1 at progress 0.3
    const t = Math.min(Math.max(Math.pow(progress / 0.3, 1.2), 0), 1)
    
    // Base position from assembly
    const bx = THREE.MathUtils.lerp(startPos[0], endPos[0], t)
    const by = THREE.MathUtils.lerp(startPos[1], endPos[1], t)
    const bz = THREE.MathUtils.lerp(startPos[2], endPos[2], t)

    // Displacement on hover: pull significantly towards camera AND move slightly left to avoid the info card on the right
    const targetZOffset = hovered ? 10 : 0
    const targetXOffset = hovered ? -3 : 0
    const targetRotation = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.2 : 0
    
    // Current position with organic lerping
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, bx + targetXOffset, 0.08)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, by, 0.08)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, bz + targetZOffset, 0.12)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation, 0.1)
    
    // Scale-up effect on hover
    const targetScale = hovered ? 1.6 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    
    // Proximity logic: dim modules that are vertically distant from the viewport center
    const worldPos = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPos)
    const verticalDist = Math.abs(worldPos.y)
    
    // Opacity falloff: more generous to show more of the helix
    const opacity = Math.max(0.1, 1 - Math.pow(verticalDist / 25, 1.2))
    
    // Apply opacity directly to the instance materials
    // We disable immutability check here as this is standard R3F performance pattern
    /* eslint-disable react-hooks/immutability */
    baseMaterial.opacity = (hovered ? 0.6 : 0.12) * opacity
    hoverMaterial.opacity = 0.95 * opacity
    /* eslint-enable react-hooks/immutability */
    
    // Text opacity handling
    if (groupRef.current.children[0]) {
      const billboardGroup = groupRef.current.children[0]
      // @ts-expect-error - R3F Text is not well typed for opacity props in standard types
      const text = billboardGroup.children[1]
      if (text) {
        text.fillOpacity = opacity
        text.strokeOpacity = 0.6 * opacity
      }
    }
  })

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    setActiveSkill(skill)
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
    setActiveSkill(null)
  }

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    // Toggle for mobile/touch
    if (hovered) {
      handlePointerOut()
    } else {
      // @ts-expect-error - Event type mismatch between click and pointer over is handled by stopsPropagation
      handlePointerOver(e)
    }
  }

  return (
    <group ref={groupRef}>
      <Billboard follow={true}>
        <mesh 
          ref={meshRef}
          geometry={geometry}
          material={hovered ? hoverMaterial : baseMaterial}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />

        <Text
          position={[0, 0, 0.1]}
          fontSize={0.35}
          color="white"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
          fillOpacity={1}
          strokeWidth={hovered ? 0.025 : 0.02}
          strokeColor={hovered ? "#6366f1" : "#000000"}
          strokeOpacity={hovered ? 1 : 0.5}
          side={THREE.DoubleSide}
          pointerEvents="none"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  )
}

export default SkillModuleComponent
