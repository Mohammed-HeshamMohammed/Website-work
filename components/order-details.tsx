"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrderDetail {
  type: "state" | "county" | "zipCode"
  value: string
  parentState?: string
}

interface OrderDetailsProps {
  details: OrderDetail[]
  onRemove: (detail: OrderDetail) => void
}

export function OrderDetails({ details, onRemove }: OrderDetailsProps) {
  const groupedDetails = details.reduce(
    (acc, detail) => {
      if (detail.type === "state") {
        acc.states.push(detail)
      } else if (detail.type === "county") {
        acc.counties.push(detail)
      } else {
        acc.zipCodes.push(detail)
      }
      return acc
    },
    { states: [], counties: [], zipCodes: [] } as Record<string, OrderDetail[]>,
  )

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {Object.entries(groupedDetails).map(
          ([type, items]) =>
            items.length > 0 && (
              <div key={type} className="space-y-2">
                <h3 className="text-sm font-medium capitalize">{type}</h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {items.map((detail) => (
                      <motion.div
                        key={`${detail.type}-${detail.value}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                          <span className="px-1">
                            {detail.value}
                            {detail.parentState && (
                              <span className="text-xs text-muted-foreground"> ({detail.parentState})</span>
                            )}
                          </span>
                          <button onClick={() => onRemove(detail)} className="ml-1 rounded-full p-1 hover:bg-muted">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ),
        )}
      </div>
    </ScrollArea>
  )
}

