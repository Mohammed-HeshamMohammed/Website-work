"use client"

import { useEffect, useRef, useState } from "react"
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

// Website color palette
const colors = {
  darkBlue: "#03045E",
  mediumBlue: "#0077B6",
  lightBlue: "#00B4D8",
  paleBlue: "#90E0EF",
  offWhite: "#CAF0F8"
}

// Define types for the FAQ data
interface Question {
  q: string;
  a: React.ReactNode;
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

const sections: Section[] = [
  {
    id: "general",
    title: "General",
    questions: [
      {
        q: "What is Leads Synapse?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                A platform for real estate lead data that aims to help investors find opportunities.
              </li>
              <li>
                Supports various investment approaches including fix-and-flips, wholesaling, and creative financing.
              </li>
              <li>
                Offers different data packages designed to fit various project needs and budgets.
              </li>
              <li>
                We focus on providing reliable data that can help inform your investment decisions.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What is skip tracing?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                A process that helps locate current contact information for property owners.
              </li>
              <li>
                Provides phone numbers, emails, and other contact details to assist with outreach efforts.
              </li>
              <li>
                We work to verify this information to improve the chances of successful connections.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What services does Leads Synapse offer?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Lead lists that can be customized based on your specific investment criteria.
              </li>
              <li>
                Filtering options to help narrow down properties by price, ownership, equity, and other factors.
              </li>
              <li>
                Data sourced from multiple databases that we regularly update.
              </li>
              <li>
                Skip tracing services that aim to provide current contact information for property owners.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What sets Leads Synapse apart?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Access to a large database of homeowner records to help with your property search.
              </li>
              <li>
                Tools that use data analysis to identify potential market opportunities.
              </li>
              <li>
                Customizable filtering to help you find leads that match your investment criteria.
              </li>
              <li>
                A support team available to help with questions about using our platform.
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
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Create a custom list using our platform interface.
              </li>
              <li>
                Select filters like property type, price range, and equity that align with your goals.
              </li>
              <li>
                Review the number of available records before finalizing your selection.
              </li>
              <li>
                Download your list when you're ready to begin your outreach.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What data filters are available?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Property price ranges to help focus on properties within your budget.
              </li>
              <li>
                Ownership details to better understand who owns the property.
              </li>
              <li>
                Equity levels to identify properties that might have specific financial situations.
              </li>
              <li>
                Indicators of potential motivation, such as tax issues or pre-foreclosure status.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How do I create a custom list?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Select your preferred filters using our list builder tool.
              </li>
              <li>
                See how many records match your criteria as you adjust your selections.
              </li>
              <li>
                Make adjustments to ensure you're targeting the right types of properties.
              </li>
              <li>
                Generate and download your list when your criteria are finalized.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What are the benefits of using Leads Synapse?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Access to filtered lead data that may help identify potential opportunities.
              </li>
              <li>
                Contact information that can improve your ability to reach property owners.
              </li>
              <li>
                Tools designed to help organize and manage your lead follow-up process.
              </li>
              <li>
                Data insights that might help inform your investment strategy.
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
            <ul className="list-disc ml-5 space-y-2">
              <li>
                A list-building tool that uses data analysis to identify patterns in property records.
              </li>
              <li>
                Helps point out properties that may have higher equity or motivated sellers.
              </li>
              <li>
                Offers data-based insights that could be helpful when considering investment decisions.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How does data acquisition work?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Submit your criteria through our request form.
              </li>
              <li>
                Specify the geographic areas you're interested in exploring.
              </li>
              <li>
                We process your request and compile the matching property records.
              </li>
              <li>
                Your list is delivered to you once it's ready for use.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How can I access the new features?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Log in to your account on our platform.
              </li>
              <li>
                Visit the "Newest Features" section in your dashboard.
              </li>
              <li>
                Explore the available tools and options to see what might be helpful for your needs.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What improvements have been made?",
        a: (
          <>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Updates to our data processing systems to provide more current information.
              </li>
              <li>
                Interface adjustments designed to make the platform more intuitive.
              </li>
              <li>
                Additional filtering options to help refine your property searches.
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
        a: "The process of finding current contact information for property owners.",
      },
      {
        q: "Record",
        a: "A single entry containing property and homeowner information.",
      },
      {
        q: "Hit Rate",
        a: "The percentage of records that return contact information during skip tracing.",
      },
      {
        q: "Match Rate",
        a: "The likelihood of reaching the intended homeowner with the provided contact details.",
      },
      {
        q: "Equity Levels",
        a: "The portion of a property's value owned outright by the homeowner.",
      },
      {
        q: "Distressed Properties",
        a: "Properties where owners may be experiencing financial or other challenges.",
      },
    ],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export function FAQContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const { isAdmin } = useAdmin()
  
  // Create a container ref for handling wheel events
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  
  // Get the current section index
  const currentSectionIndex = sections.findIndex(section => section.id === activeSection)
  
  // Handle wheel events to navigate between sections
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      
      // If user hasn't reached the last section, prevent normal scrolling
      if (!hasScrolledToBottom && currentSectionIndex < sections.length - 1) {
        e.preventDefault()
      }
      
      // Threshold to determine significant scroll
      const scrollThreshold = 50
      
      if (Math.abs(e.deltaY) > scrollThreshold) {
        // Determine direction (positive deltaY means scrolling down)
        if (e.deltaY > 0) {
          if (currentSectionIndex < sections.length - 1) {
            // Scroll down to next section
            setIsScrolling(true)
            const nextSection = sections[currentSectionIndex + 1]
            scrollToSection(nextSection.id)
            
            // Prevent rapid scrolling by adding a delay
            setTimeout(() => {
              setIsScrolling(false)
            }, 800)
          } else {
            // We've reached the last section, allow normal scrolling
            setHasScrolledToBottom(true)
          }
        } else if (e.deltaY < 0) {
          // When scrolling up
          if (hasScrolledToBottom) {
            // If we're scrolling up and we've already scrolled down past last section
            const isAtTopOfPage = window.scrollY === 0
            if (isAtTopOfPage) {
              setHasScrolledToBottom(false)
            }
          } else if (currentSectionIndex > 0) {
            // Normal section navigation when scrolling up
            setIsScrolling(true)
            const prevSection = sections[currentSectionIndex - 1]
            scrollToSection(prevSection.id)
            
            // Prevent rapid scrolling by adding a delay
            setTimeout(() => {
              setIsScrolling(false)
            }, 800)
          }
        }
      }
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentSectionIndex, isScrolling, hasScrolledToBottom])
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return
      
      if (e.key === 'ArrowDown') {
        if (currentSectionIndex < sections.length - 1) {
          e.preventDefault()
          setIsScrolling(true)
          const nextSection = sections[currentSectionIndex + 1]
          scrollToSection(nextSection.id)
          setTimeout(() => setIsScrolling(false), 800)
        } else {
          setHasScrolledToBottom(true)
        }
      } else if (e.key === 'ArrowUp') {
        if (hasScrolledToBottom) {
          const isAtTopOfPage = window.scrollY === 0
          if (isAtTopOfPage) {
            setHasScrolledToBottom(false)
          }
        } else if (currentSectionIndex > 0) {
          e.preventDefault()
          setIsScrolling(true)
          const prevSection = sections[currentSectionIndex - 1]
          scrollToSection(prevSection.id)
          setTimeout(() => setIsScrolling(false), 800)
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSectionIndex, isScrolling, hasScrolledToBottom])

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    
    // Update URL hash for better navigation
    history.pushState(null, '', `#${sectionId}`)
    
    // Find the corresponding button and scroll it into view in the sidebar if needed
    const sidebarButton = document.getElementById(`sidebar-${sectionId}`)
    if (sidebarButton) {
      sidebarButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
  
  // Handle initial hash in URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash)
    }
  }, [])

  // Handle navigation buttons (Next/Prev)
  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      scrollToSection(sections[currentSectionIndex + 1].id)
    }
  }
  
  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      scrollToSection(sections[currentSectionIndex - 1].id)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 max-w-7xl mx-auto px-4 py-8"
    >
      <div className="md:sticky md:top-20 h-fit self-start">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="w-full"
        >
          <Card className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-md">
            <h3 className="text-sm font-medium text-gray-600 mb-3 px-3 border-l-4 border-l-[#03045E]">
              FAQ Categories
            </h3>
            <nav className="space-y-1.5">
              {sections.map((section) => (
                <motion.button
                  id={`sidebar-${section.id}`}
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                    activeSection === section.id
                      ? "bg-gradient-to-r from-[#03045E] to-[#0077B6] text-white shadow-md"
                      : "hover:bg-[#CAF0F8]/50 text-gray-700"
                  )}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`View ${section.title} section`}
                >
                  {section.title}
                </motion.button>
              ))}
            </nav>
          </Card>
          
          {/* Navigation Indicators */}
          <div className="mt-4 flex items-center justify-between px-3">
            <button 
              onClick={goToPrevSection}
              disabled={currentSectionIndex === 0}
              className={`p-2 rounded-full ${currentSectionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
              aria-label="Go to previous section"
              title="Previous section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-xs text-gray-500">
              {currentSectionIndex + 1} of {sections.length}
            </div>
            
            <button 
              onClick={goToNextSection}
              disabled={currentSectionIndex === sections.length - 1}
              className={`p-2 rounded-full ${currentSectionIndex === sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
              aria-label="Go to next section"
              title="Next section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        {/* Section Navigation Arrows (visible on mobile) */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button 
            onClick={goToPrevSection}
            disabled={currentSectionIndex === 0}
            className={`p-2 rounded-full ${currentSectionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
            aria-label={`Go to previous section: ${currentSectionIndex > 0 ? sections[currentSectionIndex - 1].title : ''}`}
            title={currentSectionIndex > 0 ? `Previous: ${sections[currentSectionIndex - 1].title}` : 'No previous section'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h2 className="text-lg font-medium text-[#03045E]">
            {sections[currentSectionIndex].title}
          </h2>
          
          <button 
            onClick={goToNextSection}
            disabled={currentSectionIndex === sections.length - 1}
            className={`p-2 rounded-full ${currentSectionIndex === sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
            aria-label={`Go to next section: ${currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1].title : ''}`}
            title={currentSectionIndex < sections.length - 1 ? `Next: ${sections[currentSectionIndex + 1].title}` : 'No next section'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {sections.map((section) => (
            activeSection === section.id && (
              <motion.section
                key={section.id}
                id={section.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeInRight}
                transition={{ duration: 0.5 }}
                className="mb-6" // Removed min-height constraint
              >
                <div className="flex items-center justify-between mb-5">
                  <motion.h2
                    variants={fadeInUp}
                    className="text-2xl font-semibold relative"
                  >
                    <span className="bg-gradient-to-r from-[#03045E] to-[#00B4D8] bg-clip-text text-transparent">
                      {section.title}
                    </span>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#03045E] to-[#00B4D8] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    />
                  </motion.h2>
                  {isAdmin && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-[#0077B6] hover:text-[#03045E] flex items-center gap-1 transition-colors"
                      aria-label="Edit this section"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Section
                    </motion.button>
                  )}
                </div>
                <Card className="overflow-hidden bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-md">
                  {section.id === "terminology" ? (
                    // Special case for terminology section - grid layout
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                      {section.questions.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="bg-gradient-to-br from-white to-[#CAF0F8]/30 p-5 rounded-lg shadow-sm border border-[#90E0EF]/30 hover:shadow-md transition-shadow"
                        >
                          <h4 className="text-[#03045E] font-medium mb-2 flex items-center">
                            <span className="h-3 w-3 rounded-full bg-[#00B4D8] mr-2.5 inline-block"></span>
                            {item.q}
                          </h4>
                          <p className="text-gray-600 ml-5.5 text-sm">{item.a}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    // Standard accordion for other sections
                    <Accordion type="single" collapsible className="w-full">
                      {section.questions.map((item, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${section.id}-${index}`}
                          className="border-b border-[#CAF0F8]/50 last:border-0"
                        >
                          <AccordionTrigger 
                            className="px-6 py-5 hover:bg-[#CAF0F8]/10 hover:text-[#0077B6] transition-all duration-300 text-gray-800 font-medium group rounded-t-lg"
                          >
                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="flex items-center w-full"
                            >
                              <span className="inline-block w-2.5 h-2.5 bg-[#00B4D8] rounded-full mr-3.5 group-hover:bg-[#0077B6] transition-colors flex-shrink-0"></span>
                              <span className="text-left">{item.q}</span>
                            </motion.div>
                          </AccordionTrigger>
                          <AccordionContent className="bg-[#CAF0F8]/10 px-6 py-5 text-gray-600 rounded-b-lg border-t border-[#CAF0F8]/30">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="prose prose-gray max-w-none ml-6"
                            >
                              {item.a}
                            </motion.div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </Card>
                
                {/* Pagination Controls (Desktop) */}
                <div className="hidden md:flex justify-between mt-6">
                  {currentSectionIndex > 0 && (
                    <motion.button
                      whileHover={{ x: -3 }}
                      onClick={goToPrevSection}
                      className="flex items-center text-sm text-[#0077B6] hover:text-[#03045E] transition-colors"
                      aria-label={`Go to previous section: ${sections[currentSectionIndex - 1].title}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous: {sections[currentSectionIndex - 1].title}
                    </motion.button>
                  )}
                  <div className="flex-grow"></div>
                  {currentSectionIndex < sections.length - 1 && (
                    <motion.button
                      whileHover={{ x: 3 }}
                      onClick={goToNextSection}
                      className="flex items-center text-sm text-[#0077B6] hover:text-[#03045E] transition-colors"
                      aria-label={`Go to next section: ${sections[currentSectionIndex + 1].title}`}
                    >
                      Next: {sections[currentSectionIndex + 1].title}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </motion.section>
            )
          ))}
        </AnimatePresence>
        
        {/* Scroll Indicator */}
        <div className="hidden md:block fixed right-8 bottom-8">
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-md p-3 text-xs text-gray-500 flex flex-col items-center">
            <span>Scroll</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 text-[#0077B6] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}