'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface EditorialRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const EditorialReveal = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: EditorialRevealProps) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        clipPath: 'inset(0 0 100% 0)' 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        clipPath: 'inset(0 0 0% 0)' 
      }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ 
        duration: 1.2, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default EditorialReveal
