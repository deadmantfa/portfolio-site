import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import SkillNebula from '../components/SkillNebula'
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
  Points: ({ children }: any) => <div data-testid="skill-particles">{children}</div>,
  PointMaterial: () => <div data-testid="particle-material" />,
}))

// Mock SkillModuleComponent
vi.mock('../components/SkillModule', () => ({
  default: () => <div data-testid="skill-module" />
}))

describe('SkillNebula Aesthetics', () => {
  it('renders a particle system for data streams', () => {
    const { queryByTestId } = render(<SkillNebula progress={0.5} exitProgress={0} />)
    // This should fail initially as I haven't added the Points component yet
    expect(queryByTestId('skill-particles')).not.toBeNull()
  })
})
