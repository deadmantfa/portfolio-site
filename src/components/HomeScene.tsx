'use client'

import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'
import { SkillBackdrop } from '@/components/SkillBackdrop'
import VaultScene from '@/components/VaultScene'
import ConnectionScene from '@/components/ConnectionScene'
import { useContextBridge } from '@react-three/drei'
import { ScrollContext } from '@/components/ScrollProvider'

interface HomeSceneProps {
  progress: number
  exitProgress: number
  vaultProgress: number
  contactProgress: number
}

export default function HomeScene({ 
  progress, 
  exitProgress, 
  vaultProgress, 
  contactProgress 
}: HomeSceneProps) {
  const ContextBridge = useContextBridge(ScrollContext)

  return (
    <SceneCanvas>
      <ContextBridge>
        {/* Brighter, more consistent global lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 10]} intensity={2} color="#6366f1" />
        <pointLight position={[-10, -10, 5]} intensity={1} color="#fbbf24" />
        
        <ArchitecturalGrid />
        <SkillBackdrop
          progress={progress}
          exitProgress={exitProgress}
        />
        <VaultScene progress={vaultProgress} />
        <ConnectionScene progress={contactProgress} />
      </ContextBridge>
    </SceneCanvas>
  )
}
