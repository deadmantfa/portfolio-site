import { describe, it, expect } from 'vitest'
import {
  CATEGORY_CONFIG,
  type CategoryKey,
  distributeSkillsOnRing,
} from '@/utils/orbital'
import { skillModules } from '@/data/skills'

describe('orbital utilities', () => {
  describe('CATEGORY_CONFIG', () => {
    it('should have all four categories', () => {
      const categories: CategoryKey[] = [
        'leadership',
        'frontend',
        'backend',
        'infrastructure',
      ]
      categories.forEach((cat) => {
        expect(CATEGORY_CONFIG[cat]).toBeDefined()
        expect(CATEGORY_CONFIG[cat].radius).toBeGreaterThan(0)
        expect(CATEGORY_CONFIG[cat].color).toMatch(/^#[0-9a-f]{6}$/i)
        expect(CATEGORY_CONFIG[cat].rotationSpeed).toBeDefined()
      })
    })

    it('should have increasing radius per ring', () => {
      expect(CATEGORY_CONFIG.leadership.radius).toBeLessThan(
        CATEGORY_CONFIG.frontend.radius,
      )
      expect(CATEGORY_CONFIG.frontend.radius).toBeLessThan(
        CATEGORY_CONFIG.backend.radius,
      )
      expect(CATEGORY_CONFIG.backend.radius).toBeLessThan(
        CATEGORY_CONFIG.infrastructure.radius,
      )
    })
  })

  describe('distributeSkillsOnRing', () => {
    const testSkills = skillModules.slice(0, 5)

    it('should distribute ≤12 skills on single ring at baseRadius', () => {
      const nodes = distributeSkillsOnRing(testSkills, 3.5)

      expect(nodes).toHaveLength(5)
      nodes.forEach((node) => {
        expect(node.radius).toBe(3.5)
        expect(node.angle).toBeGreaterThanOrEqual(0)
        expect(node.angle).toBeLessThan(Math.PI * 2)
      })
    })

    it('should distribute skills evenly around the ring', () => {
      const nodes = distributeSkillsOnRing(testSkills, 3.5)

      const expectedAngleGap = (Math.PI * 2) / testSkills.length
      for (let i = 1; i < nodes.length; i++) {
        const angleDiff = nodes[i].angle - nodes[i - 1].angle
        expect(angleDiff).toBeCloseTo(expectedAngleGap, 3)
      }
    })

    it('should split >12 skills into two concentric rings', () => {
      const manySkills = skillModules.slice(0, 15)
      const nodes = distributeSkillsOnRing(manySkills, 5.0)

      expect(nodes).toHaveLength(15)

      const innerNodes = nodes.filter((n) => n.radius === 5.0 - 0.8)
      const outerNodes = nodes.filter((n) => n.radius === 5.0 + 0.8)

      expect(innerNodes.length + outerNodes.length).toBe(15)
      expect(innerNodes.length).toBeGreaterThan(0)
      expect(outerNodes.length).toBeGreaterThan(0)
    })

    it('should map skills to distributed nodes in order', () => {
      const nodes = distributeSkillsOnRing(testSkills, 3.5)

      testSkills.forEach((skill, i) => {
        expect(nodes[i].skill).toEqual(skill)
      })
    })
  })
})
