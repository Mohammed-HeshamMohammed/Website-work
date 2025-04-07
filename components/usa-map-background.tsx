"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface USAMapBackgroundProps {
  selectedState: string | null
}

export function USAMapBackground({ selectedState }: USAMapBackgroundProps) {
  const [mapData, setMapData] = useState<any>(null)
  const [viewBox, setViewBox] = useState("0 0 959 593")

  useEffect(() => {
    // Load the USA map SVG data
    fetch("https://raw.githubusercontent.com/janasayantan/datageojson/master/US.json")
      .then((response) => response.json())
      .then((data) => setMapData(data))
  }, [])

  useEffect(() => {
    if (selectedState && mapData) {
      // Find the state's boundaries and set the viewBox to zoom into it
      const state = mapData.features.find((f: any) => f.properties.name === selectedState)
      if (state) {
        const [[minX, minY], [maxX, maxY]] = state.bbox || [
          [0, 0],
          [959, 593],
        ]
        const padding = 50
        setViewBox(`${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`)
      }
    } else {
      setViewBox("0 0 959 593")
    }
  }, [selectedState, mapData])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#03045e] opacity-90" />

      {/* Floating particles */}
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
        />
      ))}

      {/* USA Map SVG */}
      {mapData && (
        <motion.svg
          viewBox={viewBox}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <g>
            {mapData.features.map((feature: any) => (
              <motion.path
                key={feature.properties.name}
                d={feature.geometry}
                fill={selectedState === feature.properties.name ? "#00B4D8" : "#ffffff"}
                stroke="#03045e"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedState ? 0.3 : 0.1 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </g>
        </motion.svg>
      )}

      {/* State name overlay */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="text-white text-8xl font-bold opacity-10">{selectedState}</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

