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
    },
  }),
}

export function Hero() {
  return (
    <div className="container grid grid-cols-1 gap-12 py-20 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <motion.h1
          className="text-6xl font-bold leading-tight text-[#03045e]"
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
          className="mt-6 text-lg text-gray-600"
        >
          High-Quality Lead Lists for Real Estate Investors
        </motion.p>
        <motion.div variants={textVariants} custom={5} initial="hidden" animate="visible">
          <Link
            href="/plans"
            className="mt-8 inline-block w-48 text-center rounded bg-[#03045e] px-8 py-3 text-white hover:bg-[#00B4D8] transition-colors duration-200"
          >
            Start Now
          </Link>
        </motion.div>
      </div>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
          <source src="/placeholder.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

