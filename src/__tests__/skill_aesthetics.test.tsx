import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { OrbitalSkillMap } from '../components/OrbitalSkillMap'
import React from 'react'

// Mock R3F and dependencies
vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
  useThree: () => ({
    viewport: { width: 10, height: 10 }
  }),
}))

vi.mock('@react-three/drei', () => ({
  Billboard: ({ children }: any) => <div data-testid="mock-billboard">{children}</div>,
  Float: ({ children }: any) => <div data-testid="mock-float">{children}</div>,
  Text: ({ children }: any) => <div data-testid="mock-text">{children}</div>,
  Points: ({ children }: any) => <div data-testid="orbital-particles">{children}</div>,
  PointMaterial: () => <div data-testid="particle-material" />,
  Line: () => <div data-testid="mock-line" />,
}))

// Mock OrbitalRing component
vi.mock('../components/OrbitalRing', () => ({
  OrbitalRing: () => <div data-testid="orbital-ring" />
}))

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn()
  }
}))

describe('OrbitalSkillMap Aesthetics', () => {
  it('renders a particle system for background effect', () => {
    const { queryByTestId } = render(<OrbitalSkillMap progress={0.5} exitProgress={0} />)
    expect(queryByTestId('orbital-particles')).not.toBeNull()
  })

  it('renders orbital rings', () => {
    const { getAllByTestId } = render(<OrbitalSkillMap progress={0.5} exitProgress={0} />)
    expect(getAllByTestId('orbital-ring')).toHaveLength(4)
  })
})
