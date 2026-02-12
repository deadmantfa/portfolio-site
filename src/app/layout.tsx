import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import StructuredData from '@/components/StructuredData'
import ArchitecturalLoader from '@/components/ArchitecturalLoader'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://wenceslaus.pro'),
  title: {
    default: 'Wenceslaus Dsilva | Architectural Leadership & Technical Strategy',
    template: '%s | Wenceslaus Dsilva'
  },
  description: '20+ years of pioneering technical excellence and strategic leadership in Software Architecture and CTO roles.',
  keywords: ['CTO', 'Chief Technology Officer', 'Software Architect', 'Technical Leadership', 'System Design', 'Scalable Systems', 'Wenceslaus Dsilva'],
  authors: [{ name: 'Wenceslaus Dsilva' }],
  creator: 'Wenceslaus Dsilva',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wenceslaus.pro',
    siteName: 'Wenceslaus Dsilva Portfolio',
    title: 'Wenceslaus Dsilva | Architectural Leadership',
    description: 'Bridging the gap between deep system design and strategic business alignment.',
    images: [
      {
        url: '/og-image.png', // Placeholder for future asset
        width: 1200,
        height: 630,
        alt: 'Wenceslaus Dsilva - Architectural Authority'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wenceslaus Dsilva | Architectural Leadership',
    description: '20+ years of technical excellence and strategic strategy.',
    creator: '@deadmantfa',
    images: ['/og-image.png']
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
        <StructuredData />
      </head>
      <body className="antialiased bg-black">
        <ArchitecturalLoader />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
