"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download, Upload, FileSpreadsheet, Save } from "lucide-react"
import { toast } from "sonner"

interface OrderDetailsProps {
  orderId: string
  customerName: string
  orderDate: string
  amount: string
  status: string
  completionPercentage: number
  hasUploadedFile: boolean
}

const STATUS_PROGRESS_MAP = {
  Completed: 100,
  Processing: 50,
  Pending: 0,
  Cancelled: 0,
}

const STATUS_COLOR_MAP = {
  Completed: "bg-[#00b4d8]",
  Processing: "bg-[#0077b6]",
  Pending: "bg-[#90e0ef]",
  Cancelled: "bg-gray-300",
}

export function OrderDetails({
  orderId,
  customerName,
  orderDate,
  amount,
  status,
  completionPercentage,
  hasUploadedFile,
}: OrderDetailsProps) {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [progress, setProgress] = useState(completionPercentage)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [notes, setNotes] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      setHasChanges(true)
      // Simulate progress
      setProgress(25)
      setTimeout(() => setProgress(STATUS_PROGRESS_MAP[currentStatus] || 0), 2000)
    }
  }

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus)
    setProgress(STATUS_PROGRESS_MAP[newStatus] || 0)
    setHasChanges(true)
  }

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentStatus === "Completed") return // Prevent manual progress change if completed

    const rect = progressBarRef.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left
      const percentage = Math.round((x / rect.width) * 100)
      setProgress(Math.max(0, Math.min(100, percentage)))
      setHasChanges(true)
    }
  }

  const handleProgressBarDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && currentStatus !== "Completed") {
      handleProgressBarClick(event)
    }
  }

  const handleConfirmChanges = () => {
    // Here you would typically make an API call to save the changes
    toast.success("Order changes saved successfully!")
    setHasChanges(false)
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && progressBarRef.current && currentStatus !== "Completed") {
        const rect = progressBarRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percentage = Math.round((x / rect.width) * 100)
        setProgress(Math.max(0, Math.min(100, percentage)))
        setHasChanges(true)
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDragging, currentStatus])

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#03045e] mb-6">Order Details</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[#03045e]">Order ID</span>
              <span className="text-[#0077b6]">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#03045e]">Customer</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#03045e]">Date</span>
              <span className="font-medium">{orderDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#03045e]">Amount</span>
              <span className="font-medium">{amount}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#03045e]">Order Status</label>
            <Select value={currentStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="border-[#90e0ef] focus:ring-[#00b4d8]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#03045e]">Completion Progress</span>
              <span>{progress}%</span>
            </div>
            <div
              ref={progressBarRef}
              className="relative h-4 bg-[#caf0f8] rounded-full cursor-pointer"
              onClick={handleProgressBarClick}
              onMouseDown={() => setIsDragging(true)}
              onMouseMove={handleProgressBarDrag}
            >
              <motion.div
                className={`absolute inset-0 rounded-full ${STATUS_COLOR_MAP[currentStatus] || "bg-[#0077b6]"}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#03045e]">Order Files</span>
              {hasUploadedFile && (
                <Button variant="outline" size="sm" className="border-[#90e0ef] hover:bg-[#caf0f8]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Customer File
                </Button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 p-4 border border-dashed border-[#90e0ef] rounded-lg cursor-pointer hover:border-[#00b4d8] transition-colors"
                  >
                    <Upload className="w-4 h-4 text-[#0077b6]" />
                    <span className="text-sm text-[#03045e]">{file ? file.name : "Upload processed file"}</span>
                  </motion.div>
                </label>
              </div>
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-2 bg-[#caf0f8] rounded"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#0077b6]" />
                <span className="text-sm flex-1 truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => {
                    setFile(null)
                    setHasChanges(true)
                  }}
                >
                  Remove
                </Button>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-[#03045e]">Order Notes</h4>
            <textarea
              className="w-full h-32 p-2 border border-[#90e0ef] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              placeholder="Add notes about this order..."
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                setHasChanges(true)
              }}
            />
          </div>
        </div>
      </div>

      {/* Confirm Changes Button */}
      {hasChanges && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mt-6">
          <Button onClick={handleConfirmChanges} className="bg-[#03045e] hover:bg-[#0077b6] text-white">
            <Save className="w-4 h-4 mr-2" />
            Confirm Changes
          </Button>
        </motion.div>
      )}
    </div>
  )
}

