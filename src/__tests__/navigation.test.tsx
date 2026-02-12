import { render, screen } from '@testing-library/react'
import Navigation from '../components/Navigation'
import { expect, it, describe } from 'vitest'

describe('Navigation Component', () => {
  it('renders the main navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText(/Epochs/i)).toBeInTheDocument()
    expect(screen.getByText(/Ecosystem/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
  })

  it('renders the Curriculum Vitae link', () => {
    render(<Navigation />)
    const cvLink = screen.getByLabelText(/Curriculum Vitae/i)
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute('href', '/CV/WenceslausDsilva-CV-2026.pdf')
  })
})
