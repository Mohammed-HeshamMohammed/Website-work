import React from "react"
import { motion } from "framer-motion"

interface CursorTrailProps {
  isHovering: boolean
  mousePosition: { x: number, y: number }
}

export function CursorTrail({ isHovering, mousePosition }: CursorTrailProps) {
  if (!isHovering) return null
  
  return (
    <motion.div
      className="pointer-events-none absolute w-32 h-32 rounded-full"
      animate={{
        x: mousePosition.x - 64,
        y: mousePosition.y - 64,
      }}
      transition={{ type: "spring", damping: 15 }}
      style={{
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0) 70%)",
        filter: "blur(8px)",
      }}
    />
  )
}