"use client"

import React, { useRef, useState, useEffect } from "react";
import { Target, Lightbulb, BarChart3, PieChart, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import {steps} from "@/components/sections/home/data"; // Import the steps data from a separate file

// Export as a named export
export const GlobalProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const totalCards = steps.length;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isInsideOrbit, setIsInsideOrbit] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Check if mouse is inside the orbit area
  const checkIfInsideOrbit = (e: React.MouseEvent | React.TouchEvent | WheelEvent) => {
    if (!orbitRef.current) return false;
    
    const orbitRect = orbitRef.current.getBoundingClientRect();
    const centerX = orbitRect.left + orbitRect.width / 2;
    const centerY = orbitRect.top + orbitRect.height / 2;
    
    // Get the current mouse position
    const clientX = e instanceof MouseEvent || 'clientX' in e ? e.clientX : 
                    e instanceof TouchEvent ? e.touches[0].clientX : 0;
    const clientY = e instanceof MouseEvent || 'clientY' in e ? e.clientY : 
                    e instanceof TouchEvent ? e.touches[0].clientY : 0;
    
    // Calculate distance from center
    const distance = Math.sqrt(
      Math.pow(clientX - centerX, 2) + 
      Math.pow(clientY - centerY, 2)
    );
    
    // Check if within the orbit area (using radius of orbit area)
    const orbitRadius = Math.min(orbitRect.width, orbitRect.height) / 2;
    return distance <= orbitRadius * 1.5; // Slightly larger detection area for better UX
  };

  // Handle manual card scrolling with mouse/touch events
  const handleTouchStart = (e: React.MouseEvent | React.TouchEvent) => {
    const insideOrbit = checkIfInsideOrbit(e);
    setIsInsideOrbit(insideOrbit);
    
    if (insideOrbit) {
      setIsDragging(true);
      setStartX(e instanceof MouseEvent || 'clientX' in e ? e.clientX : e.touches[0].clientX);
      
      // Prevent default to avoid page scrolling when inside orbit
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !isInsideOrbit) return;
    
    const currentX = e instanceof MouseEvent || 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 30) { // Reduced threshold for more responsive interaction
      if (diff > 0) {
        // Swipe left - next card
        setActiveCardIndex((prev) => (prev + 1) % totalCards);
      } else {
        // Swipe right - previous card
        setActiveCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
      }
      setIsDragging(false);
      setStartX(currentX);
      
      // Prevent default to avoid page scrolling when inside orbit
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsInsideOrbit(false);
  };

  // Wheel event for scrolling between cards
  const handleWheel = (e: React.WheelEvent) => {
    const insideOrbit = checkIfInsideOrbit(e);
    
    if (insideOrbit) {
      if (e.deltaY > 0) {
        // Scroll down - next card
        setActiveCardIndex((prev) => (prev + 1) % totalCards);
      } else {
        // Scroll up - previous card
        setActiveCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
      }
      
      // Prevent default to stop page scrolling when inside orbit
      e.preventDefault();
    }
  };

  // Particle animation for data nodes
  const createParticles = () => {
    return [...Array(12)].map((_, i) => {
      const orbitSize = (i % 4 + 3) * 12;
      const angle = Math.random() * 360;
      const radius = orbitSize / 2;
      const duration = 20 + Math.random() * 15;
      const size = Math.random() * 2 + 1;
      const color = i % 3 === 0 ? "bg-cyan-400" : i % 3 === 1 ? "bg-cyan-500" : "bg-blue-500";
      
      return (
        <motion.div
          key={`node-${i}`}
          className={`absolute rounded-full ${color} node-particle`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
          animate={{
            left: [
              `calc(50% + ${radius * Math.cos(angle * Math.PI / 180)}%)`,
              `calc(50% + ${radius * Math.cos((angle + 180) * Math.PI / 180)}%)`,
              `calc(50% + ${radius * Math.cos((angle + 360) * Math.PI / 180)}%)`,
            ],
            top: [
              `calc(50% + ${radius * Math.sin(angle * Math.PI / 180)}%)`,
              `calc(50% + ${radius * Math.sin((angle + 180) * Math.PI / 180)}%)`,
              `calc(50% + ${radius * Math.sin((angle + 360) * Math.PI / 180)}%)`,
            ],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      );
    });
  };

  // Create wavey orbital lines
  const createWaveyOrbits = () => {
    return [...Array(6)].map((_, i) => {
      const orbitSize = (i + 3) * 12;
      const offset = orbitSize / 2;
      
      // Create random wave pattern
      const waveAmplitude = 5 + Math.random() * 10; // Random wave height
      const waveFrequency = 2 + Math.random() * 3; // Random wave frequency
      const wavePhase = Math.random() * 360; // Random starting phase
      
      return (
        <motion.div
          key={`orbit-${i}`}
          className="absolute orbit-line"
          style={{
            width: `${orbitSize}%`,
            height: `${orbitSize}%`,
            left: "50%",
            top: "50%",
            marginLeft: `-${offset}%`,
            marginTop: `-${offset}%`,
            borderRadius: "50%",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Create wavey SVG path instead of border */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id={`glow-${i}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d=""
              fill="none"
              stroke={`rgba(8, 145, 178, ${0.1 - i * 0.01})`}
              strokeWidth="1"
              strokeDasharray={i % 2 === 0 ? "4 2" : ""}
              filter={`url(#glow-${i})`}
              className={`wavey-orbit-path-${i}`}
            />
          </svg>
        </motion.div>
      );
    });
  };

  // Calculate positions for cards in a circle around the central logo
  const getCardPosition = (index: number) => {
    // Calculate the angle for this card's position in the circle
    // We rotate it so the active card is at the top (270 degrees)
    const angleOffset = 270;
    const angleStep = 360 / totalCards;
    
    // Adjust to position the active card at the top
    const adjustedIndex = (index - activeCardIndex + totalCards) % totalCards;
    const angle = angleOffset + (adjustedIndex * angleStep);
    
    // Convert to radians for the trig functions
    const radians = (angle * Math.PI) / 180;
    
    // Calculate the scale factor based on the card's position
    // Active card (at top) has scale 1, cards further away are smaller
    const scale = adjustedIndex === 0 ? 1 : 0.8;
    
    // Calculate z-index to ensure proper stacking
    const zIndex = totalCards - adjustedIndex;
    
    return {
      angle: radians,
      scale,
      zIndex,
      isActive: adjustedIndex === 0
    };
  };

  // Update orbit SVG paths on component mount and when window resizes
  useEffect(() => {
    const updateWaveyPaths = () => {
      [...Array(6)].forEach((_, i) => {
        const path = document.querySelector(`.wavey-orbit-path-${i}`);
        if (!path) return;
        
        const svgElement = path.closest('svg');
        if (!svgElement) return;
        
        const width = svgElement.clientWidth;
        const height = svgElement.clientHeight;
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(cx, cy) - 2;
        
        // Create random wave pattern
        const waveAmplitude = 3 + Math.random() * 5; // Random wave height
        const waveFrequency = 8 + Math.random() * 4; // Random wave frequency
        const wavePhase = Math.random() * Math.PI * 2; // Random starting phase
        
        let d = "M ";
        
        // Generate points around the circle with wave effect
        for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 180) {
          // Add wave effect to radius
          const waveEffect = waveAmplitude * Math.sin(angle * waveFrequency + wavePhase);
          const r = radius + waveEffect;
          
          // Calculate point position
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          
          if (angle === 0) {
            d += `${x} ${y}`;
          } else {
            d += ` L ${x} ${y}`;
          }
        }
        
        d += " Z"; // Close the path
        path.setAttribute('d', d);
      });
    };
    
    // Initial update
    updateWaveyPaths();
    
    // Update on resize
    window.addEventListener('resize', updateWaveyPaths);
    
    return () => {
      window.removeEventListener('resize', updateWaveyPaths);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen h-[150vh] overflow-hidden bg-black" 
      id="global-process-section"
      onWheel={handleWheel}
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
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 space-background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" />
      </div>

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => {
          const width = Math.random() * 2 + 1;
          const posLeft = Math.random() * 100;
          const posTop = Math.random() * 100;
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white star"
              style={{
                width: `${width}px`,
                height: `${width}px`,
                left: `${posLeft}%`,
                top: `${posTop}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Wavey orbital lines */}
      <div className="absolute inset-0 overflow-hidden">
        {createWaveyOrbits()}
      </div>

      {/* Dynamic data particles */}
      <div className="absolute inset-0 overflow-hidden">
        {createParticles()}
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
            {/* Central logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute z-20 flex items-center justify-center"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-black/80 backdrop-blur-lg flex items-center justify-center border-4 border-cyan-500/50 shadow-glow">
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
            
            {/* Cards positioned in a circle around the logo */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const { angle, scale, zIndex, isActive } = getCardPosition(index);
              
              // Calculate transforms for positioning on the orbital circle
              // Use a larger radius so cards orbit around the central logo
              const radius = 48; // % of viewport height
              const translateX = Math.cos(angle) * radius;
              const translateY = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    zIndex: zIndex,
                    left: "50%",
                    top: "50%",
                    width: isActive ? '450px' : '360px',
                    transform: `translate(calc(-50% + ${translateX}vh), calc(-50% + ${translateY}vh)) scale(${scale})`
                  }}
                  animate={{
                    transform: `translate(calc(-50% + ${translateX}vh), calc(-50% + ${translateY}vh)) scale(${scale})`
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  onClick={() => setActiveCardIndex(index)}
                >
                  <motion.div 
                    className={`cursor-pointer transform transition-all duration-500 ${isActive ? 'scale-100' : 'scale-95 hover:scale-100'}`}
                  >
                    <div className={`p-6 rounded-lg bg-black/60 backdrop-blur-lg border overflow-hidden relative
                      ${isActive 
                        ? "border-cyan-500/50 shadow-glow" 
                        : "border-cyan-500/20"}`}
                    >
                      {/* Enhanced glow effect */}
                      <div 
                        className={`absolute w-40 h-40 rounded-full transition-all duration-700 glow-effect
                          ${isActive 
                            ? "bg-cyan-500/20 blur-2xl" 
                            : "bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20"}
                          right-0 -top-20`}
                      />
                      
                      <div className="relative z-10">
                        {/* Icon with enhanced styling */}
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center step-icon
                              ${isActive 
                                ? "bg-cyan-800/50" 
                                : "bg-cyan-900/30"}`}
                            animate={isActive ? { 
                              boxShadow: [
                                "0 0 0px rgba(8, 145, 178, 0.4)",
                                "0 0 16px rgba(8, 145, 178, 0.6)",
                                "0 0 0px rgba(8, 145, 178, 0.4)"
                              ] 
                            } : {}}
                            transition={{ 
                              duration: 3, 
                              repeat: isActive ? Infinity : 0,
                              ease: "easeInOut" 
                            }}
                          >
                            <Icon className={`w-6 h-6 ${isActive ? "text-cyan-300" : "text-cyan-400"}`} />
                          </motion.div>
                          
                          <span className={`text-xl font-bold transition-colors duration-300
                            ${isActive ? "text-cyan-200" : "text-white"}`}>
                            {index + 1}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <div className="text-left">
                          <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300
                            ${isActive ? "text-cyan-200" : "text-white"}`}>
                            {step.title}
                          </h3>
                          <p className="text-cyan-100 mb-4 whitespace-pre-line leading-relaxed opacity-90">
                            {step.description}
                          </p>
                          {step.stats && (
                            <motion.div 
                              className={`font-bold px-3 py-1 rounded-md inline-block stats-badge
                                ${isActive ? "text-cyan-200 bg-cyan-900/50" : "text-cyan-500"}`}
                              animate={isActive ? { 
                                backgroundColor: ["rgba(8, 145, 178, 0.2)", "rgba(8, 145, 178, 0.3)", "rgba(8, 145, 178, 0.2)"] 
                              } : {}}
                              transition={{ 
                                duration: 3, 
                                repeat: isActive ? Infinity : 0,
                                ease: "easeInOut" 
                              }}
                            >
                              {step.stats}
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      {/* Enhanced border glow effect */}
                      <motion.div 
                        className={`absolute inset-0 border rounded-lg transition-all duration-500 card-border
                          ${isActive 
                            ? "border-cyan-500/60" 
                            : "border-cyan-500/20"}`}
                        animate={isActive ? { 
                          boxShadow: [
                            "inset 0 0 8px rgba(8, 145, 178, 0.3)",
                            "inset 0 0 16px rgba(8, 145, 178, 0.5)",
                            "inset 0 0 8px rgba(8, 145, 178, 0.3)"
                          ] 
                        } : {}}
                        transition={{ 
                          duration: 3, 
                          repeat: isActive ? Infinity : 0,
                          ease: "easeInOut" 
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Navigation dots - moved further down */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
            {steps.map((_, index) => (
              <button
                key={`nav-${index}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeCardIndex 
                    ? "bg-cyan-400 w-8" 
                    : "bg-cyan-800 hover:bg-cyan-600"
                }`}
                onClick={() => setActiveCardIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call-to-action button - moved further down */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center absolute bottom-8 right-0.5 flex items-center justify-center w-full"
        >
          <Link href="/plans">
            <button
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Get Started Today
            </button>
          </Link>
        </motion.div>
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

// Also include default export for flexibility
export default GlobalProcess;