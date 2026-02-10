import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Wenceslaus Dsilva | Architectural Leadership',
  description: '20+ years of pioneering technical excellence and strategic leadership.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-black">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
