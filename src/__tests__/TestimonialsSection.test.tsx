import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import * as testimonialsModule from '@/data/testimonials'

vi.mock('gsap', () => ({
  default: {
    from: vi.fn(),
    to: vi.fn(),
  },
}))

vi.mock('@/components/EditorialReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('TestimonialsSection', () => {
  test('renders section title "Signals."', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Signals.')).toBeInTheDocument()
  })

  test('renders subtitle "What Others Say"', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('What Others Say')).toBeInTheDocument()
  })

  test('renders testimonial cards for all testimonials', () => {
    const { container } = render(<TestimonialsSection />)
    const testimonialCards = container.querySelectorAll('.glass')
    expect(testimonialCards.length).toBeGreaterThanOrEqual(
      testimonialsModule.testimonials.length
    )
  })

  test('displays testimonial quotes', () => {
    render(<TestimonialsSection />)
    testimonialsModule.testimonials.forEach((testimonial) => {
      const quoteElements = screen.queryAllByText(new RegExp(testimonial.quote, 'i'))
      expect(quoteElements.length).toBeGreaterThan(0)
    })
  })

  test('displays author names', () => {
    render(<TestimonialsSection />)
    testimonialsModule.testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument()
    })
  })

  test('displays author initials', () => {
    render(<TestimonialsSection />)
    testimonialsModule.testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.initials)).toBeInTheDocument()
    })
  })

  test('displays author title and company', () => {
    render(<TestimonialsSection />)
    testimonialsModule.testimonials.forEach((testimonial) => {
      const titleCompanyText = `${testimonial.title} · ${testimonial.company}`
      expect(screen.getByText(titleCompanyText)).toBeInTheDocument()
    })
  })
})
