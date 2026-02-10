import { projects } from '@/data/projects'
import { generateStaticParams } from '../app/work/[slug]/page'
import { expect, it, describe, vi } from 'vitest'

describe('Dynamic Work Routes', () => {
  it('generateStaticParams returns all project slugs', async () => {
    const params = await generateStaticParams()
    expect(params.length).toBe(projects.length)
    expect(params).toContainEqual({ slug: 'rooftop' })
  })
})