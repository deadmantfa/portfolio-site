'use client'

import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="fixed top-0 z-[100] flex w-full items-center justify-between px-8 md:px-16 py-8">
      <div className="text-2xl font-serif italic font-bold tracking-tighter text-white group">
        <Link href="/">
          W<span className="text-primary group-hover:text-white transition-colors duration-500">.</span>D
        </Link>
      </div>
      
      <div className="flex items-center gap-12">
        <div className="hidden space-x-12 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 md:flex">
          <Link href="#about" className="transition-colors hover:text-primary">Epochs</Link>
          <Link href="#skills" className="transition-colors hover:text-primary">Ecosystem</Link>
          <Link href="#contact" className="transition-colors hover:text-primary">Contact</Link>
        </div>
        
        <a
          href="/WenceslausDsilva-CV-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="glass px-8 py-3 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-white hover:bg-primary hover:text-black transition-all active:scale-95"
        >
          Curriculum Vitae
        </a>
      </div>
    </nav>
  )
}

export default Navigation
