import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { StrategyCallCTA } from '../components/StrategyCallCTA'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('react-calendly', () => ({
  PopupButton: ({ text, className }: { text: string; className?: string; url: string; rootElement: Element }) => (
    <button className={className}>{text}</button>
  ),
}))

vi.mock('../data/contact', () => ({
  contactConfig: {
    calendlyUrl: 'https://calendly.com/test',
    availabilityStatus: 'open',
    availabilityNote: 'Typically responds within 24 hours.',
  },
}))

describe('StrategyCallCTA', () => {
  it('renders the DIRECT ENGAGEMENT mono label', () => {
    render(<StrategyCallCTA />)
    expect(screen.getByText(/DIRECT ENGAGEMENT/i)).toBeInTheDocument()
  })

  it('renders the main heading in serif italic style', () => {
    render(<StrategyCallCTA />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading.className).toMatch(/font-serif/)
    expect(heading.className).toMatch(/italic/)
  })

  it('renders the AVAILABILITY label', () => {
    render(<StrategyCallCTA />)
    expect(screen.getByText(/AVAILABILITY/i)).toBeInTheDocument()
  })

  it('renders open to conversations status', () => {
    render(<StrategyCallCTA />)
    expect(screen.getByText(/Open to conversations/i)).toBeInTheDocument()
  })

  it('renders the availability note text', () => {
    render(<StrategyCallCTA />)
    const notes = screen.getAllByText(/Typically responds within 24 hours/i)
    expect(notes.length).toBeGreaterThan(0)
  })

  it('renders the Book a Strategy Call button when open', () => {
    render(<StrategyCallCTA />)
    expect(screen.getByRole('button', { name: /Book a Strategy Call/i })).toBeInTheDocument()
  })

  it('renders the "or scroll down to write" label', () => {
    render(<StrategyCallCTA />)
    expect(screen.getByText(/or scroll down to write/i)).toBeInTheDocument()
  })

  it('renders the outer glass container', () => {
    render(<StrategyCallCTA />)
    const container = screen.getByTestId('strategy-call-cta')
    expect(container.className).toMatch(/glass/)
    expect(container.className).toMatch(/rounded-\[2\.5rem\]/)
  })

  it('renders the right-column format and audience details', () => {
    render(<StrategyCallCTA />)
    expect(screen.getByText(/30-minute video call/i)).toBeInTheDocument()
    expect(screen.getByText(/CEOs, boards/i)).toBeInTheDocument()
  })
})
