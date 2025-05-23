"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Shield, Clock, ThumbsUp, Send, MapPin, Phone, Mail } from "lucide-react"

export function ContactContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      } 
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-60 md:w-96 h-60 md:h-96 bg-[#03045e]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-60 md:w-96 h-60 md:h-96 bg-[#03045e]/5 rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
    
      <div className="container relative z-10 px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-[#03045e] leading-tight">
              Get in Touch <span className="text-[#00B4D8]">With Us</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600">
              We're here to help you succeed in your real estate journey. Our team of experts is ready to assist you with
              any questions about our services.
            </motion.p>

            <motion.div variants={containerVariants} className="grid gap-4 md:gap-6">
              <motion.div variants={itemVariants} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-[#03045e]/10 hover:bg-white/50 hover:shadow-md transition-all duration-300">
                <div className="rounded-full bg-[#03045e]/10 p-2 md:p-3 shrink-0">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-[#03045e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#03045e] text-sm md:text-base">Trusted by Industry Leaders</h3>
                  <p className="text-gray-600 text-xs md:text-base">
                    Join thousands of successful real estate professionals who trust our data.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-[#03045e]/10 hover:bg-white/50 hover:shadow-md transition-all duration-300">
                <div className="rounded-full bg-[#03045e]/10 p-2 md:p-3 shrink-0">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#03045e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#03045e] text-sm md:text-base">24/7 Support</h3>
                  <p className="text-gray-600 text-xs md:text-base">Our dedicated team is always here to help you succeed.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-[#03045e]/10 hover:bg-white/50 hover:shadow-md transition-all duration-300">
                <div className="rounded-full bg-[#03045e]/10 p-2 md:p-3 shrink-0">
                  <ThumbsUp className="h-5 w-5 md:h-6 md:w-6 text-[#03045e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#03045e] text-sm md:text-base">Satisfaction Guaranteed</h3>
                  <p className="text-gray-600 text-xs md:text-base">We're committed to providing the highest quality data and service.</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 md:mt-8">
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="rounded-full bg-[#03045e]/10 p-2 shrink-0">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#03045e]" />
                </div>
                <p className="text-gray-600 text-sm md:text-base">New York, NY</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="rounded-full bg-[#03045e]/10 p-2 shrink-0">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-[#03045e]" />
                </div>
                <p className="text-gray-600 text-sm md:text-base">(555) 123-4567</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="rounded-full bg-[#03045e]/10 p-2 shrink-0">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-[#03045e]" />
                </div>
                <p className="text-gray-600 text-sm md:text-base truncate">info@kindskiptracing.com</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Card className="p-4 md:p-8 shadow-lg backdrop-blur-sm bg-white/90 border border-[#03045e]/10 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-semibold text-[#03045e] mb-4 md:mb-6">Send us a message</h2>
              <form className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <Input 
                      placeholder="Full Name" 
                      className="border-[#03045e]/20 focus:border-[#03045e]/50 h-10 md:h-12 rounded-lg" 
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      className="border-[#03045e]/20 focus:border-[#03045e]/50 h-10 md:h-12 rounded-lg" 
                    />
                  </div>
                </div>
                <div>
                  <Input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="border-[#03045e]/20 focus:border-[#03045e]/50 h-10 md:h-12 rounded-lg" 
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    className="min-h-[120px] md:min-h-[150px] border-[#03045e]/20 focus:border-[#03045e]/50 rounded-lg" 
                  />
                </div>
                <Button className="w-full bg-[#03045e] hover:bg-[#00B4D8] h-10 md:h-12 rounded-lg text-sm md:text-base font-medium transition-all duration-300 group">
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}