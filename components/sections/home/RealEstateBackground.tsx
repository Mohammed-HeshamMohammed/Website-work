"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { useMemo } from "react"

interface RealEstateBackgroundProps {
  scrollYProgress: MotionValue<number>;
  imagePath?: string;
}

export function RealEstateBackground({ 
  scrollYProgress, 
  imagePath = "/logo.png" 
}: RealEstateBackgroundProps) {
  // Pre-compute window positions for better performance
  const windows = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: `window-${i}`,
      x: Math.random() * 1200,
      y: 90 + Math.random() * 100,
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  // Memoize the office building windows
  const officeWindows1 = useMemo(() => 
    Array.from({ length: 5 }).map((_, i) => ({
      id: `window-1-${i}`,
      y: 110 + i * 15
    })),
    []
  );

  const officeWindows2 = useMemo(() => 
    Array.from({ length: 6 }).map((_, i) => ({
      id: `window-2-${i}`,
      x: 430 + i * 18
    })),
    []
  );

  // Transform scroll progress to opacity
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* Grid pattern - optimized SVG */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="data-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="0.5" />
            <path d="M 0 12.5 L 50 12.5 M 0 25 L 50 25 M 0 37.5 L 50 37.5" fill="none" stroke="#334155" strokeWidth="0.2" />
            <path d="M 12.5 0 L 12.5 50 M 25 0 L 25 50 M 37.5 0 L 37.5 50" fill="none" stroke="#334155" strokeWidth="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#data-grid)" />
        </svg>
      </div>
      
      {/* Gradient background with scroll-based opacity */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-emerald-50/30"
        style={{ opacity: gradientOpacity }}
      />
      
      {/* Centered logo/image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative w-96 h-96">
          <Image 
            src={imagePath} 
            alt="Centered image" 
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Skyline silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-1/4">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 200" 
          preserveAspectRatio="xMidYMax slice" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Building groups - organized by region */}
            {/* Left region buildings */}
            <g>
              {/* Building 1 */}
              <rect x="0" y="120" width="70" height="80" fill="#334155" />
              <rect x="10" y="100" width="50" height="20" fill="#334155" />
              <rect x="20" y="80" width="30" height="20" fill="#334155" />
              
              {/* Building 2 */}
              <rect x="80" y="140" width="60" height="60" fill="#334155" />
              <rect x="90" y="120" width="40" height="20" fill="#334155" />
            </g>

            {/* Office district */}
            <g>
              {/* Building 3 - Office */}
              <rect x="150" y="100" width="80" height="100" fill="#334155" />
              <g opacity="0.3">
                {officeWindows1.map(window => (
                  <rect 
                    key={window.id} 
                    x="160" 
                    y={window.y} 
                    width="60" 
                    height="10" 
                    fill="#E2E8F0" 
                  />
                ))}
              </g>
              
              {/* Building 4 */}
              <rect x="240" y="130" width="50" height="70" fill="#334155" />
              <rect x="250" y="110" width="30" height="20" fill="#334155" />
            </g>
            
            {/* Central district */}
            <g>
              {/* Building 5 - Modern tower */}
              <rect x="300" y="90" width="40" height="110" fill="#334155" />
              <polygon points="300,90 320,70 340,90" fill="#334155" />
              
              {/* Building 6 */}
              <rect x="350" y="120" width="60" height="80" fill="#334155" />
              
              {/* Building 7 - Wide office building */}
              <rect x="420" y="110" width="120" height="90" fill="#334155" />
              <g opacity="0.3">
                {officeWindows2.map(window => (
                  <rect 
                    key={window.id} 
                    x={window.x} 
                    y="120" 
                    width="12" 
                    height="70" 
                    fill="#E2E8F0" 
                  />
                ))}
              </g>
              
              {/* Building 8 */}
              <rect x="550" y="140" width="50" height="60" fill="#334155" />
            </g>
            
            {/* Residential district */}
            <g>
              {/* Building 9 - Residential complex */}
              <rect x="610" y="130" width="80" height="70" fill="#334155" />
              <rect x="620" y="110" width="60" height="20" fill="#334155" />
              <rect x="630" y="90" width="40" height="20" fill="#334155" />
              
              {/* Building 10 */}
              <rect x="700" y="120" width="40" height="80" fill="#334155" />
              
              {/* Building 11 - Small towers */}
              <rect x="750" y="135" width="30" height="65" fill="#334155" />
              <rect x="790" y="125" width="30" height="75" fill="#334155" />
              <rect x="830" y="145" width="30" height="55" fill="#334155" />
            </g>
            
            {/* Right region buildings */}
            <g>
              {/* Building 12 - Modern structure */}
              <rect x="870" y="110" width="90" height="90" fill="#334155" />
              <rect x="890" y="90" width="50" height="20" fill="#334155" />
              
              {/* Building 13 */}
              <rect x="970" y="130" width="60" height="70" fill="#334155" />
              
              {/* Building 14 */}
              <rect x="1040" y="120" width="70" height="80" fill="#334155" />
              <rect x="1050" y="100" width="50" height="20" fill="#334155" />
              
              {/* Building 15 */}
              <rect x="1120" y="140" width="80" height="60" fill="#334155" />
            </g>
          </motion.g>
          
          {/* Building windows - optimized rendering */}
          <g opacity="0.4">
            {windows.map(window => (
              <rect 
                key={window.id} 
                x={window.x} 
                y={window.y} 
                width={window.width} 
                height={window.height} 
                fill="#E2E8F0" 
                opacity={window.opacity} 
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default RealEstateBackground;