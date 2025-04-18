"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, FileText, LayoutDashboard, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { AuthDialog } from "./auth-dialog"
import { useAuth } from "@/hooks/use-auth"

export function AuthButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
          onClick={() => setIsOpen(true)}
        >
          <Avatar className="h-10 w-10 bg-[#03045e] hover:bg-[#00B4D8] transition-colors duration-200">
            <AvatarFallback>
              <User className="h-5 w-5 text-white" />
            </AvatarFallback>
          </Avatar>
        </motion.button>
        {isOpen && <AuthDialog onClose={() => setIsOpen(false)} />}
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {user.isAdmin ? (
              <div className="bg-[#03045e] h-full w-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#00B4D8]" />
              </div>
            ) : (
              <AvatarImage src={user.image} alt={user.name} />
            )}
            <AvatarFallback className="bg-[#03045e] text-white">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user.isAdmin ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/orders">
                <FileText className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => {
            logout()
            router.refresh()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

