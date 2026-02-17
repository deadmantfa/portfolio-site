'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from './ScrollProvider'
import { Float, Text, MeshDistortMaterial } from '@react-three/drei'

const Artifact = ({ position, color, label, shape = 'box' }: { 
  position: [number, number, number], 
  color: string, 
  label: string, 
  shape?: 'box' | 'octahedron' | 'tetrahedron' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const { scrollProgress } = useScroll()
  const [hovered, setHover] = useState(false)

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uActive: { value: 0 },
      uScanlineFrequency: { value: 20.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vec3 pos = position;
        
        // Subtle distortion
        pos.x += sin(pos.y * 2.0 + uTime) * 0.05;
        pos.z += cos(pos.x * 2.0 + uTime) * 0.05;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uActive;
      uniform float uScanlineFrequency;
      
      void main() {
        // Holographic scanlines
        float scanline = sin(vPosition.y * uScanlineFrequency + uTime * 5.0) * 0.5 + 0.5;
        scanline = pow(scanline, 3.0);
        
        // Edge glow
        float edge = 1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0));
        edge = pow(edge, 2.0);
        
        vec3 finalColor = uColor + edge * 0.5;
        float alpha = 0.4 + scanline * 0.3 + edge * 0.2;
        
        // Boost color and alpha if "active" (scroll based)
        finalColor += uActive * 0.2;
        alpha += uActive * 0.2;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), [color])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      // Simple "active" logic based on scroll progress (Vault is roughly at 0.7 - 0.8)
      const scrollActivation = Math.max(0, 1 - Math.abs(scrollProgress - 0.75) * 5)
      const targetActive = hovered ? 1 : scrollActivation
      materialRef.current.uniforms.uActive.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uActive.value, 
        targetActive, 
        0.1
      )
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = time * (hovered ? 1.5 : 0.5)
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.2 : 1, 0.1))
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {shape === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.8]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[0.8]} />}
        <shaderMaterial 
          ref={materialRef}
          args={[shaderArgs]}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <Text
        position={[position[0], position[1] - 1.2, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </Float>
  )
}

const VaultScene = () => {
  const groupRef = useRef<THREE.Group>(null!)

  return (
    <group ref={groupRef}>
      {/* Education Artifact: St. Andrews College */}
      <Artifact 
        position={[-3, 0, 0]} 
        color="#6366f1" 
        label="St. Andrews College (B.Sc IT)" 
        shape="box" 
      />
      
      {/* Certification Artifact 1: Elasticsearch Certified Engineer */}
      <Artifact 
        position={[0, 0, 0]} 
        color="#14b8a6" 
        label="Elasticsearch Certified Engineer" 
        shape="octahedron" 
      />
      
      {/* Certification Artifact 2: Google Cloud Professional */}
      <Artifact 
        position={[3, 0, 0]} 
        color="#f59e0b" 
        label="Google Cloud Professional Architect" 
        shape="tetrahedron" 
      />
    </group>
  )
}

export default VaultScene
