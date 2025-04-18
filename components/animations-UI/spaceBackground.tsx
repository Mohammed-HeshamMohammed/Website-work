// spaceBackground.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SpaceBackgroundProps {
  children?: React.ReactNode;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create stars for background
  const generateStars = () => {
    const starCount = isMobile ? 100 : 250;
    return Array.from({ length: starCount }).map((_, i) => {
      const size = Math.random() * 3 + 0.5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 4 + 2;
      const delay = Math.random() * 5;
      
      return (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    });
  };

  // Create shooting stars
  const generateShootingStars = () => {
    return Array.from({ length: 5 }).map((_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const angle = Math.random() * 45;
      const delay = i * 4 + Math.random() * 5;
      
      return (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute h-px bg-white z-10"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            left: `${startX}%`,
            top: `${startY}%`,
            transform: `rotate(${angle}deg)`,
            opacity: 0,
          }}
          animate={{
            x: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay,
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeOut",
          }}
        />
      );
    });
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Enhanced space background with parallax layers */}
      <div className="absolute inset-0 bg-black">
        {/* Deep space gradient with more depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-black to-black" />
        
        {/* Multiple nebula effects with improved glow */}
        <motion.div 
          className="absolute inset-0 bg-indigo-900/15 rounded-full blur-3xl"
          style={{ width: '90%', height: '90%', left: '5%', top: '5%' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute rounded-full blur-3xl"
          style={{ width: '70%', height: '70%', left: '15%', top: '10%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(0,0,0,0) 70%)' }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional nebula for visual depth */}
        <motion.div 
          className="absolute rounded-full blur-3xl"
          style={{ width: '50%', height: '50%', right: '5%', bottom: '5%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(0,0,0,0) 70%)' }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Dynamic stars with enhanced twinkling effect */}
        {generateStars()}
        
        {/* Shooting stars */}
        {generateShootingStars()}
      </div>

      {/* Enhanced orbital lines with more variation */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => {
          const size = (i + 1) * 12;
          return (
            <motion.div
              key={`orbit-${i}`}
              className="absolute rounded-full border"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                left: `${50 - size/2}%`,
                top: `${50 - size/2}%`,
                borderColor: i % 2 === 0 ? 'rgba(6,182,212,0.12)' : 'rgba(79,70,229,0.12)',
                borderWidth: `${i % 3 === 0 ? 2 : 1}px`
              }}
              animate={{ 
                rotate: i % 2 === 0 ? 360 : -360,
                borderColor: i % 2 === 0 
                  ? ['rgba(6,182,212,0.12)', 'rgba(6,182,212,0.35)', 'rgba(6,182,212,0.12)']
                  : ['rgba(79,70,229,0.12)', 'rgba(79,70,229,0.35)', 'rgba(79,70,229,0.12)']
              }}
              transition={{ 
                rotate: { duration: 70 + i * 15, repeat: Infinity, ease: "linear" },
                borderColor: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          );
        })}
      </div>

      {/* Content container */}
      <div className="relative w-full h-full">
        {children}
      </div>

      {/* Global styles for space effect */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100vw;
        }
        
        .cosmic-glow {
          text-shadow: 0 0 15px rgba(8, 145, 178, 0.7), 0 0 30px rgba(8, 145, 178, 0.4);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

// Animation utility functions for reuse across components
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
};

export const pulseTransition = {
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut",
};

export const glowAnimation = {
  boxShadow: [
    "0 0 0 0 rgba(8, 145, 178, 0.6)",
    "0 0 20px 5px rgba(8, 145, 178, 0.4)",
    "0 0 0 0 rgba(8, 145, 178, 0.6)",
  ],
};

export const textGlowAnimation = (color: string = "cyan") => {
  const colorValues = {
    cyan: "rgba(8, 145, 178, 0.7)",
    blue: "rgba(66, 153, 225, 0.7)",
  };
  
  const baseColor = colorValues[color as keyof typeof colorValues] || colorValues.cyan;
  
  return {
    textShadow: [
      `0 0 15px ${baseColor}, 0 0 30px ${baseColor.replace("0.7", "0.4")}`,
      `0 0 25px ${baseColor.replace("0.7", "0.9")}, 0 0 45px ${baseColor.replace("0.7", "0.6")}`,
      `0 0 15px ${baseColor}, 0 0 30px ${baseColor.replace("0.7", "0.4")}`
    ]
  };
};

export default SpaceBackground;