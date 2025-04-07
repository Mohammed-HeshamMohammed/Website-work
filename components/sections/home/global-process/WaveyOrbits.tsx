// WaveyOrbits.tsx
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "@/components/sections/home/css/SpaceOrbits.module.css";
import globalStyles from "@/components/sections/home/css/GlobalProcess.module.css";

const WaveyOrbits = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number; blinkDelay: number }[]>([]);
  const [pentagons, setPentagons] = useState<{ startX: number; startY: number; size: number; duration: number; delay: number }[]>([]);
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

  // Generate random stars and cosmic waves
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      // Reduce star count on mobile
      const starCount = isMobile ? 40 : 60;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.4,
          blinkDelay: Math.random() * 5
        });
      }
      setStars(newStars);
    };

    // Generate pentagon starting positions
    const generatePentagons = () => {
      const shapes = [];
      // Reduce pentagon count on mobile
      const pentagonCount = isMobile ? 5 : 8;
      
      // Create pentagons that will start in the center and bounce to edges
      for (let i = 0; i < pentagonCount; i++) {
        shapes.push({
          startX: 50, // Start at center
          startY: 60, // Start at center
          size: isMobile ? (15 + Math.random() * 10) : (20 + Math.random() * 15),
          duration: 8 + Math.random() * 12,
          delay: Math.random() * 10
        });
      }
      setPentagons(shapes);
    };
    
    generateStars();
    generatePentagons();
  }, [isMobile]);

  const createWaveyOrbits = useCallback(() => {
    // Reduce orbits on mobile
    const orbitCount = isMobile ? 3 : 5;
    
    const orbits = [...Array(orbitCount)].map((_, i) => {
      // Adjust orbit sizes for mobile
      const orbitSize = isMobile 
        ? (i + 3) * 18 // Slightly larger orbits on mobile for better visibility
        : (i + 4) * 15;
      
      const offset = orbitSize / 2;
      
      const orbitColors = [
        "rgba(0, 200, 255, 0.4)",  // Bright blue
        "rgba(160, 120, 255, 0.35)", // Purple
        "rgba(255, 140, 70, 0.3)",  // Orange
        "rgba(70, 230, 255, 0.25)",  // Cyan
        "rgba(255, 255, 255, 0.2)",  // White
      ];
      
      return (
        <motion.div
          key={`orbit-${i}`}
          className={`${globalStyles.orbitLine} ${styles.orbitWrapper}`}
          style={{
            width: `${orbitSize}%`,
            height: `${orbitSize}%`,
            marginLeft: `-${offset}%`,
            marginTop: `-${offset}%`,
            zIndex: 5 - i,
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: isMobile ? (60 + i * 15) : (80 + i * 20), // Slightly faster on mobile
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          <svg className={styles.orbitSvg}>
            <defs>
              <filter id={`glow-${i}`}>
                <feGaussianBlur stdDeviation={isMobile ? "3" : "4"} result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={orbitColors[i % orbitColors.length]} />
                <stop offset="50%" stopColor={orbitColors[(i + 2) % orbitColors.length]} />
                <stop offset="100%" stopColor={orbitColors[i % orbitColors.length]} />
              </linearGradient>
            </defs>
            <path
              d=""
              fill="none"
              stroke={`url(#gradient-${i})`}
              strokeWidth={isMobile ? (1.5 - i * 0.15) : (2 - i * 0.2)}
              strokeDasharray={i % 3 === 0 ? "8 4" : i % 3 === 1 ? "4 3" : ""}
              filter={`url(#glow-${i})`}
              className={`wavey-orbit-path-${i}`}
            />
          </svg>
        </motion.div>
      );
    });

    return orbits;
  }, [isMobile]);

  // Render pentagon shapes that bounce between edges
  const renderPentagonWaves = useCallback(() => {
    // Function to create a pentagon SVG path
    const createPentagonPath = (size: number) => {
      const points = [];
      const sides = 5; // Pentagon has 5 sides
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2; // Start from top
        const x = size / 2 + (size / 2) * Math.cos(angle);
        const y = size / 2 + (size / 2) * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return `M ${points.join(' L ')} Z`;
    };

    return pentagons.map((pentagon, i) => {
      // Generate random edge targets
      const targetEdges = [
        // [x, y] pairs for different edges
        [Math.random() * 80 + 10, 0],  // top edge
        [100, Math.random() * 80 + 10], // right edge
        [Math.random() * 80 + 10, 100], // bottom edge
        [0, Math.random() * 80 + 10],   // left edge
      ];

      // Pick one random edge as the target
      const targetEdge = targetEdges[Math.floor(Math.random() * targetEdges.length)];

      return (
        <motion.div
          key={`pentagon-${i}`}
          className={styles.pentagon}
          style={{
            left: `${pentagon.startX}%`,
            top: `${pentagon.startY}%`,
            width: `${pentagon.size}%`,
            height: `${pentagon.size}%`,
          }}
          initial={{ 
            x: "-50%", 
            y: "-50%", 
            opacity: 0,
            scale: 0.2,
            rotate: 0
          }}
          animate={{
            x: [`-50%`, `${targetEdge[0] - pentagon.startX}%`],
            y: [`-50%`, `${targetEdge[1] - pentagon.startY}%`],
            opacity: [0, 0.6, 0],
            scale: [0.2, 0.9, 0.2],
            rotate: [0, i % 2 === 0 ? 180 : -180]
          }}
          transition={{
            duration: pentagon.duration,
            repeat: Infinity,
            delay: pentagon.delay,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            className={styles.pentagonSvg}
          >
            <path
              d={createPentagonPath(100)}
              className={styles.pentagonPath}
            />
          </svg>
        </motion.div>
      );
    });
  }, [pentagons]);

  // Render nebula-like cosmic clouds - centered around the middle
  const renderNebulaEffects = useCallback(() => {
    // Create nebula cloud effects centered around the middle
    // Reduce and simplify nebulae for mobile
    const nebulae = isMobile ? [
      { x: 50, y: 45, size: 40, color: "rgba(30, 80, 200, 0.06)" },
      { x: 50, y: 55, size: 35, color: "rgba(180, 100, 220, 0.05)" },
    ] : [
      { x: 50, y: 40, size: 40, color: "rgba(30, 80, 200, 0.06)" },
      { x: 50, y: 60, size: 35, color: "rgba(180, 100, 220, 0.05)" },
      { x: 40, y: 50, size: 30, color: "rgba(80, 220, 255, 0.04)" },
      { x: 60, y: 50, size: 35, color: "rgba(120, 180, 240, 0.05)" },
    ];

    return nebulae.map((nebula, i) => (
      <motion.div
        key={`nebula-${i}`}
        className={`${styles.nebula} ${isMobile ? styles.nebulaMobile : ''}`}
        style={{
          left: `${nebula.x}%`,
          top: `${nebula.y}%`,
          width: `${nebula.size}%`,
          height: `${nebula.size * 0.7}%`,
          background: `radial-gradient(ellipse at center, ${nebula.color} 0%, rgba(0,0,0,0) 70%)`,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 10 + i * 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ));
  }, [isMobile]);

  // Render energetic particles that float through space - ensure they move through the center
  const renderSpaceParticles = useCallback(() => {
    // Reduce particles for mobile
    const particleCount = isMobile ? 12 : 20;
    
    return [...Array(particleCount)].map((_, i) => {
      // Start particles from various angles but ensure they move through or near center
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 20; // Distance from center
      
      const startX = 50 + Math.cos(angle) * distance;
      const startY = 50 + Math.sin(angle) * distance;
      
      // Make some particles cross through the center
      const endAngle = angle + Math.PI + (Math.random() * 0.5 - 0.25);
      const endDistance = 30 + Math.random() * 20;
      
      const endX = 50 + Math.cos(endAngle) * endDistance;
      const endY = 50 + Math.sin(endAngle) * endDistance;
      
      const size = Math.random() * 1.5 + 0.5;
      const duration = isMobile ? (12 + Math.random() * 15) : (15 + Math.random() * 20); // Faster on mobile
      const delay = Math.random() * 10;

      return (
        <motion.div
          key={`particle-${i}`}
          className={styles.spaceParticle}
          style={{
            left: `${startX}%`,
            top: `${startY}%`,
            width: `${size}px`,
            height: `${size}px`,
          }}
          animate={{
            left: [`${startX}%`, `${endX}%`],
            top: [`${startY}%`, `${endY}%`],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
          }}
        />
      );
    });
  }, [isMobile]);

  // Render stars - these can remain distributed
  const renderStars = useCallback(() => {
    return stars.map((star, i) => (
      <motion.div
        key={`star-${i}`}
        className={styles.star}
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
        }}
        animate={{
          opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: star.blinkDelay,
          ease: "easeInOut"
        }}
      />
    ));
  }, [stars]);

  // Render subtle aurora effects at the edges
  const renderAuroraEffects = useCallback(() => {
    // For mobile, simplify the aurora effects
    const waveCount = isMobile ? 3 : 5;
    
    const auroraPositions = [
      { side: "top", className: styles.auroraTop },
      { side: "bottom", className: styles.auroraBottom }
    ];

    return auroraPositions.map((pos, i) => (
      <div key={`aurora-${i}`} className={pos.className}>
        {/* Add some animated noise to the aurora */}
        {[...Array(waveCount)].map((_, j) => (
          <motion.div
            key={`aurora-wave-${i}-${j}`}
            className={`${styles.auroraWave} ${isMobile ? styles.auroraWaveMobile : ''}`}
            style={{
              left: `${j * (100 / waveCount)}%`,
            }}
            animate={{
              left: [`${j * (100 / waveCount)}%`, `${(j * (100 / waveCount) + 100) % 100}%`]
            }}
            transition={{
              duration: (20 + j * 5) * (isMobile ? 0.8 : 1), // Slightly faster on mobile
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    ));
  }, [isMobile]);

  // Render location markers - arrange in a circle around the center
  const renderLocationMarkers = useCallback(() => {
    // Fewer markers on mobile
    const totalMarkers = isMobile ? 4 : 6;
    // Smaller radius for mobile
    const radius = isMobile ? 12 : 15;
    
    const locations = [...Array(totalMarkers)].map((_, i) => {
      const angle = (i * 2 * Math.PI / totalMarkers);
      return {
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle)
      };
    });

    return locations.map((loc, i) => (
      <motion.div
        key={`location-${i}`}
        className={`${styles.locationMarker} ${isMobile ? styles.locationMarkerMobile : ''}`}
        style={{
          left: `${loc.x}%`,
          top: `${loc.y}%`,
        }}
        animate={{
          boxShadow: [
            "0 0 8px rgba(0, 160, 255, 0.8)",
            "0 0 12px rgba(0, 160, 255, 0.9)",
            "0 0 8px rgba(0, 160, 255, 0.8)"
          ],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={`${styles.locationMarkerInner} ${isMobile ? styles.locationMarkerInnerMobile : ''}`} />
      </motion.div>
    ));
  }, [isMobile]);

  // Update the SVG paths on mount and when window resizes
  useEffect(() => {
    const updateWaveyPaths = () => {
      // Adjust for mobile: fewer orbits
      const orbitCount = isMobile ? 3 : 5;
      
      [...Array(orbitCount)].forEach((_, i) => {
        const path = document.querySelector(`.wavey-orbit-path-${i}`);
        if (!path) return;
        const svgElement = path.closest("svg");
        if (!svgElement) return;
        const width = svgElement.clientWidth;
        const height = svgElement.clientHeight;
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(cx, cy) - 2;
        
        // Enhanced wave patterns for more cosmic feel
        // Slightly reduce complexity on mobile
        const frequency = isMobile ? (1.5 + i * 0.4) : (2 + i * 0.5);
        const amplitude = isMobile ? (2.5 - i * 0.3) : (3 - i * 0.4);
        const offset = i * Math.PI / 4;
        
        let d = "M ";
        for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 180) {
          // More complex wave pattern with multiple frequencies
          // Simplified for mobile
          const waveEffect = isMobile 
            ? amplitude * Math.sin(angle * frequency + offset) +
              (amplitude/2) * Math.sin(angle * (frequency * 0.5) + offset * 2)
            : amplitude * Math.sin(angle * frequency + offset) + 
              (amplitude/2) * Math.sin(angle * (frequency * 0.5) + offset * 2) +
              (amplitude/4) * Math.cos(angle * (frequency * 2) + offset);
          
          const r = radius + waveEffect;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          d += angle === 0 ? `${x} ${y}` : ` L ${x} ${y}`;
        }
        d += " Z";
        path.setAttribute("d", d);
      });
    };
    
    updateWaveyPaths();
    window.addEventListener("resize", updateWaveyPaths);
    return () => window.removeEventListener("resize", updateWaveyPaths);
  }, [isMobile]);

  return (
    <div className={styles.spaceContainer}>
      {renderNebulaEffects()}
      {renderAuroraEffects()}
      {renderStars()}
      {createWaveyOrbits()}
      {renderSpaceParticles()}
      {renderLocationMarkers()}
      {renderPentagonWaves()}
    </div>
  );
};

export default WaveyOrbits;