'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { SkillModule } from '@/data/skills'
import { useSkillResources } from './SkillResourceProvider'
import { useScroll } from './ScrollProvider'

interface SkillModuleProps {
  skill: SkillModule
  index: number
  startPos: [number, number, number]
  endPos: [number, number, number]
  progress: number
}

const SkillModuleComponent = ({ skill, index, startPos, endPos, progress }: SkillModuleProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const { geometry, baseMaterial, hoverMaterial } = useSkillResources()
  const { setActiveSkill } = useScroll()
  
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    const t = Math.min(Math.max(Math.pow(progress, 1.2), 0), 1)
    
    // Base position from assembly
    const bx = THREE.MathUtils.lerp(startPos[0], endPos[0], t)
    const by = THREE.MathUtils.lerp(startPos[1], endPos[1], t)
    const bz = THREE.MathUtils.lerp(startPos[2], endPos[2], t)

    // Displacement on hover: pull towards camera AND move slightly left to avoid the info card on the right
    const targetZOffset = hovered ? 6 : 0
    const targetXOffset = hovered ? -2 : 0
    
    // Current position with organic lerping
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, bx + targetXOffset, 0.08)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, by, 0.08)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, bz + targetZOffset, 0.12)
    
    // Scale-up effect on hover
    const targetScale = hovered ? 1.4 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    
    // Proximity logic: dim modules that are vertically distant from the viewport center
    // The group itself moves vertically, so we check local Y relative to group center (which is roughly at 0)
    // Actually, we want to check world Y relative to 0
    const worldPos = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPos)
    const verticalDist = Math.abs(worldPos.y)
    const opacity = Math.max(0.1, 1 - (verticalDist / 15))
    
    // Apply opacity to children (mesh and text)
    if (groupRef.current.children[0]) {
      const floatGroup = groupRef.current.children[0]
      const mesh = floatGroup.children[0] as THREE.Mesh
      const text = floatGroup.children[1] as any
      
      if (mesh.material) {
        ;(mesh.material as THREE.MeshStandardMaterial).opacity = hovered ? 0.3 : 0.05 * opacity
      }
      if (text) {
        text.fillOpacity = opacity
        text.strokeOpacity = 0.5 * opacity
      }
    }

    // Rotation logic: Face camera
    groupRef.current.quaternion.copy(state.camera.quaternion)
  })

  const handlePointerOver = (e: any) => {
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

  return (
    <group ref={groupRef}>
      <Float speed={hovered ? 0 : 2} rotationIntensity={hovered ? 0 : 0.2} floatIntensity={0.5}>
        <mesh 
          geometry={geometry}
          material={hovered ? hoverMaterial : baseMaterial}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />

        <Text
          position={[0, 0, 0.06]}
          fontSize={0.3}
          color="white"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
          fillOpacity={1}
          strokeWidth={hovered ? 0.02 : 0.015}
          strokeColor={hovered ? "#6366f1" : "#000000"}
          strokeOpacity={hovered ? 1 : 0.5}
          side={THREE.FrontSide}
          pointerEvents="none"
        >
          {skill.name.toUpperCase()}
        </Text>
      </Float>
    </group>
  )
}

export default SkillModuleComponent
