import { render } from '@testing-library/react'
import ArchitecturalGrid from '../components/VisionaryScene'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F useFrame
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
  }
})

describe('ArchitecturalGrid Component', () => {
  it('renders the 3D scene elements', () => {
    const { container } = render(<ArchitecturalGrid />)
    expect(container.querySelector('points')).toBeDefined()
    expect(container.querySelector('lineSegments')).toBeDefined()
  })
})
