import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
    render(<TestimonialsSection />)
    const cards = screen.getAllByText(/Solutions Architecture|Creative Professional|CEO & Forbes|Master of Arts|Director/i)
    expect(cards.length).toBeGreaterThan(0)
  })

  test('displays testimonial quotes', () => {
    render(<TestimonialsSection />)
    testimonialsModule.testimonials.forEach((testimonial) => {
      expect(screen.getByText(`"${testimonial.quote}"`)).toBeInTheDocument()
    })
  })

  test('displays author names', () => {
    render(<TestimonialsSection />)
    testimonialsModule.testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument()
    })
  })

  test('displays author initials as fallback when image errors', () => {
    render(<TestimonialsSection />)
    const images = screen.getAllByRole('img')
    images.forEach((img) => fireEvent.error(img))
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
