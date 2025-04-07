"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    // On the client side
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)
      
      // Set initial state
      if (media.matches !== matches) {
        setMatches(media.matches)
      }
      
      // Setup listener
      const listener = () => setMatches(media.matches)
      media.addEventListener("change", listener)
      
      // Cleanup
      return () => media.removeEventListener("change", listener)
    }
    
    // Default to false on the server side
    return () => {}
  }, [matches, query])
  
  return matches
}