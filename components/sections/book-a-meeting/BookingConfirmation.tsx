"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

type BookingConfirmationProps = {
  date: Date | undefined
  timeSlot: string
  isMobile: boolean
}

export function BookingConfirmation({ date, timeSlot, isMobile }: BookingConfirmationProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
      {/* Stack confirmation details vertically on mobile */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
          <p className="text-xs md:text-sm text-gray-500 mb-1">Date</p>
          <p className="font-medium text-sm md:text-base text-gray-900">
            {date?.toLocaleDateString('en-US', { 
              weekday: isMobile ? 'short' : 'long', 
              year: 'numeric', 
              month: isMobile ? 'short' : 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
          <p className="text-xs md:text-sm text-gray-500 mb-1">Time</p>
          <p className="font-medium text-sm md:text-base text-gray-900">{timeSlot}</p>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
          <p className="text-xs md:text-sm text-gray-500 mb-1">Duration</p>
          <p className="font-medium text-sm md:text-base text-gray-900">30 minutes</p>
        </div>
      </div>
      
      <div className="text-center mt-4 md:mt-6">
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          A confirmation email has been sent to your inbox with all the details and calendar invitation.
        </p>
        <Button className="bg-[#0077B6] hover:bg-[#03045E] w-full md:w-auto">
          Return to Homepage
        </Button>
      </div>
    </div>
  )
}