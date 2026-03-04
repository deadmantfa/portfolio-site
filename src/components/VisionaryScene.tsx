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
      uScanProgress: { value: -1.0 }, // -1 to 1 for laser sweep
      uReconstructProgress: { value: 0.0 } // 0 to 1 for cloud settling
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScroll;
      uniform float uReconstructProgress;
      varying float vElevation;
      varying float vWorldY;
      
      // Pseudo-random for particle dispersion
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
        // Initial position dispersion for 'cloud' stage
        vec3 pos = position;
        float rnd = random(position.xz);
        
        // Explode particles outward if not fully reconstructed
        vec3 dispersion = vec3(
          (rnd - 0.5) * 50.0,
          (rnd - 0.5) * 50.0,
          (rnd - 0.5) * 50.0
        ) * (1.0 - uReconstructProgress);
        
        pos += dispersion;

        vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
        
        float elevation = sin(modelPosition.x * 0.05 + uTime) * 
                         cos(modelPosition.z * 0.05 + uTime) * 
                         min(3.0 + uScroll * 10.0, 12.0);
        
        modelPosition.y += elevation;
        vElevation = elevation;
        vWorldY = modelPosition.y;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        gl_PointSize = mix(8.0, 4.0, uReconstructProgress); 
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanProgress;
      varying float vElevation;
      varying float vWorldY;
      
      void main() {
        float strength = (vElevation + 12.0) / 24.0;
        vec3 baseColor = uColor * (0.5 + strength);
        
        // Laser Scan Reveal Effect
        // The scan line moves from top to bottom (or along an axis)
        float scanLine = smoothstep(uScanProgress - 0.1, uScanProgress, vWorldY / 40.0);
        float scanGlow = exp(-pow(vWorldY / 40.0 - uScanProgress, 2.0) * 100.0);
        
        vec3 finalColor = mix(baseColor * 0.3, baseColor, scanLine);
        finalColor += uColor * scanGlow * 2.0;
        
        float finalOpacity = mix(uOpacity * 0.2, uOpacity, scanLine);
        if (uScanProgress < -0.9) finalOpacity = uOpacity; // Hide scan effect if not active

        gl_FragColor = vec4(finalColor, finalOpacity);
      }
    `
  }), [])

  // Coordinate GSAP animations based on materializeStage
  useEffect(() => {
    if (!materialRef.current) return

    if (materializeStage === 'spark') {
      gsap.to(sparkRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(2)" })
    } else if (materializeStage === 'cloud') {
      // Fade out spark, fade in cloud
      gsap.to(sparkRef.current.material, { opacity: 0, duration: 0.5 })
      gsap.to(materialRef.current.uniforms.uReconstructProgress, { value: 1.0, duration: 2.5, ease: "power2.inOut" })
    } else if (materializeStage === 'scan') {
      gsap.to(materialRef.current.uniforms.uScanProgress, { value: 1.0, duration: 2.0, ease: "none" })
    } else if (materializeStage === 'complete') {
      materialRef.current.uniforms.uScanProgress.value = 2.0 // Off-screen
      materialRef.current.uniforms.uReconstructProgress.value = 1.0
    }
  }, [materializeStage])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    
    materialRef.current.uniforms.uTime.value = time
    materialRef.current.uniforms.uScroll.value = scrollProgress
    
    // Fade out as we scroll deep into the content
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

    if (sparkRef.current && materializeStage === 'spark') {
      sparkRef.current.rotation.z += 0.05
      sparkRef.current.rotation.x += 0.02
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]} position={[0, 0, -20]}>
      {/* Initial Spark */}
      <mesh ref={sparkRef} scale={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#6366f1" 
          emissive="#6366f1" 
          emissiveIntensity={10} 
          transparent 
          opacity={1} 
        />
        <pointLight intensity={5} color="#6366f1" />
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
