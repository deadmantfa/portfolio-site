'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-8 text-center">
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl">
        <span className="font-mono text-red-500 text-[11px] uppercase tracking-[0.5em] mb-4 block">System Breach</span>
        <h1 className="text-6xl md:text-8xl font-serif italic mb-8 tracking-tighter">
          Runtime <br/>
          <span className="text-red-500 pr-4">Failure.</span>
        </h1>
        <p className="text-zinc-400 font-sans text-xl mb-12 leading-relaxed">
          A critical failure occurred in the system core. The architectural integrity has been compromised.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-4 group pointer-events-auto"
          >
            <div className="size-12 rounded-full border border-red-500/20 flex items-center justify-center group-hover:border-red-500 transition-colors text-red-500/50 group-hover:text-red-500">
              ↻
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-500/50 group-hover:text-red-500 transition-colors">Reinitialize Core</span>
          </button>

          <a 
            href="/"
            className="inline-flex items-center gap-4 group pointer-events-auto"
          >
            <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors text-zinc-500 group-hover:text-primary">
              ←
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-300 transition-colors">Emergency Evacuation</span>
          </a>
        </div>
      </div>
    </div>
  )
}
