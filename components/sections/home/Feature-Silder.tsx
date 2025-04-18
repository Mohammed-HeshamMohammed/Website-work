// FeatureSlider.tsx
"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { BackgroundEffects } from "@/components/animations-UI/BackgroundEffects"
import { ProgressIndicator } from "@/components/animations-UI/ProgressIndicator"
import { SideCard } from "@/components/sections/home/global-process/SideCard"
import { MainCard } from "@/components/sections/home/global-process/MainCard"
import { NavigationControls } from "@/components/animations-UI/NavigationControls"
import { steps } from "./Content-Data/data"
import { CursorTrail } from "@/components/animations-UI/CursorTrail"
import { SliderBackground } from "@/components/animations-UI/SliderBackground"

export function FeatureSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef(0)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Set up resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Handle navigation - memoized for better performance
  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length)
  }, [])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => prevIndex === 0 ? steps.length - 1 : prevIndex - 1)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  // Get previous and next indices for side cards
  const getPrevIndex = () => {
    const index = currentIndex - 1;
    return index < 0 ? steps.length - 1 : index;
  }

  const getNextIndex = () => {
    return (currentIndex + 1) % steps.length;
  }

  // Mouse tracking for magical effects - only on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  // Touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStartRef.current - touchEnd
    
    // Detect swipe with a minimum threshold
    const minSwipeDistance = 50
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left, go next
        goToNext()
      } else {
        // Swipe right, go previous
        goToPrev()
      }
    }
  }

  // Autoplay functionality with shorter interval on mobile
  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      goToNext()
    }, isMobile ? 5000 : 6000)
    
    return () => clearInterval(interval)
  }, [currentIndex, autoplay, goToNext, isMobile])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === sliderRef.current || sliderRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowRight') {
          goToNext()
        } else if (e.key === 'ArrowLeft') {
          goToPrev()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  // Pause autoplay on hover - only on desktop
  const handleMouseEnter = () => {
    if (isMobile) return
    setIsHovering(true)
    setAutoplay(false)
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    setIsHovering(false)
    setAutoplay(true)
  }

  return (
    <section className="py-10 md:py-32 overflow-hidden relative bg-gradient-to-b from-indigo-50 via-white to-blue-50">
      <BackgroundEffects />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={containerRef}
          className="relative mb-8 md:mb-16"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          aria-label="Feature Carousel"
          role="region"
        >
          {/* Light trail effect that follows cursor - only on desktop */}
          {!isMobile && <CursorTrail isHovering={isHovering} mousePosition={mousePosition} />}

          {/* Main slider container - adjust height for mobile */}
          <div 
            ref={sliderRef} 
            className="relative h-[500px] md:h-screen md:max-h-[700px] flex items-center justify-center slider-container"
          >
            <SliderBackground />
            
            {/* Progress indicator with glowing effect */}
            {autoplay && <ProgressIndicator currentIndex={currentIndex} duration={isMobile ? 5 : 6} />}

            {/* Side cards - hidden on mobile */}
            {!isMobile && (
              <SideCard 
                position="left" 
                index={getPrevIndex()} 
                isHovering={isHovering} 
                onClick={goToPrev} 
              />
            )}
            
            {/* Main center card */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <MainCard 
                currentIndex={currentIndex} 
                direction={direction} 
                isHovering={isHovering && !isMobile} 
                mousePosition={mousePosition} 
                isMobile={isMobile}
              />
            </AnimatePresence>
            
            {/* Side cards - hidden on mobile */}
            {!isMobile && (
              <SideCard 
                position="right" 
                index={getNextIndex()} 
                isHovering={isHovering} 
                onClick={goToNext} 
              />
            )}
          </div>
          
          {/* Navigation controls */}
          <NavigationControls 
            currentIndex={currentIndex}
            stepsLength={steps.length}
            goToSlide={goToSlide}
            goToPrev={goToPrev}
            goToNext={goToNext}
            autoplay={autoplay}
            setAutoplay={setAutoplay}
          />
        </div>
      </div>
    </section>
  )
}

export default FeatureSlider;