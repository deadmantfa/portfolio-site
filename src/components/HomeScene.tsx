'use client'

import SceneCanvas from '@/components/SceneCanvas'
import ArchitecturalGrid from '@/components/VisionaryScene'
import { SkillBackdrop } from '@/components/SkillBackdrop'
import VaultScene from '@/components/VaultScene'
import ConnectionScene from '@/components/ConnectionScene'
import { useContextBridge } from '@react-three/drei'
import { ScrollContext } from '@/components/ScrollProvider'
import { motion } from 'framer-motion'

interface HomeSceneProps {
  progress: number
  exitProgress: number
  vaultProgress: number
  contactProgress: number
  materializeStage: 'idle' | 'spark' | 'cloud' | 'scan' | 'complete'
}

export default function HomeScene({ 
  progress, 
  exitProgress, 
  vaultProgress, 
  contactProgress,
  materializeStage
}: HomeSceneProps) {
  const ContextBridge = useContextBridge(ScrollContext)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="size-full"
    >
      <SceneCanvas>
        <ContextBridge>
          {/* Global lighting that fades in as stage progresses */}
          <ambientLight intensity={materializeStage === 'complete' ? 0.5 : 0.1} />
          <directionalLight 
            position={[0, 10, 10]} 
            intensity={materializeStage === 'complete' ? 2 : 0.5} 
            color="#6366f1" 
          />
          
          <ArchitecturalGrid isBlueprint={materializeStage !== 'complete'} />
          
          {materializeStage === 'complete' && (
            <>
              <SkillBackdrop
                progress={progress}
                exitProgress={exitProgress}
              />
              <VaultScene progress={vaultProgress} />
              <ConnectionScene progress={contactProgress} />
            </>
          )}
        </ContextBridge>
      </SceneCanvas>
    </motion.div>
  )
}
