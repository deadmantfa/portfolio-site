import { render, screen } from '@testing-library/react'
import VisionaryScene from '../components/VisionaryScene'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F useFrame
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
  }
})

// Mock Drei
vi.mock('@react-three/drei', () => ({
  Points: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-points">{children}</div>,
  PointMaterial: () => <div data-testid="mock-point-material" />,
}))

describe('VisionaryScene Component', () => {
  it('renders the 3D scene elements', () => {
    render(<VisionaryScene />)
    expect(screen.getByTestId('mock-points')).toBeInTheDocument()
  })
})
