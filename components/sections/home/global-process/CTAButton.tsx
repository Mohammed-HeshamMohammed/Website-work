import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CTAButtonProps {
  text?: string;
  href?: string;
  isMobile?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  text = "Get Started Today",
  href = "/plans",
  isMobile = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className={`text-center absolute ${isMobile ? "bottom-3" : "bottom-8"} right-0.5 flex items-center justify-center w-full`}
    >
      <Link href={href}>
        <motion.button
          className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm sm:text-base font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {text}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default CTAButton;