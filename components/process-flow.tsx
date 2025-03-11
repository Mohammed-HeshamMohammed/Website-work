"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    title: "Understanding Your Needs",
    points: [
      "We start by listening to your goals.",
      "Together, we define your target audience.",
      "Confirm the number of leads and timeline.",
    ],
  },
  {
    title: "Sourcing the Right Data",
    points: ["We pull data from trusted, verified sources.", "All data complies with privacy laws."],
  },
  {
    title: "Refining the Data",
    points: [
      "We filter to meet your criteria.",
      "Data is cleaned and duplicates removed.",
      "We run quality checks to ensure accuracy.",
    ],
  },
  {
    title: "Ensuring Lead Quality",
    points: [
      "Every lead is validated for relevance.",
      "Manual reviews are done for added precision.",
      "You get leads you can trust.",
    ],
  },
  {
    title: "Delivering to You",
    points: [
      "Leads are organized and ready to use.",
      "Segmentation options are included.",
      "Delivery is always on time.",
    ],
  },
]

export function ProcessFlow() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#03045e] mb-4">Leads Synapse Process Flow</h2>
          <div className="w-24 h-1 bg-[#00B4D8] mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-28 left-0 w-full h-0.5 bg-gray-100">
            <motion.div
              className="absolute inset-0 bg-[#00B4D8]"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
                transformOrigin: "left",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Number circle */}
                <motion.div
                  className="w-14 h-14 rounded-full bg-white border-2 border-[#00B4D8] mx-auto mb-8 flex items-center justify-center relative z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#00B4D8]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    style={{
                      originX: 0,
                      originY: 0,
                    }}
                  />
                  <span className="text-xl font-bold text-[#03045e] relative z-10">{index + 1}</span>
                </motion.div>

                {/* Content box */}
                <motion.div
                  className="bg-white p-6 rounded-lg border border-gray-100 h-full hover:border-[#00B4D8] transition-colors duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-semibold text-[#03045e] mb-4 text-center">{step.title}</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {step.points.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + pointIndex * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] mt-1.5 mr-2 flex-shrink-0" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

