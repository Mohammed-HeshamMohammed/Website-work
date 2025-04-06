"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const services = [
  {
    number: "1",
    title: "What is Data Synapse?",
    description:
      "At Data Synapse, we specialize in providing top-tier, high-quality data solutions for real estate investors, including those focusing on fix-and-flip projects, wholesaling, creative financing, and other investment strategies.",
  },
  {
    number: "2",
    title: "Supported Investment Strategies",
    description:
      "We cater to various real estate investing strategies including fix and flips, wholesaling, Novation, and Creative financing.",
  },
  {
    number: "4",
    title: "Wholesaling",
    description:
      "Wholesaling is a strategy where investors secure properties under contract and sell the contract to other buyers.",
  },
  {
    number: "5",
    title: "Novation in Real Estate",
    description: "Data Synapse supports innovative approaches to real estate investing, promoting creative solutions.",
  },
  {
    number: "6",
    title: "Creative Financing",
    description:
      "This includes various financing techniques that allow investors to acquire properties without traditional funding methods.",
  },
  {
    number: "7",
    title: "Range of Services",
    description:
      "Data Synapse provides a comprehensive range of services designed to assist real estate investors in acquiring high-quality leads.",
  },
]

export function ServiceOverview() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-50 to-transparent" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50"
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 0, 50, 0],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50"
          animate={{
            x: [0, -50, 0, 50, 0],
            y: [0, 50, 0, -50, 0],
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />
      </div>
    
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-full text-sm mb-4">OUR SERVICES</span>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent mb-6">
            Complete Real Estate Data Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive services designed for real estate professionals seeking actionable insights and high-quality data.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <Card className="h-full border-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                {/* Top color bar */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Service Number */}
                <div className="absolute top-6 right-6">
                  <motion.div
                    initial={false}
                    whileHover={{ 
                      rotate: 10,
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                    className="flex items-center justify-center w-12 h-12 rounded-full text-blue-900 font-bold text-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300"
                  >
                    {service.number}
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-8 pt-16">
                  <motion.h3 
                    className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-600 transition-colors duration-300"
                    initial={false}
                    whileHover={{ x: 5 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  
                  {/* Learn More Link */}
                  <div className="mt-auto">
                    <motion.div
                      initial={false}
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300"
                    >
                      Learn more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                    <path d="M0 64L64 0V64H0Z" fill="currentColor" className="text-blue-900" />
                  </svg>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 