import { describe, it, expect } from 'vitest'
import { buildSystemPrompt, STARTER_QUESTIONS } from '../data/chatKnowledgeBase'
import { projects } from '../data/projects'
import { careerData } from '../data/career'
import { skillModules } from '../data/skills'

describe('buildSystemPrompt', () => {
  it('returns a non-empty string', () => {
    const prompt = buildSystemPrompt()
    expect(typeof prompt).toBe('string')
    expect(prompt.length).toBeGreaterThan(100)
  })

  it('includes all project titles', () => {
    const prompt = buildSystemPrompt()
    projects.forEach((project) => {
      expect(prompt).toContain(project.title)
    })
  })

  it('includes all career company names', () => {
    const prompt = buildSystemPrompt()
    careerData.forEach((milestone) => {
      expect(prompt).toContain(milestone.company)
    })
  })

  it('includes all skill names', () => {
    const prompt = buildSystemPrompt()
    skillModules.forEach((skill) => {
      expect(prompt).toContain(skill.name)
    })
  })

  it('includes Wenceslaus name and CTO context', () => {
    const prompt = buildSystemPrompt()
    expect(prompt).toContain('Wenceslaus')
    expect(prompt.toLowerCase()).toContain('cto')
  })
})

describe('STARTER_QUESTIONS', () => {
  it('has exactly 3 questions', () => {
    expect(STARTER_QUESTIONS).toHaveLength(3)
  })

  it('all questions are non-empty strings', () => {
    STARTER_QUESTIONS.forEach((q) => {
      expect(typeof q).toBe('string')
      expect(q.length).toBeGreaterThan(5)
    })
  })
})
