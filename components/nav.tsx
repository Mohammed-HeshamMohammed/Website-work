"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { AuthButton } from "./auth/auth-button"

export function Nav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
    { name: "FAQ", path: "/faq" },
    { name: "About US", path: "/about" },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container flex items-center justify-between py-6"
    >
      <Link href="/" className="flex items-center">
      <Image
        src="/Logo.png"
        alt="Load Synapse Logo"
        width={150}
        height={40}
        priority
      />
      </Link>

      <div className="flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="relative text-[#03045e] transition-all duration-200 hover:text-[#00B4D8] hover:scale-105 group"
          >
            <span className="text-sm">{item.name}</span>
            {pathname === item.path && (
              <motion.span layoutId="underline" className="absolute left-0 bottom-0 block h-0.5 w-full bg-[#00B4D8]" />
            )}
          </Link>
        ))}
        <Link
          href="/contact"
          className="rounded bg-[#03045e] px-4 py-2 text-sm text-white hover:bg-[#00B4D8] transition-colors duration-200"
        >
          Contact Us
        </Link>
      </div>
    </motion.nav>
  )
}

