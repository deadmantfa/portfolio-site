'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Line, Text } from '@react-three/drei'
import * as THREE from 'three'
import { ProjectBlueprint } from '@/data/projects'

interface BlueprintSchemaProps {
  blueprint: ProjectBlueprint
}

export default function BlueprintSchema({ blueprint }: BlueprintSchemaProps) {
  const groupRef = useRef<THREE.Group>(null!)

  const nodes = useMemo(() => {
    const arr = []
    const radius = 10
    for (let i = 0; i < blueprint.nodes; i++) {
      const angle = (i / blueprint.nodes) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      /* eslint-disable react-hooks/purity */
      const z = (Math.random() - 0.5) * 5
      /* eslint-enable react-hooks/purity */
      arr.push(new THREE.Vector3(x, y, z))
    }
    return arr
  }, [blueprint.nodes])

  const connections = useMemo(() => {
    const arr: [THREE.Vector3, THREE.Vector3][] = []
    // Connect each node to its neighbor
    for (let i = 0; i < nodes.length; i++) {
      arr.push([nodes[i], nodes[(i + 1) % nodes.length]])
      
      // Random internal connections
      /* eslint-disable react-hooks/purity */
      if (Math.random() > 0.5) {
        const target = Math.floor(Math.random() * nodes.length)
        /* eslint-enable react-hooks/purity */
        if (target !== i) {
          arr.push([nodes[i], nodes[target]])
        }
      }
    }
    return arr
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Hub if Hub-and-Spoke */}
      {blueprint.type === 'hub-and-spoke' && (
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#14b8a6" 
            wireframe 
            emissive="#14b8a6" 
            emissiveIntensity={2}
          />
        </Sphere>
      )}

      {/* Nodes */}
      {nodes.map((pos, i) => (
        <group key={i} position={pos}>
          <Sphere args={[0.3, 16, 16]}>
            <meshStandardMaterial 
              color="#14b8a6" 
              wireframe 
              emissive="#14b8a6" 
              emissiveIntensity={1}
            />
          </Sphere>
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.2}
            color="#14b8a6"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
          >
            {`NODE_${i.toString().padStart(2, '0')}`}
          </Text>
        </group>
      ))}

      {/* Connections */}
      {connections.map(([start, end], i) => (
        <Line
          key={i}
          points={[start, end]}
          color="#14b8a6"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  )
}
