import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ProcessCardProps {
  step: {
    icon: React.ElementType;
    title: string;
    description: string;
    stats?: string;
  };
  index: number;
  activeIndex: number;
  totalCards: number;
  onClick: () => void;
  isMobile?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  step,
  index,
  activeIndex,
  totalCards,
  onClick,
  isMobile = false,
}) => {
  // Calculate position on the orbital circle
  const angleOffset = 270;
  const angleStep = 360 / totalCards;
  const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
  const angle = angleOffset + adjustedIndex * angleStep;
  const radians = (angle * Math.PI) / 180;
  
  // Determine scale and z-index based on position
  const scale = adjustedIndex === 0 ? 1 : 0.8;
  const zIndex = totalCards - adjustedIndex;
  
  // Calculate position transforms - smaller radius for mobile
  const radius = isMobile ? 40 : 48; // % of viewport height, smaller on mobile
  const translateX = Math.cos(radians) * radius;
  const translateY = Math.sin(radians) * radius;
  
  const Icon = step.icon;
  const isActive = adjustedIndex === 0;

  // Mobile adjustments for card size
  const cardWidth = isMobile 
    ? (isActive ? '300px' : '250px')  // Smaller on mobile
    : (isActive ? '450px' : '360px'); // Original desktop sizes

  // Hide non-active cards on very small screens
  // We keep the direct previous and next cards only
  const isVisibleOnSmallMobile = !isMobile || adjustedIndex === 0 || 
                               adjustedIndex === 1 || 
                               adjustedIndex === totalCards - 1;

  return (
    <motion.div
      className={`absolute ${!isVisibleOnSmallMobile ? 'hidden xs:block' : ''}`}
      style={{
        zIndex: zIndex,
        left: "50%",
        top: "50%",
        width: cardWidth,
        transform: `translate(calc(-50% + ${translateX}vh), calc(-50% + ${translateY}vh)) scale(${scale})`
      }}
      animate={{
        transform: `translate(calc(-50% + ${translateX}vh), calc(-50% + ${translateY}vh)) scale(${scale})`
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      onClick={onClick}
    >
      <motion.div  
        className={`cursor-pointer transform transition-all duration-500 ${isActive ? 'scale-100' : 'scale-95 hover:scale-100'}`} 
      >
        <div className={`p-4 sm:p-6 rounded-lg bg-black/60 backdrop-blur-lg border overflow-hidden relative 
          ${isActive  
            ? "border-cyan-500/50 shadow-glow"  
            : "border-cyan-500/20"}`} 
        >
          {/* Enhanced glow effect */}
          <div  
            className={`absolute w-40 h-40 rounded-full transition-all duration-700 glow-effect 
              ${isActive  
                ? "bg-cyan-500/20 blur-2xl"  
                : "bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20"} 
              right-0 -top-20`} 
          />
           
          <div className="relative z-10">
            {/* Icon with enhanced styling - smaller on mobile */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <motion.div  
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center step-icon 
                  ${isActive  
                    ? "bg-cyan-800/50"  
                    : "bg-cyan-900/30"}`} 
                animate={isActive ? {  
                  boxShadow: [ 
                    "0 0 0px rgba(8, 145, 178, 0.4)", 
                    "0 0 16px rgba(8, 145, 178, 0.6)", 
                    "0 0 0px rgba(8, 145, 178, 0.4)" 
                  ]  
                } : {}} 
                transition={{  
                  duration: 3,  
                  repeat: isActive ? Infinity : 0, 
                  ease: "easeInOut"  
                }} 
              >
                <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${isActive ? "text-cyan-300" : "text-cyan-400"}`} />
              </motion.div>
               
              <span className={`text-base sm:text-xl font-bold transition-colors duration-300 
                ${isActive ? "text-cyan-200" : "text-white"}`}> 
                {index + 1} 
              </span>
            </div>
             
            {/* Content - improved typography for mobile */}
            <div className="text-left">
              <h3 className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300 
                ${isActive ? "text-cyan-200" : "text-white"}`}> 
                {step.title} 
              </h3>
              <p className="text-sm sm:text-base text-cyan-100 mb-3 sm:mb-4 whitespace-pre-line leading-relaxed opacity-90"> 
                {step.description} 
              </p>
              {step.stats && (
                <motion.div  
                  className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-md inline-block stats-badge 
                    ${isActive ? "text-cyan-200 bg-cyan-900/50" : "text-cyan-500"}`} 
                  animate={isActive ? {  
                    backgroundColor: ["rgba(8, 145, 178, 0.2)", "rgba(8, 145, 178, 0.3)", "rgba(8, 145, 178, 0.2)"]  
                  } : {}} 
                  transition={{  
                    duration: 3,  
                    repeat: isActive ? Infinity : 0, 
                    ease: "easeInOut"  
                  }} 
                >
                  {step.stats}
                </motion.div>
              )}
            </div>
          </div>
           
          {/* Enhanced border glow effect */}
          <motion.div  
            className={`absolute inset-0 border rounded-lg transition-all duration-500 card-border 
              ${isActive  
                ? "border-cyan-500/60"  
                : "border-cyan-500/20"}`} 
            animate={isActive ? {  
              boxShadow: [ 
                "inset 0 0 8px rgba(8, 145, 178, 0.3)", 
                "inset 0 0 16px rgba(8, 145, 178, 0.5)", 
                "inset 0 0 8px rgba(8, 145, 178, 0.3)" 
              ]  
            } : {}} 
            transition={{  
              duration: 3,  
              repeat: isActive ? Infinity : 0, 
              ease: "easeInOut"  
            }} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProcessCard;