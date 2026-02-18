import { describe, it, expect } from 'vitest'
import { skillModules } from '../data/skills'

describe('Skills Expansion Audit', () => {
  it('should contain microscopic technical skills from legacy and modern CV eras', () => {
    const skillNames = skillModules.map(s => s.name.toLowerCase())
    
    const requiredSkills = [
      'elasticsearch',
      'yii framework',
      'shell scripting',
      'laravel',
      'angular',
      'flutter',
      'pci dss',
      'websockets',
      'mysql',
      'node.js',
      'sagemaker'
    ]

    requiredSkills.forEach(skill => {
      expect(skillNames).toContain(skill)
    })
  })

  it('should have correct categories for newly added skills', () => {
    const elasticsearch = skillModules.find(s => s.name === 'Elasticsearch')
    expect(elasticsearch?.category).toBe('infrastructure')

    const laravel = skillModules.find(s => s.name === 'Laravel')
    expect(laravel?.category).toBe('backend')

    const angular = skillModules.find(s => s.name === 'Angular')
    expect(angular?.category).toBe('frontend')
  })
})
