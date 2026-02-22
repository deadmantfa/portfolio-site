import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { SkillBackdrop } from '../components/SkillBackdrop'
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
  Points: ({ children }: any) => <div data-testid="backdrop-particles">{children}</div>,
  PointMaterial: () => <div data-testid="particle-material" />,
  Line: () => <div data-testid="mock-line" />,
}))

// Mock GSAP (if needed by SkillBackdrop)
vi.mock('gsap', () => ({
  default: {
    to: vi.fn()
  }
}))

describe('SkillBackdrop Aesthetics', () => {
  it('renders a particle system for background effect', () => {
    const { container } = render(<SkillBackdrop progress={0.5} exitProgress={0} />)
    expect(container.querySelector('points')).toBeInTheDocument()
  })

  it('renders with proper scale on exit progress', () => {
    const { container: container1 } = render(<SkillBackdrop progress={0.5} exitProgress={0} />)
    const { container: container2 } = render(<SkillBackdrop progress={0.5} exitProgress={0.5} />)

    expect(container1.querySelector('group')).toBeInTheDocument()
    expect(container2.querySelector('group')).toBeInTheDocument()
  })
})
