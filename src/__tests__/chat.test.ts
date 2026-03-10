import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Hello world' }],
      }),
    },
  })),
}))

// Mock Next.js request/response for route handler testing
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
  })

  it('returns 200 with a streaming response for valid messages', async () => {
    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'Hello' }] }))
    expect(res.status).toBe(200)
    expect(res.body).not.toBeNull()
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
