'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from './ScrollProvider'
import gsap from 'gsap'

type MaterializeStage = 'idle' | 'spark' | 'cloud' | 'scan' | 'complete'

const ArchitecturalGrid = ({ 
  isBlueprint = false,
  materializeStage = 'complete' 
}: { 
  isBlueprint?: boolean
  materializeStage?: MaterializeStage
}) => {
  const meshRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const sparkRef = useRef<THREE.Mesh>(null!)
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
      uOpacity: { value: 0.4 },
      uScanProgress: { value: -1.2 },
      uReconstructProgress: { value: 0.0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScroll;
      uniform float uReconstructProgress;
      varying float vElevation;
      varying float vWorldY;
      varying float vProgress;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec3 pos = position;
        float h = hash(position.xz);
        
        // Vortex turbulence that settles
        float angle = uTime * 3.0 * h;
        float radius = 40.0 * (1.0 - uReconstructProgress);
        
        vec3 turbulence = vec3(
          cos(angle) * radius,
          sin(uTime * 2.0 * h) * radius * 0.5,
          sin(angle) * radius
        ) * (1.0 - uReconstructProgress);
        
        pos += turbulence;

        vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
        
        float elevation = sin(modelPosition.x * 0.05 + uTime) * 
                         cos(modelPosition.z * 0.05 + uTime) * 
                         min(3.0 + uScroll * 10.0, 12.0) * uReconstructProgress;
        
        modelPosition.y += elevation;
        vElevation = elevation;
        vWorldY = modelPosition.y;
        vProgress = uReconstructProgress;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        
        // Particles start large and glowing, shrink as they settle
        gl_PointSize = mix(25.0, 4.0, pow(uReconstructProgress, 0.3)); 
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanProgress;
      varying float vElevation;
      varying float vWorldY;
      varying float vProgress;
      
      void main() {
        float strength = (vElevation + 12.0) / 24.0;
        
        // Points are hot white/gold during chaos, settle to primary
        vec3 hotColor = vec3(1.0, 0.9, 0.6);
        vec3 settledColor = uColor * (0.5 + strength);
        vec3 baseColor = mix(hotColor, settledColor, vProgress);
        
        // Laser Scan Logic
        float normalizedY = vWorldY / 40.0;
        float scanLine = 1.0 - smoothstep(uScanProgress - 0.1, uScanProgress + 0.1, normalizedY);
        
        // Intense Energy Pulse at the scan line
        float scanGlow = exp(-pow(normalizedY - uScanProgress, 2.0) * 200.0);
        
        vec3 finalColor = mix(baseColor * 0.1, baseColor, scanLine);
        finalColor += vec3(0.8, 0.9, 1.0) * scanGlow * 4.0; // Bright white energy sweep
        
        float finalOpacity = mix(uOpacity * 0.05, uOpacity, scanLine);
        
        // Handle stages for smooth transition
        if (uScanProgress < -1.1) finalOpacity = uOpacity * vProgress;
        if (uScanProgress > 1.1) finalOpacity = uOpacity;

        gl_FragColor = vec4(finalColor, finalOpacity);
      }
    `
  }), [])

  useEffect(() => {
    if (!materialRef.current) return

    if (materializeStage === 'spark') {
      gsap.to(sparkRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.4, ease: "expo.out" })
    } else if (materializeStage === 'cloud') {
      gsap.to(sparkRef.current.material, { opacity: 0, duration: 0.3 })
      gsap.to(sparkRef.current.scale, { x: 10, y: 10, z: 10, duration: 0.5, ease: "expo.in" })
      gsap.to(materialRef.current.uniforms.uReconstructProgress, { 
        value: 1.0, 
        duration: 2.2, 
        ease: "power4.inOut" 
      })
    } else if (materializeStage === 'scan') {
      gsap.to(materialRef.current.uniforms.uScanProgress, { 
        value: 1.2, 
        duration: 1.8, 
        ease: "power1.inOut" 
      })
    } else if (materializeStage === 'complete') {
      materialRef.current.uniforms.uScanProgress.value = 1.5
      materialRef.current.uniforms.uReconstructProgress.value = 1.0
    }
  }, [materializeStage])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    
    materialRef.current.uniforms.uTime.value = time
    materialRef.current.uniforms.uScroll.value = scrollProgress
    
    const fadeOut = Math.max(0, 1 - (scrollProgress - 0.4) * 2)
    const targetOpacity = (isBlueprint ? 0.8 : 0.2) * fadeOut
    
    materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uOpacity.value, 
      targetOpacity, 
      0.1
    )
    
    const targetColor = new THREE.Color(isBlueprint ? "#14b8a6" : "#6366f1")
    materialRef.current.uniforms.uColor.value.lerp(targetColor, 0.1)
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01
    }

    if (sparkRef.current && (materializeStage === 'spark' || materializeStage === 'cloud')) {
      sparkRef.current.rotation.z += 0.1
      sparkRef.current.rotation.x += 0.05
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]} position={[0, 0, -20]}>
      {/* Initial High-Intensity Spark */}
      <mesh ref={sparkRef} scale={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#6366f1" 
          emissiveIntensity={20} 
          transparent 
          opacity={1} 
        />
        <pointLight intensity={10} distance={50} color="#6366f1" />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          args={[shaderArgs]}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={1}
        />
      </points>
      
      {(materializeStage === 'complete' || materializeStage === 'scan') && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="index"
              args={[indices, 1]}
            />
          </bufferGeometry>
          <shaderMaterial 
            args={[shaderArgs]}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            wireframe
            opacity={0.1}
          />
        </lineSegments>
      )}
    </group>
  )
}

export { ArchitecturalGrid }
export default ArchitecturalGrid
