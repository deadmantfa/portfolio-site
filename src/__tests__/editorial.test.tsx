import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import EditorialReveal from '../components/EditorialReveal'
import React from 'react'

describe('EditorialReveal Component', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <EditorialReveal>
        <div>Test Content</div>
      </EditorialReveal>
    )
    expect(getByText('Test Content')).toBeDefined()
  })
})
