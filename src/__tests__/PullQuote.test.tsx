import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PullQuote } from '@/components/PullQuote'

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))

describe('PullQuote', () => {
  test('renders the quote text', () => {
    render(<PullQuote quote="Every successful technology engagement starts with a candid conversation." />)
    expect(screen.getByRole('blockquote')).toBeInTheDocument()
    expect(screen.getByText('Every', { exact: false })).toBeInTheDocument()
  })

  test('renders each word as a separate span', () => {
    const quote = 'Build things that matter.'
    const { container } = render(<PullQuote quote={quote} />)
    const blockquote = container.querySelector('blockquote')
    expect(blockquote).toBeInTheDocument()
    const wordSpans = blockquote!.querySelectorAll('span')
    expect(wordSpans.length).toBe(quote.split(' ').length)
  })

  test('renders attribution when provided', () => {
    render(<PullQuote quote="Candid words." attribution="Wenceslaus Dsilva" />)
    expect(screen.getByText(/Wenceslaus Dsilva/)).toBeInTheDocument()
  })

  test('does not render attribution element when not provided', () => {
    const { container } = render(<PullQuote quote="Candid words." />)
    expect(container.querySelector('[data-attribution]')).toBeNull()
  })

  test('renders decorative quote mark', () => {
    const { container } = render(<PullQuote quote="Impact." />)
    const quoteMark = container.querySelector('[aria-hidden="true"]')
    expect(quoteMark).toBeInTheDocument()
  })

  test('renders left accent line element', () => {
    const { container } = render(<PullQuote quote="Impact." />)
    const line = container.querySelector('[data-accent-line]')
    expect(line).toBeInTheDocument()
  })

  test('applies custom className to container', () => {
    const { container } = render(<PullQuote quote="Impact." className="my-custom-class" />)
    expect(container.firstChild).toHaveClass('my-custom-class')
  })
})
