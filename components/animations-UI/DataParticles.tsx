import React from "react";
import { motion } from "framer-motion";
import styles from "@/components/sections/home/css/GlobalProcess.module.css";

interface DataParticlesProps {
  isMobile?: boolean;
}

const DataParticles: React.FC<DataParticlesProps> = ({ isMobile = false }) => {
  const createParticles = () => {
    // Fewer particles on mobile for better performance
    const particleCount = isMobile ? 6 : 12;
    
    return [...Array(particleCount)].map((_, i) => {
      // Calculate smaller orbit for mobile
      const orbitSize = isMobile ? 
        (i % 3 + 2) * 8 :  // Smaller orbits for mobile
        (i % 4 + 3) * 12;  // Original desktop size
      
      const angle = Math.random() * 360;
      const radius = orbitSize / 2;
      
      // Faster animation on mobile for better responsiveness
      const duration = isMobile ? 
        (10 + Math.random() * 5) :  // Faster on mobile
        (20 + Math.random() * 15);  // Original desktop speed
      
      // Smaller particles on mobile
      const size = isMobile ?
        Math.random() * 1.5 + 0.5 :  // Smaller on mobile
        Math.random() * 2 + 1;       // Original desktop size
      
      const color = i % 3 === 0 ? "bg-cyan-400" : i % 3 === 1 ? "bg-cyan-500" : "bg-blue-500";
      
      return (
        <motion.div
          key={`node-${i}`}
          className={`absolute rounded-full ${color} ${styles.nodeParticle}`}
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

  return <>{createParticles()}</>;
};

export default DataParticles;