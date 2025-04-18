"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"

// Updated theme colors to match the provided color palette
const THEME = {
  darkNavy: "#000066", // Dark navy blue
  brightBlue: "#0088B4", // Bright medium blue
  turquoise: "#00C1DD", // Turquoise
  lightTurquoise: "#A3E4F0", // Light turquoise
  paleBlue: "#DCF2F8", // Very pale blue
  white: "#FFFFFF",
  dark: "#1E293B"
}

const steps = [
  {
    title: "Understanding Your Needs",
    icon: "🎯",
    description: "We begin by deeply understanding your business goals and target audience.",
    points: [
      "We start by listening to your goals.",
      "Together, we define your target audience.",
      "Confirm the number of leads and timeline.",
    ],
  },
  {
    title: "Sourcing the Right Data",
    icon: "🔍",
    description: "We collect high-quality data from verified sources with full compliance.",
    points: [
      "We pull data from trusted, verified sources.", 
      "All data complies with privacy laws."
    ],
  },
  {
    title: "Refining the Data",
    icon: "✨",
    description: "Our advanced filtering system ensures only the most relevant data remains.",
    points: [
      "We filter to meet your criteria.",
      "Data is cleaned and duplicates removed.",
      "We run quality checks to ensure accuracy.",
    ],
  },
  {
    title: "Ensuring Lead Quality",
    icon: "🛡️",
    description: "Multiple validation layers guarantee leads that convert.",
    points: [
      "Every lead is validated for relevance.",
      "Manual reviews are done for added precision.",
      "You get leads you can trust.",
    ],
  },
  {
    title: "Delivering to You",
    icon: "🚀",
    description: "Organized, segmented, and ready-to-use leads delivered on schedule.",
    points: [
      "Leads are organized and ready to use.",
      "Segmentation options are included.",
      "Delivery is always on time.",
    ],
  },
]

export function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef(null)
  
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  const linePathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }
  
  return (
    <section 
      ref={containerRef} 
      className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#000066] to-[#0088B4] text-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Gradient mesh background */}
          <svg width="100%" height="100%" className="opacity-20">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={THEME.darkNavy} stopOpacity="0.8"/>
                <stop offset="50%" stopColor={THEME.brightBlue} stopOpacity="0.6"/>
                <stop offset="100%" stopColor={THEME.turquoise} stopOpacity="0.4"/>
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
          </svg>
          
          {/* Animated orbs - reduced for mobile */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20 blur-3xl"
              style={{
                background: i % 3 === 0 ? THEME.darkNavy : 
                         i % 3 === 1 ? THEME.brightBlue : THEME.turquoise,
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 10 + 15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="inline-block px-4 py-1 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-[#000066]/20 to-[#00C1DD]/20 text-[#A3E4F0] text-sm md:text-base font-medium mb-3 md:mb-4 backdrop-blur-sm border border-[#00C1DD]/30">Our Methodology</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-[#A3E4F0] via-[#00C1DD] to-[#DCF2F8] bg-clip-text text-transparent inline-block">
              Leads Synapse Process
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[#DCF2F8] text-base md:text-lg lg:text-xl px-2">
            Discover our refined approach to transforming raw data into qualified leads that drive business growth
          </p>
          <motion.div 
            className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#0088B4] to-[#00C1DD] mx-auto rounded-full mt-4 md:mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Mobile step selector */}
        <div className="block lg:hidden mb-6 overflow-x-auto pb-4">
          <div className="flex space-x-2 min-w-max">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-xl transition-all ${
                  activeStep === index 
                    ? "bg-gradient-to-br from-[#000066]/80 to-[#0088B4]/80 border border-[#00C1DD]/30 shadow-lg shadow-[#000066]/30" 
                    : "bg-[#000066]/50 hover:bg-[#0088B4]/30 border border-[#0088B4]/30"
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className={`flex justify-center items-center w-8 h-8 rounded-full ${
                  activeStep === index 
                    ? "bg-gradient-to-br from-[#0088B4] to-[#00C1DD]" 
                    : "bg-[#0088B4]/70"
                }`}>
                  <span className="text-sm">{step.icon}</span>
                </div>
                
                <h3 className={`text-sm font-medium whitespace-nowrap ${
                  activeStep === index 
                    ? "text-white" 
                    : "text-[#A3E4F0]"
                }`}>
                  Step {index + 1}
                </h3>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Desktop steps display */}
        <div className="hidden lg:grid grid-cols-5 gap-4 md:gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              className={`relative rounded-xl p-4 text-center transition-all ${
                activeStep === index 
                  ? "bg-gradient-to-br from-[#000066]/80 to-[#0088B4]/80 border border-[#00C1DD]/30 shadow-lg shadow-[#000066]/30" 
                  : "bg-[#000066]/50 hover:bg-[#0088B4]/30 border border-[#0088B4]/30"
              }`}
              onClick={() => setActiveStep(index)}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className={`flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full ${
                activeStep === index 
                  ? "bg-gradient-to-br from-[#0088B4] to-[#00C1DD]" 
                  : "bg-[#0088B4]/70"
              }`}>
                <span className="text-2xl">{step.icon}</span>
                
                {/* Pulse effect on active step */}
                {activeStep === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#00C1DD]"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2
                    }}
                  />
                )}
              </div>
              
              <h3 className={`text-lg font-bold ${
                activeStep === index 
                  ? "text-white" 
                  : "text-[#A3E4F0]"
              }`}>
                {step.title}
              </h3>
              
              {/* Step number indicator */}
              <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep === index 
                  ? "bg-white text-[#000066]" 
                  : "bg-[#0088B4]/50 text-[#DCF2F8]"
              }`}>
                {index + 1}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active step details - mobile optimized */}
        <motion.div 
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#000066]/5 to-[#00C1DD]/5 rounded-3xl blur-3xl transform -rotate-3" />
          
          <div className="bg-[#000066]/70 backdrop-blur-md border border-[#0088B4]/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden shadow-xl">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-[#0088B4]/20 to-[#00C1DD]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-tr from-[#00C1DD]/20 to-[#0088B4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            <div className="relative z-10">
              {/* Title area - responsive layout */}
              <div className="flex flex-col sm:flex-row sm:items-center mb-6 md:mb-8 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-[#0088B4] to-[#00C1DD] w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-4xl shadow-lg shadow-[#000066]/30">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#A3E4F0] to-[#DCF2F8] bg-clip-text text-transparent mt-3 sm:mt-0">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-[#A3E4F0] text-base md:text-xl mt-1 md:mt-2">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
              
              {/* Points grid - responsive layout */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {steps[activeStep].points.map((point, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="bg-[#0088B4]/20 backdrop-blur-sm border border-[#00C1DD]/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-[#000066]/10 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0088B4] to-[#00C1DD] text-white text-xs md:text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-[#DCF2F8] text-sm md:text-lg">{point}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Navigation controls - responsive styling */}
              <div className="flex justify-between mt-6 md:mt-10">
                <button
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  className={`px-3 py-2 md:px-6 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                    activeStep === 0
                      ? "bg-[#000066]/50 text-[#A3E4F0]/50 cursor-not-allowed"
                      : "bg-[#000066] hover:bg-[#0088B4]/70 text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  Previous
                </button>
                
                <button
                  onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                  disabled={activeStep === steps.length - 1}
                  className={`px-3 py-2 md:px-6 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                    activeStep === steps.length - 1
                      ? "bg-[#000066]/50 text-[#A3E4F0]/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#0088B4] to-[#00C1DD] hover:from-[#0088B4]/90 hover:to-[#00C1DD]/90 text-white"
                  }`}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Path progress visualization - mobile optimized */}
        <motion.div 
          className="mt-10 md:mt-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative h-16 md:h-20 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              {/* Base path */}
              <path 
                d="M0,50 Q250,90 500,50 Q750,10 1000,50" 
                stroke="#0088B4" 
                strokeWidth="6"
                strokeLinecap="round"
                strokeOpacity="0.3"
              />
              
              {/* Animated progress path */}
              <motion.path 
                d="M0,50 Q250,90 500,50 Q750,10 1000,50" 
                stroke="url(#progressGradient)" 
                strokeWidth="6"
                strokeLinecap="round"
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              
              {/* Add gradient definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={THEME.darkNavy} />
                  <stop offset="50%" stopColor={THEME.brightBlue} />
                  <stop offset="100%" stopColor={THEME.turquoise} />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Step indicators along the path */}
            {steps.map((_, index) => {
              const position = index / (steps.length - 1) * 100;
              const yOffset = index % 2 === 0 ? -5 : 10; // Smaller offset for mobile
              
              return (
                <motion.div
                  key={index}
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 ${
                    index <= activeStep 
                      ? "bg-[#00C1DD] border-[#A3E4F0]" 
                      : "bg-[#000066] border-[#0088B4]"
                  }`}
                  style={{ left: `${position}%`, marginTop: yOffset }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {index <= activeStep && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-[#00C1DD]/50"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Process statistics panel - mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto px-4 mt-12 md:mt-24"
      >
        <div className="backdrop-blur-lg bg-[#000066]/30 border border-[#0088B4]/20 rounded-xl p-6 md:p-8 lg:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6 md:mb-8">
            Our Process By The Numbers
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <motion.div 
              className="bg-[#0088B4]/20 rounded-xl p-4 md:p-6 text-center"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-[#00C1DD] text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">98%</div>
              <div className="text-[#DCF2F8] text-xs md:text-sm lg:text-base">Data Accuracy Rate</div>
            </motion.div>
            
            <motion.div 
              className="bg-[#0088B4]/20 rounded-xl p-4 md:p-6 text-center"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-[#00C1DD] text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">3.5x</div>
              <div className="text-[#DCF2F8] text-xs md:text-sm lg:text-base">Avg. ROI Improvement</div>
            </motion.div>
            
            <motion.div 
              className="bg-[#0088B4]/20 rounded-xl p-4 md:p-6 text-center"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-[#00C1DD] text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">24hrs</div>
              <div className="text-[#DCF2F8] text-xs md:text-sm lg:text-base">Average Delivery Time</div>
            </motion.div>
            
            <motion.div 
              className="bg-[#0088B4]/20 rounded-xl p-4 md:p-6 text-center"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-[#00C1DD] text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">40K+</div>
              <div className="text-[#DCF2F8] text-xs md:text-sm lg:text-base">Successful Projects</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ProcessFlow