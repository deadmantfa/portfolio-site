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
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      {/* Blueprint Header - Minimalist Watermark */}
      <div className="absolute bottom-12 right-12 text-right opacity-5 select-none">
        <span className="font-mono text-[8px] text-primary uppercase tracking-[1em] block mb-2 font-bold">Structural Schema</span>
        <h2 className="text-6xl md:text-9xl font-serif italic text-white leading-none">ARCHITECT</h2>
      </div>

      {/* Repositioned Annotations - Pushed to the side, away from content */}
      <div className="absolute right-8 top-[35%] w-56 space-y-4 hidden xl:block">
        <div className="mb-8 border-b border-primary/20 pb-4">
          <span className="font-mono text-[9px] text-primary uppercase tracking-[0.3em]">Module Specifications</span>
        </div>
        {project.adrs.slice(0, 3).map((adr, i) => (
          <motion.div
            key={i}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + (i * 0.2) }}
            className="p-4 border border-white/5 bg-black/20 backdrop-blur-sm rounded-lg pointer-events-auto"
          >
            <span className="font-mono text-[8px] text-zinc-500 uppercase block mb-1">DATA-NODE-0{i+1}</span>
            <h4 className="text-[10px] text-zinc-300 font-serif italic mb-1">{adr.title}</h4>
          </motion.div>
        ))}
      </div>

      {/* Technical Metadata - Corner Info */}
      <div className="absolute top-32 left-8 md:left-16 hidden md:block opacity-20">
        <div className="font-mono text-[8px] text-zinc-500 space-y-1">
          <p>LOAD_LEVEL: V.4.0.2</p>
          <p>STRATA: {project.slug.toUpperCase()}_BLUEPRINT</p>
          <p>COORD: {Math.random().toFixed(4)}, {Math.random().toFixed(4)}</p>
        </div>
      </div>

      {/* Refined Technical Bar */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/5 pt-4 opacity-30">
        <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">
          SYS-INTEGRITY: OPTIMAL // ENCRYPTION: AES-256
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