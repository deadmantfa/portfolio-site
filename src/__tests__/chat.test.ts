import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockAnthropicCreate = vi.fn()
const mockGeminiSendMessage = vi.fn()
const mockStartChat = vi.fn(() => ({ sendMessage: mockGeminiSendMessage }))
const mockGetGenerativeModel = vi.fn(() => ({ startChat: mockStartChat }))

vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: { create: mockAnthropicCreate },
  })),
}))

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: mockGetGenerativeModel,
  })),
}))

import { POST } from '../app/api/chat/route'

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAnthropicCreate.mockResolvedValue({
      content: [{ type: 'text', text: 'Hello from Claude' }],
    })
    mockGeminiSendMessage.mockResolvedValue({
      response: { text: () => 'Hello from Gemini' },
    })
  })

  it('returns 200 with Anthropic response when available', async () => {
    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'Hello' }] }))
    expect(res.status).toBe(200)
    expect(res.headers.get('X-AI-Provider')).toBe('anthropic')
    const text = await res.text()
    expect(text).toBe('Hello from Claude')
  })

  it('falls back to Gemini when Anthropic fails', async () => {
    mockAnthropicCreate.mockRejectedValue(new Error('credit balance is too low'))
    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'Hello' }] }))
    expect(res.status).toBe(200)
    expect(res.headers.get('X-AI-Provider')).toBe('gemini')
    const text = await res.text()
    expect(text).toBe('Hello from Gemini')
  })

  it('returns 503 when both providers fail', async () => {
    mockAnthropicCreate.mockRejectedValue(new Error('credit balance is too low'))
    mockGeminiSendMessage.mockRejectedValue(new Error('Gemini unavailable'))
    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'Hello' }] }))
    expect(res.status).toBe(503)
  })

  it('returns 429 when messages array exceeds 10', async () => {
    const messages = Array.from({ length: 11 }, (_, i) => ({ role: 'user', content: `Msg ${i}` }))
    const res = await POST(makeRequest({ messages }))
    expect(res.status).toBe(429)
  })

  it('accepts exactly 10 messages without error', async () => {
    const messages = Array.from({ length: 10 }, (_, i) => ({ role: 'user', content: `Msg ${i}` }))
    const res = await POST(makeRequest({ messages }))
    expect(res.status).toBe(200)
  })

  it('returns 400 for empty messages array', async () => {
    const res = await POST(makeRequest({ messages: [] }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
