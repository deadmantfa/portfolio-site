import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { lerpRgb, drawFavicon } from '@/hooks/useFaviconProgress'

describe('lerpRgb', () => {
  test('should return start color at t=0', () => {
    const result = lerpRgb([99, 102, 241], [245, 158, 11], 0)
    expect(result).toEqual([99, 102, 241])
  })

  test('should return end color at t=1', () => {
    const result = lerpRgb([99, 102, 241], [245, 158, 11], 1)
    expect(result).toEqual([245, 158, 11])
  })

  test('should interpolate at t=0.5', () => {
    const result = lerpRgb([99, 102, 241], [245, 158, 11], 0.5)
    // Expected: [99 + (245-99)*0.5, 102 + (158-102)*0.5, 241 + (11-241)*0.5]
    // = [172, 130, 126]
    expect(result).toEqual([172, 130, 126])
  })
})

describe('drawFavicon', () => {
  let canvas: HTMLCanvasElement
  let mockCtx: any
  let getContextSpy: any

  beforeEach(() => {
    // Create a mock canvas and context
    mockCtx = {
      clearRect: vi.fn(),
      fillStyle: '',
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      strokeStyle: '',
      lineWidth: 0,
      lineCap: '',
      shadowColor: '',
      shadowBlur: 0,
    }

    canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    getContextSpy = vi.spyOn(canvas, 'getContext').mockReturnValue(mockCtx as any)
  })

  afterEach(() => {
    getContextSpy.mockRestore()
  })

  test('should call clearRect on draw', () => {
    drawFavicon(canvas, 0)
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 64, 64)
  })

  test('should draw background circle and track ring at progress=0', () => {
    drawFavicon(canvas, 0)

    // Should call arc twice: once for background, once for track
    expect(mockCtx.arc).toHaveBeenCalledTimes(2)
    // First arc: background circle (full circle)
    expect(mockCtx.arc).toHaveBeenNthCalledWith(1, 32, 32, 28, 0, Math.PI * 2)
    // Second arc: track ring (full circle)
    expect(mockCtx.arc).toHaveBeenNthCalledWith(2, 32, 32, 28, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2)
  })

  test('should draw 4 arcs (bg + track + glow + crisp) at progress > 0', () => {
    drawFavicon(canvas, 0.5)

    // Should call arc 4 times: bg, track, glow, crisp
    expect(mockCtx.arc).toHaveBeenCalledTimes(4)
  })

  test('should reset shadowBlur to 0 after glow layer', () => {
    drawFavicon(canvas, 0.5)

    // At some point shadowBlur should be set to a positive value (for glow)
    // and then reset to 0
    const calls = mockCtx.shadowBlur === 0
    expect(mockCtx.shadowBlur).toBe(0)
  })

  test('should not draw progress arc when progress is 0', () => {
    drawFavicon(canvas, 0)

    // Only 2 arcs should be called (bg + track, no glow/crisp)
    expect(mockCtx.arc).toHaveBeenCalledTimes(2)
  })

  test('should interpolate color correctly when progress > 0', () => {
    drawFavicon(canvas, 1)

    // At progress=1, color should be full amber [245, 158, 11]
    // The strokeStyle should be set to 'rgb(245, 158, 11)'
    expect(mockCtx.strokeStyle).toBe('rgb(245, 158, 11)')
  })

  test('should calculate correct arc length based on progress', () => {
    drawFavicon(canvas, 0.25)

    // With progress=0.25, arcLength = 0.25 * 2π
    const expectedArcEnd = -Math.PI / 2 + 0.25 * Math.PI * 2

    // The glow and crisp layers should be drawn with this arc
    // Check one of the last two arc calls
    expect(mockCtx.arc).toHaveBeenNthCalledWith(
      3, // glow layer
      32,
      32,
      28,
      -Math.PI / 2,
      expectedArcEnd
    )
    expect(mockCtx.arc).toHaveBeenNthCalledWith(
      4, // crisp layer
      32,
      32,
      28,
      -Math.PI / 2,
      expectedArcEnd
    )
  })
})
