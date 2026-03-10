import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ShareOverlay } from '../components/ShareOverlay'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props}>{children}</h1>,
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockEntry = {
  company: 'Stripe',
  message: 'Wenceslaus built this specifically for your team.',
  accentLabel: 'TRANSMISSION INCOMING',
}

describe('ShareOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the accent label', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    expect(screen.getByText('TRANSMISSION INCOMING')).toBeInTheDocument()
  })

  it('renders "A message for" prefix text', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    expect(screen.getByText(/A message for/i)).toBeInTheDocument()
  })

  it('renders the company name as a heading', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stripe')
  })

  it('renders the personalized message', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    expect(screen.getByText(/Wenceslaus built this specifically/i)).toBeInTheDocument()
  })

  it('renders the Enter the Portfolio button', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Enter the Portfolio/i })).toBeInTheDocument()
  })

  it('calls onDismiss when Enter the Portfolio button is clicked', () => {
    const onDismiss = vi.fn()
    render(<ShareOverlay entry={mockEntry} onDismiss={onDismiss} />)
    fireEvent.click(screen.getByRole('button', { name: /Enter the Portfolio/i }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('calls onDismiss automatically after 8 seconds', () => {
    const onDismiss = vi.fn()
    render(<ShareOverlay entry={mockEntry} onDismiss={onDismiss} />)
    expect(onDismiss).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(8000)
    })
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not call onDismiss before 8 seconds', () => {
    const onDismiss = vi.fn()
    render(<ShareOverlay entry={mockEntry} onDismiss={onDismiss} />)
    act(() => {
      vi.advanceTimersByTime(7999)
    })
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('renders the progress bar element', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument()
  })

  it('has fixed inset-0 z-[200] positioning classes on backdrop', () => {
    render(<ShareOverlay entry={mockEntry} onDismiss={vi.fn()} />)
    const backdrop = screen.getByTestId('share-overlay')
    expect(backdrop.className).toMatch(/fixed/)
    expect(backdrop.className).toMatch(/inset-0/)
  })
})
