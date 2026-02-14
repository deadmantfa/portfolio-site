'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { careerData } from '@/data/career'

interface YearMarkerProps {
  year: string
  index: number
}

const YearMarker = ({ year, index }: YearMarkerProps) => {
  const { scrollYProgress } = useScroll()
  
  // Dynamic section calculation: Hero (1) + Career (careerData.length) + Ecosystem (3) + Contact (1)
  const totalSections = 1 + careerData.length + 3 + 1
  const careerStart = 1 / totalSections
  const careerEnd = (1 + careerData.length) / totalSections
  
  const step = (careerEnd - careerStart) / careerData.length
  const start = careerStart + (index * step)
  const end = start + step
  
  const y = useTransform(
    scrollYProgress, 
    [Math.max(0, start), Math.min(1, end)], 
    ['10%', '-10%']
  )
  
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - 0.05), 
      Math.max(0, start), 
      Math.min(1, end), 
      Math.min(1, end + 0.05)
    ],
    [0, 0.08, 0.08, 0]
  )

  return (
    <motion.div 
      style={{ y, opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      <span className="text-[15rem] md:text-[25rem] font-serif italic tracking-tighter leading-none select-none text-white whitespace-nowrap">
        {year.includes('Present') ? '2026' : year.split(' ')[0]}
      </span>
      <div className="h-[40vh] w-px bg-gradient-to-b from-white/20 to-transparent"></div>
    </motion.div>
  )
}

const BackgroundMarkers = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {careerData.map((milestone, i) => (
        <YearMarker key={i} index={i} year={milestone.year} />
      ))}
    </div>
  )
}

export default BackgroundMarkers
