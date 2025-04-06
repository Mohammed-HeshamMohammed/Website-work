"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import usStates from "./us-states-data" // We'll create this next

interface StateInfo {
  name: string
  abbreviation: string
  description: string
  counties: Array<{
    name: string
    description: string
  }>
}

export function USAMapSelector() {
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null)
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)

  return (
    <div className="relative min-h-[800px] w-full bg-black overflow-hidden">
      {/* Background animation effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* State Selection Menu */}
          <div className="space-y-4">
            <h2 className="text-white text-xl font-bold mb-6">Select State</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-4">
              {usStates.map((state) => (
                <motion.button
                  key={state.abbreviation}
                  onClick={() => {
                    setSelectedState(state)
                    setSelectedCounty(null)
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group
                    ${
                      selectedState?.abbreviation === state.abbreviation
                        ? "border-[#00B4D8] bg-[#00B4D8]/10 text-white"
                        : "border-white/10 hover:border-[#00B4D8]/50 text-white/70 hover:text-white"
                    }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#03045e]/20 flex items-center justify-center">
                      <span className="text-[#00B4D8] text-sm font-semibold">{state.abbreviation}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{state.name}</h3>
                      <p className="text-xs text-white/50">{state.counties.length} counties</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Map and Details View */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {selectedState ? (
                <motion.div
                  key={selectedState.abbreviation}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white/5 backdrop-blur border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">{selectedState.name}</h2>
                    <p className="text-white/70">{selectedState.description}</p>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {selectedState.counties.map((county) => (
                      <motion.button
                        key={county.name}
                        onClick={() => setSelectedCounty(county.name)}
                        className={`p-4 rounded-lg border transition-all duration-300
                          ${
                            selectedCounty === county.name
                              ? "border-[#00B4D8] bg-[#00B4D8]/10 text-white"
                              : "border-white/10 hover:border-[#00B4D8]/50 text-white/70 hover:text-white"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="font-medium mb-2">{county.name}</h3>
                        <p className="text-sm text-white/50">{county.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <p className="text-white/50 text-lg">Select a state to view details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

