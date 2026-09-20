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

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: (loader: any) => {
    const fnStr = loader.toString()
    if (fnStr.includes('HomeScene')) {
      return function MockHomeScene() {
        return (
          <div data-testid="mock-canvas">
            <div data-testid="mock-scene" />
            <div data-testid="mock-skill-backdrop" />
            <div data-testid="mock-vault" />
            <div data-testid="mock-connection" />
          </div>
        )
      }
    }
    if (fnStr.includes('SkillsGrid')) return function MockSkillsGrid() { return <div data-testid="mock-skills-grid" /> }
    if (fnStr.includes('ContactForm')) return function MockContactForm() { return <div data-testid="mock-contact-form" /> }
    if (fnStr.includes('SocialLinks')) return function MockSocialLinks() { return <div data-testid="mock-social-links" /> }
    if (fnStr.includes('OpenSourceShowcase')) return function MockOpenSource() { return <div data-testid="mock-opensource-showcase" /> }
    if (fnStr.includes('Testimonials')) return function MockTestimonials() { return <div data-testid="mock-testimonials-section" /> }
    return function MockNull() { return null }
  },
}))

describe('Home Page', () => {
  it('renders the 3D canvas container and key components', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument()
    expect(screen.getByTestId('mock-skill-backdrop')).toBeInTheDocument()
    expect(screen.getByTestId('mock-skills-grid')).toBeInTheDocument()
    expect(screen.getByTestId('mock-vault')).toBeInTheDocument()
    expect(screen.getByTestId('mock-connection')).toBeInTheDocument()
    expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument()
    expect(screen.getByTestId('mock-social-links')).toBeInTheDocument()
  })
})
