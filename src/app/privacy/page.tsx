import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Wenceslaus Dsilva' },
  description:
    'Privacy policy for w1d.pro — the professional portfolio of Wenceslaus Dsilva. This site collects only contact form submissions and stores no tracking cookies or personal data beyond what you voluntarily provide.',
  alternates: {
    canonical: 'https://w1d.pro/privacy',
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function PrivacyPage() {
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
          Legal
        </h1>
        <h2 className="text-3xl font-light text-white mb-2">Privacy Policy</h2>
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 mb-12">
          Last updated: 10 March 2026
        </p>

        <div className="space-y-10 text-[15px] leading-relaxed">
          <section>
            <h3 className="text-white font-medium mb-3">Overview</h3>
            <p>
              This is the personal portfolio website of Wenceslaus Dsilva, located at{' '}
              <span className="text-zinc-100 font-mono text-[13px]">w1d.pro</span>. This policy
              explains what information this site collects, how it is used, and your rights in
              relation to it.
            </p>
            <p className="mt-3">
              This site is a static portfolio. It does not use advertising networks, does not sell
              data, and does not deploy analytics or tracking pixels of any kind.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-3">Information Collected</h3>
            <p>This site collects only what you voluntarily submit via the contact form:</p>
            <ul className="mt-3 space-y-2 list-none">
              {['Your name', 'Your email address', 'Your message'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-zinc-600 font-mono text-[11px] mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              No other personal data is collected. No IP addresses are logged by this application.
              No browser fingerprinting is performed.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-3">How Contact Data is Used</h3>
            <p>
              Contact form submissions are delivered by email via{' '}
              <span className="text-zinc-100">Resend</span> (a transactional email service) directly
              to the site owner. The data is used solely to respond to your enquiry.
            </p>
            <p className="mt-3">
              Your contact details are not stored in any database operated by this site, are not
              shared with third parties beyond the email delivery service, and are not used for
              marketing purposes.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-3">Cookies</h3>
            <p>
              This site does not set any first-party cookies. The Next.js framework may set
              short-lived technical cookies necessary for the operation of the application (such as
              for Server Actions). These contain no personal data and expire at the end of your
              browser session.
            </p>
            <p className="mt-3">
              No third-party cookies are set. There are no tracking, advertising, or analytics
              cookies on this site.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-3">Third-Party Services</h3>
            <p>This site uses the following third-party services:</p>
            <ul className="mt-3 space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-zinc-600 font-mono text-[11px] mt-1">—</span>
                <span>
                  <span className="text-zinc-100">Resend</span> — email delivery for contact form
                  submissions. Resend processes submitted contact data solely to deliver the email.
                  See{' '}
                  <a
                    href="https://resend.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200 transition-colors"
                  >
                    Resend&apos;s Privacy Policy
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zinc-600 font-mono text-[11px] mt-1">—</span>
                <span>
                  <span className="text-zinc-100">Google Fonts</span> — fonts are loaded at build
                  time and served from this domain. No requests are made to Google servers at
                  runtime.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zinc-600 font-mono text-[11px] mt-1">—</span>
                <span>
                  <span className="text-zinc-100">Firebase Hosting</span> — the site is hosted on
                  Firebase. Firebase may log standard server request metadata (IP address, user
                  agent, request path) as part of normal hosting infrastructure operation. See{' '}
                  <a
                    href="https://firebase.google.com/support/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200 transition-colors"
                  >
                    Firebase&apos;s Privacy Information
                  </a>
                  .
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-medium mb-3">Your Rights</h3>
            <p>
              If you have submitted a contact form enquiry and wish to request deletion of that
              data, or have any privacy-related question, contact:{' '}
              <a
                href="mailto:hello@w1d.pro"
                className="text-zinc-100 underline underline-offset-4 hover:text-zinc-400 transition-colors"
              >
                hello@w1d.pro
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-3">Changes to This Policy</h3>
            <p>
              If this policy changes materially, the &quot;Last updated&quot; date at the top of
              this page will be revised. Given the minimal nature of data collection, significant
              changes are unlikely.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
