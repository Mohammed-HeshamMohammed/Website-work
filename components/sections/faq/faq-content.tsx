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
import { sections } from "@/components/sections/faq/faq-data"
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react"

// Website color palette
const colors = {
  darkBlue: "#03045E",
  mediumBlue: "#0077B6",
  lightBlue: "#00B4D8",
  paleBlue: "#90E0EF",
  offWhite: "#CAF0F8"
}

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
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAdmin } = useAdmin()
  
  // Create a container ref for handling wheel events
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  
  // Get the current section index
  const currentSectionIndex = sections.findIndex(section => section.id === activeSection)
  
  // Handle wheel events to navigate between sections (desktop only)
  useEffect(() => {
    // Only apply wheel scrolling on desktop/tablet
    if (window.innerWidth < 768) return
    
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
  
  // Handle keyboard navigation (desktop)
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
    setMenuOpen(false) // Close mobile menu when a section is selected
    
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
      className="max-w-7xl mx-auto px-4 py-6 md:py-8"
    >
      {/* Mobile Header with Menu Toggle - only visible on mobile */}
      <div className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md mb-4 border-b border-gray-100 pb-3">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-[#CAF0F8]/30 text-[#0077B6]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <h1 className="text-lg font-medium text-[#03045E]">
            FAQ
          </h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>
      
      {/* Mobile Navigation Drawer - only visible on mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="md:hidden fixed inset-0 z-20 bg-black/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4 pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-medium text-gray-600 mb-3 px-3 border-l-4 border-l-[#03045E]">
                FAQ Categories
              </h3>
              
              <nav className="space-y-1.5 mt-4">
                {sections.map((section) => (
                  <motion.button
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
              
              <div className="absolute bottom-8 left-0 right-0 px-4">
                <div className="text-xs text-center text-gray-500">
                  Section {currentSectionIndex + 1} of {sections.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar - Only visible on desktop */}
        <div className="hidden md:block md:sticky md:top-20 h-fit self-start">
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
            
            {/* Desktop Navigation Indicators */}
            <div className="mt-4 flex items-center justify-between px-3">
              <button 
                onClick={goToPrevSection}
                disabled={currentSectionIndex === 0}
                className={`p-2 rounded-full ${currentSectionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
                aria-label="Go to previous section"
                title="Previous section"
              >
                <ChevronLeft size={16} />
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
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Mobile Section Navigation - visible only on mobile */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button 
              onClick={goToPrevSection}
              disabled={currentSectionIndex === 0}
              className={`p-2 rounded-full ${currentSectionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
              aria-label="Go to previous section"
            >
              <ChevronLeft size={20} />
            </button>
            
            <h2 className="text-lg font-medium text-[#03045E]">
              {sections[currentSectionIndex].title}
            </h2>
            
            <button 
              onClick={goToNextSection}
              disabled={currentSectionIndex === sections.length - 1}
              className={`p-2 rounded-full ${currentSectionIndex === sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#0077B6] hover:bg-[#CAF0F8]/50'}`}
              aria-label="Go to next section"
            >
              <ChevronRight size={20} />
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
                  className="mb-6"
                >
                  {/* Section title - only visible on desktop */}
                  <div className="hidden md:flex items-center justify-between mb-5">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
                        {section.questions.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="bg-gradient-to-br from-white to-[#CAF0F8]/30 p-4 md:p-5 rounded-lg shadow-sm border border-[#90E0EF]/30 hover:shadow-md transition-shadow"
                          >
                            <h4 className="text-[#03045E] font-medium mb-2 flex items-center">
                              <span className="h-2.5 md:h-3 w-2.5 md:w-3 rounded-full bg-[#00B4D8] mr-2.5 inline-block"></span>
                              {item.q}
                            </h4>
                            <p className="text-gray-600 ml-5 text-sm">{item.a}</p>
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
                              className="px-4 md:px-6 py-4 md:py-5 hover:bg-[#CAF0F8]/10 hover:text-[#0077B6] transition-all duration-300 text-gray-800 font-medium group rounded-t-lg"
                            >
                              <motion.div
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex items-center w-full"
                              >
                                <span className="inline-block w-2 md:w-2.5 h-2 md:h-2.5 bg-[#00B4D8] rounded-full mr-3 md:mr-3.5 group-hover:bg-[#0077B6] transition-colors flex-shrink-0"></span>
                                <span className="text-left text-sm md:text-base">{item.q}</span>
                              </motion.div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-[#CAF0F8]/10 px-4 md:px-6 py-3 md:py-5 text-gray-600 rounded-b-lg border-t border-[#CAF0F8]/30">
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="prose prose-sm md:prose-base prose-gray max-w-none ml-5 md:ml-6"
                              >
                                {item.a}
                              </motion.div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </Card>
                  
                  {/* Mobile section navigation dots */}
                  <div className="md:hidden flex justify-center items-center mt-5 gap-2">
                    {sections.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentSectionIndex 
                            ? 'w-6 bg-[#0077B6]' 
                            : 'w-2 bg-[#CAF0F8]'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Mobile admin button */}
                  {isAdmin && (
                    <div className="md:hidden mt-5 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm text-[#0077B6] flex items-center gap-1"
                        aria-label="Edit this section"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </motion.button>
                    </div>
                  )}
                  
                  {/* Desktop Pagination Controls */}
                  <div className="hidden md:flex justify-between mt-6">
                    {currentSectionIndex > 0 && (
                      <motion.button
                        whileHover={{ x: -3 }}
                        onClick={goToPrevSection}
                        className="flex items-center text-sm text-[#0077B6] hover:text-[#03045E] transition-colors"
                        aria-label={`Go to previous section: ${sections[currentSectionIndex - 1].title}`}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
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
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </motion.button>
                    )}
                  </div>
                </motion.section>
              )
            ))}
          </AnimatePresence>
          
          {/* Desktop Scroll Indicator */}
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
    </div>
  )
}