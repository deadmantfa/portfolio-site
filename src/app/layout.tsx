import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import StructuredData from '@/components/StructuredData'
import ArchitecturalLoader from '@/components/ArchitecturalLoader'
import { ScrollProvider } from '@/components/ScrollProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

import { Suspense } from 'react'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://wenceslaus.pro'),
  title: {
    default: 'Wenceslaus Dsilva | Architectural Leadership & Technical Strategy',
    template: '%s | Wenceslaus Dsilva'
  },
  description: 'Wenceslaus Dsilva is a visionary CTO and Software Architect with 20+ years of experience in technical leadership, system design, and building scalable enterprise solutions.',
  keywords: ['CTO', 'Chief Technology Officer', 'Software Architect', 'Technical Leadership', 'System Design', 'Scalable Systems', 'Wenceslaus Dsilva', 'Cloud Architecture', 'Enterprise Software'],
  authors: [{ name: 'Wenceslaus Dsilva' }],
  creator: 'Wenceslaus Dsilva',
  alternates: {
    canonical: 'https://wenceslaus.pro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wenceslaus.pro',
    siteName: 'Wenceslaus Dsilva Portfolio',
    title: 'Wenceslaus Dsilva | Architectural Leadership',
    description: 'Bridging the gap between deep system design and strategic business alignment.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wenceslaus Dsilva | Architectural Leadership',
    description: '20+ years of technical excellence and strategic technical leadership.',
    creator: '@deadmantfa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <head>
        <Suspense fallback={null}>
          <StructuredData />
        </Suspense>
      </head>
      <body className="antialiased bg-black">
        <ScrollProvider>
          <ArchitecturalLoader />
          <Navigation />
          {children}
        </ScrollProvider>
      </body>
    </html>
  )
}
