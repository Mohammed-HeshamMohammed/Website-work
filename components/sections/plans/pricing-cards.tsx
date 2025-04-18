"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, Zap, Award, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Type definition for plan objects
type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  pricePerRecord?: number;
  isPremium: boolean;
  icon: JSX.Element;
  color: string;
  accentColor: string;
  contactOnly?: boolean;
  tag?: string;
}

// Updated plans with new color scheme
const plans: Plan[] = [
  {
    name: "Skip-Tracing",
    price: "$0.02",
    description: "Unlock the power of verified contact data",
    features: [
      "Guaranteed 85%+ Contact Match Rate",
      "Property owner's mobile & landline numbers",
      "95% Data Accuracy Guaranteed",
      "Remove Duplicates & Old Records",
      "Flexible Volume Discounts to Boost Your ROI",
    ],
    pricePerRecord: 0.02,
    isPremium: false,
    icon: <Zap className="w-6 h-6 mb-2 text-[#0077b6]" />,
    color: "bg-white",
    accentColor: "#0077b6",
  },
  {
    name: "Leads Synapse",
    price: "Custom",
    description: "Enterprise solution for high-volume lead data matching",
    features: [
      "For Special Projects",
      "Discounted pricing for high-volume orders",
      "Priority data processing",
    ],
    isPremium: true,
    contactOnly: true,
    icon: <BrainCircuit className="w-10 h-10 mb-2 text-[#90e0ef]" />,
    color: "bg-gradient-to-br from-[#03045e] to-[#0077b6]",
    accentColor: "#90e0ef",
    tag: "Enterprise",
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
    isPremium: false,
    icon: <Award className="w-6 h-6 mb-2 text-[#00b4d8]" />,
    color: "bg-white",
    accentColor: "#00b4d8",
  },
]

export function PricingCards() {
  const router = useRouter()

  const handleSelectPlan = (pricePerRecord: number) => {
    // Navigate to your order page with the selected price parameter
    router.push(`/order?pricePerRecord=${pricePerRecord}`)
  }

  const handleContactRequest = () => {
    // Navigate to your contact page for premium plans
    router.push('/book-a-meeting')
  }

  return (
    <div className="relative py-16">
      {/* Company branding at the top */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mr-3"
            >
              <path d="M50 10C36.7 10 26 20.7 26 34C26 47.3 36.7 58 50 58C63.3 58 74 47.3 74 34C74 20.7 63.3 10 50 10Z" fill="#00B4D8" />
              <path d="M62 65H38C24.7 65 14 75.7 14 89V90H86V89C86 75.7 75.3 65 62 65Z" fill="#03045e" />
              <path d="M62 35C62 42.2 56.6 48 50 48C43.4 48 38 42.2 38 35C38 27.8 43.4 22 50 22C56.6 22 62 27.8 62 35Z" fill="#03045e" />
              <path d="M74 68L81 75M81 75L88 82M81 75L74 82M81 75L88 68" stroke="#00B4D8" strokeWidth="4" strokeLinecap="round" />
              <path d="M12 68L19 75M19 75L26 82M19 75L12 82M19 75L26 68" stroke="#00B4D8" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#03045e] to-[#00B4D8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Leads Synapse
          </motion.h2>
        </div>
        <motion.p
          className="text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Neural-powered contact discovery that connects you with the right leads
        </motion.p>
      </div>

      {/* Animated "neuron" background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#90e0ef]"
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

      {/* Neural connection lines - animated */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Cards container - reordered to put premium in the middle */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6.5xl mx-auto relative z-10 px-4">
        {/* First card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className={`relative overflow-hidden rounded-xl shadow-xl ${plans[0].color} border-[#0077b6]/20 h-full flex flex-col`}>
            {/* "Energy flow" animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0077b6]/5 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <CardHeader className="relative z-10 p-6 text-center">
              <div className="flex justify-center">{plans[0].icon}</div>
              <CardTitle className="text-xl font-bold text-[#03045e]">{plans[0].name}</CardTitle>
              <p className="text-gray-600 mt-2">{plans[0].description}</p>
              <div className="mt-4">
                <span className="block text-3xl font-bold text-[#03045e]">
                  {plans[0].price}
                  <text className="text-sm text-gray-500">/ record</text>
                </span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-6 pt-0 flex flex-col flex-grow">
              {/* Feature list with staggered animation */}
              <motion.ul
                className="space-y-4 mb-8 flex-grow"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {plans[0].features.map((feature) => (
                  <motion.li
                    key={feature}
                    className="flex items-center"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Check className="h-5 w-5 text-[#0077b6] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Order Now button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                <Button
                  className="w-full shadow-md bg-[#03045e] hover:bg-[#0077b6] transition-colors"
                  onClick={() => {
                    if (plans[0].pricePerRecord !== undefined) {
                      handleSelectPlan(plans[0].pricePerRecord)
                    }
                  }}
                >
                  Order Now
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Second card (premium in the middle) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="md:-mt-4 md:mb-4 z-20"
        >
          <Card className={`relative overflow-hidden rounded-xl shadow-2xl ${plans[1].color} text-white h-full border-2 border-[#90e0ef] flex flex-col`}>
            {/* Popular tag */}
            {plans[1].tag && (
              <div className="absolute top-0 right-0 bg-[#90e0ef] text-xs font-bold px-3 py-1 rounded-bl-lg text-[#03045e]">
                {plans[1].tag}
              </div>
            )}
            {/* "Energy flow" animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#caf0f8]/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Neural network animated lines background */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`premium-line-${i}`}
                  className="absolute h-px bg-[#90e0ef]/20"
                  style={{
                    width: "110%",
                    left: "0%",
                    top: `${10 + i * 12}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scaleX: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <CardHeader className="relative z-10 p-6 text-center">
              <motion.div
                className="flex justify-center mb-3"
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#caf0f8]/30 to-transparent backdrop-blur-sm mb-2">
                  {plans[1].icon}
                </div>
              </motion.div>
              <CardTitle className="text-2xl font-bold text-white">{plans[1].name}</CardTitle>
              <p className="text-gray-300 mt-2">{plans[1].description}</p>
              <div className="mt-4">
                <span className="text-xl text-[#caf0f8] font-medium">Enterprise Solution</span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-6 pt-0 flex flex-col flex-grow">
              <motion.ul
                className="space-y-4 mb-8 flex-grow"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {plans[1].features
                  .filter((f) => !f.includes("100,000+ matches"))
                  .map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Check className="h-5 w-5 text-[#90e0ef] mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
              </motion.ul>
              <div className="relative mt-auto">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-lg blur-md"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full shadow-md bg-[#00b4d8] hover:bg-[#0077b6] relative z-10 transition-colors"
                    onClick={() => handleContactRequest()}
                  >
                    Contact For Pricing
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Third card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className={`relative overflow-hidden rounded-xl shadow-xl ${plans[2].color} border-[#00b4d8]/20 h-full flex flex-col`}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00b4d8]/5 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <CardHeader className="relative z-10 p-6 text-center">
              <div className="flex justify-center">{plans[2].icon}</div>
              <CardTitle className="text-xl font-bold text-[#03045e]">{plans[2].name}</CardTitle>
              <p className="text-gray-600 mt-2">{plans[2].description}</p>
              <div className="mt-4">
                <span className="block text-3xl font-bold text-[#03045e]">
                  {plans[2].price}
                  <text className="text-sm text-gray-500">/ record</text>
                </span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-6 pt-0 flex flex-col flex-grow">
              <motion.ul
                className="space-y-4 mb-8 flex-grow"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {plans[2].features.map((feature) => (
                  <motion.li
                    key={feature}
                    className="flex items-center"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Check className="h-5 w-5 text-[#00b4d8] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                <Button
                  className="w-full shadow-md bg-[#03045e] hover:bg-[#00b4d8] transition-colors"
                  onClick={() => {
                    if (plans[2].pricePerRecord !== undefined) {
                      handleSelectPlan(plans[2].pricePerRecord)
                    }
                  }}
                >
                  Order Now
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default PricingCards