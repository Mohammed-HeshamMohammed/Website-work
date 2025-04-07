"use client" 

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Import the refactored components
import NavigationDots from "@/components/sections/home/global-process/NavigationDots";
import CTAButton from "@/components/sections/home/global-process/CTAButton";
import Particles from "@/components/sections/home/global-process/Particles";
import ProcessCard from "@/components/sections/home/global-process/ProcessCard";
import WaveyOrbits from "@/components/sections/home/global-process/WaveyOrbits";
import DataParticles from "@/components/sections/home/global-process/DataParticles";

// Import the steps data
import { steps } from "@/components/sections/home/data"; 

export const GlobalProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const totalCards = steps.length;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isMouseOverOrbit, setIsMouseOverOrbit] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add global mouse position tracking for orbit detection
    const handleMouseMove = (e: MouseEvent) => {
      if (orbitRef.current) {
        const orbitArea = checkIfInsideOrbit(e);
        setIsMouseOverOrbit(orbitArea);
      }
    };
    
    // Add global wheel event listener to prevent scrolling when over orbit
    const preventScrollWhenOverOrbit = (e: WheelEvent) => {
      if (isMouseOverOrbit) {
        e.preventDefault();
        
        // Handle card navigation with wheel
        if (e.deltaY > 0) {
          // Scroll down - next card
          setActiveCardIndex((prev) => (prev + 1) % totalCards);
        } else {
          // Scroll up - previous card
          setActiveCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', preventScrollWhenOverOrbit, { passive: false });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', preventScrollWhenOverOrbit);
    };
  }, [isMouseOverOrbit, totalCards]);
  
  // Check if mouse/touch event is inside the orbit area
  const checkIfInsideOrbit = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!orbitRef.current) return false;
    
    const orbitRect = orbitRef.current.getBoundingClientRect();
    const centerX = orbitRect.left + orbitRect.width / 2;
    const centerY = orbitRect.top + orbitRect.height / 2;
    
    // Get the current mouse/touch position
    const clientX = 'clientX' in e ? e.clientX : 
                   e instanceof TouchEvent ? e.touches[0].clientX : 0;
    const clientY = 'clientY' in e ? e.clientY : 
                   e instanceof TouchEvent ? e.touches[0].clientY : 0;
    
    // Calculate distance from center
    const distance = Math.sqrt(
      Math.pow(clientX - centerX, 2) + 
      Math.pow(clientY - centerY, 2)
    );
    
    // Use a more reliable orbit radius calculation
    const orbitRadius = Math.min(orbitRect.width, orbitRect.height) / 2;
    
    // Return true if within the orbit area with some padding
    return distance <= orbitRadius * 1.5;
  };

  // Handle manual card scrolling with mouse/touch events
  const handleTouchStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMouseOverOrbit) {
      setIsDragging(true);
      
      // Get the start X position
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      setStartX(clientX);
      
      // Prevent default to avoid page scrolling
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !isMouseOverOrbit) return;
    
    // Get current X position
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const diff = startX - clientX;
    
    if (Math.abs(diff) > 20) { // Lower threshold for better responsiveness
      if (diff > 0) {
        // Swipe left - next card
        setActiveCardIndex((prev) => (prev + 1) % totalCards);
      } else {
        // Swipe right - previous card
        setActiveCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
      }
      
      setStartX(clientX);
      
      // Prevent default to avoid page scrolling
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen h-[150vh] overflow-hidden bg-black" 
      id="global-process-section"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Deep space background with stars */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 space-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" />
      </div>

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles />
      </div>

      {/* Wavey orbital lines */}
      <div className="absolute inset-0 overflow-hidden">
      <WaveyOrbits />
      </div>

      {/* Dynamic data particles */}
      <div className="absolute inset-0 overflow-hidden">
        <DataParticles />
      </div>

      {/* Content container */}
      <div className="container relative mx-auto px-4 py-12 h-full">
        {/* Unified center logo and orbital system */}
        <div className="relative h-full max-w-6xl mx-auto flex flex-col justify-center">
          {/* Center logo with orbit and cards */}
          <div 
            ref={orbitRef}
            className="absolute inset-0 flex items-center justify-center orbit-area"
          >
            {/* Central logo with transparent background */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute z-20 flex items-center justify-center"
            >
              {/* Removed bg-black/80 and added backdrop-blur-sm for subtle blur effect */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full  flex items-center justify-center border-4 border-cyan-500/50 shadow-glow">
                <img 
                  src="/logo.png" 
                  alt="Data Synapse Logo" 
                  className="w-24 h-24 md:w-40 md:h-40 object-contain"
                />
              </div>
              
              {/* Pulsing effect around logo */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-cyan-400/30"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(8, 145, 178, 0.4)",
                    "0 0 0 16px rgba(8, 145, 178, 0.0)",
                    "0 0 0 0 rgba(8, 145, 178, 0.4)"
                  ],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            
            {/* Process Cards positioned in a circle around the logo */}
            {steps.map((step, index) => (
              <ProcessCard
                key={index}
                step={step}
                index={index}
                activeIndex={activeCardIndex}
                totalCards={totalCards}
                onClick={() => setActiveCardIndex(index)}
              />
            ))}
          </div>
          
          {/* Navigation dots */}
          <NavigationDots 
            steps={steps}
            activeIndex={activeCardIndex}
            onDotClick={(index) => setActiveCardIndex(index)}
          />
        </div>

        {/* Call-to-action button */}
        <CTAButton />
      </div>

      {/* Use next.js styling approach */}
      <style jsx global>{`
        .cosmic-glow {
          text-shadow: 0 0 20px rgba(8, 145, 178, 0.7), 0 0 40px rgba(8, 145, 178, 0.4);
        }
        
        .shadow-glow {
          box-shadow: 0 0 25px rgba(8, 145, 178, 0.3);
        }
        
        .space-background {
          background-image: url('/global-process.png');
          filter: blur(3px);
        }
        
        .node-particle {
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.8);
        }
        
        .orbit-area {
          cursor: grab;
        }
        
        .orbit-area:active {
          cursor: grabbing;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default GlobalProcess;