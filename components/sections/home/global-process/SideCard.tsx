import React, { memo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { steps } from "@/components/sections/home/Content-Data/data"

interface SideCardProps {
  position: "left" | "right"
  index: number
  isHovering: boolean
  onClick: () => void
}

// Using memo to prevent unnecessary re-renders
export const SideCard = memo(function SideCard({ position, index, isHovering, onClick }: SideCardProps) {
  const isLeft = position === "left"
  const Chevron = isLeft ? ChevronLeft : ChevronRight
  
  // Since SideCards are hidden on mobile in FeatureSlider.tsx, 
  // we focus on optimizing for desktop only
  
  return (
    <motion.div 
      className={`absolute ${isLeft ? 'left-0 transform -translate-x-1/3' : 'right-0 transform translate-x-1/3'} z-10 w-full max-w-md hidden md:block`}
      animate={{ 
        opacity: isHovering ? 0.95 : 0.7,
        x: isLeft ? "-30%" : "30%",
        scale: 0.85,
        y: isLeft ? [0, -5, 0] : [0, 5, 0],
      }}
      transition={{ 
        y: { repeat: Infinity, duration: isLeft ? 3 : 3.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }, // Faster transition for smoother feel
        scale: { duration: 0.3 },
      }}
      whileHover={{ 
        opacity: 1,
        x: isLeft ? "-28%" : "28%",
        scale: 0.88,
        rotateY: isLeft ? -5 : 5,
        transition: { duration: 0.2 } // Faster hover transition
      }}
      whileTap={{ scale: 0.84 }} // Add feedback when tapped/clicked
      onClick={onClick}
      style={{ 
        cursor: "pointer",
        willChange: "transform, opacity" // Performance hint
      }}
    >
      <Card className="p-0 overflow-hidden border-0 shadow-xl rounded-3xl h-[450px] bg-white/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-blue-50/30 to-indigo-50/40" />
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-3xl border border-blue-200 opacity-50 z-0 subtleBorderGlow" />
        
        <div className="relative p-8 z-10 h-full flex flex-col justify-center">
          <div className="flex flex-col gap-6 items-center">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 w-20 h-20 flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ rotate: isLeft ? -5 : 5 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.2 }} // Faster animation for better feedback
              style={{ willChange: "transform" }}
            >
              {(() => {
                const IconComponent = steps[index].icon
                return <IconComponent className="h-10 w-10 text-blue-600" />
              })()}
            </motion.div>
            <h3 className="text-2xl font-bold text-center text-blue-800">
              {steps[index].title}
            </h3>
          </div>
        </div>
        
        {/* Click hint - optimize animation */}
        <motion.div 
          className={`absolute top-1/2 ${isLeft ? 'right-4' : 'left-4'} transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow-lg`}
          initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
          animate={{ opacity: [0, 0.8, 0], x: isLeft ? [5, 0, -5] : [-5, 0, 5] }} // Reduced movement
          transition={{ 
            duration: 1.2, // Faster animation
            repeat: Infinity, 
            repeatDelay: 2
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <Chevron className="w-5 h-5" />
        </motion.div>
      </Card>
    </motion.div>
  )
});