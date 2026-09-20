import { describe, it, expect } from 'vitest'
import { contactConfig } from '../data/contact'

describe('contactConfig', () => {
  it('has a non-empty calLink', () => {
    expect(contactConfig.calLink).toBeTruthy()
    expect(contactConfig.calLink.length).toBeGreaterThan(0)
  })

  it('has a valid availabilityStatus', () => {
    expect(['open', 'closed']).toContain(contactConfig.availabilityStatus)
  })

  it('has a non-empty availabilityNote', () => {
    expect(contactConfig.availabilityNote).toBeTruthy()
    expect(contactConfig.availabilityNote.length).toBeGreaterThan(0)
  })
})
