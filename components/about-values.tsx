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
    <section className="py-20 bg-[#03045e] text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Our Mission is Customer success. Your Success is Our Success and we stand by these words every day by giving
            our best to provide top tier customer experience, pricing, convenience, and innovative data to the real
            estate industry.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <Card className="p-6 h-full bg-white/10 backdrop-blur border-white/20">
                  {/* Use the destructured Icon component */}
                  <Icon className="w-12 h-12 mb-4 text-[#00B4D8]" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
