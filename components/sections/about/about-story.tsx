"use client"
import { motion } from "framer-motion"

export function AboutStory() {
  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Content Column */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-3">
                <span className="bg-blue-50 text-blue-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm">OUR JOURNEY</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent mb-4 md:mb-8">
                How Leads Synapse Was Founded
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                <motion.p 
                  className="text-base md:text-xl text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-3 md:pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Leads Synapse was founded in 2024 in San Francisco, California by Mohammed Salah, a visionary entrepreneur committed to transforming real estate data.
                </motion.p>
                
                <motion.p 
                  className="text-base md:text-xl text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  With the technical expertise of Mohammed Hesham—who provided the essential tools and software—Leads Synapse was built to deliver premium, accurate data that empowers real estate professionals to succeed.
                </motion.p>
              </div>
              
              <motion.div 
                className="mt-6 md:mt-10 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="h-1 w-10 md:w-16 bg-blue-600 mr-3 md:mr-4"></div>
                <span className="text-blue-900 font-bold text-xs md:text-base">TRANSFORMING REAL ESTATE DATA</span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Image Column - note the order change for mobile */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <motion.div
              className="absolute -z-10 w-40 md:w-64 h-40 md:h-64 bg-blue-100 rounded-full blur-3xl opacity-70 top-0 -right-10 md:-right-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Our Story" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-3 md:p-6 rounded-lg shadow-xl"
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-lg md:text-2xl font-medium opacity-80">Since</p>
                <p className="text-3xl md:text-5xl font-bold">2024</p>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white p-2 md:p-4 rounded-full shadow-lg flex items-center justify-center"
                initial={{ opacity: 0, rotate: -20 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotate: 10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-blue-50 rounded-full p-2 md:p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-10 md:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}