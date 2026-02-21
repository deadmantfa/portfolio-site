import { render, screen } from '@testing-library/react'
import Timeline from '../components/Timeline'
import { expect, it, describe, vi } from 'vitest'

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('../components/ScrollProvider', async (importOriginal) => {
  const React = await import('react')
  return {
    useScroll: () => ({
      scrollProgress: 0.5,
      activeEpoch: 0,
      activeSkill: null,
      setActiveSkill: vi.fn(),
    }),
    ScrollContext: React.createContext(undefined),
    ScrollProvider: ({ children }: any) => <div>{children}</div>
  }
})

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
  useCursor: vi.fn(),
}))

describe('Timeline Component', () => {
  it('renders milestones', () => {
    render(<Timeline />)
    expect(screen.getAllByTestId('mock-float').length).toBeGreaterThan(0)
  })
})
