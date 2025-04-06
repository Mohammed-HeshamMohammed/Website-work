"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Updated plans with appealing feature descriptions and benefits
const plans = [
  {
    name: "Skip-Tracing",
    price: "$0.02",
    description: "Unlock the power of verified contact data",
    features: [
      "Guaranteed 85%+ Contact Match Rate",
      "Property owner's mobile & landline numbers.",
      "95% Data Accuracy Guaranteed",
      "Remove Duplicates & Old Records",
      "Flexible Volume Discounts to Boost Your ROI",
    ],
    pricePerRecord: 0.02,
  },
  {
    name: "Pulling & Skip-Tracing",
    price: "$0.03",
    description: "Maximize your outreach with comprehensive details",
    features: [
      "Unmatched 90% Contact Success Rate",
      "Multiple Verified Phone Numbers per Record",
      "Exceptional 98% Data Accuracy",
      "Comprehensive Contact Profiles",
      "Exclusive Volume Pricing for Maximum Savings",
    ],
    pricePerRecord: 0.03,
  },
]

export function PricingCards() {
  const router = useRouter()

  const handleSelectPlan = (pricePerRecord: number) => {
    // Navigate to your order page with the selected price parameter
    router.push(`/order?pricePerRecord=${pricePerRecord}`)
  }

  return (
    <div className="relative py-12">
      {/* Animated "neuron" background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00B4D8]"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto relative z-10 px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="relative overflow-hidden bg-white shadow-xl rounded-xl">
              {/* "Energy flow" animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B4D8]/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* 
                This CardHeader uses flex with justify-between. 
                The first <div> is on the left, the second <div> (price) is on the right.
              */}
              <CardHeader className="relative z-10 p-6 flex justify-between items-center">
                {/* Left side: Plan name & description */}
                <div>
                  <CardTitle className="text-2xl font-bold text-[#03045e]">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                {/* 
                  Right side: Price 
                  'text-right' right-aligns the text inside this <div>.
                  If you want the price on the left, you could swap this <div> 
                  with the previous <div>, or remove 'justify-between'.
                */}
                <div className="text-right">
                  <span className="block text-4xl font-bold text-[#03045e]">
                    {plan.price}
                    <text className="text-sm text-gray-500">/ record</text>
                  </span>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 p-6 pt-0">
                {/* Feature list with staggered animation */}
                <motion.ul
                  className="space-y-4 mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {plan.features.map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Check className="h-5 w-5 text-[#00B4D8] mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Order Now button with subtle hover/tap scaling */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-[#03045e] hover:bg-[#00B4D8] transition-colors shadow-md"
                    onClick={() => handleSelectPlan(plan.pricePerRecord)}
                  >
                    Order Now
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
