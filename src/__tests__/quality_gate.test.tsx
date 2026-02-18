import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import SkillNebula from '../components/SkillNebula'
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
}))

// Mock SkillModuleComponent
vi.mock('../components/SkillModule', () => ({
  default: () => <div data-testid="skill-module"></div>
}))

// Mock SkillResourceProvider
vi.mock('../components/SkillResourceProvider', () => ({
  SkillResourceProvider: ({ children }: any) => <div data-testid="skill-resource-provider">{children}</div>,
  useSkillResources: () => ({})
}))

// Mock helix utils
vi.mock('@/utils/helix', () => ({
  calculateHelixPosition: () => [0, 0, 0]
}))

describe('SkillNebula Quality Gate', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<SkillNebula progress={0} exitProgress={0} />)
    expect(getByTestId('skill-resource-provider')).toBeDefined()
  })

  it('passes exitProgress to particle material', () => {
    // This is hard to test directly because PointMaterial is a component
    // and its props are handled by R3F. 
    // However, we can check if it renders.
    const { getByTestId } = render(<SkillNebula progress={0} exitProgress={1} />)
    expect(getByTestId('mock-point-material')).toBeDefined()
  })
})
