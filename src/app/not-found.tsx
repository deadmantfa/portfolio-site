import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-8 text-center">
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl">
        <span className="font-mono text-primary text-[11px] uppercase tracking-[0.5em] mb-4 block">Error 404</span>
        <h1 className="text-6xl md:text-8xl font-serif italic mb-8 tracking-tighter">
          Structural <br/>
          <span className="text-primary pr-4">Anomaly.</span>
        </h1>
        <p className="text-zinc-400 font-sans text-xl mb-12 leading-relaxed">
          The requested architectural segment does not exist in the current ecosystem. It may have been decommissioned or moved to a different coordinate.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-4 group pointer-events-auto"
        >
          <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors text-zinc-500 group-hover:text-primary">
            ←
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-300 transition-colors">Return to Central Hub</span>
        </Link>
      </div>
    </div>
  )
}
