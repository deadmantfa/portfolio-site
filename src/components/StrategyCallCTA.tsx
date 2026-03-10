'use client'

import { motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import { contactConfig } from '@/data/contact'

const CALENDLY_STYLES = {
  backgroundColor: '0d0d14',
  textColor: 'f5f5fa',
  primaryColor: '8b7cf8',
  hideLandingPageDetails: true,
  hideGdprBanner: true,
}

const StrategyCallCTA = () => {
  const isOpen = contactConfig.availabilityStatus === 'open'

  return (
    <motion.div
      data-testid="strategy-call-cta"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden w-full max-w-5xl mb-8"
    >
      {/* Tech-grid background overlay */}
      <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Left column — editorial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          className="flex flex-col justify-center gap-6"
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40 mb-4">
              Direct Engagement
            </p>
            <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              Let&apos;s architect something significant.
            </h2>
            <p className="font-sans text-foreground/70 leading-relaxed text-sm">
              A focused 30-minute conversation to explore how 20 years of architectural thinking applies to your next engineering chapter. No agenda required — just a conversation.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40">
              Availability
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-foreground/30'}`}
                aria-hidden="true"
              />
              <span className="font-sans text-sm text-foreground/80">
                {isOpen ? 'Open to conversations' : 'Currently at capacity'}
              </span>
            </div>
            <p className="font-sans text-foreground/50 text-xs leading-relaxed">
              {contactConfig.availabilityNote}
            </p>
          </div>

          <p className="font-mono text-[9px] text-foreground/30 tracking-[0.2em] uppercase">
            or scroll down to write
          </p>
        </motion.div>

        {/* Right column — inline calendar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-[1.5rem] overflow-hidden"
        >
          {isOpen ? (
            <InlineWidget
              url={contactConfig.calendlyUrl}
              pageSettings={CALENDLY_STYLES}
              styles={{ minWidth: '100%', height: '660px' }}
            />
          ) : (
            <div className="glass rounded-[1.5rem] h-full min-h-[400px] flex flex-col items-center justify-center gap-3 p-8">
              <span className="size-2 rounded-full bg-foreground/20" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/40 text-center">
                Scheduling paused
              </p>
              <p className="font-sans text-foreground/30 text-sm text-center">
                Use the contact form below to reach out directly.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export { StrategyCallCTA }
