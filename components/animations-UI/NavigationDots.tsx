import React from "react";
import { motion } from "framer-motion";

interface NavigationDotsProps {
  steps: any[];
  activeIndex: number;
  onDotClick: (index: number) => void;
  isMobile?: boolean;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
  steps,
  activeIndex,
  onDotClick,
  isMobile = false,
}) => {
  return (
    <div className={`absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30`}>
      {steps.map((_, index) => (
        <button
          key={`nav-${index}`}
          className={`transition-all duration-300 
            ${index === activeIndex
              ? `bg-cyan-400 ${isMobile ? "w-6 h-2" : "w-8 h-3"}`
              : `bg-cyan-800 hover:bg-cyan-600 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`
            } rounded-full`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;  