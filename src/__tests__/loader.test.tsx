import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ArchitecturalLoader from '../components/ArchitecturalLoader'
import React from 'react'

describe('ArchitecturalLoader Component', () => {
  it('should render the initialization text', () => {
    const { getByText } = render(<ArchitecturalLoader />)
    expect(getByText(/Initializing Architecture/i)).toBeDefined()
  })

  it('should render the professional signature', () => {
    const { getByText } = render(<ArchitecturalLoader />)
    expect(getByText('Wenceslaus Dsilva')).toBeDefined()
  })
})
