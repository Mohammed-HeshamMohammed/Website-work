"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import type React from "react"

export function PageTransition({
  children,
  duration = 0.4,
  easing = [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth feel
  initialDelay = 0.05,
  staggerChildren = true,
}: {
  children: React.ReactNode
  duration?: number
  easing?: number[]
  initialDelay?: number
  staggerChildren?: boolean
}) {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)
  
  // Don't animate on first render for better initial page load
  useEffect(() => {
    setIsFirstRender(false)
  }, [])
  
  const variants = {
    initial: { 
      opacity: 0, 
      y: 20,
      filter: "blur(5px)",
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration,
        ease: easing,
        delay: initialDelay,
        when: staggerChildren ? "beforeChildren" : undefined,
        staggerChildren: staggerChildren ? 0.1 : undefined,
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      filter: "blur(3px)",
      transition: { 
        duration: duration * 0.75, 
        ease: easing
      }
    }
  }
  
  return (
    <AnimatePresence mode="wait" initial={!isFirstRender}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="page-transition-container"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Child component to create staggered animations for page content
export function TransitionChild({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const childVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }
  }
  
  return (
    <motion.div
      variants={childVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}