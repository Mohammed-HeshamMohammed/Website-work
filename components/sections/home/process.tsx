"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { processSteps } from "@/components/sections/home/data"
import { styles } from "@/components/sections/home/css/AboutProcess.styles"

export function AboutProcess() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Enhanced scroll-driven animations
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8])
  const horizontalAnimation = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  
  // Function to scroll to the corresponding global process section
  const scrollToSection = (stepNumber: string) => {
    // Calculate the target section based on the step number
    const sectionId = `global-process-step-${stepNumber}`;
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
      // Smooth scroll to the element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // If element not found, scroll to the global process section
      const globalProcessSection = document.getElementById('global-process-section');
      if (globalProcessSection) {
        globalProcessSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className={styles.container}
      aria-labelledby="process-section-title"
    >
      {/* Enhanced background with parallax effect */}
      <div className={styles.backgroundContainer}>
        <motion.div
          className={styles.radialGradient}
          style={{ scale, opacity }}
        />
        <motion.div
          className={styles.horizontalLine}
          style={{ x: horizontalAnimation }}
        />
        
        {/* Enhanced floating shapes with more variations */}
        {[...Array(4)].map((_, i) => (
          <motion.div 
            key={`floating-shape-${i}`}
            className={i % 2 === 0 ? styles.floatingShape1 : styles.floatingShape2}
            style={{
              left: `${15 + i * 20}%`,
              top: `${(i % 2 === 0 ? 30 : 70) + (i * 5)}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              opacity: 0.3 - (i * 0.05),
            }}
            animate={{ 
              y: [0, i % 2 === 0 ? -15 : 15, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{ 
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7 
            }}
          />
        ))}
        
        {/* Added subtle particle effect */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-300/10 to-blue-500/10"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={styles.headerContainer}
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
            <h2 id="process-section-title" className={styles.title}>Process</h2>
          </motion.div>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Delivering exceptional data solutions through our refined five-step process
          </motion.p>
          
          <motion.div 
            className={styles.titleDivider}
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className={styles.stepsGrid}>
          {processSteps.map((step, index) => {
            // If it's the last card, center it
            const isLast = index === processSteps.length - 1
            // Otherwise, alternate left/right based on index parity
            const isLeft = !isLast && index % 2 === 0
            const isHovered = hoveredCard === step.number

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isLast ? 0 : isLeft ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`${isLast ? styles.lastCard : ""}`}
              >
                <Card 
                  className={`${styles.card} group`}
                  onMouseEnter={() => setHoveredCard(step.number)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onFocus={() => setHoveredCard(step.number)}
                  onBlur={() => setHoveredCard(null)}
                  tabIndex={0}
                >
                  {/* Enhanced number badge with interactive 3D effect */}
                  <div className={styles.numberBadgeWrapper}>
                    <motion.div
                      className={styles.numberBadge}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0], 
                        scale: 1.15,
                        boxShadow: "0 10px 25px -5px rgba(0, 180, 216, 0.5)" 
                      }}
                      animate={isHovered ? {
                        scale: [1, 1.12, 1.05],
                        transition: { duration: 0.5, ease: "easeOut" }
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {step.number}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <motion.div 
                      className={styles.numberBadgeShadow}
                      animate={isHovered ? { 
                        scale: 1.2, 
                        opacity: 0.4 
                      } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Enhanced content with improved animations */}
                  <div className={styles.contentWrapper}>
                    <motion.h3 
                      className={styles.stepTitle}
                      animate={isHovered ? { 
                        color: "#00B4D8",
                        x: 3 
                      } : { 
                        color: "#03045e",
                        x: 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className={styles.description}
                      animate={isHovered ? { opacity: 1 } : { opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                    
                    {/* New interactive learn more button that scrolls to the right section */}
                    <AnimatePresence>
                      {isHovered && (
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
                    </AnimatePresence>
                  </div>

                  {/* Enhanced decorative elements with responsive animations */}
                  <motion.div 
                    className={styles.decorTopRight}
                    animate={isHovered ? { 
                      scale: 1.8, 
                      opacity: 0.15 
                    } : {}}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className={styles.decorBottomLeft}
                    animate={isHovered ? { 
                      scale: 1.8, 
                      opacity: 0.15 
                    } : {}}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Enhanced pulse effect with dynamic responsiveness */}
                  <motion.div 
                    className={styles.pulseEffect}
                    animate={isHovered ? { 
                      scale: [1, 1.3, 1.2],
                      opacity: [0.1, 0.25, 0.15] 
                    } : { 
                      scale: [1, 1.1, 1],
                      opacity: [0.05, 0.1, 0.05] 
                    }}
                    transition={{ 
                      duration: isHovered ? 2 : 3,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                  
                  {/* New glow effect on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#03045e]/3 to-[#00B4D8]/5 -z-10"
                        style={{ filter: "blur(15px)" }}
                      />
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced connection lines with improved animations */}
        <div className={styles.connectionLinesContainer}>
          <svg width="100%" height="100%" preserveAspectRatio="none">
            {/* Main path connections with enhanced animation */}
            <motion.path
              d="M20%,30% C35%,30% 45%,60% 60%,60%"
              stroke="url(#gradientLine1)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M60%,60% C75%,60% 85%,30% 95%,30%"
              stroke="url(#gradientLine2)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
            />
            
            {/* Added more decorative paths with enhanced styling */}
            <motion.path
              d="M20%,30% C15%,50% 25%,70% 20%,90%"
              stroke="url(#accentGradient1)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
              strokeOpacity="0.4"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, delay: 1, ease: "easeInOut" }}
            />
            <motion.path
              d="M95%,30% C90%,50% 85%,70% 95%,90%"
              stroke="url(#accentGradient2)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
              strokeOpacity="0.4"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, delay: 1.5, ease: "easeInOut" }}
            />
            
            {/* Added new connecting path */}
            <motion.path
              d="M50%,75% C60%,85% 70%,85% 80%,75%"
              stroke="url(#accentGradient1)"
              strokeWidth="1"
              strokeDasharray="3,3"
              strokeOpacity="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
            />
            
            {/* Enhanced gradient definitions */}
            <defs>
              <linearGradient id="gradientLine1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#03045e" />
                <stop offset="100%" stopColor="#0077B6" />
              </linearGradient>
              <linearGradient id="gradientLine2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0077B6" />
                <stop offset="100%" stopColor="#00B4D8" />
              </linearGradient>
              <linearGradient id="accentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#03045e" />
                <stop offset="100%" stopColor="#00B4D8" />
              </linearGradient>
              <linearGradient id="accentGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00B4D8" />
                <stop offset="100%" stopColor="#90E0EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default AboutProcess