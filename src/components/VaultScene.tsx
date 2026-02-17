'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from './ScrollProvider'
import { Float, Points, PointMaterial } from '@react-three/drei'

const ArtifactShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#6366f1") },
    uActive: { value: 0 },
    uOpacity: { value: 1 },
    uScanlineFrequency: { value: 25.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float uTime;
    uniform float uActive;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      // Pulse animation when active
      float pulse = uActive * sin(uTime * 4.0) * 0.05;
      pos += normal * pulse;
      
      vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -modelViewPosition.xyz;
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uActive;
    uniform float uOpacity;
    uniform float uScanlineFrequency;
    
    void main() {
      // Fresnel effect for high-end glow
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0), 2.5);
      
      // Technical scanlines
      float scanline = sin(vPosition.y * uScanlineFrequency + uTime * 3.0) * 0.5 + 0.5;
      scanline = pow(scanline, 4.0);
      
      // Combine effects
      vec3 baseColor = mix(uColor, vec3(1.0), fresnel * 0.5);
      vec3 finalColor = baseColor + (scanline * 0.2) + (uActive * uColor * 0.3);
      
      float alpha = (0.2 + fresnel * 0.6 + scanline * 0.2) * uOpacity;
      // Boost alpha when active
      alpha = mix(alpha, alpha + 0.3, uActive);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
}

const Artifact = ({ position, color, id, shape = 'box', progress = 0, opacity = 1 }: { 
  position: [number, number, number], 
  color: string, 
  id: string,
  shape?: 'box' | 'octahedron' | 'tetrahedron',
  progress?: number,
  opacity?: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const wireRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const { activeCredential } = useScroll()
  const [localHover, setLocalHover] = useState(false)

  const isActive = activeCredential === id || localHover

  const shaderArgs = useMemo(() => {
    return {
      ...ArtifactShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uActive: { value: 0 },
        uOpacity: { value: 1 },
        uScanlineFrequency: { value: 25.0 }
      }
    }
  }, [color])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      materialRef.current.uniforms.uOpacity.value = opacity
      
      const targetActive = isActive ? 1 : 0
      materialRef.current.uniforms.uActive.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uActive.value, 
        targetActive, 
        0.1
      )
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = time * (isActive ? 1.2 : 0.4)
      meshRef.current.rotation.z = time * 0.2
      const targetScale = (isActive ? 1.3 : 1.0) * opacity
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
      
      const targetZ = (1 - opacity) * -15
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1)
    }
    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
      wireRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.05)
      wireRef.current.position.copy(meshRef.current.position)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Solid Body */}
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setLocalHover(true)}
        onPointerOut={() => setLocalHover(false)}
        visible={opacity > 0.01}
      >
        {shape === 'box' && <boxGeometry args={[1.4, 1.4, 1.4]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.0]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[1.0]} />}
        <shaderMaterial 
          ref={materialRef}
          args={[shaderArgs]}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Technical Wireframe Overlay */}
      <mesh ref={wireRef} visible={opacity > 0.01}>
        {shape === 'box' && <boxGeometry args={[1.4, 1.4, 1.4]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.0]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[1.0]} />}
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.1 * opacity * (isActive ? 3 : 1)} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  )
}

const DataDust = ({ count = 200, opacity = 1 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [count])

  return (
    <Points positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2 * opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

const VaultScene = ({ progress = 0 }: { progress?: number }) => {
  const vaultOpacity = useMemo(() => {
    if (progress < 0.1) return progress * 10
    if (progress > 0.9) return (1 - progress) * 10
    return 1
  }, [progress])

  return (
    <group visible={vaultOpacity > 0}>
      <DataDust opacity={vaultOpacity} />
      
      <Artifact 
        id="edu"
        position={[-4, 0, 0]} 
        color="#6366f1" 
        shape="box"
        progress={progress}
        opacity={vaultOpacity}
      />
      
      <Artifact 
        id="cert1"
        position={[0, 0, 0]} 
        color="#14b8a6" 
        shape="octahedron"
        progress={progress}
        opacity={vaultOpacity}
      />
      
      <Artifact 
        id="cert2"
        position={[4, 0, 0]} 
        color="#f59e0b" 
        shape="tetrahedron"
        progress={progress}
        opacity={vaultOpacity}
      />
    </group>
  )
}

export default VaultScene
