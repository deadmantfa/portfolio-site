import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Wenceslaus Dsilva | CTO & Technical Architect',
  description: 'Personal portfolio of Wenceslaus Dsilva, a CTO with 20+ years of experience in software development and strategic leadership.',
  keywords: ['CTO', 'Technical Architect', 'Software Engineering', 'Leadership', 'Portfolio'],
  authors: [{ name: 'Wenceslaus Dsilva' }],
  openGraph: {
    title: 'Wenceslaus Dsilva | CTO & Technical Architect',
    description: '20+ years of driving innovation and technical excellence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white dark:bg-black">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
