import { projects } from '../data/projects'
import { expect, it, describe } from 'vitest'

describe('Project Case Studies Data', () => {
  it('contains correctly structured project milestones', () => {
    expect(projects.length).toBeGreaterThan(0)
    
    projects.forEach(project => {
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('adrs')
      expect(project.adrs.length).toBeGreaterThan(0)
      expect(project.techStack.length).toBeGreaterThan(0)
    })
  })

  it('contains specific key projects', () => {
    const slugs = projects.map(p => p.slug)
    expect(slugs).toContain('rooftop')
    expect(slugs).toContain('food-darzee')
    expect(slugs).toContain('onfees')
  })
})
