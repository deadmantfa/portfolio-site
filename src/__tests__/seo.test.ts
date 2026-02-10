import { generateMetadata } from '../app/work/[slug]/page'
import { expect, it, describe } from 'vitest'

describe('SEO Metadata', () => {
  it('generates correct metadata for a project', async () => {
    const params = Promise.resolve({ slug: 'rooftop' })
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toContain('Rooftop')
    expect(metadata.description).toContain('technology strategy')
  })
})
