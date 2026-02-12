'use client'

import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const ArchitecturalLoader = () => {
  const { active, progress } = useProgress()
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setIsFinished(true), 800)
      return () => clearTimeout(timeout)
    }
  }, [active, progress])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
        >
          <div className="relative w-64 h-px bg-white/10 overflow-hidden mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-primary"
            />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
              Initializing Architecture
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
              Structural Integrity: {Math.round(progress)}%
            </span>
          </div>

          <div className="absolute bottom-12 font-serif italic text-xl text-zinc-600 opacity-40">
            Wenceslaus Dsilva
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ArchitecturalLoader
