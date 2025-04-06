"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef } from "react"

const customers = [
  {
    title: "Fix & Flip Investors",
    description:
      "Perfect for real estate investors focusing on property renovation and resale...",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    imagePosition: "right",
  },
  {
    title: "Wholesalers",
    description:
      "Streamline your wholesaling business with accurate property and owner data...",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    imagePosition: "left",
  },
  {
    title: "Creative Finance Investors",
    description:
      "Supporting innovative real estate investment strategies with detailed property insights...",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    imagePosition: "right",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function CustomerSegments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={containerRef} className="relative py-24">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
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
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,180,216,0.1) 0%, transparent 50%)",
            transform: useTransform(scrollYProgress, [0, 1], [
              "scale(0.8)",
              "scale(1.2)",
            ]),
          }}
        />
      </div>

      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#03045e] mb-4">
            Who are our customers?
          </h2>
          <div className="w-24 h-1 bg-[#00B4D8] mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-32">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeInUp}
              className={`flex flex-col gap-16 items-center ${
                customer.imagePosition === "left"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              }`}
            >
              {/* IMAGE & BORDER */}
              <div className="flex-1">
                <motion.div
                  initial={{
                    opacity: 0,
                    x: customer.imagePosition === "left" ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* 
                    This parent motion.div scales the image & border together on hover
                    using a spring animation for a slightly bouncy effect.
                  */}
                  <motion.div
                    className="relative rounded-2xl overflow-visible"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  >
                    {/* The main image, above the border (z-10) */}
                    <img
                      src={customer.image}
                      alt={customer.title}
                      className="w-full h-[500px] object-cover rounded-2xl relative z-10"
                    />

                    {/* Slightly bigger cyan border behind the image (-inset-2) */}
                    <div className="absolute -inset-2 border-2 border-[#00B4D8] rounded-2xl z-0 pointer-events-none" />

                    {/* Hover overlay gradient on top (z-20) */}
                    <motion.div
                      className="absolute inset-0 z-20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(45deg, rgba(3,4,94,0.2), rgba(0,180,216,0.2))",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            "radial-gradient(circle at 0% 0%, rgba(0,180,216,0.2) 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 100%, rgba(0,180,216,0.2) 0%, transparent 50%)",
                          ],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* TEXT CONTENT */}
              <div className="flex-1 space-y-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-bold text-[#03045e]"
                >
                  {customer.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-gray-600 leading-relaxed text-lg"
                >
                  {customer.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href="/plans">
                    <Button className="bg-[#03045e] hover:bg-[#00B4D8] transition-all duration-300 transform hover:scale-105">
                      Learn more
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
