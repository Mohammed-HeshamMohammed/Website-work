"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function AboutCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <Card className="p-12 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative z-10 text-center"
          >
            <h2 className="text-4xl font-bold text-[#03045e] mb-6">Ready to Transform Your Real Estate Business?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful real estate professionals who trust 
              <br></br>
              Leads Synapse
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/plans">
                <Button size="lg" className="bg-[#03045e] hover:bg-[#00B4D8]">
                  Start Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8]/10 to-transparent" />
        </Card>
      </div>
    </section>
  )
}

