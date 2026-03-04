'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ArchitecturalScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detection for touch devices
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    if (isTouch) return

    const trackHeight = trackRef.current?.offsetHeight || 0
    const thumbHeight = thumbRef.current?.offsetHeight || 0
    const maxTravel = trackHeight - thumbHeight

    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress
        const yPos = progress * maxTravel

        gsap.to(thumbRef.current, {
          y: yPos,
          duration: 0.1,
          ease: 'none',
        })

        // Architectural pulse on the marker based on scroll velocity
        const velocity = Math.abs(self.getVelocity())
        const scale = 1 + Math.min(velocity / 2000, 0.5)
        const opacity = 0.5 + Math.min(velocity / 2000, 0.5)

        gsap.to(markerRef.current, {
          scale: scale,
          opacity: opacity,
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    })

    // Sub-marker indicators animation
    const markers = trackRef.current?.querySelectorAll('.scroll-mark')
    if (markers) {
      gsap.fromTo(markers, 
        { opacity: 0.1, x: 5 },
        { 
          opacity: 0.3, 
          x: 0, 
          stagger: {
            amount: 0.5,
            from: "start"
          },
          duration: 1,
          ease: 'power2.out'
        }
      )
    }

    return () => {
      trigger.kill()
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[60vh] w-8 z-[90] pointer-events-none hidden lg:flex flex-col items-center">
      {/* Background Track */}
      <div 
        ref={trackRef}
        className="relative h-full w-[2px] bg-white/5 rounded-full overflow-visible"
      >
        {/* Subtle Horizontal Tick Marks */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="scroll-mark absolute left-1/2 -translate-x-1/2 w-3 h-[1px] bg-primary/40"
            style={{ top: `${(i / 9) * 100}%` }}
          />
        ))}

        {/* Animated Thumb */}
        <div 
          ref={thumbRef}
          className="absolute left-1/2 -translate-x-1/2 w-4 h-12 flex items-center justify-center"
          style={{ transformOrigin: 'center' }}
        >
          {/* Main Pointer/Marker */}
          <div 
            ref={markerRef}
            className="relative w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_15px_var(--color-primary)] z-20"
          >
            {/* Architectural Crosshair Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-primary/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-[1px] bg-primary/20" />
            
            {/* Outer Scanline Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary/30 animate-pulse" />
          </div>

          {/* Glowing Trail/Glow */}
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
        </div>
      </div>

      {/* Numerical Indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-primary/40 uppercase tracking-[0.2em] vertical-text">
        Scroll
      </div>
    </div>
  )
}
