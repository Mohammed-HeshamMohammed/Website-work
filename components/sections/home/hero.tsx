"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Montserrat } from 'next/font/google'

// Import Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-montserrat',
})

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export function Hero() {
  return (
    <div className={`min-h-screen flex items-center ${montserrat.variable}`}>
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:gap-16 py-16 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#03045e]"
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
            <motion.span variants={textVariants} custom={0} className="block">
              The Synapse
            </motion.span>
            <motion.span variants={textVariants} custom={1} className="block">
              Between{" "}
              <motion.span variants={textVariants} custom={2} className="text-[#00B4D8]">
                You
              </motion.span>
            </motion.span>
            <motion.span variants={textVariants} custom={3} className="block text-[#00B4D8]">
              And Success
            </motion.span>
          </motion.h1>
          <motion.p
            variants={textVariants}
            custom={4}
            initial="hidden"
            animate="visible"
            className="mt-6 text-xl lg:text-2xl text-gray-600 font-[--font-montserrat]"
          >
            High-Quality Lead Lists for Real Estate Investors
          </motion.p>
          <motion.div variants={textVariants} custom={5} initial="hidden" animate="visible">
            <Link
              href="/plans"
              className="mt-8 inline-block w-full md:w-64 text-center rounded-lg text-lg py-4 px-8 bg-[#03045e] text-white hover:bg-[#00B4D8] transition-colors duration-200"
            >
              Start Now
            </Link>
          </motion.div>
        </div>
        
        {/* Enlarged video card that takes more space */}
        <div className="relative rounded-xl overflow-hidden order-first sm:order-last mb-8 sm:mb-0 h-72 md:h-96 lg:h-full">
          <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
            <source src="/placeholder.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}