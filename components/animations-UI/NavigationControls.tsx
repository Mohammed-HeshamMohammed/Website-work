import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { NavigationButton } from "./NavigationButton"

interface NavigationControlsProps {
  currentIndex: number
  stepsLength: number
  goToSlide: (index: number) => void
  goToPrev: () => void
  goToNext: () => void
  autoplay: boolean
  setAutoplay: React.Dispatch<React.SetStateAction<boolean>>
}

export function NavigationControls({ 
  currentIndex, 
  stepsLength, 
  goToSlide, 
  goToPrev, 
  goToNext, 
  autoplay, 
  setAutoplay 
}: NavigationControlsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-8 max-w-md mx-auto">
      {/* Indicator dots */}
      <div className="flex gap-2 mb-6 md:mb-0 order-2 md:order-1">
        {Array.from({ length: stepsLength }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full ${
              currentIndex === index 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 w-8 h-3 shadow-md" 
                : "bg-blue-200 hover:bg-blue-300 w-3 h-3"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
            style={
              currentIndex === index 
                ? { boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" } 
                : {}
            }
          />
        ))}
      </div>
      
      <div className="flex gap-4 order-1 md:order-2">
        <NavigationButton icon={<ChevronLeft className="h-5 w-5" />} onClick={goToPrev} label="Previous slide" />
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={
            autoplay ? { rotate: [0, 0, 0, -5, 5, 0] } : { rotate: 0 }
          }
          transition={
            autoplay ? { duration: 2, repeat: Infinity, repeatDelay: 5 } : {}
          }
        >
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full border-2 border-blue-200 hover:border-blue-400 text-blue-600 hover:bg-blue-50 h-12 w-12 p-0 flex items-center justify-center shadow-sm ${
              autoplay ? "bg-blue-50" : ""
            }`}
            onClick={() => setAutoplay(!autoplay)}
            aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
          >
            {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </motion.div>
        
        <NavigationButton icon={<ChevronRight className="h-5 w-5" />} onClick={goToNext} label="Next slide" />
      </div>
    </div>
  )
}