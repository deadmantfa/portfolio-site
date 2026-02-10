import { render, screen } from '@testing-library/react'
import Navigation from '../components/Navigation'
import { expect, it, describe } from 'vitest'

describe('Navigation Component', () => {
  it('renders the main navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText(/About/i)).toBeInTheDocument()
    expect(screen.getByText(/Work/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
  })

  it('renders the Download CV link', () => {
    render(<Navigation />)
    const cvLink = screen.getByText(/Download CV/i)
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute('href', '/WenceslausDsilva-CV-2026.pdf')
  })
})