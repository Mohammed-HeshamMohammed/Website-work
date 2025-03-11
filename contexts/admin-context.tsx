"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { checkIsAdmin } from "@/app/actions/auth"

interface AdminContextType {
  isAdmin: boolean
  loading: boolean
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loading: true,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({
    isAdmin: false,
    loading: true,
  })

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const adminStatus = await checkIsAdmin()
        setState({ isAdmin: adminStatus, loading: false })
      } catch {
        setState({ isAdmin: false, loading: false })
      }
    }

    verifyAdmin()
  }, [])

  return <AdminContext.Provider value={state}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)

