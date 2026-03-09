import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://w1d.pro'

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date('2026-03-10'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    ...projectRoutes,
  ]
}
