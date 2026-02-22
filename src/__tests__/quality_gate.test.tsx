import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { SkillBackdrop } from '../components/SkillBackdrop'
import * as THREE from 'three'
import React from 'react'

// Mock react-three-fiber
vi.mock('@react-three/fiber', () => ({
  useFrame: (callback: any) => {
    // We can manually trigger the callback in tests if needed
    // But for now, we'll just mock it
  },
  useThree: () => ({
    viewport: { width: 10, height: 10 },
  }),
}))

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn()
  }
}))

describe('SkillBackdrop Quality Gate', () => {
  it('renders without crashing', () => {
    const { container } = render(<SkillBackdrop progress={0} exitProgress={0} />)
    expect(container).toBeDefined()
  })

  it('renders group element', () => {
    const { container } = render(<SkillBackdrop progress={0} exitProgress={0} />)
    expect(container.querySelector('group')).toBeInTheDocument()
  })

  it('renders points element with bufferGeometry', () => {
    const { container } = render(<SkillBackdrop progress={0} exitProgress={0} />)
    expect(container.querySelector('points')).toBeInTheDocument()
    expect(container.querySelector('bufferGeometry')).toBeInTheDocument()
  })

  it('applies proper material properties', () => {
    const { container } = render(<SkillBackdrop progress={0.5} exitProgress={0} />)
    const pointsMaterial = container.querySelector('pointsMaterial')
    expect(pointsMaterial).toBeInTheDocument()
  })
})
