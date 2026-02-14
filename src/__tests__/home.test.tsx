import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import { expect, it, describe, vi } from 'vitest'

// Mock ScrollProvider
vi.mock('@/components/ScrollProvider', async (importOriginal) => {
  const React = await import('react')
  return {
    useScroll: () => ({
      scrollProgress: 0,
      activeSkill: null,
      setActiveSkill: vi.fn(),
    }),
    ScrollContext: React.createContext(undefined),
    ScrollProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
})

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
vi.mock('@/components/AssemblyScene', () => ({
  default: () => <div data-testid="mock-assembly" />
}))
vi.mock('@/components/ConnectionScene', () => ({
  default: () => <div data-testid="mock-connection" />
}))
vi.mock('@/components/BackgroundMarkers', () => ({
  default: () => <div data-testid="mock-markers" />
}))
vi.mock('@/components/EditorialReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-reveal">{children}</div>
}))
vi.mock('@/components/ContactForm', () => ({
  default: () => <div data-testid="mock-contact-form" />
}))
vi.mock('@/components/SocialLinks', () => ({
  default: () => <div data-testid="mock-social-links" />
}))

describe('Home Page', () => {
  it('renders the 3D canvas container and key components', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument()
    expect(screen.getByTestId('mock-timeline')).toBeInTheDocument()
    expect(screen.getByTestId('mock-assembly')).toBeInTheDocument()
    expect(screen.getByTestId('mock-connection')).toBeInTheDocument()
    expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument()
    expect(screen.getByTestId('mock-social-links')).toBeInTheDocument()
  })
})
