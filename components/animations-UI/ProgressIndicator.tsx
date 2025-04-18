import React from "react"
import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  currentIndex: number;
  duration: number;
}

export function ProgressIndicator({ currentIndex }: ProgressIndicatorProps) {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-1 bg-blue-100 rounded-full overflow-hidden shadow-sm">
      <motion.div 
        className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600"
        style={{
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)"
        }}
        key={currentIndex}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 6, ease: "linear" }}
      />
    </div>
  )
}
