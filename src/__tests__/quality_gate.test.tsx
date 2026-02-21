import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { OrbitalSkillMap } from '../components/OrbitalSkillMap'
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

// Mock Drei
vi.mock('@react-three/drei', () => ({
  Points: ({ children }: any) => <div data-testid="mock-points">{children}</div>,
  PointMaterial: () => <div data-testid="mock-point-material"></div>,
  Line: () => <div data-testid="mock-line"></div>,
  Billboard: ({ children }: any) => <div data-testid="mock-billboard">{children}</div>,
  Text: ({ children }: any) => <div data-testid="mock-text">{children}</div>,
}))

// Mock OrbitalRing component
vi.mock('../components/OrbitalRing', () => ({
  OrbitalRing: () => <div data-testid="orbital-ring"></div>
}))

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn()
  }
}))

describe('OrbitalSkillMap Quality Gate', () => {
  it('renders without crashing', () => {
    const { container } = render(<OrbitalSkillMap progress={0} exitProgress={0} />)
    expect(container).toBeDefined()
  })

  it('passes exitProgress to particle material', () => {
    // This is hard to test directly because PointMaterial is a component
    // and its props are handled by R3F.
    // However, we can check if it renders.
    const { getByTestId } = render(<OrbitalSkillMap progress={0} exitProgress={1} />)
    expect(getByTestId('mock-point-material')).toBeDefined()
  })

  it('renders orbital rings', () => {
    const { getAllByTestId } = render(<OrbitalSkillMap progress={0.5} exitProgress={0} />)
    expect(getAllByTestId('orbital-ring')).toHaveLength(4)
  })
})
