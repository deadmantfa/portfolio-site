'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from './ScrollProvider'
import { Float, Text, MeshDistortMaterial } from '@react-three/drei'

const Artifact = ({ position, color, label, shape = 'box', progress = 0, opacity = 1 }: { 
  position: [number, number, number], 
  color: string, 
  label: string, 
  shape?: 'box' | 'octahedron' | 'tetrahedron',
  progress?: number,
  opacity?: number
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
      uOpacity: { value: opacity },
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
      uniform float uOpacity;
      uniform float uScanlineFrequency;
      
      void main() {
        // Holographic scanlines
        float scanline = sin(vPosition.y * uScanlineFrequency + uTime * 5.0) * 0.5 + 0.5;
        scanline = pow(scanline, 3.0);
        
        // Edge glow
        float edge = 1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0));
        edge = pow(edge, 2.0);
        
        vec3 finalColor = uColor + edge * 0.5;
        float alpha = (0.4 + scanline * 0.3 + edge * 0.2) * uOpacity;
        
        // Boost color and alpha if "active" (scroll based or hovered)
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
      materialRef.current.uniforms.uOpacity.value = opacity
      
      // Target active state based on hover or middle-of-section scroll
      const activation = Math.max(0, 1 - Math.abs(progress - 0.5) * 4)
      const targetActive = hovered ? 1 : activation
      materialRef.current.uniforms.uActive.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uActive.value, 
        targetActive, 
        0.1
      )
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = time * (hovered ? 1.5 : 0.5)
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, (hovered ? 1.2 : 1) * opacity, 0.1))
      
      // Depth transition based on progress
      const targetZ = (1 - opacity) * -10
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        visible={opacity > 0.01}
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
        fillOpacity={opacity}
        font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </Float>
  )
}

const VaultScene = ({ progress = 0 }: { progress?: number }) => {
  const groupRef = useRef<THREE.Group>(null!)

  // Fade in at the start of the section and out at the end
  const vaultOpacity = useMemo(() => {
    if (progress < 0.1) return progress * 10
    if (progress > 0.9) return (1 - progress) * 10
    return 1
  }, [progress])

  return (
    <group ref={groupRef} visible={vaultOpacity > 0}>
      {/* Education Artifact: St. Andrews College */}
      <Artifact 
        position={[-3, 0, 0]} 
        color="#6366f1" 
        label="St. Andrews College (B.Sc IT)" 
        shape="box"
        progress={progress}
        opacity={vaultOpacity}
      />
      
      {/* Certification Artifact 1: Elasticsearch Certified Engineer */}
      <Artifact 
        position={[0, 0, 0]} 
        color="#14b8a6" 
        label="Elasticsearch Certified Engineer" 
        shape="octahedron"
        progress={progress}
        opacity={vaultOpacity}
      />
      
      {/* Certification Artifact 2: Google Cloud Professional */}
      <Artifact 
        position={[3, 0, 0]} 
        color="#f59e0b" 
        label="Google Cloud Professional Architect" 
        shape="tetrahedron"
        progress={progress}
        opacity={vaultOpacity}
      />
    </group>
  )
}

export default VaultScene
