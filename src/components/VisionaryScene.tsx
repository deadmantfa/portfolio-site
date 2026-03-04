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
  
  const count = 60 
  
  const [positions, indices, binaryTypes] = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    const ind = []
    const types = new Float32Array(count * count)
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i / (count - 1) - 0.5) * 100
        const z = (j / (count - 1) - 0.5) * 100
        const idx = (i * count + j) * 3
        pos[idx] = x
        pos[idx + 1] = 0
        pos[idx + 2] = z
        types[i * count + j] = Math.random() > 0.5 ? 1.0 : 0.0

        const k = i * count + j
        if (i < count - 1) ind.push(k, k + count)
        if (j < count - 1) ind.push(k, k + 1)
      }
    }
    return [pos, new Uint16Array(ind), types]
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
        float h = hash(position.xz + 100.0);
        
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
        
        // Larger size for binary digits, standard size for grid points
        gl_PointSize = mix(30.0, 4.0, pow(uReconstructProgress, 0.5)); 
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanProgress;
      varying float vElevation;
      varying float vWorldY;
      varying float vProgress;
      varying float vBinaryType;
      
      float drawBinary(vec2 uv, float type) {
        uv = uv * 2.0 - 1.0;
        if (type > 0.5) {
          return smoothstep(0.1, 0.0, abs(uv.x) - 0.05) * smoothstep(0.8, 0.7, abs(uv.y));
        } else {
          float circle = abs(length(uv) - 0.6);
          return smoothstep(0.1, 0.0, circle) * smoothstep(0.8, 0.7, length(uv));
        }
      }

      void main() {
        // Only draw as binary during reconstruction, then fade to circular points
        float binary = drawBinary(gl_PointCoord, vBinaryType);
        float circle = 1.0 - smoothstep(0.4, 0.5, length(gl_PointCoord - 0.5));
        
        // Morph from binary shape to standard point
        float finalShape = mix(binary, circle, pow(vProgress, 2.0));
        if (finalShape < 0.1) discard;

        float strength = (vElevation + 12.0) / 24.0;
        vec3 hotColor = vec3(1.0, 1.0, 1.0);
        vec3 settledColor = uColor * (0.5 + strength);
        
        // Ensure final color is EXACTLY as it was before overhaul when complete
        vec3 baseColor = mix(hotColor, settledColor, vProgress);
        
        float normalizedY = vWorldY / 50.0;
        float scanLine = 1.0 - smoothstep(uScanProgress - 0.1, uScanProgress + 0.1, normalizedY);
        float scanGlow = exp(-pow(normalizedY - uScanProgress, 2.0) * 200.0);
        
        vec3 finalColor = mix(baseColor * 0.2, baseColor, scanLine);
        finalColor += vec3(1.0, 1.0, 1.0) * scanGlow * 4.0;
        
        // For the 'complete' state, we want exactly the old visual
        if (vProgress > 0.99 && uScanProgress > 1.1) {
          gl_FragColor = vec4(settledColor, uOpacity);
          return;
        }

        float alpha = finalShape * uOpacity;
        if (uScanProgress < -1.1) alpha *= mix(0.5, 1.0, vProgress); // Better initial visibility

        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), [])

  useEffect(() => {
    if (!materialRef.current) return
    console.log(`[Quantum Binary] Stage: ${materializeStage}`);

    if (materializeStage === 'spark') {
      // Immediate opacity for visibility
      materialRef.current.uniforms.uOpacity.value = 0.8;
      gsap.to(lightRef.current, { intensity: 500, distance: 200, duration: 0.4 });
    } else if (materializeStage === 'cloud') {
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
      materialRef.current.uniforms.uOpacity.value = 0.2 // Original grid opacity
    }
  }, [materializeStage])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    materialRef.current.uniforms.uTime.value = time
    materialRef.current.uniforms.uScroll.value = scrollProgress
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]} position={[0, 0, -20]}>
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
