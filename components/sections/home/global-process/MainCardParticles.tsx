import React, { useMemo } from "react"
import { motion } from "framer-motion"

interface MainCardParticlesProps {
  isHovering: boolean
  mousePosition: { x: number, y: number }
}

export function MainCardParticles({ isHovering, mousePosition }: MainCardParticlesProps) {
  // Don't render if not hovering to save resources
  if (!isHovering) return null
  
  // Use fewer particles on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 5 : 10;
  
  // Pre-calculate random values for better performance
  const particles = useMemo(() => {
    return [...Array(particleCount)].map((_, i) => ({
      id: i,
      xFactor: (Math.random() - 0.5) * (isMobile ? 100 : 200),
      yFactor: (Math.random() - 0.5) * (isMobile ? 100 : 200),
      duration: 1 + Math.random() * (isMobile ? 0.5 : 1.0),
      size: isMobile ? 0.5 + Math.random() * 0.5 : 1 // Smaller particles on mobile
    }));
  }, [particleCount, isMobile]);
  
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: "transform, opacity" // Performance hint
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            x: mousePosition.x + particle.xFactor,
            y: mousePosition.y + particle.yFactor,
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}