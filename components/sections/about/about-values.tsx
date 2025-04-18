"use client"

import { motion } from "framer-motion"
import { Target, Users, Shield, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

// Define your values array with the icon components, title, and description.
const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "We prioritize data accuracy and reliability above all else",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Your success is our success - we're committed to your growth",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We maintain the highest standards of data security",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly improving our technology and services",
  },
]

export function AboutValues() {
  return (
    <section className="py-12 md:py-20 bg-[#03045e] text-white">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Mission</h2>
          <p className="text-base md:text-xl max-w-3xl mx-auto">
            Our Mission is Customer success. Your Success is Our Success and we stand by these words every day by giving
            our best to provide top tier customer experience, pricing, convenience, and innovative data to the real
            estate industry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {values.map((value, index) => {
            // Destructure the icon component into a capitalized variable.
            // This ensures that React treats it as a valid component.
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="p-4 md:p-6 h-full bg-white/10 backdrop-blur border-white/20">
                  {/* Use the destructured Icon component */}
                  <Icon className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 text-[#00B4D8]" />
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{value.title}</h3>
                  <p className="text-sm md:text-base text-white/80">{value.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}