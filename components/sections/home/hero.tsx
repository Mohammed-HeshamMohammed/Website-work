"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
}

export function Hero() {
  return (
    <div className="relative bg-white">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-[#03045e]/5 to-[#00B4D8]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-[#00B4D8]/5 to-[#90E0EF]/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 grid grid-cols-1 gap-16 py-24 md:grid-cols-2 mx-auto px-4">
        <div className="flex flex-col justify-center">
          <motion.h1
            className="font-extrabold leading-none tracking-tight text-7xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.span variants={textVariants} custom={0} className="block bg-gradient-to-r from-[#03045e] to-[#023E8A] bg-clip-text text-transparent">
              The Synapse
            </motion.span>
            <motion.span variants={textVariants} custom={1} className="block text-gray-800">
              Between{" "}
              <motion.span variants={textVariants} custom={2} className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] bg-clip-text text-transparent">
                You
              </motion.span>
            </motion.span>
            <motion.span variants={textVariants} custom={3} className="block bg-gradient-to-r from-[#00B4D8] to-[#90E0EF] bg-clip-text text-transparent">
              And Success
            </motion.span>
          </motion.h1>
          <motion.p
            variants={textVariants}
            custom={4}
            initial="hidden"
            animate="visible"
            className="mt-6 text-xl font-medium text-gray-600"
          >
            High-Quality Lead Lists for Real Estate Investors
          </motion.p>
          <motion.div variants={textVariants} custom={5} initial="hidden" animate="visible">
            <Link
              href="/plans"
              className="mt-8 inline-flex items-center justify-center w-48 rounded-lg bg-gradient-to-r from-[#03045e] to-[#0077B6] px-8 py-4 text-lg font-medium text-white shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Now
            </Link>
          </motion.div>
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
        >
          {/* Subtle decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#00B4D8] rounded-full opacity-10 blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#03045e] rounded-full opacity-10 blur-xl"></div>
          
          <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
            <source src="/placeholder.mp4" type="video/mp4" />
          </video>
          
          {/* Video border accent */}
          <div className="absolute inset-0 border-2 border-[#00B4D8]/10 rounded-xl pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  )
}