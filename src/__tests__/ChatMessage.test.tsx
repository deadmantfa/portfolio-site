import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ChatMessage } from '../components/ChatMessage'

describe('ChatMessage', () => {
  it('renders message content', () => {
    render(<ChatMessage role="assistant" content="Hello there" isStreaming={false} />)
    expect(screen.getByText('Hello there')).toBeInTheDocument()
  })

  it('AI variant is left-aligned with glass bubble', () => {
    render(<ChatMessage role="assistant" content="AI response" isStreaming={false} />)
    const bubble = screen.getByTestId('chat-bubble')
    expect(bubble.className).toMatch(/glass/)
    expect(bubble.className).not.toMatch(/ml-auto/)
  })

  it('user variant is right-aligned with primary styling', () => {
    render(<ChatMessage role="user" content="User message" isStreaming={false} />)
    const bubble = screen.getByTestId('chat-bubble')
    expect(bubble.className).toMatch(/ml-auto/)
    expect(bubble.className).toMatch(/bg-primary/)
  })

  it('renders streaming cursor when isStreaming is true', () => {
    render(<ChatMessage role="assistant" content="Typing..." isStreaming={true} />)
    expect(screen.getByTestId('streaming-cursor')).toBeInTheDocument()
  })

  it('does not render streaming cursor when isStreaming is false', () => {
    render(<ChatMessage role="assistant" content="Done" isStreaming={false} />)
    expect(screen.queryByTestId('streaming-cursor')).not.toBeInTheDocument()
  })
})
