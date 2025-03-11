"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    title: "Main Service",
    quote:
      "Data Synapse specializes in providing high-quality data services tailored for businesses seeking reliable information to drive their strategies.",
    author: "Core Services",
    role: "Data Solutions",
  },
  {
    id: 2,
    title: "Quantity Options",
    quote:
      "Clients can choose from flexible records quantities, ensuring access to data sets of 10,000, 20,000, 50,000, or 100,000 records to suit their specific needs.",
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

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              x: ["0%", "100%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                {/* Title with gradient */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  {testimonials[currentIndex].title}
                </motion.h3>

                {/* Quote with floating animation */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl text-white mb-6 relative"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    "{testimonials[currentIndex].quote}"
                  </motion.div>
                </motion.blockquote>

                {/* Author info with slide-up animation */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <cite className="font-semibold text-blue-400">{testimonials[currentIndex].author}</cite>
                  <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full transform -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full transform translate-y-1/2 -translate-x-1/2" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation and progress */}
          <div className="flex items-center justify-between mt-8">
            <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex gap-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

