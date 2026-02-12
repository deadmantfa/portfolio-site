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
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0
      }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ 
        duration: 0.8, 
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
