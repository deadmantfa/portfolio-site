import { render, screen } from '@testing-library/react'
import Timeline from '../components/Timeline'
import { expect, it, describe, vi } from 'vitest'

// Mock career data
vi.mock('@/data/career', () => ({
  careerData: [
    { year: '2024', role: 'Role 1', company: 'Comp 1', description: 'Desc 1' },
    { year: '2023', role: 'Role 2', company: 'Comp 2', description: 'Desc 2' }
  ]
}))

// Mock Drei
vi.mock('@react-three/drei', () => ({
  Float: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-float">{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-text">{children}</div>,
  ScrollControls: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-scroll-controls">{children}</div>,
  Scroll: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-scroll">{children}</div>,
}))

describe('Timeline Component', () => {
  it('renders scroll controls and milestones', () => {
    render(<Timeline />)
    expect(screen.getByTestId('mock-scroll-controls')).toBeInTheDocument()
    expect(screen.getAllByTestId('mock-float').length).toBe(2)
  })
})
