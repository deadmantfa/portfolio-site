import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HighlightedParagraph } from '@/components/HighlightedParagraph'

describe('HighlightedParagraph', () => {
  test('renders the full text content', () => {
    render(<HighlightedParagraph text="Reduced errors by 85% in production." />)
    expect(screen.getByText(/Reduced errors/)).toBeInTheDocument()
  })

  test('highlights percentage values', () => {
    const { container } = render(<HighlightedParagraph text="Improved efficiency by 75% and uptime." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    expect(highlights.length).toBeGreaterThan(0)
    expect(highlights[0].textContent).toContain('75%')
  })

  test('highlights dollar amounts', () => {
    const { container } = render(<HighlightedParagraph text="Processed over $50M in transactions." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    expect(highlights.length).toBeGreaterThan(0)
    expect(highlights[0].textContent).toContain('$50M')
  })

  test('highlights counts with plus sign', () => {
    const { container } = render(<HighlightedParagraph text="Served 300+ artworks and 10,000+ views." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    expect(highlights.length).toBeGreaterThan(0)
  })

  test('highlights time durations', () => {
    const { container } = render(<HighlightedParagraph text="Delivered the full system in 8 days." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    expect(highlights.length).toBeGreaterThan(0)
    expect(highlights[0].textContent).toContain('8 days')
  })

  test('highlights multipliers', () => {
    const { container } = render(<HighlightedParagraph text="Handled a 10x traffic spike with zero downtime." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    expect(highlights.length).toBeGreaterThan(0)
    expect(highlights[0].textContent).toContain('10x')
  })

  test('renders plain text segments without mark wrapper', () => {
    const { container } = render(<HighlightedParagraph text="Simple text with no stats." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    expect(highlights.length).toBe(0)
  })

  test('applies outer className to the paragraph', () => {
    const { container } = render(
      <HighlightedParagraph text="Some text 50%." className="my-class" />,
    )
    expect(container.querySelector('p')).toHaveClass('my-class')
  })

  test('highlights the word "zero" as a stat term', () => {
    const { container } = render(<HighlightedParagraph text="Achieved zero downtime over 2 years." />)
    const highlights = container.querySelectorAll('[data-highlight]')
    const texts = Array.from(highlights).map(el => el.textContent)
    expect(texts.some(t => t?.toLowerCase().includes('zero'))).toBe(true)
  })
})
