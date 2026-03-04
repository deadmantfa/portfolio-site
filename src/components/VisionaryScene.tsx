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
  const lineMaterialRef = useRef<THREE.ShaderMaterial>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)
  const { scrollProgress } = useScroll()
  
  const count = 40 
  
  const [positions, indices, binaryTypes, chaosPositions] = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    const chaosPos = new Float32Array(count * count * 3)
    const ind = []
    const types = new Float32Array(count * count)
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        // Final Grid Positions
        const x = (i / (count - 1) - 0.5) * 80
        const z = (j / (count - 1) - 0.5) * 80
        const idx = (i * count + j) * 3
        pos[idx] = x
        pos[idx + 1] = 0
        pos[idx + 2] = z
        
        // Initial Chaos Positions: Fixed random spots in 3D volume
        // Distributed around the viewport center
        chaosPos[idx] = (Math.random() - 0.5) * 300
        chaosPos[idx + 1] = (Math.random() - 0.5) * 200
        chaosPos[idx + 2] = (Math.random() - 0.5) * 200

        types[i * count + j] = Math.random() > 0.5 ? 1.0 : 0.0

        const k = i * count + j
        if (i < count - 1) ind.push(k, k + count)
        if (j < count - 1) ind.push(k, k + 1)
      }
    }
    return [pos, new Uint16Array(ind), types, chaosPos]
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
      attribute vec3 aChaosPosition;
      varying float vElevation;
      varying float vWorldY;
      varying float vProgress;
      varying float vBinaryType;
      
      void main() {
        // EXPLICIT LINEAR LERP: No side bias possible
        // Moves directly from aChaosPosition to position (grid)
        vec3 pos = mix(aChaosPosition, position, uReconstructProgress);

        vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
        
        // Wave only starts appearing as grid solidifies
        float elevation = sin(modelPosition.x * 0.05 + uTime) * 
                         cos(modelPosition.z * 0.05 + uTime) * 
                         min(3.0 + uScroll * 10.0, 12.0) * pow(uReconstructProgress, 2.0);
        
        modelPosition.y += elevation;
        vElevation = elevation;
        vWorldY = modelPosition.y;
        vProgress = uReconstructProgress;
        vBinaryType = aBinaryType;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        
        // Size morphing
        gl_PointSize = mix(60.0, 4.0, pow(uReconstructProgress, 0.5)); 
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
        float binary = drawBinary(gl_PointCoord, vBinaryType);
        float circle = 1.0 - smoothstep(0.4, 0.5, length(gl_PointCoord - 0.5));
        
        float finalShape = mix(binary, circle, pow(vProgress, 2.0));
        if (finalShape < 0.1) discard;

        float strength = (vElevation + 12.0) / 24.0;
        vec3 hotColor = vec3(1.0, 1.0, 1.0);
        vec3 settledColor = uColor * (0.5 + strength);
        vec3 baseColor = mix(hotColor, settledColor, vProgress);
        
        float normalizedY = vWorldY / 50.0;
        float scanLine = 1.0 - smoothstep(uScanProgress - 0.1, uScanProgress + 0.1, normalizedY);
        float scanGlow = exp(-pow(normalizedY - uScanProgress, 2.0) * 200.0);
        
        vec3 finalColor = mix(baseColor * 0.2, baseColor, scanLine);
        finalColor += vec3(1.0, 1.0, 1.0) * scanGlow * 4.0;
        
        // Exact original visual for 'complete'
        if (vProgress > 0.99 && uScanProgress > 1.1) {
          gl_FragColor = vec4(settledColor, uOpacity);
          return;
        }

        float alpha = finalShape * mix(0.8, uOpacity, vProgress);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), [count])

  const lineShaderArgs = useMemo(() => ({
    ...shaderArgs,
    vertexShader: shaderArgs.vertexShader.replace('gl_PointSize =', '//'),
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanProgress;
      uniform float uReconstructProgress;
      varying float vWorldY;
      
      void main() {
        float normalizedY = vWorldY / 50.0;
        float scanLine = 1.0 - smoothstep(uScanProgress - 0.1, uScanProgress + 0.1, normalizedY);
        
        // Lines fade in with reconstruction
        float lineOpacity = uOpacity * 0.2 * pow(uReconstructProgress, 2.0);
        lineOpacity = mix(lineOpacity, uOpacity * 0.2, scanLine);
        
        if (uScanProgress > 1.1) lineOpacity = uOpacity * 0.2;

        gl_FragColor = vec4(uColor, lineOpacity);
      }
    `
  }), [shaderArgs])

  useEffect(() => {
    if (!materialRef.current) return

    if (materializeStage === 'spark') {
      materialRef.current.uniforms.uOpacity.value = 0.8;
      gsap.to(lightRef.current, { intensity: 800, distance: 300, duration: 0.4 });
    } else if (materializeStage === 'cloud') {
      gsap.to(lightRef.current, { intensity: 0, duration: 2.0, delay: 0.5 });
      gsap.to([materialRef.current.uniforms.uReconstructProgress, lineMaterialRef.current.uniforms.uReconstructProgress], { 
        value: 1.0, 
        duration: 3.5, 
        ease: "power2.inOut" 
      })
    } else if (materializeStage === 'scan') {
      gsap.to([materialRef.current.uniforms.uScanProgress, lineMaterialRef.current.uniforms.uScanProgress], { 
        value: 1.2, 
        duration: 2.0, 
        ease: "power2.inOut" 
      })
    } else if (materializeStage === 'complete') {
      materialRef.current.uniforms.uScanProgress.value = 1.5
      materialRef.current.uniforms.uReconstructProgress.value = 1.0
      materialRef.current.uniforms.uOpacity.value = 0.4 
      lineMaterialRef.current.uniforms.uOpacity.value = 0.4
    }
  }, [materializeStage])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    materialRef.current.uniforms.uTime.value = time
    lineMaterialRef.current.uniforms.uTime.value = time
    materialRef.current.uniforms.uScroll.value = scrollProgress
    lineMaterialRef.current.uniforms.uScroll.value = scrollProgress
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01
    }
  })

  return (
    <group ref={meshRef} rotation={[Math.PI / 8, 0, 0]} position={[0, 0, -20]}>
      <pointLight ref={lightRef} intensity={0} color="#ffffff" position={[0, 0, 0]} />

      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aChaosPosition"
            args={[chaosPositions, 3]}
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
      
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aChaosPosition"
            args={[chaosPositions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </bufferGeometry>
        <shaderMaterial 
          ref={lineMaterialRef}
          args={[lineShaderArgs]}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          wireframe
        />
      </lineSegments>
    </group>
  )
}

export { ArchitecturalGrid }
export default ArchitecturalGrid
