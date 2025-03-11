"use client"

import { motion } from "framer-motion"
import type React from "react" // Added import for React

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionTransition({ children, className = "", delay = 0 }: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

