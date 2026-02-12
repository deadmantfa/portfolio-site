'use client'

import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const ArchitecturalLoader = () => {
  const { progress } = useProgress()
  const [isFinished, setIsFinished] = useState(false)
  const [simulatedProgress, setSimulatedProgress] = useState(0)

  useEffect(() => {
    // Simulated progress ensures the bar moves even if no large assets are loading
    const interval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2 // Increments every 50ms
      })
    }, 50)

    // Fail-safe: force finish after 3 seconds maximum
    const failSafe = setTimeout(() => setIsFinished(true), 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(failSafe)
    }
  }, [])

  // Use the higher of the two progresses
  const effectiveProgress = Math.max(progress, simulatedProgress)

  useEffect(() => {
    if (effectiveProgress >= 100) {
      const timeout = setTimeout(() => setIsFinished(true), 500)
      return () => clearTimeout(timeout)
    }
  }, [effectiveProgress])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
        >
          <div className="relative w-64 h-px bg-white/5 overflow-hidden mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${effectiveProgress}%` }}
              className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary animate-pulse">
              Initializing Architecture
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
              Structural Integrity: {Math.round(effectiveProgress)}%
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
