import { render, screen } from '@testing-library/react'
import RootLayout from '../app/layout'
import { expect, it, describe, vi } from 'vitest'

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-sans',
    className: 'inter-font',
  }),
  Cormorant_Garamond: () => ({
    variable: '--font-serif',
    className: 'cormorant-font',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-mono',
    className: 'jetbrains-font',
  }),
}))

// Mock Navigation
vi.mock('@/components/Navigation', () => ({
  default: () => <div data-testid="mock-nav">Navigation</div>
}))

describe('RootLayout', () => {
  it('renders children and navigation', () => {
    render(
      <RootLayout>
        <div data-testid="child">Content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('mock-nav')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
