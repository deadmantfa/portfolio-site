import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AskWenceslaus } from '../components/AskWenceslaus'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockStream = new ReadableStream({
  start(controller) {
    controller.enqueue(new TextEncoder().encode('Hello, how can I help?'))
    controller.close()
  },
})

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
  body: mockStream,
} as unknown as Response)

vi.mock('../data/chatKnowledgeBase', () => ({
  STARTER_QUESTIONS: [
    "What's your approach?",
    'Tell me about a challenge.',
    'What does working together look like?',
  ],
}))

// Mock scrollIntoView (not available in jsdom)
window.HTMLElement.prototype.scrollIntoView = vi.fn()

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })

describe('AskWenceslaus', () => {
  beforeEach(() => {
    sessionStorageMock.clear()
  })

  it('renders the closed orb button', () => {
    render(<AskWenceslaus />)
    const button = screen.getByRole('button', { name: /Ask Wenceslaus/i })
    expect(button).toBeInTheDocument()
    expect(button.className).toMatch(/fixed/)
    expect(button.className).toMatch(/bottom/)
  })

  it('button has correct aria-label', () => {
    render(<AskWenceslaus />)
    expect(screen.getByRole('button', { name: 'Ask Wenceslaus' })).toBeInTheDocument()
  })

  it('panel is not visible initially', () => {
    render(<AskWenceslaus />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the panel when orb button is clicked', () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('panel has correct aria-label', () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    expect(screen.getByRole('dialog', { name: /Neural Interface/i })).toBeInTheDocument()
  })

  it('renders 3 starter question chips when panel opens', () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    expect(screen.getByText("What's your approach?")).toBeInTheDocument()
    expect(screen.getByText('Tell me about a challenge.')).toBeInTheDocument()
    expect(screen.getByText('What does working together look like?')).toBeInTheDocument()
  })

  it('closes the panel when close button is clicked', () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders input and send button in panel', () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument()
  })

  it('sends a message when a starter chip is clicked', async () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    fireEvent.click(screen.getByText("What's your approach?"))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({ method: 'POST' }))
    })
  })

  it('hides starter chips after first message is sent', async () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    fireEvent.click(screen.getByRole('button', { name: "What's your approach?" }))
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: "What's your approach?" })).not.toBeInTheDocument()
    })
  })

  it('increments sessionStorage counter on message sent', async () => {
    render(<AskWenceslaus />)
    fireEvent.click(screen.getByRole('button', { name: /Ask Wenceslaus/i }))
    fireEvent.click(screen.getByText("What's your approach?"))
    await waitFor(() => {
      expect(sessionStorage.getItem('ask_wenceslaus_count')).toBe('1')
    })
  })
})
