import { describe, it, expect } from 'vitest'
import { generateMetadata } from '../app/work/[slug]/page'

describe('Project Page SEO', () => {
  it('should generate rich metadata for a known project', async () => {
    const params = Promise.resolve({ slug: 'rooftop' })
    const metadata = await generateMetadata({ params })
    
    const title = typeof metadata.title === 'string' ? metadata.title : (metadata.title as any)?.absolute || (metadata.title as any)?.default
    expect(title).toContain('Rooftop')
    expect(metadata.description).toBeDefined()
    expect(metadata.description?.length).toBeGreaterThan(50)
    expect((metadata.openGraph as any)?.tags).toContain('AWS')
  })

  it('should return empty object for unknown project', async () => {
    const params = Promise.resolve({ slug: 'unknown-project' })
    const metadata = await generateMetadata({ params })
    
    expect(metadata).toEqual({})
  })
})
