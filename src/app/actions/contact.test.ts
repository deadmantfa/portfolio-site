import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendEmail } from './contact'
import { Resend } from 'resend'

// Mock Resend
let mockResendInstance: any

vi.mock('resend', () => {
  const mockSend = vi.fn()
  const mockInstance = {
    emails: {
      send: mockSend
    }
  }
  return {
    Resend: vi.fn().mockImplementation(() => mockInstance)
  }
})

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockResendInstance = new Resend('test-key')
  })

  it('should return error if fields are missing', async () => {
    const result = await sendEmail({ name: '', email: '', message: '' })
    expect(result.error).toBe('All fields are required.')
  })

  it('should return error if email is invalid', async () => {
    const result = await sendEmail({ name: 'Test', email: 'invalid-email', message: 'Hello' })
    expect(result.error).toBe('Invalid email address.')
  })

  it('should return success if everything is correct', async () => {
    mockResendInstance.emails.send.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    
    const result = await sendEmail({ 
      name: 'John Doe', 
      email: 'john@example.com', 
      message: 'Excellent portfolio.' 
    })

    expect(result.success).toBe(true)
  })

  it('should return error if Resend fails', async () => {
    mockResendInstance.emails.send.mockResolvedValue({ data: null, error: { message: 'API Error' } })
    
    const result = await sendEmail({ 
      name: 'John Doe', 
      email: 'john@example.com', 
      message: 'Hello' 
    })

    expect(result.error).toBe('Failed to send message. Please try again later.')
  })
})
