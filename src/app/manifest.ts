import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wenceslaus Dsilva — CTO & Technical Architect',
    short_name: 'W. Dsilva',
    description:
      'Visionary CTO with 20+ years driving technical excellence at scale. Architectural leadership in serverless, cloud, and enterprise systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
