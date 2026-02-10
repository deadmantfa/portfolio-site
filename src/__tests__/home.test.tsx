import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import { expect, it, describe } from 'vitest'

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />)
    expect(screen.getByAltText(/Next.js logo/i)).toBeInTheDocument()
  })
})
