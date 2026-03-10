import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the Anthropic SDK before importing the action
vi.mock('@anthropic-ai/sdk', () => {
  const mockStream = {
    async *[Symbol.asyncIterator]() {
      yield { type: 'content_block_delta', delta: { type: 'text_delta', text: 'Hello' } }
      yield { type: 'content_block_delta', delta: { type: 'text_delta', text: ' world' } }
    },
    finalMessage: vi.fn().mockResolvedValue({ content: [{ text: 'Hello world' }] }),
  }

  return {
    default: vi.fn().mockImplementation(() => ({
      messages: {
        stream: vi.fn().mockReturnValue(mockStream),
      },
    })),
  }
})

import { sendChatMessage } from '../app/actions/chat'

describe('sendChatMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a ReadableStream for valid messages', async () => {
    const result = await sendChatMessage([
      { role: 'user', content: 'Hello' },
    ])
    expect(result).toBeInstanceOf(ReadableStream)
  })

  it('throws when messages array exceeds 10', async () => {
    const messages = Array.from({ length: 11 }, (_, i) => ({
      role: 'user' as const,
      content: `Message ${i}`,
    }))
    await expect(sendChatMessage(messages)).rejects.toThrow('rate limit')
  })

  it('accepts exactly 10 messages without throwing', async () => {
    const messages = Array.from({ length: 10 }, (_, i) => ({
      role: 'user' as const,
      content: `Message ${i}`,
    }))
    const result = await sendChatMessage(messages)
    expect(result).toBeInstanceOf(ReadableStream)
  })

  it('throws for empty messages array', async () => {
    await expect(sendChatMessage([])).rejects.toThrow()
  })
})
