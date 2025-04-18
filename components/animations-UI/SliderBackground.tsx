import React from "react"
import { motion } from "framer-motion"

export function SliderBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div 
        className="absolute left-1/4 top-1/4 w-64 h-64 bg-blue-300 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute right-1/3 top-1/3 w-32 h-32 bg-cyan-300 rounded-full blur-2xl"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100 to-transparent opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ 
          backgroundSize: "200% 200%"
        }}
      />
    </div>
  )
}