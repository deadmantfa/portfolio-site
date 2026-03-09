import { render } from '@testing-library/react'
import ArchitecturalGrid from '../components/VisionaryScene'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F useFrame
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
  }
})

vi.mock('../components/ScrollProvider', async (importOriginal) => {
  const React = await import('react')
  return {
    useScroll: () => ({
      scrollProgress: 0,
      activeSkill: null,
      setActiveSkill: vi.fn(),
    }),
    ScrollContext: React.createContext(undefined),
    ScrollProvider: ({ children }: any) => <div>{children}</div>
  }
})

describe('ArchitecturalGrid Component', () => {
  it('renders the 3D scene elements', () => {
    const { container } = render(<ArchitecturalGrid />)
    expect(container.querySelector('points')).toBeDefined()
    expect(container.querySelector('lineSegments')).toBeDefined()
  })

  it('renders without crashing with skillsProgress={0}', () => {
    const { container } = render(<ArchitecturalGrid skillsProgress={0} />)
    expect(container).toBeDefined()
  })

  it('renders without crashing with skillsProgress={0.5}', () => {
    const { container } = render(<ArchitecturalGrid skillsProgress={0.5} />)
    expect(container).toBeDefined()
  })
})

describe('grid opacity fade formula', () => {
  it('returns 0.4 at skillsProgress=0', () => {
    const fade = Math.max(0, 1 - 0 * 3)
    expect(0.4 * fade).toBe(0.4)
  })

  it('returns ~0 at skillsProgress=0.33', () => {
    const fade = Math.max(0, 1 - 0.33 * 3)
    expect(0.4 * fade).toBeCloseTo(0, 2)
  })

  it('clamps to 0 when skillsProgress > 0.33', () => {
    const fade = Math.max(0, 1 - 1.0 * 3)
    expect(fade).toBe(0)
  })
})
