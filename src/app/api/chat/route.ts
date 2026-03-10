import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/data/chatKnowledgeBase'

const MAX_MESSAGES = 10

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
}

export async function POST(request: Request): Promise<Response> {
  let body: ChatRequest

  try {
    body = await request.json() as ChatRequest
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const { messages } = body

  if (!messages || messages.length === 0) {
    return new Response('At least one message is required', { status: 400 })
  }

  if (messages.length > MAX_MESSAGES) {
    return new Response('Session rate limit reached', { status: 429 })
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

  const readable = new ReadableStream({
    start: async (controller) => {
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

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    },
  })
}
