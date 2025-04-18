"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { SignUpForm } from "./signup-form"

interface AuthDialogProps {
  onClose: () => void
}

export function AuthDialog({ onClose }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="login">
              <LoginForm onSuccess={onClose} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm onSuccess={onClose} />
            </TabsContent>
          </motion.div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

