"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, Variant, Variants } from "framer-motion"
import "@/components/sections/home/css/testimonial-slider.css"

const testimonials = [
  {
    id: 1,
    title: "Main Service",
    quote:
      "Leads Synapse specializes in providing high-quality data services tailored for businesses seeking reliable information to drive their strategies.",
    author: "Core Services",
    role: "Data Solutions",
  },
  {
    id: 2,
    title: "Quantity Options",
    quote:
      "Clients can choose from a range of flexible record quantities, ensuring access to data sets that align with their specific needs.",
    author: "Flexible Scaling",
    role: "Data Volume",
  },
  {
    id: 3,
    title: "Focus on Quality",
    quote:
      "The primary focus is on delivering the highest quality data, which is crucial for effective lead generation and informed investment strategies.",
    author: "Quality Assurance",
    role: "Data Integrity",
  },
  {
    id: 4,
    title: "Support for Lead Generation",
    quote:
      "High-quality data directly supports increased efficiency in lead generation efforts, enabling businesses to identify and target potential customers effectively.",
    author: "Lead Generation",
    role: "Business Growth",
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      video.currentTime = 14
      video.play()
    }

    video.currentTime = 14
    video.play()
    video.addEventListener("ended", handleVideoEnd)

    return () => {
      video.removeEventListener("ended", handleVideoEnd)
    }
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const next = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Improved animation variants
  const cardVariants: Variants = {
    enter: { opacity: 0, y: 30 },
    center: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { 
        duration: 0.5, 
        ease: "easeIn" 
      }
    }
  }
  
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1, 
        duration: 0.6, 
        ease: "easeOut" 
      }
    })
  }
  
  const quoteVariants: Variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        delay: 0.3, 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  }
  
  const floatVariants: Variants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="testimonial-section">
      {/* Video Background */}
      <div className="video-background">
        <video
          ref={videoRef}
          muted
          playsInline
          className="background-video"
        >
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="testimonial-container">
        <div className="testimonial-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="testimonial-card-wrapper"
            >
              <div className="testimonial-card">
                <motion.h3
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="testimonial-title"
                >
                  {testimonials[currentIndex].title}
                </motion.h3>

                <motion.blockquote
                  variants={quoteVariants}
                  initial="initial"
                  animate="animate"
                  className="testimonial-quote"
                >
                  <motion.div
                    variants={floatVariants}
                    animate="animate"
                  >
                    "{testimonials[currentIndex].quote}"
                  </motion.div>
                </motion.blockquote>

                <motion.div
                  custom={3}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="testimonial-author"
                >
                  <cite>{testimonials[currentIndex].author}</cite>
                  <p>{testimonials[currentIndex].role}</p>
                </motion.div>

                <div className="decorative-element top-right" />
                <div className="decorative-element bottom-left" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-controls">
            <div className="progress-bar-container">
              <motion.div
                className="progress-bar"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="nav-buttons">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={prev}
                className="nav-button"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="nav-icon" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={next}
                className="nav-button"
                aria-label="Next testimonial"
              >
                <ChevronRight className="nav-icon" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}