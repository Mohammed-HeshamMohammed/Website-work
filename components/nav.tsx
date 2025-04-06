"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Nav({ logoHeight = 48 }: { logoHeight?: number }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
    { name: "FAQ", path: "/faq" },
    { name: "About Us", path: "/about-us" },
  ]

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        delay: 0.1 + index * 0.1 
      }
    })
  }

  // Simplified contact button variants - ONLY size change
  const contactButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: [0.175, 0.885, 0.32, 1.275],
        delay: 0.5 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.98 }
  }

  // Navigation button variants
  const navButtonVariants = {
    initial: { 
      backgroundColor: "rgba(255, 255, 255, 0)",
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 180, 216, 0)"
    },
    hover: { 
      backgroundColor: "rgba(0, 180, 216, 0.08)",
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(0, 180, 216, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    active: { 
      color: "#00B4D8",
      backgroundColor: "rgba(0, 180, 216, 0.15)",
      fontWeight: 600,
      boxShadow: "0 4px 12px rgba(0, 180, 216, 0.25)"
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 shadow-md backdrop-blur-sm py-2" : "bg-white py-4"
    }`}>
      <div className="container flex items-center justify-between">
        {/* Logo with adjustable height */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Link href="/" className="block relative z-20">
            <Image
              src="/Logo.png"
              alt="Lead Synapse Logo"
              width={180}
              height={logoHeight}
              priority
              className={`w-auto h-${Math.min(Math.max(Math.floor(logoHeight/4), 6), 16)}`}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <motion.div
                  variants={navButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  animate={pathname === item.path ? "active" : "initial"}
                  className="relative rounded-lg"
                >
                  <Link
                    href={item.path}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300"
                  >
                    {item.name}
                    {pathname === item.path && (
                      <motion.span 
                        className="absolute bottom-0 left-0 right-0 mx-auto w-1.5 h-1.5 bg-[#00B4D8] rounded-full"
                        layoutId="activeDot"
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 30 
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Contact Us button with fixed styling and only size animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={contactButtonVariants}
            className="overflow-hidden"
          >
            <Link
              href="/contact"
              className="block rounded-full bg-[#03045E] hover:bg-[#03045E] px-6 py-2.5 text-sm font-medium text-white shadow-sm"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-20 md:hidden text-gray-700 hover:text-[#00B4D8] transition-colors p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden absolute z-10 left-0 right-0 top-full bg-white shadow-lg border-t overflow-hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="container py-4 flex flex-col"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ 
                  backgroundColor: "rgba(0, 180, 216, 0.08)",
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="rounded-md my-1 overflow-hidden"
              >
                <Link
                  href={item.path}
                  className={`block px-4 py-3 text-sm font-medium rounded-md ${
                    pathname === item.path
                      ? "bg-[#00B4D8]/10 text-[#03045E] shadow-sm"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    {pathname === item.path && (
                      <motion.div 
                        layoutId="mobileActiveDot"
                        className="w-1.5 h-1.5 bg-[#00B4D8] rounded-full mr-2"
                      />
                    )}
                    {item.name}
                  </div>
                </Link>
              </motion.div>
            ))}
            {/* Mobile Contact Us button with only size animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="mx-4 my-3 overflow-hidden"
            >
              <Link
                href="/contact"
                className="block rounded-md bg-[#03045E] hover:bg-[#03045E] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </header>
  )
}