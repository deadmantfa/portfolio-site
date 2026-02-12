'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from './ScrollProvider'

const ArchitecturalGrid = ({ isBlueprint = false }: { isBlueprint?: boolean }) => {
  const meshRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const { scrollProgress } = useScroll()
  
  const count = 40
  
  const [positions, indices] = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    const ind = []
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i / (count - 1) - 0.5) * 80
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

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color("#6366f1") },
      uOpacity: { value: 0.4 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScroll;
      varying float vElevation;
      
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        
        float elevation = sin(modelPosition.x * 0.05 + uTime) * 
                         cos(modelPosition.z * 0.05 + uTime) * 
                         min(3.0 + uScroll * 10.0, 12.0);
        
        modelPosition.y += elevation;
        vElevation = elevation;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        gl_PointSize = 4.0; // Fixed size for points
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vElevation;
      
      void main() {
        float strength = (vElevation + 12.0) / 24.0;
        gl_FragColor = vec4(uColor * (0.5 + strength), uOpacity);
      }
    `
  }), [])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    
    materialRef.current.uniforms.uTime.value = time
    materialRef.current.uniforms.uScroll.value = scrollProgress
    
    const targetOpacity = isBlueprint ? 0.8 : 0.4
    materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uOpacity.value, targetOpacity, 0.1)
    
    const targetColor = new THREE.Color(isBlueprint ? "#14b8a6" : "#6366f1")
    materialRef.current.uniforms.uColor.value.lerp(targetColor, 0.1)
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial 
          ref={materialRef}
          args={[shaderArgs]}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <lineSegments>
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
        <shaderMaterial 
          args={[shaderArgs]}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          wireframe
        />
      </lineSegments>
    </group>
  )
}

export default ArchitecturalGrid
