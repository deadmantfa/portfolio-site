import { describe, it, expect, vi } from 'vitest'
import { generateStaticParams } from '../app/for/[company]/page'
import { shares } from '../data/shares'

// generateStaticParams is a pure function — test without rendering
describe('ForCompanyPage — generateStaticParams', () => {
  it('returns a param object for every key in shares', () => {
    const params = generateStaticParams()
    const shareKeys = Object.keys(shares)
    expect(params).toHaveLength(shareKeys.length)
    shareKeys.forEach((key) => {
      expect(params).toContainEqual({ company: key })
    })
  })

  it('all returned params have a company string', () => {
    const params = generateStaticParams()
    params.forEach((p) => {
      expect(typeof p.company).toBe('string')
      expect(p.company.length).toBeGreaterThan(0)
    })
  })
})
