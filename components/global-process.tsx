"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Target, Lightbulb, BarChart3, PieChart, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"

const steps = [
  {
    icon: Target,
    title: "Global Data Collection",
    description:
      "Our advanced algorithms scan and collect real estate data from across the globe, ensuring comprehensive coverage.",
    stats: "217M+ Properties",
  },
  {
    icon: Lightbulb,
    title: "Intelligent Processing",
    description:
      "State-of-the-art AI processes and analyzes data in real-time, identifying valuable opportunities.",
    stats: "99.9% Accuracy",
  },
  {
    icon: BarChart3,
    title: "Quality Verification",
    description: "Multi-layer verification system ensures data accuracy and reliability.",
    stats: "85% Match Rate",
  },
  {
    icon: PieChart,
    title: "Smart Filtering",
    description: "Advanced filtering algorithms identify the most promising leads based on your criteria.",
    stats: "50+ Parameters",
  },
  {
    icon: DollarSign,
    title: "Value Delivery",
    description: "Seamless delivery of actionable insights directly to your dashboard.",
    stats: "24/7 Updates",
  },
]

export function GlobalProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Track scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Map scroll progress to background parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    // Removed `bg-black` so the image can fill the entire section
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/earth-moon-8k-8k-uhd-wallpaper-038b731d5d396bd5bfb6828738bb0888.jpg-CgxujqfAffoKdIo6UC903rUGF0benI.jpeg')`,
          // Zoom in the image and move it up
          backgroundSize: "120% auto",   // Zoom ~20%
          backgroundPosition: "center top", // Anchor image at top
          y: backgroundY,                   // Parallax effect
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </motion.div>

      {/* Floating particles (optional) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative container py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Global Data Network</h2>
          <p className="text-xl text-[#00B4D8] max-w-2xl mx-auto">
            Harnessing the power of global data to deliver actionable insights
          </p>
        </motion.div>

        <div className="relative max-w-[1200px] mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00B4D8] via-[#00B4D8]/50 to-transparent" />

          <div className="relative space-y-32">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0
              const Icon = step.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className={`absolute w-12 h-12 rounded-full bg-[#00B4D8] flex items-center justify-center z-10 ${
                        isLeft ? "right-1/2 translate-x-6" : "left-1/2 -translate-x-6"
                      }`}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </motion.div>

                    <div className={`w-[calc(50%-4rem)] ${isLeft ? "mr-auto pr-16" : "ml-auto pl-16"}`}>
                      <div
                        className={`absolute top-1/2 ${
                          isLeft ? "left-[calc(50%-4rem)] w-16" : "right-[calc(50%-4rem)] w-16"
                        } h-px bg-gradient-to-${isLeft ? "r" : "l"} from-transparent to-[#00B4D8]`}
                      />

                      <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                        <Card className="p-6 bg-black/40 backdrop-blur-xl border border-[#00B4D8]/20 overflow-hidden relative group">
                          <div
                            className={`absolute w-32 h-32 rounded-full bg-[#00B4D8]/10 blur-2xl transition-all duration-500 group-hover:bg-[#00B4D8]/20 ${
                              isLeft ? "-right-16" : "-left-16"
                            } -top-16`}
                          />
                          <div className="relative z-10">
                            <div className={`flex items-center gap-4 mb-4 ${isLeft ? "justify-start" : "justify-end"}`}>
                              <div className="w-12 h-12 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-[#00B4D8]" />
                              </div>
                            </div>
                            <div className={`text-${isLeft ? "left" : "right"}`}>
                              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                              <p className="text-[#90e0ef] mb-4">{step.description}</p>
                              <div className="text-[#00B4D8] font-bold">{step.stats}</div>
                            </div>
                          </div>
                          <div className="absolute inset-0 border border-[#00B4D8]/20 group-hover:border-[#00B4D8]/40 transition-colors duration-500" />
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
