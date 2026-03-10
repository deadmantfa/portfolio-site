import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
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
  if (message.includes('credit balance') || message.includes('billing')) {
    return 'The AI assistant is temporarily unavailable. Please try again later.'
  }
  if (message.includes('rate limit') || message.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.'
  }
  return 'Something went wrong. Please try again.'
}

const queryAnthropic = async (messages: ChatMessage[]): Promise<string> => {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: buildSystemPrompt(),
    messages,
    stream: false,
  })
  return response.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { type: 'text'; text: string }).text)
    .join('')
}

const queryGemini = async (messages: ChatMessage[]): Promise<string> => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: buildSystemPrompt(),
  })

  // Convert messages to Gemini format — Gemini uses 'model' instead of 'assistant'
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const lastMessage = messages[messages.length - 1]
  const chat = model.startChat({ history })
  const result = await chat.sendMessage(lastMessage.content)
  return result.response.text()
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

  let text = ''
  let provider = 'anthropic'

  // Try Anthropic first, fall back to Gemini
  try {
    text = await queryAnthropic(messages)
  } catch (anthropicErr) {
    console.warn('[chat] Anthropic failed, falling back to Gemini:', anthropicErr instanceof Error ? anthropicErr.message : anthropicErr)
    provider = 'gemini'
    try {
      text = await queryGemini(messages)
    } catch (geminiErr) {
      console.error('[chat] Both providers failed. Gemini error:', geminiErr instanceof Error ? geminiErr.message : geminiErr)
      return new Response(userFacingError(anthropicErr), { status: 503 })
    }
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-AI-Provider': provider,
    },
  })
}
