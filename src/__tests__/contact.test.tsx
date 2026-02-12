import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../components/ContactForm'
import SocialLinks from '../components/SocialLinks'
import { expect, it, describe, vi } from 'vitest'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Axis/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Structural Details/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Establish Connection/i })).toBeInTheDocument()
  })

  it('updates field values on change', () => {
    render(<ContactForm />)
    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })
    expect(nameInput.value).toBe('Jane Doe')
  })

  it('shows success message after submission', async () => {
    render(<ContactForm />)
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByLabelText(/Email Axis/i), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText(/Structural Details/i), { target: { value: 'Project scope...' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Establish Connection/i }))
    
    expect(screen.getByText(/Transmitting.../i)).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText(/Transmission Received/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})

describe('SocialLinks Component', () => {
  it('renders social media links', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/GitHub/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
  })

  it('has correct href attributes', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText(/LinkedIn/i)).toHaveAttribute('href', 'https://linkedin.com/in/wenceslaus-dsilva')
    expect(screen.getByLabelText(/GitHub/i)).toHaveAttribute('href', 'https://github.com/deadmantfa')
  })
})
