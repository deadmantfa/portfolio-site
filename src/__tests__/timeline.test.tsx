import { render, screen } from '@testing-library/react'
import Timeline from '../components/Timeline'
import { expect, it, describe, vi } from 'vitest'

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock R3F hooks
vi.mock('@react-three/fiber', async () => {
  return {
    useThree: () => ({ viewport: { height: 10 } }),
    useFrame: vi.fn(),
  }
})

// Mock Drei
vi.mock('@react-three/drei', () => ({
  Float: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-float">{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-text">{children}</div>,
  Box: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-box">{children}</div>,
  Sphere: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-sphere">{children}</div>,
  Center: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-center">{children}</div>,
}))

describe('Timeline Component', () => {
  it('renders milestones', () => {
    render(<Timeline />)
    expect(screen.getAllByTestId('mock-float').length).toBeGreaterThan(0)
  })
})
