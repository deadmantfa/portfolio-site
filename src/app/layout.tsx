import type { Metadata, Viewport } from 'next'
import { Archivo, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { StructuredData } from '@/components/StructuredData'
import ArchitecturalLoader from '@/components/ArchitecturalLoader'
import { ScrollProvider } from '@/components/ScrollProvider'
import { ArchitecturalScroll } from '@/components/ArchitecturalScroll'
import { AskWenceslaus } from '@/components/AskWenceslaus'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})


export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://w1d.pro'),
  title: {
    default: 'Wenceslaus Dsilva | CTO & Technical Architect',
    template: '%s | Wenceslaus Dsilva'
  },
  description: 'Visionary CTO with 20+ years driving technical excellence at scale. Architectural leadership in serverless, cloud, and enterprise systems.',
  keywords: ['CTO', 'Chief Technology Officer', 'Software Architect', 'Technical Leadership', 'System Design', 'Scalable Systems', 'Wenceslaus Dsilva', 'Cloud Architecture', 'Enterprise Software'],
  authors: [{ name: 'Wenceslaus Dsilva' }],
  creator: 'Wenceslaus Dsilva',
  alternates: {
    canonical: 'https://w1d.pro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://w1d.pro',
    siteName: 'Wenceslaus Dsilva Portfolio',
    title: 'Wenceslaus Dsilva | CTO & Technical Architect',
    description: 'Wenceslaus Dsilva is a CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud infrastructure, and high-scale product engineering. Open to senior technology leadership roles.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wenceslaus Dsilva | CTO & Technical Architect',
    description: 'CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud infrastructure, and high-scale product engineering.',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${archivo.variable} ${jetbrains.variable}`}>
      <head />
      <body className="antialiased bg-black">
        <StructuredData />
        <ScrollProvider>
          <Navigation />
          <ArchitecturalScroll />
          {children}
          <AskWenceslaus />
        </ScrollProvider>
      </body>
    </html>
  )
}
