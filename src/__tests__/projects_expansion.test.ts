import { describe, it, expect } from 'vitest'
import { projects } from '../data/projects'

describe('Project Data Structure Expansion', () => {
  it('should have detailed narrative fields for each project', () => {
    projects.forEach(project => {
      expect(project.narrative).toBeDefined()
      expect(typeof project.narrative.vision).toBe('string')
      expect(typeof project.narrative.execution).toBe('string')
    })
  })

  it('should have richer ADRs with problem, solution, and impact', () => {
    projects.forEach(project => {
      project.adrs.forEach(adr => {
        expect(adr.problem).toBeDefined()
        expect(adr.solution).toBeDefined()
        expect(adr.impact).toBeDefined()
      })
    })
  })

  it('should have blueprint metadata for 3D visualization', () => {
    projects.forEach(project => {
      expect(project.blueprint).toBeDefined()
      expect(project.blueprint.type).toMatch(/monolith|microservices|serverless|hub-and-spoke/)
    })
  })
})
