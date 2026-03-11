'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ShareEntry } from '@/data/shares'

const AUTO_DISMISS_MS = 8000

interface ShareOverlayProps {
  entry: ShareEntry
  onDismiss: () => void
}

const ShareOverlay = ({ entry, onDismiss }: ShareOverlayProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS)

    // Animate progress bar from 0 to 100 over AUTO_DISMISS_MS
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / AUTO_DISMISS_MS) * 100, 100))
    }, 50)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [onDismiss])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        data-testid="share-overlay"
        className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 80 }}
      >
        {/* Tech-grid background */}
        <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline opacity-5 pointer-events-none" />

        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Accent label */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-[9px] uppercase tracking-[0.5em] text-primary/60 mb-8"
          >
            {entry.accentLabel}
          </motion.p>

          {/* "A message for" prefix */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm text-foreground/40 mb-2 tracking-[0.15em]"
          >
            A message for
          </motion.p>

          {/* Company name */}
          <motion.h1
            variants={itemVariants}
            className="font-serif italic text-5xl md:text-7xl text-foreground mb-6 leading-none"
          >
            {entry.company}
          </motion.h1>

          {/* Thin divider */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-white/10 mb-6"
          />

          {/* Personalized message */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-foreground/70 leading-relaxed text-sm md:text-base max-w-sm mb-10"
          >
            {entry.message}
          </motion.p>

          {/* CTA button */}
          <motion.button
            variants={itemVariants}
            onClick={onDismiss}
            className="bg-primary text-black font-mono text-[11px] uppercase tracking-[0.4em] py-4 px-8 rounded-full hover:bg-foreground hover:text-background transition-all active:scale-[0.98] mb-8"
          >
            Enter the Portfolio →
          </motion.button>

          {/* Progress bar */}
          <motion.div
            variants={itemVariants}
            className="w-48 h-px bg-primary/20 overflow-hidden rounded-full"
            data-testid="progress-bar"
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export { ShareOverlay }
