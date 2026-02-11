import { ADR } from '@/data/projects'

interface ADRCardProps {
  adr: ADR
  index: number
}

const ADRCard = ({ adr, index }: ADRCardProps) => {
  return (
    <div className="glass p-8 md:p-12 rounded-[2rem] hover:border-primary/20 transition-colors group">
      <span className="text-[10px] font-mono text-zinc-500 block mb-6 uppercase tracking-widest group-hover:text-primary transition-colors">
        Architectural Decision Record #0{index + 1}
      </span>
      <h4 className="text-3xl md:text-4xl font-serif italic text-white mb-8">{adr.title}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <span className="text-[9px] font-mono text-primary uppercase tracking-widest mb-3 block opacity-70">The Problem</span>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">{adr.problem}</p>
        </div>
        <div>
          <span className="text-[9px] font-mono text-accent uppercase tracking-widest mb-3 block opacity-70">The Solution</span>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">{adr.solution}</p>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-white/5">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3 block opacity-70">Measurable Impact</span>
        <p className="text-sm text-zinc-200 font-mono italic">{adr.impact}</p>
      </div>
    </div>
  )
}

export default ADRCard
