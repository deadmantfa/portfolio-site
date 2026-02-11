'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCaseStudy } from '@/data/projects'

interface BlueprintOverlayProps {
  project: ProjectCaseStudy
}

const BlueprintOverlay = ({ project }: BlueprintOverlayProps) => {
  const [coords, setCoords] = useState({ x: '0.0000', y: '0.0000' })

  useEffect(() => {
    setCoords({
      x: Math.random().toFixed(4),
      y: Math.random().toFixed(4)
    })
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      {/* Relocated Watermark - Even more subtle */}
      <div className="absolute bottom-24 left-12 opacity-[0.01] select-none">
        <span className="font-mono text-[8px] text-primary uppercase tracking-[1em] block mb-2 font-bold">Structural Schema</span>
        <h2 className="text-6xl md:text-[12rem] font-serif italic text-white leading-none">ARCHITECT</h2>
      </div>

      <div className="absolute right-8 top-[35%] w-64 space-y-4 hidden xl:block">
        <div className="mb-8 border-b border-primary/20 pb-4">
          <span className="font-mono text-[9px] text-primary uppercase tracking-[0.3em]">Module Specifications</span>
        </div>
        {project.adrs.slice(0, 3).map((adr, i) => (
          <motion.div
            key={i}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="p-4 border border-primary/10 bg-teal-950/40 backdrop-blur-md rounded-lg pointer-events-auto"
          >
            <span className="font-mono text-[8px] text-primary/50 uppercase block mb-1">DATA-NODE-0{i+1}</span>
            <h4 className="text-[11px] text-zinc-300 font-serif italic mb-1">{adr.title}</h4>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-32 right-8 text-right hidden md:block opacity-20">
        <div className="font-mono text-[8px] text-zinc-500 space-y-1">
          <p>LOAD_LEVEL: V.4.0.2</p>
          <p>STRATA: {project.slug.toUpperCase()}_BLUEPRINT</p>
          <p>COORD: {coords.x}, {coords.y}</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-6 opacity-30">
        <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
          SYS-INTEGRITY: OPTIMAL // ENCRYPTION: AES-256
        </div>
        <div className="flex gap-6">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="font-mono text-[9px] text-primary uppercase tracking-widest">[{tech}]</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BlueprintOverlay
