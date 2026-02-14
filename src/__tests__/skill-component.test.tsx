import { render } from '@testing-library/react'
import SkillModuleComponent from '../components/SkillModule'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F hooks
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
  }
})

vi.mock('../components/ScrollProvider', () => ({
  useScroll: () => ({
    scrollProgress: 0,
    activeSkill: null,
    setActiveSkill: vi.fn(),
  }),
}))

vi.mock('../components/SkillResourceProvider', () => ({
  useSkillResources: () => ({
    geometry: {},
    baseMaterial: {},
    hoverMaterial: {},
  }),
}))

// Mock Drei
vi.mock('@react-three/drei', () => ({
  Float: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-float">{children}</div>,
  Box: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-box">{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-text">{children}</div>,
}))

describe('SkillModule Component', () => {
  it('renders 3D components for a skill', () => {
    const mockSkill = { name: 'React', category: 'frontend', importance: 'Test' }
    const { getByTestId } = render(<SkillModuleComponent skill={mockSkill as any} index={0} />)
    expect(getByTestId('mock-float')).toBeInTheDocument()
  })
})
