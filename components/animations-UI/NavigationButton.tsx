import React, { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface NavigationButtonProps {
  icon: ReactNode
  onClick: () => void
  label: string
}

export function NavigationButton({ icon, onClick, label }: NavigationButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full border-2 border-blue-200 hover:border-blue-400 text-blue-600 hover:bg-blue-50 h-12 w-12 p-0 flex items-center justify-center shadow-sm" 
        onClick={onClick}
        aria-label={label}
      >
        {icon}
      </Button>
    </motion.div>
  )
}