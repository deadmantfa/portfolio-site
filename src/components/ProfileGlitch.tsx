'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface ProfileGlitchProps {
  src: string
  alt: string
  width?: number
  height?: number
  glitchIntensity?: number
  glitchFrequency?: number
  randomGlitch?: boolean
  minGlitchInterval?: number
  maxGlitchInterval?: number
}

export { ProfileGlitch }

function ProfileGlitch({
  src,
  alt,
  width = 192,
  height = 192,
  glitchIntensity = 8,
  glitchFrequency = 0.15,
  randomGlitch = true,
  minGlitchInterval = 2000,
  maxGlitchInterval = 5000,
}: ProfileGlitchProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glitchLayers = useRef<HTMLDivElement[]>([])
  const glitchTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const scanlineRef = useRef<HTMLDivElement | null>(null)
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Add scan animation styles once
    const styleId = 'glitch-scanline-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes glitch-scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes glitch-flicker {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  const createGlitchTimeline = () => {
    const tl = gsap.timeline({
      repeat: isHovered ? -1 : 0,
      onComplete: () => {
        setIsGlitching(false)
      },
    })

    // Define glitch sequences
    const glitchSequence = [
      { time: 0.2, duration: 0.06 },
      { time: 0.5, duration: 0.08 },
      { time: 0.9, duration: 0.04 },
      { time: 1.2, duration: 0.07 },
    ]

    glitchLayers.current.forEach((layer, index) => {
      const baseOffset = (index - 1) * 3

      glitchSequence.forEach((glitch) => {
        const randomX = (Math.random() - 0.5) * glitchIntensity * 2
        const randomY = (Math.random() - 0.5) * glitchIntensity

        // Glitch displacement
        tl.to(
          layer,
          {
            x: randomX + baseOffset,
            y: randomY,
            opacity: 0.6 + Math.random() * 0.2,
            duration: glitch.duration,
            ease: 'none',
          },
          glitch.time + index * 0.015
        )

        // Return to base position
        tl.to(
          layer,
          {
            x: baseOffset,
            y: 0,
            opacity: 0.6,
            duration: glitch.duration * 1.2,
            ease: 'power2.out',
          },
          '<0.03'
        )
      })
    })

    // Scale adjustment during glitch
    if (containerRef.current) {
      const baseImage = containerRef.current.querySelector(
        '.base-layer'
      ) as HTMLElement

      glitchSequence.forEach((glitch) => {
        tl.to(
          baseImage,
          {
            scale: 1.02,
            duration: glitch.duration * 0.5,
            ease: 'none',
          },
          glitch.time
        )

        tl.to(
          baseImage,
          {
            scale: 1,
            duration: glitch.duration * 0.5,
            ease: 'power2.out',
          },
          '<'
        )
      })
    }

    return tl
  }

  // Handle random glitch intervals
  useEffect(() => {
    if (!randomGlitch) return

    const scheduleNextGlitch = () => {
      const interval = Math.random() * (maxGlitchInterval - minGlitchInterval) + minGlitchInterval
      glitchIntervalRef.current = setTimeout(() => {
        if (!isHovered) {
          setIsGlitching(true)
          glitchTimelineRef.current?.kill()
          glitchTimelineRef.current = createGlitchTimeline()
          glitchTimelineRef.current.timeScale(2 - glitchFrequency)
        }
        scheduleNextGlitch()
      }, interval)
    }

    scheduleNextGlitch()

    return () => {
      if (glitchIntervalRef.current) {
        clearTimeout(glitchIntervalRef.current)
      }
    }
  }, [randomGlitch, minGlitchInterval, maxGlitchInterval, glitchFrequency])

  // Handle hover glitch
  useEffect(() => {
    if (!containerRef.current) return

    // Kill any existing timeline
    glitchTimelineRef.current?.kill()

    if (!isHovered) {
      return
    }

    glitchTimelineRef.current = createGlitchTimeline()
    glitchTimelineRef.current.timeScale(2 - glitchFrequency)

    return () => {
      glitchTimelineRef.current?.kill()
    }
  }, [isHovered, glitchIntensity, glitchFrequency])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer group"
        style={{ perspective: '1000px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Base Image */}
        <div className="base-layer absolute inset-0 rounded-full overflow-hidden will-change-transform">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 128px, 192px"
            className="object-cover group-hover:brightness-110 transition-brightness duration-300"
          />
        </div>

        {/* Glitch Layers - RGB Offset */}
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) glitchLayers.current[index] = el
            }}
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none will-change-transform"
            style={{
              opacity: 0.6,
              transform: `translate(${(index - 1) * 3}px, 0)`,
              mixBlendMode: index === 0 ? 'screen' : index === 1 ? 'multiply' : 'lighten',
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              loading="eager"
              sizes="(max-width: 768px) 128px, 192px"
              className="object-cover"
            />
          </div>
        ))}

        {/* Scanline Overlay */}
        <div
          ref={scanlineRef}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03),
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 2px
            )`,
            animation: isHovered || isGlitching ? 'glitch-scan 8s linear infinite' : 'none',
          }}
        />

        {/* Glitch Border Animation */}
        <div
          className="absolute inset-0 rounded-full border-2 pointer-events-none transition-all duration-300"
          style={{
            borderColor: isHovered || isGlitching ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.2)',
            boxShadow: isHovered || isGlitching ? '0 0 20px rgba(99, 102, 241, 0.3) inset' : 'none',
          }}
        />
      </div>
    </div>
  )
}
