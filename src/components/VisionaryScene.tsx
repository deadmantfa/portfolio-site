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
  const lightRef = useRef<THREE.PointLight>(null!)
  const { scrollProgress } = useScroll()
  
  const count = 60 // 3600 particles
  
  const [positions, binaryTypes] = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    const types = new Float32Array(count * count) // 0 for '0', 1 for '1'
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i / (count - 1) - 0.5) * 100
        const z = (j / (count - 1) - 0.5) * 100
        const idx = (i * count + j) * 3
        pos[idx] = x
        pos[idx + 1] = 0
        pos[idx + 2] = z
        types[i * count + j] = Math.random() > 0.5 ? 1.0 : 0.0
      }
    }
    return [pos, types]
  }, [count])

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color("#6366f1") },
      uOpacity: { value: 0.0 },
      uScanProgress: { value: -1.2 },
      uReconstructProgress: { value: 0.0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScroll;
      uniform float uReconstructProgress;
      attribute float aBinaryType;
      varying float vElevation;
      varying float vWorldY;
      varying float vProgress;
      varying float vBinaryType;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec3 pos = position;
        float h = hash(position.xz + 100.0); // Symmetrical offset
        
        // Chaos Vortex: Centered and Explosive
        float angle = uTime * 4.0 * h;
        float radius = 100.0 * (1.0 - uReconstructProgress);
        
        vec3 turbulence = vec3(
          cos(angle) * radius * (h * 1.5),
          sin(uTime * 2.0 * h) * radius * 0.8,
          sin(angle) * radius * (h * 1.5)
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
        vBinaryType = aBinaryType;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        
        // Binary digits need slightly larger size to be readable
        gl_PointSize = mix(30.0, 12.0, pow(uReconstructProgress, 0.3)); 
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanProgress;
      uniform float uTime;
      varying float vElevation;
      varying float vWorldY;
      varying float vProgress;
      varying float vBinaryType;
      
      // Procedural drawing of 0 and 1
      float drawBinary(vec2 uv, float type) {
        uv = uv * 2.0 - 1.0; // center it
        if (type > 0.5) { // Draw '1'
          float line = smoothstep(0.1, 0.0, abs(uv.x) - 0.05) * smoothstep(0.8, 0.7, abs(uv.y));
          return line;
        } else { // Draw '0'
          float circle = abs(length(uv) - 0.6);
          return smoothstep(0.1, 0.0, circle) * smoothstep(0.8, 0.7, length(uv));
        }
      }

      void main() {
        float binary = drawBinary(gl_PointCoord, vBinaryType);
        if (binary < 0.1) discard; // Shape the point into a digit

        float strength = (vElevation + 12.0) / 24.0;
        vec3 hotColor = vec3(1.0, 1.0, 1.0);
        vec3 settledColor = uColor * (0.5 + strength);
        vec3 baseColor = mix(hotColor, settledColor, vProgress);
        
        float normalizedY = vWorldY / 50.0;
        float scanLine = 1.0 - smoothstep(uScanProgress - 0.1, uScanProgress + 0.1, normalizedY);
        float scanGlow = exp(-pow(normalizedY - uScanProgress, 2.0) * 200.0);
        
        vec3 finalColor = mix(baseColor * 0.2, baseColor, scanLine);
        finalColor += vec3(1.0, 1.0, 1.0) * scanGlow * 4.0;
        
        float alpha = binary * uOpacity;
        if (uScanProgress < -1.1) alpha *= mix(0.1, 1.0, vProgress);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), [])

  useEffect(() => {
    if (!materialRef.current) return
    console.log(`[Quantum Binary] Stage: ${materializeStage}`);

    if (materializeStage === 'spark') {
      gsap.to(materialRef.current.uniforms.uOpacity, { value: 1.0, duration: 0.5 });
      gsap.to(lightRef.current, { intensity: 50, duration: 0.4 });
    } else if (materializeStage === 'cloud') {
      gsap.to(lightRef.current, { intensity: 150, distance: 150, duration: 0.6, ease: "power4.out" });
      gsap.to(lightRef.current, { intensity: 0, duration: 2.0, delay: 0.5 });
      gsap.to(materialRef.current.uniforms.uReconstructProgress, { 
        value: 1.0, 
        duration: 3.0, 
        ease: "power4.inOut" 
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
      materialRef.current.uniforms.uOpacity.value = 1.0
    }
  }, [materializeStage])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    materialRef.current.uniforms.uTime.value = time
    materialRef.current.uniforms.uScroll.value = scrollProgress
    
    // Rotation logic
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]} position={[0, 0, -20]}>
      {/* Pure Light Spark (No geometry blob) */}
      <pointLight ref={lightRef} intensity={0} color="#ffffff" position={[0, 0, 0]} />

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aBinaryType"
            args={[binaryTypes, 1]}
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
      
      {materializeStage === 'complete' && (
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
