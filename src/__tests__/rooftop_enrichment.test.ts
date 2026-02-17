import { projects } from '../data/projects'
import { expect, it, describe } from 'vitest'

describe('Rooftop Strategic Enrichment', () => {
  it('contains explicit AI/ML architectural details in Rooftop project', () => {
    const rooftop = projects.find(p => p.slug === 'rooftop')
    expect(rooftop).toBeDefined()
    
    // Check for AI ADR
    const aiAdr = rooftop?.adrs.find(adr => adr.title.toLowerCase().includes('ai'))
    expect(aiAdr).toBeDefined()
    expect(aiAdr?.solution.toLowerCase()).toContain('machine learning')
    
    // Check narrative for AI mentions
    expect(rooftop?.narrative.execution.toLowerCase()).toContain('ai')
    expect(rooftop?.narrative.result.toLowerCase()).toContain('personalization')
  })
})
