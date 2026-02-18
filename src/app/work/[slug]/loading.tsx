export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>
      <div className="relative w-64 h-px bg-white/5 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-primary animate-progress shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary animate-pulse">
        Deconstructing Project
      </span>
    </div>
  )
}
