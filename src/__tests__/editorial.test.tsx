import { render, screen } from '@testing-library/react'
import ProjectPage from '../app/work/[slug]/page'
import { expect, it, describe, vi } from 'vitest'

// Mock 3D components to avoid R3F hook errors
vi.mock('@/components/SceneCanvas', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-canvas">{children}</div>
}))
vi.mock('@/components/VisionaryScene', () => ({
  default: () => <div data-testid="mock-scene" />
}))

describe('Project Case Study Page', () => {
  it('renders all editorial sections correctly', async () => {
    // Manually create the params promise
    const params = Promise.resolve({ slug: 'rooftop' })
    
    // In React 19 / Next.js 15, we can await the component or render it
    const page = await ProjectPage({ params })
    render(page)

    expect(screen.getByText(/Architectural Decisions/i)).toBeInTheDocument()
    expect(screen.getByText(/Technical Ecosystem/i)).toBeInTheDocument()
    expect(screen.getByText(/System Runtime/i)).toBeInTheDocument()
  })
})
