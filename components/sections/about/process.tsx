"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { processSteps } from "@/components/sections/home/Content-Data/data"
import { styles } from "@/components/sections/about/css/Process.styles"
import { Clock, BarChart2, Award, Sprout, Handshake } from 'lucide-react'

// Map icons to step numbers more efficiently
const ICON_MAP = {
  "Clock": Clock,
  "BarChart2": BarChart2,
  "Award": Award,
  "Sprout": Sprout,
  "Handshake": Handshake
};

export function AboutProcess() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Enhanced scroll-driven animations
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8])
  
  // Track scroll position for parallax effects
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to the corresponding global process section
  const scrollToSection = (stepNumber: string) => {
    const sectionId = `global-process-step-${stepNumber}`;
    const targetElement = document.getElementById(sectionId);
    
    setActiveStep(stepNumber);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const globalProcessSection = document.getElementById('global-process-section');
      if (globalProcessSection) {
        globalProcessSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Reset active step after animation completes
    setTimeout(() => setActiveStep(null), 2000);
  };

  // Memoizable components
  const renderHeaderContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={styles.headerContainer}
      style={{ transform: `translateY(${scrollY * 0.1}px)` }}
    >
      <motion.div 
        className={styles.titleWrapper}
        whileInView={{
          scale: [0.9, 1.05, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }}
        viewport={{ once: true }}
      >
        <span className={styles.titleAccent}>Our</span>
        <h2 id="process-section-title" className={styles.title}>Vision</h2>
      </motion.div>          
      <motion.div 
        className={styles.titleDivider}
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-slate-600 text-sm max-w-md mx-auto mt-3 text-center"
      >
        Our data-driven approach connects buyers and sellers through advanced analytics and personalized service
      </motion.p>
    </motion.div>
  );

  const renderProcessCard = (step: any, index: number) => {
    const isLast = index === processSteps.length - 1;
    const isLeft = !isLast && index % 2 === 0;
    const isHovered = hoveredCard === step.number;
    const isActive = activeStep === step.number;
    const IconComponent = ICON_MAP[step.number as keyof typeof ICON_MAP];

    return (
      <motion.div
        key={step.number}
        initial={{ opacity: 0, x: isLast ? 0 : isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className={isLast ? styles.lastCard : ""}
        style={{ transform: `translateY(${scrollY * 0.03 * (index % 2 === 0 ? 1 : -1)}px)` }}
      >
        <Card 
          className={`${styles.card} group backdrop-blur-sm bg-white/90 hover:bg-white/95 transition-colors duration-300 shadow-md hover:shadow-lg border border-blue-50`}
          onMouseEnter={() => setHoveredCard(step.number)}
          onMouseLeave={() => setHoveredCard(null)}
          onFocus={() => setHoveredCard(step.number)}
          onBlur={() => setHoveredCard(null)}
          tabIndex={0}
        >
          {/* Icon badge */}
          <div className={styles.numberBadgeWrapper}>
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8] text-white font-bold text-lg shadow-md"
              whileHover={{ 
                rotate: [0, -10, 10, 0], 
                scale: 1.15,
                boxShadow: "0 10px 25px -5px rgba(0, 180, 216, 0.5)" 
              }}
              animate={isHovered || isActive ? {
                scale: [1, 1.12, 1.05],
                transition: { duration: 0.5, ease: "easeOut" }
              } : {}}
            >
              {IconComponent && <IconComponent size={24} className="text-white" />}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            <motion.div 
              className="absolute -inset-1 bg-blue-400/20 rounded-xl blur-xl"
              animate={isHovered || isActive ? { scale: 1.2, opacity: 0.4 } : { scale: 1, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {isActive && (
              <motion.div
                className="absolute -inset-4 rounded-xl border border-[#00B4D8]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: 2,
                  ease: "easeOut"
                }}
              />
            )}
          </div>

          {/* Card content */}
          <div className="ml-5 flex-1">
            <motion.h3 
              className="text-lg font-semibold mb-2 text-[#03045e]"
              animate={isHovered || isActive ? { color: "#00B4D8", x: 3 } : { color: "#03045e", x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step.title}
            </motion.h3>
            
            <motion.p 
              className="text-slate-600 text-sm"
              animate={isHovered || isActive ? { opacity: 1 } : { opacity: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {step.description}
            </motion.p>
            
            {/* Data point indicators */}
            <div className="flex mt-2 space-x-1.5 opacity-60">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`dot-${step.number}-${i}`}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                  animate={{
                    scale: isHovered || isActive ? [1, 1.5, 1] : 1,
                    opacity: isHovered || isActive ? 1 : 0.6
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: isHovered || isActive ? Infinity : 0,
                    repeatDelay: 0.5
                  }}
                />
              ))}
            </div>
            
            {/* Learn more button - show only when needed */}
            {(isHovered || isActive) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="text-[#00B4D8] text-sm font-medium mt-3 flex items-center cursor-pointer hover:text-[#0077B6] transition-colors"
                onClick={() => scrollToSection(step.number)}
                aria-label={`Learn more about ${step.title}`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00B4D8] mr-2 animate-pulse" />
                Learn more
              </motion.button>
            )}
          </div>

          {/* Card effects - render only when active */}
          {(isHovered || isActive) && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#03045e]/3 to-[#00B4D8]/5 -z-10"
                style={{ filter: "blur(15px)" }}
              />
              
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-px h-12 opacity-30"
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="2" height="48" viewBox="0 0 2 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="0" x2="1" y2="48" stroke="#00B4D8" strokeWidth="2" strokeDasharray="4 2" />
                </svg>
              </motion.div>
            </>
          )}
        </Card>
      </motion.div>
    );
  };

  const renderBottomCallout = () => (
    <div className="relative mt-16 mb-8 max-w-5xl mx-auto">
      <motion.div
        className="absolute inset-0 bg-blue-50/30 rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      
      <motion.div
        className="relative p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-[#03045e] mb-2">Transforming Real Estate Through Data</h3>
        <p className="text-slate-600 text-sm mb-4">Our innovative approach combines advanced analytics with personalized service to deliver exceptional results.</p>
        
        <motion.button
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white text-sm font-medium shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 180, 216, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="mr-2">Contact Our Team</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </motion.div>
      
      {/* Data connection points - render efficiently */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`connection-point-${i}`}
          className="absolute w-2 h-2 rounded-full bg-blue-400"
          style={{
            left: `${10 + (i * 12)}%`,
            top: i % 2 === 0 ? '0%' : '100%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            y: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Main render
  return (
    <section
      ref={containerRef}
      className={styles.container}
      aria-labelledby="process-section-title"
    >

      <div className="container relative z-10">
        {/* Data visualization accent element */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-30 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="2" fill="#3B82F6" />
          </svg>
        </motion.div>

        {renderHeaderContent()}

        <div className={styles.stepsGrid}>
          {processSteps.map((step, index) => renderProcessCard(step, index))}
        </div>
        
        {renderBottomCallout()}
      </div>
    </section>
  )
}

export default AboutProcess