"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import type { Order } from "@/lib/types/user"

interface FilePreviewProps {
  order: Order
  onClose: () => void
}

export function FilePreview({ order, onClose }: FilePreviewProps) {
  const [previewData, setPreviewData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPreview() {
      try {
        const response = await fetch(`/api/user/orders/${order.id}?preview=true`)
        const data = await response.json()
        setPreviewData(data.data)
      } catch (error) {
        console.error("Error fetching preview:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [order.id])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <Card className="p-6 bg-black/40 backdrop-blur-xl border border-[#00B4D8]/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">File Preview: {order.fileName}</h3>
          <div className="flex gap-2">
            {order.fileUrl && (
              <Button variant="ghost" size="sm" className="text-[#00B4D8]" onClick={() => window.open(order.fileUrl)}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="text-[#00B4D8]">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B4D8]" />
          </div>
        ) : previewData ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {Object.keys(previewData[0]).map((header) => (
                    <th key={header} className="text-left p-2 border-b border-[#00B4D8]/20 text-[#00B4D8]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((cell: any, j) => (
                      <td key={j} className="p-2 border-b border-[#00B4D8]/20 text-white">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400">No preview data available</div>
        )}
      </Card>
    </motion.div>
  )
}

