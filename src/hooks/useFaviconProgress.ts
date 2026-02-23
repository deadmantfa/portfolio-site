import { useEffect } from 'react'
import { useScroll } from '@/components/ScrollProvider'

const INDIGO: [number, number, number] = [99, 102, 241] // #6366f1
const AMBER: [number, number, number] = [245, 158, 11] // #f59e0b

/**
 * Linear interpolation between two RGB colors
 * @param a - Start color [r, g, b]
 * @param b - End color [r, g, b]
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated RGB color [r, g, b]
 */
function lerpRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

/**
 * Draw the favicon canvas with progress arc
 * @param canvas - Canvas element to draw on
 * @param progress - Progress value (0-1)
 */
function drawFavicon(canvas: HTMLCanvasElement, progress: number): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const size = 64
  const center = 32
  const bgRadius = 28
  const trackLineWidth = 5
  const glowLineWidth = 7
  const crispLineWidth = 5

  // Clear canvas
  ctx.clearRect(0, 0, size, size)

  // Draw background circle
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(center, center, bgRadius, 0, Math.PI * 2)
  ctx.fill()

  // Draw dim track ring
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = trackLineWidth
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(center, center, bgRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2)
  ctx.stroke()

  // If progress > 0, draw the animated arc
  if (progress > 0.001) {
    const color = lerpRgb(INDIGO, AMBER, Math.min(progress, 1))
    const colorStr = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    const arcLength = Math.min(progress, 1) * Math.PI * 2

    console.log('[drawFavicon] Progress:', progress.toFixed(3), 'Color:', colorStr, 'Arc:', arcLength.toFixed(2))

    // Glow layer
    ctx.strokeStyle = colorStr
    ctx.lineWidth = glowLineWidth
    ctx.lineCap = 'round'
    ctx.shadowColor = colorStr
    ctx.shadowBlur = 6
    ctx.beginPath()
    ctx.arc(center, center, bgRadius, -Math.PI / 2, -Math.PI / 2 + arcLength)
    ctx.stroke()

    // Reset shadow for crisp layer
    ctx.shadowBlur = 0

    // Crisp arc on top
    ctx.strokeStyle = colorStr
    ctx.lineWidth = crispLineWidth
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(center, center, bgRadius, -Math.PI / 2, -Math.PI / 2 + arcLength)
    ctx.stroke()
  }
}

/**
 * Hook to manage animated favicon based on scroll progress
 */
function useFaviconProgress(): void {
  const { scrollProgress } = useScroll()

  // Mount: create favicon link once
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Remove any existing favicon links to avoid conflicts
    const existingIcons = document.querySelectorAll('link[rel="icon"]')
    existingIcons.forEach(el => el.remove())

    // Create favicon link element
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.sizes = '64x64'
    link.setAttribute('data-favicon-animator', 'true')
    document.head.appendChild(link)

    // Create canvas for favicon
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64

    // Draw initial favicon
    drawFavicon(canvas, 0)
    link.href = canvas.toDataURL('image/png')

    // Store canvas in a way we can access it in the scroll effect
    ;(window as any).__faviconCanvas = canvas
    ;(window as any).__faviconLink = link

    return () => {
      if (link && link.parentNode) {
        link.remove()
      }
    }
  }, [])

  // Scroll: update favicon on progress change
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const canvas = (window as any).__faviconCanvas
    const link = (window as any).__faviconLink

    if (!canvas || !link) return

    // Draw favicon with current progress
    drawFavicon(canvas, scrollProgress)
    // Update link href
    link.href = canvas.toDataURL('image/png')
  }, [scrollProgress])
}

export { useFaviconProgress, drawFavicon, lerpRgb }
