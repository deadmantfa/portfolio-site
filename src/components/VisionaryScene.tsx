'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from './ScrollProvider'
import gsap from 'gsap'

type MaterializeStage = 'idle' | 'spark' | 'cloud' | 'scan' | 'complete'

const ArchitecturalGrid = ({ 
  isBlueprint = false,
  materializeStage = 'idle' 
}: { 
  isBlueprint?: boolean
  materializeStage?: MaterializeStage
}) => {
  const meshRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const sparkRef = useRef<THREE.Mesh>(null!)
  const { scrollProgress } = useScroll()
  
  const count = 60
  
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
        float radius = 80.0 * (1.0 - uReconstructProgress);
        
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
        
        // High-contrast colors: Hot white during chaos, cooling to primary
        vec3 hotColor = vec4(1.0, 1.0, 1.0, 1.0).rgb;
        vec3 accentColor = vec3(1.0, 0.8, 0.4); // Gold spark
        vec3 settledColor = uColor * (0.5 + strength);
        
        // Color transition: Hot -> Accent -> Settled
        vec3 baseColor = mix(mix(hotColor, accentColor, vProgress), settledColor, vProgress);
        
        // Laser Scan Reveal Logic
        float normalizedY = vWorldY / 40.0;
        float scanLine = 1.0 - smoothstep(uScanProgress - 0.15, uScanProgress + 0.15, normalizedY);
        
        // Intense White Energy Pulse
        float scanGlow = exp(-pow(normalizedY - uScanProgress, 2.0) * 250.0);
        
        vec3 finalColor = mix(baseColor * 0.1, baseColor, scanLine);
        finalColor += vec3(1.0, 1.0, 1.0) * scanGlow * 5.0; // Violent white energy
        
        float finalOpacity = mix(uOpacity * 0.1, uOpacity, scanLine);
        
        // Ensure visibility during initial stages
        if (uScanProgress < -1.1) {
          finalOpacity = uOpacity * mix(0.2, 1.0, vProgress);
          finalColor = mix(hotColor, baseColor, vProgress);
        }
        
        if (uScanProgress > 1.1) finalOpacity = uOpacity;

        gl_FragColor = vec4(finalColor, finalOpacity);
      }
    `
  }), [])

  useEffect(() => {
    if (!materialRef.current) return
    console.log(`[Quantum] Entering Stage: ${materializeStage}`);

    if (materializeStage === 'spark') {
      gsap.to(sparkRef.current.scale, { x: 2, y: 2, z: 2, duration: 0.4, ease: "expo.out" })
    } else if (materializeStage === 'cloud') {
      gsap.to(sparkRef.current.material, { opacity: 0, duration: 0.3 })
      // High-intensity light explosion
      const sparkLight = sparkRef.current.children[0] as THREE.PointLight;
      if (sparkLight) {
        gsap.to(sparkLight, { intensity: 100, distance: 100, duration: 0.4, ease: "power4.out" });
      }
      gsap.to(sparkRef.current.scale, { x: 40, y: 40, z: 40, duration: 0.8, ease: "expo.out" })
      gsap.to(materialRef.current.uniforms.uReconstructProgress, { 
        value: 1.0, 
        duration: 2.5, 
        ease: "power3.inOut" 
      })
    } else if (materializeStage === 'scan') {
      gsap.to(materialRef.current.uniforms.uScanProgress, { 
        value: 1.2, 
        duration: 2.0, 
        ease: "power2.inOut" 
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
