import { skillModules } from '../data/skills'
import { expect, it, describe } from 'vitest'

describe('Skills Expansion (Leadership & AI)', () => {
  it('contains AI Strategy module', () => {
    const ai = skillModules.find(s => s.name === 'AI Strategy')
    expect(ai).toBeDefined()
    expect(ai?.category).toBe('leadership')
  })

  it('contains Design Thinking module', () => {
    const design = skillModules.find(s => s.name === 'Design Thinking')
    expect(design).toBeDefined()
    expect(design?.category).toBe('leadership')
  })

  it('contains Team Building module', () => {
    const team = skillModules.find(s => s.name === 'Team Building')
    expect(team).toBeDefined()
    expect(team?.category).toBe('leadership')
  })

  it('contains Critical Thinking module', () => {
    const critical = skillModules.find(s => s.name === 'Critical Thinking')
    expect(critical).toBeDefined()
    expect(critical?.category).toBe('leadership')
  })
})
