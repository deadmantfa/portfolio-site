import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import SocialLinks from '@/components/SocialLinks'

export const metadata: Metadata = {
  title: { absolute: 'Contact | Wenceslaus Dsilva — CTO & Technical Architect' },
  description:
    'Contact Wenceslaus Dsilva — CTO open to senior leadership roles, consulting, and strategic advisory. Reach out to discuss technology leadership opportunities.',
  alternates: {
    canonical: 'https://w1d.pro/contact',
  },
  openGraph: {
    url: 'https://w1d.pro/contact',
    type: 'website',
    title: 'Contact Wenceslaus Dsilva — CTO & Technical Architect',
    description:
      'Open to senior technology leadership roles, consulting, and strategic advisory. Reach out directly.',
    images: [{ url: 'https://w1d.pro/images/hero/profile.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Wenceslaus Dsilva — CTO & Technical Architect',
    description: 'Open to senior technology leadership roles, consulting, and strategic advisory. Reach out directly.',
    images: ['https://w1d.pro/images/hero/profile.jpg'],
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
        <p className="text-zinc-500 text-sm mb-4 max-w-lg">
          Open to senior technology leadership roles — CTO, VP Engineering, and Principal Architect
          positions — as well as strategic consulting and advisory engagements.
        </p>
        <p className="text-zinc-600 text-sm mb-4 max-w-lg">
          I bring 20+ years of architectural depth across serverless, AI/ML, cloud infrastructure,
          and high-scale product engineering. If you are building something ambitious and need a
          technology leader who has done it at scale — at Rooftop, IndieFolio, Food Darzee, and
          EasyTech — use the form below or connect directly.
        </p>
        <p className="text-zinc-600 text-sm mb-4 max-w-lg">
          My work spans the full technology leadership spectrum: defining architecture strategy,
          building and scaling engineering teams, shipping products that grow from thousands to
          millions of users, and creating the operational foundations that let a business scale
          without service degradation. I have led teams through serverless migrations, AI/ML
          pipeline delivery, mobile-first product launches, payment infrastructure hardening, and
          zero-downtime platform rebuilds.
        </p>
        <p className="text-zinc-600 text-sm mb-10 max-w-lg">
          Whether you are a startup preparing to scale, an established company modernising its
          stack, or an organisation that needs a fractional CTO to drive a specific technical
          transformation — I am happy to have that conversation. Response time is typically within
          one business day.
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
