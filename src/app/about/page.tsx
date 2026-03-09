import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'About | Wenceslaus Dsilva — CTO & Technical Architect' },
  description:
    'CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud, and high-scale product engineering. Currently at Rooftop.',
  alternates: {
    canonical: 'https://w1d.pro/about',
  },
  openGraph: {
    url: 'https://w1d.pro/about',
    type: 'profile',
    title: 'About Wenceslaus Dsilva — CTO & Technical Architect',
    description:
      'CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud infrastructure, and high-scale product engineering.',
    images: [{ url: 'https://w1d.pro/images/hero/profile.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Wenceslaus Dsilva — CTO & Technical Architect',
    description: 'CTO with 20+ years of architectural leadership across serverless, AI/ML, cloud infrastructure, and high-scale product engineering.',
    images: ['https://w1d.pro/images/hero/profile.jpg'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors mb-12 inline-block"
        >
          ← Back to Portfolio
        </Link>

        <h1 className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 mb-3">
          About
        </h1>
        <h2 className="text-3xl font-light text-white mb-8">Wenceslaus Dsilva</h2>

        <div className="space-y-6 text-[15px] leading-relaxed">
          <p>
            Chief Technology Officer with 20+ years of architectural leadership across serverless,
            AI/ML, cloud infrastructure, and high-scale product engineering. Currently CTO at{' '}
            <span className="text-zinc-100">Rooftop</span>, an art marketplace where I lead
            technology strategy, platform engineering, and creative technical innovation.
          </p>

          <p>
            My career spans the full arc of the modern web — from data automation at Tata
            Consultancy Services in 2006, through the early mobile era at ePaisa and CouponDunia,
            to founding and scaling technology organisations at IndieFolio, Food Darzee, and
            EasyTech Innovations. Each chapter added a layer: distributed systems, payment
            architecture, AI/ML pipelines, serverless infrastructure, computer vision, and
            immersive product experiences.
          </p>

          <p>
            At Rooftop I shipped{' '}
            <span className="text-zinc-100">Lift</span> — an AI-powered multilingual storytelling
            platform that brought 300+ artworks to life with animated narration across 10+
            languages, accumulating 10,000+ views. I also designed and built a gallery kiosk in
            Flutter on Raspberry Pi, connecting physical gallery visitors to the digital catalogue
            with a postcard printer — delivered in 4 weeks. A liveness verification system for
            seller onboarding, built in Angular with TensorFlow.js, shipped in 8 days and
            eliminated manual review overhead entirely.
          </p>

          <p>
            At IndieFolio I built a colour-based search engine using Elasticsearch — the first of
            its kind in the creative community space — and maintained 100% platform uptime for
            three years during 10x user growth. At Food Darzee I automated 80% of supply chain
            operations and scaled from 1,000 to 10,000+ daily active subscribers. At EasyTech I
            designed multi-gateway payment failover architecture that maintained 99.99% uptime
            across $50M+ in transactions in the first year.
          </p>

          <p>
            I hold an{' '}
            <span className="text-zinc-100">Elasticsearch Certified Engineer</span> certification
            and a{' '}
            <span className="text-zinc-100">Google Cloud Professional Architect</span> certification,
            and graduated with a B.Sc in Information Technology from St. Andrews College, Mumbai
            University.
          </p>

          <p>
            I am open to senior technology leadership roles — CTO, VP Engineering, and Principal
            Architect positions at organisations where technology is a primary strategic
            differentiator and where leadership means building things that matter at scale.
          </p>

          <div className="pt-6 flex flex-col gap-3">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary hover:text-white transition-colors"
            >
              View Portfolio →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Get in Touch →
            </Link>
            <a
              href="https://linkedin.com/in/wenceslaus-dsilva"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              LinkedIn →
            </a>
            <a
              href="https://github.com/deadmantfa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>

        <p className="mt-16 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-700">
          <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy Policy</Link>
          <span className="mx-3">·</span>
          <span>© {new Date().getFullYear()} Wenceslaus Dsilva</span>
        </p>
      </div>
    </main>
  )
}
