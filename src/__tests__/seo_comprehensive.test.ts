import { describe, it, expect, vi } from 'vitest'
import fs from 'fs'
import path from 'path'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import manifest from '@/app/manifest'
import { metadata as forCompanyMetadata } from '@/app/for/[company]/page'
import { generateMetadata as generateProjectMetadata } from '@/app/work/[slug]/page'
import { metadata as aboutMetadata } from '@/app/about/page'
import { metadata as contactMetadata } from '@/app/contact/page'
import { metadata as rootMetadata } from '@/app/layout'

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Archivo: () => ({ variable: '--font-serif', className: 'archivo' }),
  Space_Grotesk: () => ({ variable: '--font-sans', className: 'space' }),
  JetBrains_Mono: () => ({ variable: '--font-mono', className: 'jetbrains' }),
}))

describe('Comprehensive SEO & Crawl Hygiene Suite', () => {
  describe('Technical Assets & Favicon', () => {
    it('should have public/favicon.ico with valid content', () => {
      const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico')
      expect(fs.existsSync(faviconPath)).toBe(true)
      const stats = fs.statSync(faviconPath)
      expect(stats.size).toBeGreaterThan(100)
    })

    it('should provide a valid PWA web manifest', () => {
      const manifestData = manifest()
      expect(manifestData.name).toContain('Wenceslaus Dsilva')
      expect(manifestData.short_name).toBe('W. Dsilva')
      expect(manifestData.start_url).toBe('/')
      expect(manifestData.display).toBe('standalone')
      expect(manifestData.background_color).toBe('#000000')
      expect(manifestData.theme_color).toBe('#000000')
      expect(manifestData.icons?.length).toBeGreaterThanOrEqual(2)
    })

    it('should have llms.txt and llms-full.txt in public directory', () => {
      const llmsPath = path.join(process.cwd(), 'public', 'llms.txt')
      const llmsFullPath = path.join(process.cwd(), 'public', 'llms-full.txt')
      
      expect(fs.existsSync(llmsPath)).toBe(true)
      expect(fs.existsSync(llmsFullPath)).toBe(true)

      const llmsContent = fs.readFileSync(llmsPath, 'utf-8')
      expect(llmsContent).toContain('Wenceslaus Dsilva')
      expect(llmsContent).toContain('https://w1d.pro')

      const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf-8')
      expect(llmsFullContent).toContain('Architectural Decision Records')
      expect(llmsFullContent).toContain('Rooftop')
    })
  })

  describe('Robots.txt & Sitemap Hygiene', () => {
    it('should disallow /api/ and /for/ for default user-agents', () => {
      const robotsConfig = robots()
      expect(robotsConfig.rules).toBeDefined()
      
      const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules]
      const defaultRule = rules.find(r => r.userAgent === '*')
      expect(defaultRule).toBeDefined()
      expect(defaultRule?.disallow).toContain('/api/')
      expect(defaultRule?.disallow).toContain('/for/')
    })

    it('should explicitly accommodate AI search bots in robots.txt', () => {
      const robotsConfig = robots()
      const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules]
      const aiRule = rules.find(r => Array.isArray(r.userAgent) && r.userAgent.includes('GPTBot'))
      
      expect(aiRule).toBeDefined()
      expect(aiRule?.allow).toContain('/llms.txt')
      expect(aiRule?.allow).toContain('/llms-full.txt')
      expect(aiRule?.disallow).toContain('/for/')
    })

    it('should produce a complete sitemap including home, subpages, and all 7 case studies', () => {
      const sitemapEntries = sitemap()
      const urls = sitemapEntries.map(e => e.url)

      expect(urls).toContain('https://w1d.pro')
      expect(urls).toContain('https://w1d.pro/about')
      expect(urls).toContain('https://w1d.pro/contact')
      expect(urls).toContain('https://w1d.pro/privacy')
      expect(urls).toContain('https://w1d.pro/work/rooftop')
      expect(urls).toContain('https://w1d.pro/work/food-darzee')
      expect(urls).toContain('https://w1d.pro/work/onfees')
      expect(urls).toContain('https://w1d.pro/work/indiefolio')
      expect(urls).toContain('https://w1d.pro/work/epaisa')
      expect(urls).toContain('https://w1d.pro/work/tcs-wns')
      expect(urls).toContain('https://w1d.pro/work/coupon-dunia')
      expect(sitemapEntries.length).toBe(11)
    })
  })

  describe('Route Metadata & OpenGraph Consistency', () => {
    it('should protect /for/[company] with noindex', () => {
      expect(forCompanyMetadata.robots).toEqual({
        index: false,
        follow: false,
      })
    })

    it('should configure explicit og:url and twitter handle on case studies', async () => {
      const params = Promise.resolve({ slug: 'rooftop' })
      const meta = await generateProjectMetadata({ params })
      
      expect(meta.alternates?.canonical).toBe('https://w1d.pro/work/rooftop')
      expect(meta.openGraph?.url).toBe('https://w1d.pro/work/rooftop')
      expect(meta.twitter?.creator).toBe('@deadmantfa')
      expect((meta.twitter as any)?.site).toBe('@deadmantfa')
    })

    it('should define canonical alternates on about and contact pages', () => {
      expect(aboutMetadata.alternates?.canonical).toBe('https://w1d.pro/about')
      expect(contactMetadata.alternates?.canonical).toBe('https://w1d.pro/contact')
    })

    it('should have global metadataBase and proper title template', () => {
      expect(rootMetadata.metadataBase?.toString()).toBe('https://w1d.pro/')
      expect(rootMetadata.title).toHaveProperty('template')
    })
  })
})
