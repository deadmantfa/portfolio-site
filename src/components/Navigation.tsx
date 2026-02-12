'use client'

import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-7xl">
      <div className="glass px-6 py-4 rounded-full flex items-center justify-between">
        <div className="text-2xl font-serif italic font-bold tracking-tighter text-white group">
          <Link href="/" aria-label="Wenceslaus Dsilva - Home" className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg px-2">
            W<span className="text-primary group-hover:text-white transition-colors duration-500">.</span>D
          </Link>
        </div>
        
        <div className="flex items-center gap-8 md:gap-12">
          <div className="hidden space-x-8 md:space-x-12 text-[11px] font-mono uppercase tracking-[0.3em] text-foreground/40 md:flex">
            <Link href="#epochs" className="transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded px-2">Epochs</Link>
            <Link href="#skills" className="transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded px-2">Ecosystem</Link>
            <Link href="#contact" className="transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded px-2">Contact</Link>
          </div>
          
          <a
            href="/CV/WenceslausDsilva-CV-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Curriculum Vitae (PDF)"
            className="bg-white/10 hover:bg-primary px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] text-foreground hover:text-background transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            CV
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
