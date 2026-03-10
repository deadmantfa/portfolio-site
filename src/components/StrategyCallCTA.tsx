'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PopupButton } from 'react-calendly'
import { contactConfig } from '@/data/contact'

const CALENDLY_STYLES = {
  backgroundColor: '0d0d14',
  textColor: 'f5f5fa',
  primaryColor: '8b7cf8',
  hideLandingPageDetails: true,
  hideGdprBanner: true,
}

const lockScroll = () => {
  document.documentElement.classList.add('calendly-open')
}

const unlockScroll = () => {
  document.documentElement.classList.remove('calendly-open')
}

const StrategyCallCTA = () => {
  const isOpen = contactConfig.availabilityStatus === 'open'

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data?.event !== 'string') return
      if (e.data.event === 'calendly.popup_closed') unlockScroll()
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      unlockScroll()
    }
  }, [])


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

          <div className="flex flex-col items-start gap-3">
            {isOpen ? (
              <div onClickCapture={lockScroll}>
                <PopupButton
                  url={contactConfig.calendlyUrl}
                  rootElement={typeof document !== 'undefined' ? document.body : undefined!}
                  text="Book a Strategy Call"
                  pageSettings={CALENDLY_STYLES}
                  className="bg-primary text-black font-mono text-[11px] uppercase tracking-[0.4em] py-4 px-8 rounded-full hover:bg-foreground hover:text-background transition-all active:scale-[0.98] cursor-pointer"
                />
              </div>
            ) : (
              <span className="bg-foreground/10 text-foreground/40 font-mono text-[11px] uppercase tracking-[0.4em] py-4 px-8 rounded-full cursor-not-allowed">
                Currently Unavailable
              </span>
            )}
            <p className="font-mono text-[9px] text-foreground/30 tracking-[0.2em] uppercase ml-2">
              or scroll down to write
            </p>
          </div>
        </motion.div>

        {/* Right column — context card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="glass rounded-[2rem] p-8 flex flex-col justify-center gap-8"
        >
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">Format</p>
            <p className="font-sans text-foreground/80 text-sm">30-minute video call</p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">Who it&apos;s for</p>
            <p className="font-sans text-foreground/80 text-sm">CEOs, boards, and technical founders evaluating senior engineering leadership</p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">What to expect</p>
            <p className="font-sans text-foreground/80 text-sm">A candid conversation — not a sales call. We explore fit, context, and what exceptional looks like for your stage.</p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">Response time</p>
            <p className="font-sans text-foreground/80 text-sm">{contactConfig.availabilityNote}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export { StrategyCallCTA }
