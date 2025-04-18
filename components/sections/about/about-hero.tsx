"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutHero() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-900/90" />
        
        {/* Decorative animated shapes - adjusted for mobile */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 rounded-full bg-blue-400 blur-3xl"
            animate={{ 
              x: [0, 30, 0, -30, 0],
              y: [0, -30, 0, 30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-48 md:w-96 h-48 md:h-96 rounded-full bg-blue-200 blur-3xl"
            animate={{ 
              x: [0, -40, 0, 40, 0],
              y: [0, 30, 0, -30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 25,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>

      {/* Content with improved animations and mobile adjustments */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center relative"
          >
            {/* Decorative line */}
            <motion.div 
              className="w-16 md:w-24 h-1 bg-blue-300 mx-auto mb-4 md:mb-8"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            {/* Main Heading with Reveal Animation - responsive text size */}
            <div className="overflow-hidden mb-4 md:mb-6">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  ease: [0.33, 1, 0.68, 1] 
                }}
              >
                Our <span className="text-blue-300">Story</span>
              </motion.h1>
            </div>
            
            {/* Subtitle with responsive styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-2"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 font-light">
                Transforming real estate data into actionable insights since 2020
              </p>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center text-blue-100"
              >
                {/* Optional: Add a small arrow or indicator here */}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}