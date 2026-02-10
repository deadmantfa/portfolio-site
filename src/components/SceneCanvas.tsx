'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneCanvasProps {
  children: React.ReactNode
}

const SceneCanvas = ({ children }: SceneCanvasProps) => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }} // alpha: false for better performance and solid bg
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default SceneCanvas