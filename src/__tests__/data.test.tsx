import { careerData } from '../data/career'
import { expect, it, describe } from 'vitest'

describe('Career Data', () => {
  it('has a valid structure and chronological order', () => {
    expect(careerData.length).toBeGreaterThan(0)
    expect(careerData[0]).toHaveProperty('year')
    expect(careerData[0]).toHaveProperty('role')
    expect(careerData[0]).toHaveProperty('company')
  })

  it('contains specific key roles from CV', () => {
    const roles = careerData.map(item => item.role)
    expect(roles).toContain('Chief Technology Officer')
    expect(roles).toContain('Sr. Web Developer')
  })
})