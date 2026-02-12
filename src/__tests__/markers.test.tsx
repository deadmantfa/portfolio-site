import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import BackgroundMarkers from '../components/BackgroundMarkers'
import React from 'react'

describe('BackgroundMarkers Component', () => {
  it('should render all milestone years', () => {
    const { getByText } = render(<BackgroundMarkers />)
    // We check for some representative years from careerData
    expect(getByText('2022 - Present')).toBeDefined()
    expect(getByText('2019 - 2021')).toBeDefined()
  })
})
