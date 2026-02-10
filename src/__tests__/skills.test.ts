import { skillModules } from '../data/skills'
import { expect, it, describe } from 'vitest'

describe('Skill Data Structure', () => {
  it('contains correctly structured skill modules', () => {
    expect(skillModules.length).toBeGreaterThan(0)
    
    skillModules.forEach(skill => {
      expect(skill).toHaveProperty('name')
      expect(skill).toHaveProperty('category')
      expect(skill).toHaveProperty('importance')
      expect(skill.importance.length).toBeGreaterThan(10)
    })
  })

  it('contains essential skills from the 20-year career path', () => {
    const names = skillModules.map(s => s.name)
    expect(names).toContain('AWS')
    expect(names).toContain('Leadership')
    expect(names).toContain('Three.js')
  })
})
