import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/for/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended'],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/for/'],
      },
    ],
    sitemap: 'https://w1d.pro/sitemap.xml',
    host: 'https://w1d.pro',
  }
}
