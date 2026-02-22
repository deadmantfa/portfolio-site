'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneCanvasProps {
  children: React.ReactNode
}

const SceneCanvas = ({ children }: SceneCanvasProps) => {
  return (
    <Canvas
      shadows={false}
      camera={{ position: [0, 0, 20], fov: 50 }}
      gl={{ 
        antialias: false, 
        alpha: true,
        powerPreference: 'high-performance'
      }} 
      dpr={[1, 1.5]} // Capped at 1.5 for performance
      performance={{ min: 0.5 }} // Allow downscaling if frame rate drops
      style={{ pointerEvents: 'auto' }}
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  )
}

export default SceneCanvas