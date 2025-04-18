import React from "react";
import { motion } from "framer-motion";
import styles from "@/components/sections/home/css/GlobalProcess.module.css";

interface ParticlesProps {
  isMobile?: boolean;
}

const Particles: React.FC<ParticlesProps> = ({ isMobile = false }) => {
  // Reduce star count on mobile for better performance
  const starCount = isMobile ? 30 : 80;
  
  return (
    <>
      {[...Array(starCount)].map((_, i) => {
        // Smaller stars on mobile
        const width = isMobile ?
          Math.random() * 1.5 + 0.5 :  // Smaller on mobile
          Math.random() * 2 + 1;       // Original desktop size
        
        const posLeft = Math.random() * 100;
        const posTop = Math.random() * 100;
        
        // Faster animation on mobile
        const duration = isMobile 
          ? Math.random() * 1.5 + 1  // Faster on mobile
          : Math.random() * 3 + 2;   // Original speed
          
        return (
          <motion.div
            key={`star-${i}`}
            className={styles.star}
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
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
};

export default Particles;