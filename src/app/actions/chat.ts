'use server'

import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/data/chatKnowledgeBase'

const MAX_MESSAGES = 10

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const sendChatMessage = async (messages: ChatMessage[]): Promise<ReadableStream<Uint8Array>> => {
  if (messages.length === 0) {
    throw new Error('At least one message is required')
  }

  if (messages.length > MAX_MESSAGES) {
    throw new Error('Session rate limit reached — please refresh to start a new conversation')
  }

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: buildSystemPrompt(),
    messages,
  })

  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(event.delta.text))
        }
      }
      controller.close()
    },
  })
}

export { sendChatMessage }
