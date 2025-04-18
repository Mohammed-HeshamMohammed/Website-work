import React, { memo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { steps } from "@/components/sections/home/Content-Data/data"
import { MainCardParticles } from "./MainCardParticles"
import { MainCardIcon } from "./MainCardIcon"

interface MainCardProps {
  currentIndex: number
  direction: number
  isHovering: boolean
  mousePosition: { x: number, y: number }
  isMobile?: boolean
}

// Helper function to split description text and format bullet points properly
const formatDescription = (description: string) => {
  // Check if description has any bullet points
  if (description.includes('• ')) {
    // Split the full text into segments - intro text, bullet points, and conclusion text
    const segments = description.split(/(?=• )|(?<=\n)/g);
    
    // Process the segments
    const introTexts: string[] = [];
    const bulletPoints: string[] = [];
    const conclusionTexts: string[] = [];
    
    let inBulletSection = false;
    let passedBulletSection = false;
    
    segments.forEach(segment => {
      const trimmed = segment.trim();
      
      // Skip empty segments
      if (!trimmed) return;
      
      // Handle bullet points
      if (trimmed.startsWith('• ')) {
        inBulletSection = true;
        bulletPoints.push(trimmed.substring(2)); // Remove the bullet character
      }
      // Handle text after bullet section
      else if (inBulletSection) {
        passedBulletSection = true;
        conclusionTexts.push(trimmed);
      }
      // Handle intro text
      else if (!passedBulletSection) {
        introTexts.push(trimmed);
      }
    });
    
    return (
      <>
        {/* Intro text before bullets */}
        {introTexts.map((text, i) => (
          <p key={`intro-${i}`} className="mb-4">{text}</p>
        ))}
        
        {/* Bulleted list */}
        {bulletPoints.length > 0 && (
          <ul className="list-disc pl-6 mb-4 space-y-2">
            {bulletPoints.map((point, i) => (
              <li key={`bullet-${i}`} className="text-gray-600">{point}</li>
            ))}
          </ul>
        )}
        
        {/* Conclusion text */}
        {conclusionTexts.map((text, i) => (
          <p key={`conclusion-${i}`} className="mb-2">{text}</p>
        ))}
      </>
    );
  }
  
  // For descriptions without bullet points, handle paragraph breaks
  return description.split('\n\n').map((paragraph, i) => (
    <p key={i} className="mb-4">{paragraph}</p>
  ));
};

export const MainCard = memo(function MainCard({ 
  currentIndex, 
  direction, 
  isHovering, 
  mousePosition,
  isMobile = false
}: MainCardProps) {
  // Adjust animation for mobile
  const initialYOffset = isMobile ? (direction > 0 ? 30 : -30) : (direction > 0 ? 50 : -50);
  const exitYOffset = isMobile ? (direction > 0 ? -30 : 30) : (direction > 0 ? -50 : 50);
  const animationDuration = isMobile ? 0.4 : 0.6;
  
  return (
    <motion.div
      key={currentIndex}
      custom={direction}
      initial={{ opacity: 0, y: initialYOffset, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ 
        opacity: 0, 
        y: exitYOffset, 
        scale: 0.95,
        transition: { duration: isMobile ? 0.3 : 0.4 } 
      }}
      transition={{ 
        duration: animationDuration, 
        ease: [0.19, 1, 0.22, 1],
        scale: { duration: isMobile ? 0.5 : 0.7 }
      }}
      className="relative w-full max-w-2xl z-20"
      style={{ willChange: "transform, opacity" }}
    >
      <Card className={`p-0 overflow-hidden border-0 shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl h-auto bg-white/95 backdrop-blur-md relative group ${
        isMobile ? 'mx-4' : ''
      }`}>
        {/* Magical border effect - simplified on mobile */}
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 rounded-2xl md:rounded-3xl ${
            isMobile ? 'opacity-10 group-hover:opacity-20 blur-[1px]' : 'opacity-20 group-hover:opacity-30 blur-sm'
          } transition-opacity z-0`}
        />
        
        {/* Light reflection effect - only on desktop */}
        {!isMobile && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 z-10"
            animate={{
              backgroundPosition: ["200% 200%", "0% 0%"],
            }}
            transition={{
              duration: 1.5,
              repeat: 0,
              ease: "easeOut",
            }}
            style={{ 
              backgroundSize: "200% 200%",
              willChange: "background-position"
            }}
          />
        )}
        
        {/* Particles - only on desktop */}
        {!isMobile && (
          <MainCardParticles isHovering={isHovering} mousePosition={mousePosition} />
        )}
        
        {/* Content wrapper - adjusted padding for mobile */}
        <div className={`relative ${isMobile ? 'p-6' : 'p-10 md:p-14'} z-10 flex flex-col justify-center`}>
          <div className="flex flex-col gap-6 md:gap-8 items-center">
            {/* Icon component with enhanced animation */}
            <MainCardIcon currentIndex={currentIndex} isMobile={isMobile} />
            
            {/* Content with staggered animation */}
            <div className="flex-1">
              <motion.h2 
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.1 : 0.2 }}
                className={`${
                  isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
                } font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 tracking-tight text-center`}
              >
                {steps[currentIndex].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.2 : 0.4 }}
                className={`${
                  isMobile ? 'text-base' : 'text-lg'
                } text-gray-600 leading-relaxed max-w-xl mx-auto`}
              >
                {formatDescription(steps[currentIndex].description)}
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
});