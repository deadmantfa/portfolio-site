import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import { expect, it, describe, vi } from 'vitest'

// Mock 3D components
vi.mock('@/components/SceneCanvas', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-canvas">{children}</div>
}))
vi.mock('@/components/VisionaryScene', () => ({
  default: () => <div data-testid="mock-scene" />
}))
vi.mock('@/components/Timeline', () => ({
  default: () => <div data-testid="mock-timeline" />
}))

describe('Home Page', () => {
  it('renders the 3D canvas container', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument()
    expect(screen.getByTestId('mock-timeline')).toBeInTheDocument()
  })
})
