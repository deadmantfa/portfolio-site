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

describe('Home Page', () => {
  it('renders the 3D hero experience', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument()
    expect(screen.getByText(/Architect/i)).toBeInTheDocument()
  })
})
