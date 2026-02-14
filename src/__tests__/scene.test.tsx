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
})
