'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { careerData } from '@/data/career'

const BackgroundMarkers = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div style={{ y }} className="flex flex-col items-center gap-[40vh] pt-[100vh]">
        {careerData.map((milestone, i) => (
          <div key={i} className="flex flex-col items-center gap-4 opacity-[0.03]">
            <span className="text-[15rem] font-serif italic tracking-tighter leading-none select-none">
              {milestone.year}
            </span>
            <div className="h-64 w-px bg-white"></div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default BackgroundMarkers
