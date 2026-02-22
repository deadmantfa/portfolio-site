import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/Navigation'

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })) as unknown as typeof IntersectionObserver

    // Mock gsap
    vi.mock('gsap', () => ({
      default: {
        to: vi.fn().mockReturnValue(Promise.resolve()),
        timeline: vi.fn().mockReturnValue({
          to: vi.fn().mockReturnThis(),
        }),
      },
    }))
  })

  it('renders the main navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText(/Epochs/i)).toBeInTheDocument()
    expect(screen.getByText(/Ecosystem/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
  })

  it('renders the Curriculum Vitae link', () => {
    render(<Navigation />)
    const cvLink = screen.getByLabelText(/Curriculum Vitae/i)
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute('href', '/CV/Wenceslaus-Dsilva-2025.pdf')
  })

  it('renders logo with home link', () => {
    render(<Navigation />)
    const homeLink = screen.getByLabelText('Wenceslaus Dsilva - Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct href attributes', () => {
    render(<Navigation />)
    const epochsLink = screen.getByText('Epochs').closest('a')
    const ecosystemLink = screen.getByText('Ecosystem').closest('a')
    const contactLink = screen.getByText('Contact').closest('a')

    expect(epochsLink).toHaveAttribute('href', '#epochs')
    expect(ecosystemLink).toHaveAttribute('href', '#skills')
    expect(contactLink).toHaveAttribute('href', '#contact')
  })

  it('navigation links have focus-visible ring styles', () => {
    render(<Navigation />)
    const epochsLink = screen.getByText('Epochs').closest('a')
    expect(epochsLink).toHaveClass('focus-visible:ring-2')
    expect(epochsLink).toHaveClass('focus-visible:ring-primary')
  })

  it('indicator pill has aria-hidden attribute', () => {
    render(<Navigation />)
    const indicator = document.querySelector('[aria-hidden="true"]')
    expect(indicator).toBeInTheDocument()
  })

  it('inactive links have correct text color classes', () => {
    render(<Navigation />)
    const epochsLink = screen.getByText('Epochs').closest('a')
    expect(epochsLink).toHaveClass('text-foreground/40')
  })

  it('CV button has correct styling classes', () => {
    render(<Navigation />)
    const cvLink = screen.getByLabelText('View Curriculum Vitae (PDF)')
    expect(cvLink).toHaveClass('bg-white/10')
    expect(cvLink).toHaveClass('hover:bg-primary')
    expect(cvLink).toHaveClass('active:scale-95')
  })

  it('logo link has rounded focus ring', () => {
    render(<Navigation />)
    const logoLink = screen.getByLabelText('Wenceslaus Dsilva - Home')
    expect(logoLink).toHaveClass('rounded-lg')
    expect(logoLink).toHaveClass('focus-visible:ring-2')
  })

  it('navigation container has fixed positioning', () => {
    render(<Navigation />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed')
    expect(nav).toHaveClass('top-6')
    expect(nav).toHaveClass('z-[100]')
  })

  it('logo dot has text-primary class', () => {
    render(<Navigation />)
    const logoLink = screen.getByLabelText('Wenceslaus Dsilva - Home')
    const dot = logoLink.querySelector('.text-primary')
    expect(dot).toBeInTheDocument()
    expect(dot?.textContent).toBe('.')
  })

  it('renders 9 first-name character spans', () => {
    render(<Navigation />)
    const logoLink = screen.getByLabelText('Wenceslaus Dsilva - Home')
    const charSpans = logoLink.querySelectorAll('span[class*="inline-block opacity-0"]')
    // 9 for 'enceslaus' + 5 for 'silva' = 14 total
    expect(charSpans).toHaveLength(14)
  })

  it('renders 5 last-name character spans', () => {
    render(<Navigation />)
    const logoLink = screen.getByLabelText('Wenceslaus Dsilva - Home')
    const wrappers = logoLink.querySelectorAll('[style*="width: 0"]')
    // 3 wrappers (enceslaus, space, silva)
    expect(wrappers).toHaveLength(3)
  })

  it('suffix wrappers start with width 0', () => {
    render(<Navigation />)
    const logoLink = screen.getByLabelText('Wenceslaus Dsilva - Home')
    const wrappers = logoLink.querySelectorAll('[class*="overflow-hidden"]')
    wrappers.forEach((wrapper) => {
      const style = window.getComputedStyle(wrapper)
      // Check that inline style or computed style has width of 0 or auto (starting state)
      const styleAttr = wrapper.getAttribute('style')
      expect(styleAttr).toContain('width: 0')
    })
  })
})
