import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import SocialLinks from '@/components/SocialLinks'

export const metadata: Metadata = {
  title: { absolute: 'Contact | Wenceslaus Dsilva — CTO & Technical Architect' },
  description:
    'Get in touch with Wenceslaus Dsilva — CTO with 20+ years of architectural leadership. Open to senior technology leadership roles, consulting, and strategic advisory.',
  alternates: {
    canonical: 'https://w1d.pro/contact',
  },
  openGraph: {
    url: 'https://w1d.pro/contact',
    type: 'website',
    title: 'Contact Wenceslaus Dsilva — CTO & Technical Architect',
    description:
      'Open to senior technology leadership roles, consulting, and strategic advisory. Reach out directly.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 px-6 py-24 md:py-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors mb-12 inline-block"
        >
          ← Back to Portfolio
        </Link>

        <h1 className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 mb-3">
          Contact
        </h1>
        <h2 className="text-4xl font-serif italic font-light text-white mb-3">
          Let&apos;s <span className="text-primary">Connect.</span>
        </h2>
        <p className="text-zinc-500 text-sm mb-10 max-w-md">
          Open to senior technology leadership roles, strategic advisory, and consulting engagements.
        </p>

        <ContactForm />
        <div className="mt-8">
          <SocialLinks />
        </div>

        <p className="mt-12 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-700">
          <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy Policy</Link>
          <span className="mx-3">·</span>
          <span>© {new Date().getFullYear()} Wenceslaus Dsilva</span>
        </p>
      </div>
    </main>
  )
}
