"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Define TypeScript interfaces for type safety
interface ContentBlock {
  text: string
  items?: string[]
}

interface Section {
  title: string
  content: ContentBlock[]
}

const sections: Section[] = [
  {
    title: "Agreement to Terms",
    content: [
      {
        text: "By accessing or using Leads Synapse services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.",
      },
    ],
  },
  {
    title: "Use License",
    content: [
      {
        text: "Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only.",
        items: [
          "This license shall automatically terminate if you violate any of these restrictions",
          "Upon termination, you must destroy any downloaded materials",
          "This license does not include:",
          "- Modification or use for any commercial purpose",
          "- Attempt to decompile or reverse engineer any software",
          "- Remove any copyright or proprietary notations",
          "- Transfer the materials to another person",
        ],
      },
    ],
  },
  {
    title: "Service Description",
    content: [
      {
        text: "Leads Synapse provides real estate data and lead generation services. Our services include:",
        items: [
          "Property data access and analysis",
          "Skip tracing services",
          "Lead generation tools",
          "Data export and reporting",
        ],
      },
    ],
  },
  {
    title: "User Obligations",
    content: [
      {
        text: "As a user of our services, you agree to:",
        items: [
          "Provide accurate and complete information",
          "Maintain the security of your account",
          "Not share your account credentials",
          "Use the services in compliance with all applicable laws",
          "Not engage in any unauthorized data scraping or collection",
        ],
      },
    ],
  },
  {
    title: "Payment Terms",
    content: [
      {
        text: "Payment terms for our services include:",
        items: [
          "All fees are due in advance of service delivery",
          "Prices are subject to change with notice",
          "Refunds are provided in accordance with our refund policy",
          "Late payments may result in service suspension",
        ],
      },
    ],
  },
  {
    title: "Data Usage and Privacy",
    content: [
      {
        text: "Your use of our services is also governed by our Privacy Policy. You agree that:",
        items: [
          "We may collect and use information as described in our Privacy Policy",
          "You will not use our services to collect or process data unlawfully",
          "You will obtain necessary consents for any data collection",
          "You will handle all data in compliance with applicable privacy laws",
        ],
      },
    ],
  },
  {
    title: "Disclaimer",
    content: [
      {
        text: "Our services are provided 'as is'. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including:",
        items: [
          "Merchantability",
          "Fitness for a particular purpose",
          "Non-infringement of intellectual property",
          "Accuracy, reliability, and completeness of data",
        ],
      },
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      {
        text: "In no event shall Leads Synapse be liable for any:",
        items: [
          "Direct, indirect, or consequential damages",
          "Loss of profits or data",
          "Business interruption",
          "Personal injury or property damage",
        ],
      },
    ],
  },
  {
    title: "Termination",
    content: [
      {
        text: "We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including:",
        items: [
          "Breach of these Terms",
          "Violation of applicable laws",
          "Upon request by law enforcement",
          "Extended period of inactivity",
        ],
      },
    ],
  },
  {
    title: "Governing Law",
    content: [
      {
        text: "These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.",
      },
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      {
        text: "We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by:",
        items: [
          "Posting the new Terms on this page",
          "Updating the 'Last updated' date",
          "Sending an email notification to registered users",
        ],
      },
    ],
  },
  {
    title: "Contact Information",
    content: [
      {
        text: "Questions about the Terms should be sent to us at:",
        items: [
          "Email: info@leadssynapse.com",
          "Phone: (555) 123-4567",
          "Address: 123 Legal Street, Terms City, ST 12345",
        ],
      },
    ],
  },
]

export function TermsContent() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-4xl">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#03045e] mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Last updated: February 24, 2024
          </motion.p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white border border-[#caf0f8] hover:border-[#90e0ef] transition-colors">
                <h2 className="text-2xl font-bold text-[#03045e] mb-4">{section.title}</h2>
                {section.content.map((contentBlock, blockIndex) => (
                  <div key={blockIndex} className="mb-4 last:mb-0">
                    {contentBlock.text && (
                      <p className="text-gray-600 mb-2">{contentBlock.text}</p>
                    )}
                    {"items" in contentBlock && contentBlock.items && (
                      <ul className="list-disc list-inside space-y-1">
                        {contentBlock.items.map((item: string, itemIndex: number) => (
                          <li
                            key={itemIndex}
                            className={`text-gray-600 ${
                              item.startsWith("-") ? "ml-8" : "ml-4"
                            }`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            For more information about how we handle your data, please visit our{" "}
            <Link href="/privacy" className="text-[#00B4D8] hover:underline">
              Privacy Policy
            </Link>{" "}
            page.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
