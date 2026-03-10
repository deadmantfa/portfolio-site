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

const userFacingError = (err: unknown): string => {
  const message = err instanceof Error ? err.message : String(err)
  if (message.includes('credit balance')) {
    return 'The AI assistant is temporarily unavailable. Please try again later.'
  }
  if (message.includes('rate limit') || message.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.'
  }
  return 'Something went wrong. Please try again.'
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

  // Collect full response first to catch API errors before streaming begins
  let fullText = ''
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages,
      stream: false,
    })
    fullText = response.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('')
  } catch (err) {
    return new Response(userFacingError(err), { status: 503 })
  }

  // Stream the collected text back to the client
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(fullText))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}
