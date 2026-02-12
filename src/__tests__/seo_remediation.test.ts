import { describe, it, expect, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: 'var-inter' }),
  Cormorant_Garamond: () => ({ variable: 'var-cormorant' }),
  JetBrains_Mono: () => ({ variable: 'var-jetbrains' }),
}))

import { metadata } from '../app/layout'

describe('Global Metadata Configuration', () => {
  it('should have a comprehensive title and description', () => {
    const title = typeof metadata.title === 'string' ? metadata.title : (metadata.title as any).default
    expect(title).toContain('Wenceslaus Dsilva')
    expect(metadata.description).toBeDefined()
    expect(metadata.description?.length).toBeGreaterThan(50)
  })

  it('should include target keywords', () => {
    // @ts-ignore - keywords is part of Metadata but might not be in the initial thin version
    expect(metadata.keywords).toContain('CTO')
    // @ts-ignore
    expect(metadata.keywords).toContain('Software Architect')
  })

  it('should have OpenGraph configuration', () => {
    expect(metadata.openGraph).toBeDefined()
    expect(metadata.openGraph?.type).toBe('website')
    expect(metadata.openGraph?.siteName).toContain('Wenceslaus Dsilva')
  })

  it('should have Twitter configuration', () => {
    expect(metadata.twitter).toBeDefined()
    expect(metadata.twitter?.card).toBe('summary_large_image')
  })

  it('should define a canonical URL base', () => {
    expect(metadata.metadataBase).toBeDefined()
    expect(metadata.metadataBase?.toString()).toContain('wenceslaus.pro')
  })
})
