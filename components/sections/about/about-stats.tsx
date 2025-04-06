"use client"

import { motion } from "framer-motion"
import { Users2, Building2, Trophy, Target } from "lucide-react"

const stats = [
  {
    icon: Users2,
    value: "10,000+",
    label: "Happy Clients",
    delay: 0.2,
  },
  {
    icon: Building2,
    value: "1M+",
    label: "Properties Analyzed",
    delay: 0.4,
  },
  {
    icon: Trophy,
    value: "85%",
    label: "Success Rate",
    delay: 0.6,
  },
  {
    icon: Target,
    value: "24/7",
    label: "Support Available",
    delay: 0.8,
  },
]

export function AboutStats() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#03045e]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#03045e]/5 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="container relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-[#03045e] mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Impact By The Numbers
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center relative group"
            >
              {/* Transparent card with subtle border */}
              <div className="absolute inset-0  transform group-hover:scale-105 transition-all duration-300 -z-10" />
              
              <div className="inline-flex p-5 rounded-full bg-[#03045e]/10 backdrop-blur-sm mb-6 group-hover:shadow-lg transition-all duration-300 border border-[#03045e]/5">
                <stat.icon className="w-8 h-8 text-[#03045e]" />
              </div>
              
              <motion.h3 
                className="text-4xl font-bold text-[#03045e] mb-3"
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ delay: stat.delay + 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.h3>
              
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}