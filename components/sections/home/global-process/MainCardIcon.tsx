import React, { memo } from "react"
import { motion } from "framer-motion"
import { Sparkles } from 'lucide-react'
import { steps } from "@/components/sections/home/Content-Data/data"

interface MainCardIconProps {
  currentIndex: number
  isMobile?: boolean
}

export const MainCardIcon = memo(function MainCardIcon({ currentIndex, isMobile = false }: MainCardIconProps) {
  // Adjust sizes and animation for mobile
  const containerSize = isMobile ? "w-20 h-20" : "w-24 h-24";
  const iconSize = isMobile ? "h-10 w-10" : "h-12 w-12";
  const floatDuration = isMobile ? 2 : 3;
  const glowDuration = isMobile ? 2 : 3;
  const rotationDuration = isMobile ? 4 : 6;
  const amplitude = isMobile ? [-4, 0, -4] : [-8, 0, -8]; // Smaller movement on mobile
  
  return (
    <motion.div 
      className="relative flex-shrink-0"
      initial={{ y: 0 }}
      animate={{ y: amplitude }}
      transition={{ 
        duration: floatDuration, 
        repeat: Infinity, 
        repeatType: "reverse",
        ease: "easeInOut" 
      }}
      style={{ willChange: "transform" }}
    >
      {/* Glow effect behind icon - simplified on mobile */}
      <motion.div 
        className={`absolute inset-0 bg-blue-300 rounded-3xl opacity-20 ${isMobile ? 'blur-lg' : 'blur-xl'}`}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: isMobile ? [0.15, 0.25, 0.15] : [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: glowDuration, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        style={{ willChange: "transform, opacity" }}
      />
      
      <div className={`relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 ${containerSize} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}>
        {/* Sparkles around icon - only on desktop or simplified on mobile */}
        {(!isMobile || window.innerWidth > 480) && (
          <motion.div 
            className="absolute -top-1 -right-1 text-yellow-400"
            animate={{ 
              rotate: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <Sparkles size={isMobile ? 12 : 16} />
          </motion.div>
        )}
        
        {(() => {
          const IconComponent = steps[currentIndex].icon
          return (
            <motion.div
              animate={{ 
                rotate: [0, -3, 0, 3, 0], // Reduced rotation on mobile
              }}
              transition={{ 
                duration: rotationDuration, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ willChange: "transform" }}
            >
              <IconComponent className={`${iconSize} text-blue-600`} />
            </motion.div>
          )
        })()}
      </div>
    </motion.div>
  )
});