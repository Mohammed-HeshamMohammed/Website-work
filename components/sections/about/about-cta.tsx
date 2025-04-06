"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function AboutCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <Card className="p-0 overflow-hidden border-0 shadow-2xl rounded-2xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full opacity-10 blur-2xl" />
          
          {/* Content wrapper */}
          <div className="relative p-16 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
                  Ready to Transform Your Real Estate Business?
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Join thousands of successful real estate professionals who trust
                <span className="font-semibold text-blue-700"> Leads Synapse</span>
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/plans">
                  <Button 
                    size="lg" 
                    className="bg-blue-900 hover:bg-blue-600 text-white px-8 py-6 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-200 rounded-xl"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-blue-200 hover:border-blue-400 text-blue-700 hover:text-blue-900 px-8 py-6 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-blue-50"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                className="mt-10 flex justify-center items-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
                <span className="mx-3">•</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  )
}