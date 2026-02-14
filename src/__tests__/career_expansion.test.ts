import { careerData } from '../data/career'
import { expect, it, describe } from 'vitest'

describe('Career Data Expansion (2006-2012)', () => {
  it('contains the MADAR International School milestone (2009-2012)', () => {
    const madar = careerData.find(m => m.company === 'MADAR International School')
    expect(madar).toBeDefined()
    expect(madar?.year).toBe('2009 - 2012')
    expect(madar?.role).toBe('Computer Programmer')
  })

  it('contains the TCS milestone (2008-2009)', () => {
    const tcs = careerData.find(m => m.company === 'Tata Consultancy Services')
    expect(tcs).toBeDefined()
    expect(tcs?.year).toBe('2008 - 2009')
    expect(tcs?.role).toBe('Analyst Programmer')
  })

  it('contains the WNS milestones (2006-2008)', () => {
    const wnsAnalyst = careerData.find(m => m.company === 'WNS' && m.role === 'Analyst Programmer')
    const wnsJunior = careerData.find(m => m.company === 'WNS' && m.role === 'Junior Analyst')
    
    expect(wnsAnalyst).toBeDefined()
    expect(wnsJunior).toBeDefined()
  })

  it('verifies updated highlights for Rooftop (90% satisfaction)', () => {
    const rooftop = careerData.find(m => m.company === 'Rooftop')
    expect(rooftop?.highlights).toContain('Boosting customer satisfaction rates by 90%')
  })
})
