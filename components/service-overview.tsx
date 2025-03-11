"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const services = [
  {
    number: "1",
    title: "What is Data Synapse?",
    description:
      "At Data Synapse, we specialize in providing top-tier, high-quality data solutions for real estate investors, including those focusing on fix-and-flip projects, wholesaling, creative financing, and other investment strategies.",
  },
  {
    number: "2",
    title: "Supported Investment Strategies",
    description:
      "We cater to various real estate investing strategies including fix and flips, wholesaling, Novation, and Creative financing.",
  },
  {
    number: "4",
    title: "Wholesaling",
    description:
      "Wholesaling is a strategy where investors secure properties under contract and sell the contract to other buyers.",
  },
  {
    number: "5",
    title: "Novation in Real Estate",
    description: "Data Synapse supports innovative approaches to real estate investing, promoting creative solutions.",
  },
  {
    number: "6",
    title: "Creative Financing",
    description:
      "This includes various financing techniques that allow investors to acquire properties without traditional funding methods.",
  },
  {
    number: "7",
    title: "Range of Services",
    description:
      "Data Synapse provides a comprehensive range of services designed to assist real estate investors in acquiring high-quality leads.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function ServiceOverview() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className="relative h-full overflow-hidden bg-white/50 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#03045e]/20 via-[#00B4D8]/20 to-[#03045e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number badge with animations */}
                <motion.div
                  initial={false}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#03045e] to-[#00B4D8] rounded-lg shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300"
                >
                  <span className="text-white font-bold text-lg">{service.number}</span>
                </motion.div>

                {/* Content with hover animations */}
                <div className="p-8 pt-20">
                  <motion.h3
                    initial={false}
                    whileHover={{ x: 5 }}
                    className="text-2xl font-bold text-[#03045e] mb-4 group-hover:text-[#00B4D8] transition-colors duration-300"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p initial={false} animate={{ opacity: 1 }} className="text-gray-600 leading-relaxed">
                    {service.description}
                  </motion.p>

                  {/* Decorative elements */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#03045e]/5 to-transparent rounded-tl-full transform translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00B4D8]/5 to-transparent rounded-bl-full transform -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

