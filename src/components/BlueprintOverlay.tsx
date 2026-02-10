'use client'

import { motion } from 'framer-motion'
import { ProjectCaseStudy } from '@/data/projects'

interface BlueprintOverlayProps {
  project: ProjectCaseStudy
}

const BlueprintOverlay = ({ project }: BlueprintOverlayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Blueprint Header */}
      <div className="absolute top-32 left-8 md:left-16 border-l-2 border-primary pl-6 py-2">
        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.5em] block mb-2">Technical Specification</span>
        <h2 className="text-3xl md:text-5xl font-serif italic text-white uppercase tracking-tighter leading-none">SYSTEM BLUEPRINT</h2>
      </div>

      {/* Floating Annotations */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 space-y-8 hidden lg:block">
        {project.adrs.map((adr, i) => (
          <motion.div
            key={i}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="p-4 border border-white/5 bg-black/40 backdrop-blur-md rounded-lg pointer-events-auto"
          >
            <span className="font-mono text-[8px] text-zinc-500 uppercase block mb-2">MODULE-0{i+1} // {adr.title}</span>
            <p className="text-[10px] text-zinc-400 font-mono leading-tight">{adr.decision}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Technical Bar */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4">
        <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">
          Build: 2026.02.11 // Stage: Production // Mode: Architectural
        </div>
        <div className="flex gap-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="font-mono text-[8px] text-primary uppercase tracking-widest">[{tech}]</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BlueprintOverlay
