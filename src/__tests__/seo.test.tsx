import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import StructuredData from '../components/StructuredData'
import React from 'react'

describe('StructuredData Component', () => {
  it('should render a JSON-LD script tag', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
  })

  it('should contain the professional name and role', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const content = script?.textContent
    expect(content).toContain('Wenceslaus Dsilva')
    expect(content).toContain('Chief Technology Officer')
  })
})
