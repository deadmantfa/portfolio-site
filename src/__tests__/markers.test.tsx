import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import BackgroundMarkers from '../components/BackgroundMarkers'
import React from 'react'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({
    scrollYProgress: {
      get: () => 0,
      onChange: () => {},
    },
  }),
  useTransform: () => ({
    get: () => 0,
  }),
}))

describe('BackgroundMarkers Component', () => {
  it('should render all milestone years', () => {
    const { getAllByText } = render(<BackgroundMarkers />)
    // We check for some representative years that are rendered
    expect(getAllByText('2026').length).toBeGreaterThan(0)
    expect(getAllByText('2019').length).toBeGreaterThan(0)
  })
})
