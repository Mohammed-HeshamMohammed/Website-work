"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
        }}
      >
        <div className="absolute inset-0 bg-[#03045e]/80" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Transforming real estate data into actionable insights since 2020
          </p>
        </motion.div>
      </div>
    </div>
  )
}

