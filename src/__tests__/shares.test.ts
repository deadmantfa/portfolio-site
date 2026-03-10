import { describe, it, expect } from 'vitest'
import { shares } from '../data/shares'
import type { ShareEntry } from '../data/shares'

describe('shares data', () => {
  it('has at least one entry', () => {
    expect(Object.keys(shares).length).toBeGreaterThan(0)
  })

  it('all entries have non-empty company names', () => {
    Object.values(shares).forEach((entry: ShareEntry) => {
      expect(entry.company).toBeTruthy()
      expect(entry.company.length).toBeGreaterThan(0)
    })
  })

  it('all entries have non-empty messages', () => {
    Object.values(shares).forEach((entry: ShareEntry) => {
      expect(entry.message).toBeTruthy()
      expect(entry.message.length).toBeGreaterThan(10)
    })
  })

  it('all entries have non-empty accentLabels', () => {
    Object.values(shares).forEach((entry: ShareEntry) => {
      expect(entry.accentLabel).toBeTruthy()
    })
  })

  it('all keys are lowercase slugs (no spaces or uppercase)', () => {
    Object.keys(shares).forEach((key) => {
      expect(key).toMatch(/^[a-z0-9-]+$/)
    })
  })
})
