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
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-[#03045e]/10 mb-4">
                <stat.icon className="w-8 h-8 text-[#03045e]" />
              </div>
              <h3 className="text-3xl font-bold text-[#03045e] mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

