"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

const processSteps = [
  {
    number: "01",
    title: "Data Acquisition",
    description:
      "Collecting vital property and owner information from diverse, trusted sources.",
    metric: "12M+",
    metricLabel: "Properties Sourced",
  },
  {
    number: "02",
    title: "Validation & Enrichment",
    description:
      "Applying rigorous checks and enhancements to ensure data integrity and reliability.",
    metric: "98.5%",
    metricLabel: "Data Quality",
  },
  {
    number: "03",
    title: "Insight Generation",
    description:
      "Utilizing advanced analytics to reveal lucrative investment opportunities.",
    metric: "24/7",
    metricLabel: "Continuous Monitoring",
  },
  {
    number: "04",
    title: "Results Deployment",
    description:
      "Delivering actionable insights directly to your dashboard in real time.",
    metric: "150K+",
    metricLabel: "Daily Alerts",
  },
]

// Updated Counter component that properly handles decimals and suffixes.
const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  // Use a regex to capture the numeric part (including decimals) and any suffix.
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const numericPart = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ""

  // We'll animate in a fixed number of steps.
  const steps = duration * 20 // 20 steps per second.
  const increment = numericPart / steps

  const [count, setCount] = useState("0" + suffix)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= numericPart) {
        current = numericPart
        clearInterval(interval)
      }
      // If there's a decimal part, show one decimal; otherwise, round the number.
      const display =
        numericPart % 1 !== 0 ? current.toFixed(1) : Math.round(current).toString()
      setCount(display + suffix)
    }, (duration * 1000) / steps)

    return () => clearInterval(interval)
  }, [numericPart, duration, increment, suffix])

  return <span>{count}</span>
}

export function AboutProcess() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Map the scroll progress to control opacity and scale.
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,180,216,0.1) 0%, transparent 50%)",
            scale,
            opacity,
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(3,4,94,0.2), transparent)",
            x: useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]),
          }}
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-[#03045e] mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Delivering exceptional data solutions through our refined four-step process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="relative p-8 h-full bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-[#00B4D8]/50 transition-colors duration-300 group">
                {/* Number badge */}
                <motion.div
                  className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#03045e] to-[#00B4D8] rounded-lg shadow-lg flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <div className="ml-8">
                  <h3 className="text-2xl font-bold text-[#03045e] mb-3 group-hover:text-[#00B4D8] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>

                  {/* Metric */}
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#00B4D8]">
                      <motion.div whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <Counter value={step.metric} />
                      </motion.div>
                    </div>
                    <div className="text-sm text-gray-500">{step.metricLabel}</div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#03045e]/5 to-transparent rounded-bl-full transform -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00B4D8]/5 to-transparent rounded-tr-full transform translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Connection lines */}
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none"
        >
          <motion.path
            d="M200,200 C300,200 500,400 600,400"
            stroke="#03045e"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M600,400 C700,400 900,200 1000,200"
            stroke="#00B4D8"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  )
}
