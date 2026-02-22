import { type SkillModule } from '@/data/skills'

export const CATEGORY_CONFIG = {
  leadership: { radius: 12.0, color: '#ec4899', rotationSpeed: 0.06 },
  frontend: { radius: 18.0, color: '#6366f1', rotationSpeed: -0.04 },
  backend: { radius: 24.0, color: '#f59e0b', rotationSpeed: 0.05 },
  infrastructure: { radius: 30.0, color: '#10b981', rotationSpeed: -0.035 },
} as const

export type CategoryKey = keyof typeof CATEGORY_CONFIG

const MAX_PER_RING = 12

export interface DistributedNode {
  skill: SkillModule
  radius: number
  angle: number
}

export function distributeSkillsOnRing(
  skills: SkillModule[],
  baseRadius: number,
): DistributedNode[] {
  if (skills.length <= MAX_PER_RING) {
    return skills.map((skill, i) => ({
      skill,
      radius: baseRadius,
      angle: (i / skills.length) * Math.PI * 2,
    }))
  }

  const half = Math.ceil(skills.length / 2)
  const inner = skills.slice(0, half)
  const outer = skills.slice(half)

  return [
    ...inner.map((skill, i) => ({
      skill,
      radius: baseRadius - 0.8,
      angle: (i / inner.length) * Math.PI * 2,
    })),
    ...outer.map((skill, i) => ({
      skill,
      radius: baseRadius + 0.8,
      angle: (i / outer.length) * Math.PI * 2 + Math.PI / outer.length,
    })),
  ]
}
