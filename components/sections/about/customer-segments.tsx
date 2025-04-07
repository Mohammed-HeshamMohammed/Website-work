"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const customers = [
  {
    title: "Fix & Flip Investors",
    description:
      "Perfect for real estate investors focusing on property renovation and resale. Our platform provides comprehensive market analysis, renovation cost estimators, and ROI calculators to maximize your profits on every flip.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    color: "blue",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    title: "Wholesalers",
    description:
      "Streamline your wholesaling business with accurate property and owner data. Find motivated sellers, analyze comps, and connect with cash buyers all on one platform designed to help you close more deals faster.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    color: "pink",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
  },
  {
    title: "Creative Finance Investors",
    description:
      "Supporting innovative real estate investment strategies with detailed property insights. Whether you're using subject-to, owner financing, or lease options, our platform provides the tools and data to structure profitable deals.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    color: "purple",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
]

export function CustomerSegments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="20" cy="20" r="1" fill="#000"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      {/* Floating 3D shapes - hidden on smaller screens for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full backdrop-blur-md border border-white/10",
              i % 3 === 0 ? "bg-blue-500/5" : i % 3 === 1 ? "bg-purple-500/5" : "bg-pink-500/5"
            )}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div className="text-sm md:text-base font-medium inline-block mb-3 px-3 md:px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            OUR AUDIENCE
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600">
            Who are our customers?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg px-4">
            We serve a diverse range of real estate professionals with tailored solutions to meet their unique investment needs
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-32">
          {customers.map((customer, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={customer.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 md:gap-16 items-center relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background accent */}
                <motion.div 
                  className={cn(
                    "absolute -inset-10 rounded-3xl opacity-0",
                    customer.color === "blue" && "bg-blue-600",
                    customer.color === "pink" && "bg-pink-600",
                    customer.color === "purple" && "bg-purple-700"
                  )}
                  animate={{ 
                    opacity: hoveredCard === index ? 0.03 : 0,
                    scale: hoveredCard === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-16 items-center w-full`}>
                  {/* IMAGE CONTAINER */}
                  <div className="flex-1 w-full">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="relative"
                    >
                      <motion.div
                        className="relative rounded-2xl overflow-hidden group"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        {/* Main image - adjust height for mobile */}
                        <div className="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-2xl">
                          <img
                            src={customer.image}
                            alt={customer.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Overlay gradient */}
                          <motion.div 
                            className={cn(
                              "absolute inset-0",
                              isEven ? "bg-gradient-to-r" : "bg-gradient-to-l",
                              customer.color === "blue" && "from-transparent to-blue-600/40",
                              customer.color === "pink" && "from-transparent to-pink-600/40",
                              customer.color === "purple" && "from-transparent to-purple-700/40"
                            )}
                            initial={{ opacity: 0.3 }}
                            whileHover={{ opacity: 0.5 }}
                          />
                        </div>

                        {/* Floating badge - smaller on mobile */}
                        <motion.div
                          className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1 md:py-2 rounded-lg shadow-lg z-10 flex items-center gap-2"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <span className={cn(
                            "w-2 md:w-3 h-2 md:h-3 rounded-full",
                            customer.color === "blue" && "bg-blue-600",
                            customer.color === "pink" && "bg-pink-600",
                            customer.color === "purple" && "bg-purple-700"
                          )}></span>
                          <span className={cn(
                            "text-sm md:text-base font-medium",
                            customer.color === "blue" && "text-blue-600",
                            customer.color === "pink" && "text-pink-600",
                            customer.color === "purple" && "text-purple-700"
                          )}>{customer.title}</span>
                        </motion.div>
                      </motion.div>
                      
                      {/* Decorative shapes - smaller on mobile */}
                      <div className={cn(
                        "absolute w-10 h-10 md:w-16 md:h-16 rounded-xl",
                        isEven ? "-left-5 md:-left-8" : "-right-5 md:-right-8",
                        "-bottom-5 md:-bottom-8",
                        customer.color === "blue" && "bg-blue-600/20 border-2 border-blue-600/30",
                        customer.color === "pink" && "bg-pink-600/20 border-2 border-pink-600/30",
                        customer.color === "purple" && "bg-purple-700/20 border-2 border-purple-700/30"
                      )}></div>
                      
                      {/* Icon circle - smaller on mobile, centered at bottom on mobile */}
                      <div className={cn(
                        "absolute w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-8 border-gray-100 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center text-xl md:text-3xl",
                        "left-1/2 md:left-auto md:translate-x-0 -translate-x-1/2 md:translate-x-1/2",
                        "bottom-0 translate-y-1/2",
                        "md:bottom-0",
                        isEven ? "md:right-0" : "md:left-0",
                        customer.color === "blue" && "text-blue-600",
                        customer.color === "pink" && "text-pink-600",
                        customer.color === "purple" && "text-purple-700"
                      )}>
                        {customer.icon}
                      </div>
                    </motion.div>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="flex-1 space-y-4 md:space-y-8 px-4 md:px-0">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <span className={cn(
                        "w-8 md:w-10 h-1 rounded-full",
                        customer.color === "blue" && "bg-blue-600",
                        customer.color === "pink" && "bg-pink-600",
                        customer.color === "purple" && "bg-purple-700"
                      )}></span>
                      <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-500">Customer Segment {index + 1}</span>
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className={cn(
                        "text-2xl md:text-4xl font-bold",
                        customer.color === "blue" && "text-blue-600",
                        customer.color === "pink" && "text-pink-600",
                        customer.color === "purple" && "text-purple-700"
                      )}
                    >
                      {customer.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-gray-600 leading-relaxed text-base md:text-lg"
                    >
                      {customer.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="pt-2 md:pt-4"
                    >
                      <Link href="/plans">
                        <Button 
                          className={cn(
                            "rounded-full px-6 md:px-8 py-5 md:py-6 text-white shadow-lg flex items-center gap-2 group",
                            customer.color === "blue" && "bg-blue-600 shadow-blue-600/30 hover:bg-blue-500",
                            customer.color === "pink" && "bg-pink-600 shadow-pink-600/30 hover:bg-pink-500",
                            customer.color === "purple" && "bg-purple-700 shadow-purple-700/30 hover:bg-purple-600"
                          )}
                        >
                          <span>Learn more</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="transition-transform duration-300 transform group-hover:translate-x-1"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
export default CustomerSegments