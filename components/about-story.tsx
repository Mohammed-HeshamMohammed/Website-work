"use client"

import { motion } from "framer-motion"

export function AboutStory() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#03045e] mb-6">
              How Leads Synapse Was Founded
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Leads Synapse was founded in 2024 in San Francisco, California by Mohammed Salah, a visionary entrepreneur committed to transforming real estate data.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With the technical expertise of Mohammed Hesham—who provided the essential tools and software—Leads Synapse was built to deliver premium, accurate data that empowers real estate professionals to succeed.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src="/placeholder.svg" alt="Our Story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#00B4D8] text-white p-6 rounded-lg">
              <p className="text-2xl font-bold">Since</p>
              <p className="text-4xl font-bold">2024</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
