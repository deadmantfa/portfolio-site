import { describe, it, expect } from 'vitest'
import { projects } from '../data/projects'

describe('Project Catalog Expansion Audit', () => {
  it('should contain the IndieFolio deep-dive with specific ADRs', () => {
    const project = projects.find(p => p.slug === 'indiefolio')
    expect(project).toBeDefined()
    expect(project?.company).toContain('IndieFolio')
    expect(project?.adrs.some(a => a.title.includes('Serverless Image'))).toBe(true)
    expect(project?.adrs.some(a => a.title.includes('Color Search'))).toBe(true)
  })

  it('should contain the ePaisa deep-dive with architectural focus', () => {
    const project = projects.find(p => p.slug === 'epaisa')
    expect(project).toBeDefined()
    expect(project?.adrs.some(a => a.title.includes('Voodle'))).toBe(true)
    expect(project?.adrs.some(a => a.title.includes('Dugna Security'))).toBe(true)
  })

  it('should reflect foundational automation at TCS/WNS', () => {
    const project = projects.find(p => p.slug === 'tcs-wns')
    expect(project).toBeDefined()
    expect(project?.techStack).toContain('Shell Scripting')
    expect(project?.highlights.some(h => h.label === 'Productivity')).toBe(true)
  })

  it('should include the CouponDunia modernization project', () => {
    const project = projects.find(p => p.slug === 'coupon-dunia')
    expect(project).toBeDefined()
    expect(project?.techStack).toContain('Yii')
    expect(project?.role).toBe('Sr. Web Developer')
  })
})
