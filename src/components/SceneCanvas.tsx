'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneCanvasProps {
  children: React.ReactNode
}

const SceneCanvas = ({ children }: SceneCanvasProps) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Optimize for high DPI screens
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default SceneCanvas