import { describe, it, expect } from 'vitest'
import { calculateHelixPosition } from '@/utils/helix'

describe('Helix Vortex Calculation', () => {
  it('calculates position with a tapering radius (vortex effect)', () => {
    const total = 20
    const radiusBase = 10
    const heightFactor = 4
    
    // Low index (bottom of helix)
    const posStart = calculateHelixPosition(0, total, radiusBase, heightFactor)
    // High index (top of helix)
    const posEnd = calculateHelixPosition(19, total, radiusBase, heightFactor)
    
    const radiusStart = Math.sqrt(posStart[0]**2 + posStart[2]**2)
    const radiusEnd = Math.sqrt(posEnd[0]**2 + posEnd[2]**2)
    
    // In a vortex, the radius should not be constant
    expect(radiusStart).not.toBe(radiusEnd)
    // Specifically, for a vortex tapering down, radiusStart should be smaller than radiusEnd (if index 0 is at bottom)
    expect(radiusStart).toBeLessThan(radiusEnd)
  })

  it('maintains a double helix structure', () => {
    const total = 20
    const radiusBase = 10
    const heightFactor = 4
    
    const pos0 = calculateHelixPosition(0, total, radiusBase, heightFactor)
    const pos1 = calculateHelixPosition(1, total, radiusBase, heightFactor)
    
    // In a double helix, consecutive indices should be on opposite sides (approx 180 deg apart)
    // So their x,z positions should be roughly negated (at the same radius)
    // However, they also have different heights.
    
    // Let's check the angle difference
    const angle0 = Math.atan2(pos0[2], pos0[0])
    const angle1 = Math.atan2(pos1[2], pos1[0])
    
    let diff = Math.abs(angle1 - angle0)
    if (diff > Math.PI) diff = 2 * Math.PI - diff
    
    // For a double helix with alternating strands, the angle difference should be significant
    // With 6 rotations over 20 skills, it's roughly 0.4*PI
    expect(diff).toBeGreaterThan(Math.PI * 0.3)
  })
})
