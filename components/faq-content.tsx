"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { useAdmin } from "@/contexts/admin-context"

const sections = [
  {
    id: "general",
    title: "General",
    questions: [
      {
        q: "What is Leads Synapse?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                A trusted, industry-leading platform for real estate lead data.
              </li>
              <li>
                Supports a range of strategies including fix-and-flips, wholesaling, novation, and creative financing.
              </li>
              <li>
                Offers flexible record packages—from 100K to over 1M records—with proven quality and accuracy.
              </li>
              <li>
                Our reputation is built on consistent, high-quality data that drives successful investments.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What is skip tracing?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                A comprehensive process to locate and verify the latest contact details for property records.
              </li>
              <li>
                Retrieves phone numbers, emails, and alternate contacts to ensure your outreach is efficient.
              </li>
              <li>
                With our rigorous verification, you can be confident that you're working with the most accurate data available.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What services does Leads Synapse offer?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Customizable lead lists tailored precisely to your investment needs.
              </li>
              <li>
                Advanced filtering options covering price ranges, ownership details, equity levels, and distress indicators.
              </li>
              <li>
                Reliable data pulling from frequently updated sources ensuring premium quality.
              </li>
              <li>
                Expert skip tracing with a 90%+ hit rate that guarantees you receive current, actionable contact information.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What sets Leads Synapse apart?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Access to over 217 million homeowner records, ensuring you never miss a valuable lead.
              </li>
              <li>
                Cutting-edge AI-driven tools (Leads AI) that provide predictive, real-time market insights.
              </li>
              <li>
                Robust, flexible filtering that delivers highly targeted lead lists for your specific strategy.
              </li>
              <li>
                A proven track record and dedicated support team committed to your success.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "using-leads-synapse",
    title: "Using Leads Synapse",
    questions: [
      {
        q: "How do I get started?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Simply create a custom list on our user-friendly platform.
              </li>
              <li>
                Use our intuitive filters—property type, price, equity, and more—to match your investment goals.
              </li>
              <li>
                Preview record counts to ensure you’re selecting the best criteria.
              </li>
              <li>
                Generate and download your custom lead list with confidence.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What data filters are available?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Property Price Range (e.g., $100K–$300K) to target the right deals.
              </li>
              <li>
                Ownership Type & Duration to refine your outreach.
              </li>
              <li>
                Equity Levels (20%-90%) to align with your investment strategy.
              </li>
              <li>
                Distressed owner indicators (like tax delinquencies or pre-foreclosures) for high-motivation leads.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How do I create a custom list?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Choose your desired filters and criteria with our step-by-step list builder.
              </li>
              <li>
                Instantly preview the count of matching records.
              </li>
              <li>
                Refine your selection to ensure you’re getting the most relevant leads.
              </li>
              <li>
                Download your custom list and start reaching out to quality prospects.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What are the benefits of using Leads Synapse?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Enjoy highly targeted, premium quality lead data that drives results.
              </li>
              <li>
                Increase outreach and conversion rates with verified, up-to-date contact info.
              </li>
              <li>
                Experience efficient data management backed by expert support.
              </li>
              <li>
                Leverage AI-driven insights and advanced filtering for a competitive edge.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "newest-features",
    title: "Newest Features",
    questions: [
      {
        q: "What is Leads AI?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                A powerful, predictive list builder that analyzes market trends.
              </li>
              <li>
                Instantly highlights high-equity and motivated leads.
              </li>
              <li>
                Provides actionable insights to help you make informed investment decisions.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How does data acquisition work?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Fill out a simple form with your specific criteria.
              </li>
              <li>
                Specify regions (ZIP codes, cities) for targeted data collection.
              </li>
              <li>
                Leads Synapse rigorously validates, organizes, and delivers your lead lists.
              </li>
              <li>
                Enjoy peace of mind knowing that your data is accurate and actionable.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How can I access the new features?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Log in to your Leads Synapse account with ease.
              </li>
              <li>
                Navigate to the "Newest Features" tab to explore our latest innovations.
              </li>
              <li>
                Utilize tools like Leads AI and enhanced filters to stay ahead in the market.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What improvements have been made?",
        a: (
          <>
            <ul className="list-disc ml-5">
              <li>
                Enhanced data accuracy and processing speed for optimal performance.
              </li>
              <li>
                A more intuitive user interface that simplifies your workflow.
              </li>
              <li>
                Additional filtering options and AI-powered insights to further empower your decisions.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "terminology",
    title: "Terminology",
    questions: [
      {
        q: "Skip Tracing",
        a: "The process of locating and verifying current contact details for property records.",
      },
      {
        q: "Record",
        a: "A single data row containing detailed homeowner and property information.",
      },
      {
        q: "Hit Rate",
        a: "The percentage of records that return valid contact information after skip tracing.",
      },
      {
        q: "Match Rate",
        a: "The likelihood of reaching the correct homeowner using the provided contacts.",
      },
      {
        q: "Equity Levels",
        a: "The homeowner's share of property value, used to target the most promising investment leads.",
      },
      {
        q: "Distressed Owners",
        a: "Homeowners facing financial challenges who are often more motivated to sell.",
      },
    ],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function FAQContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const { isAdmin } = useAdmin()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="md:sticky md:top-20 h-fit"
      >
        <Card className="p-4 bg-white/50 backdrop-blur-sm border border-gray-200/50">
          <nav className="space-y-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300",
                  activeSection === section.id
                    ? "bg-gradient-to-r from-[#03045e] to-[#00B4D8] text-white shadow-lg"
                    : "hover:bg-gray-100"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {section.title}
              </motion.button>
            ))}
          </nav>
        </Card>
      </motion.div>

      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className={section.id !== activeSection ? "hidden" : ""}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-semibold bg-gradient-to-r from-[#03045e] to-[#00B4D8] bg-clip-text text-transparent"
                >
                  {section.title}
                </motion.h2>
                {isAdmin && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-[#00B4D8] hover:underline"
                  >
                    Edit Section
                  </motion.button>
                )}
              </div>
              <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200/50">
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((item, index) => (
                    <AccordionItem key={index} value={`${section.id}-${index}`}>
                      <AccordionTrigger className="px-6 hover:text-[#00B4D8] transition-colors duration-300">
                        <motion.div
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.q}
                        </motion.div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 text-gray-600">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="prose prose-gray max-w-none"
                        >
                          {item.a}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
