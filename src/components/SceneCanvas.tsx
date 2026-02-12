'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneCanvasProps {
  children: React.ReactNode
}

const SceneCanvas = ({ children }: SceneCanvasProps) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 20], fov: 50 }}
      gl={{ antialias: true, alpha: true }} 
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  )
}

export default SceneCanvas