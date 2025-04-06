"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Shield, Clock, ThumbsUp } from "lucide-react"

export function ContactContent() {
  return (
    <div className="container py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-[#03045e]">Get in Touch with Kind Skiptracing</h1>

          <p className="text-xl text-gray-600">
            We're here to help you succeed in your real estate journey. Our team of experts is ready to assist you with
            any questions about our services.
          </p>

          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#03045e]/10 p-3">
                <Shield className="h-6 w-6 text-[#03045e]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">Trusted by Industry Leaders</h3>
                <p className="text-gray-600">
                  Join thousands of successful real estate professionals who trust our data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#03045e]/10 p-3">
                <Clock className="h-6 w-6 text-[#03045e]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">24/7 Support</h3>
                <p className="text-gray-600">Our dedicated team is always here to help you succeed.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#03045e]/10 p-3">
                <ThumbsUp className="h-6 w-6 text-[#03045e]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#03045e]">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">We're committed to providing the highest quality data and service.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#03045e] mb-6">Contact Form</h2>
            <form className="space-y-4">
              <div>
                <Input placeholder="Full Name" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" />
              </div>
              <div>
                <Input type="tel" placeholder="Your Phone" />
              </div>
              <div>
                <Textarea placeholder="Your Message" className="min-h-[150px]" />
              </div>
              <Button className="w-full bg-[#03045e] hover:bg-[#00B4D8]">Send</Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

