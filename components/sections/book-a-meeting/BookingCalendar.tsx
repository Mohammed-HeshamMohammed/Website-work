"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { CalendarIcon } from "lucide-react"

type BookingCalendarProps = {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  timeSlot: string
  setTimeSlot: (slot: string) => void
  isMobile: boolean
  calendarOpen: boolean
  setCalendarOpen: (open: boolean) => void
}

export function BookingCalendar({
  date, 
  setDate, 
  timeSlot, 
  setTimeSlot, 
  isMobile, 
  calendarOpen, 
  setCalendarOpen
}: BookingCalendarProps) {
  // Mock data for booked meetings
  const bookedMeetings = [
    { date: new Date(2025, 3, 8), slots: ["09:00", "14:00"] },
    { date: new Date(2025, 3, 9), slots: ["11:00", "15:30"] },
    { date: new Date(2025, 3, 10), slots: ["10:00", "13:00", "16:00"] },
  ]
  
  // Available time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ]
  
  // Filter out booked slots for the selected date
  const getAvailableSlots = () => {
    const selectedDateBookings = bookedMeetings.find(
      meeting => meeting.date.toDateString() === date?.toDateString()
    )
    
    if (selectedDateBookings) {
      return timeSlots.filter(slot => !selectedDateBookings.slots.includes(slot))
    }
    
    return timeSlots
  }
  
  // Function to determine if a date has bookings
  const hasBookings = (day: Date) => {
    return bookedMeetings.some(meeting => 
      meeting.date.toDateString() === day.toDateString()
    )
  }
  
  // Function to toggle mobile calendar view
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile: Date selection summary always visible */}
      {isMobile && (
        <div className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-medium text-sm text-[#0077B6]">Selected Date:</p>
            <p className="text-sm text-gray-700">
              {date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleCalendar}
            className="text-[#0077B6] border-[#0077B6]"
          >
            {calendarOpen ? "Hide Calendar" : "Change Date"}
          </Button>
        </div>
      )}

      {/* Calendar - Collapsible on mobile */}
      {(!isMobile || calendarOpen) && (
        <div className="border rounded-lg p-1 shadow-sm w-full">
          <Label htmlFor="calendar" className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block px-2 pt-1">
            Select Date
          </Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              if (isMobile) setCalendarOpen(false); // Auto-close calendar on mobile after selection
            }}
            className="rounded-md w-full"
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            modifiers={{
              booked: (date) => hasBookings(date),
            }}
            modifiersClassNames={{
              booked: "bg-blue-50 font-semibold text-[#0077B6]",
            }}
            classNames={{
              month: isMobile ? "space-y-2 w-full" : "space-y-4 w-full",
              caption: isMobile ? "flex justify-center pt-1 relative items-center" : "flex justify-center pt-1 relative items-center",
              caption_label: isMobile ? "text-sm font-medium" : "",
              nav: isMobile ? "space-x-1 flex items-center" : "",
              nav_button: isMobile ? "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" : "",
              table: isMobile ? "w-full border-collapse" : "w-full border-collapse",
              head_row: "flex w-full justify-between",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs text-center",
              row: "flex w-full mt-2 justify-between",
              cell: "text-center text-sm p-0 relative flex items-center justify-center h-9 w-9",
              day: "h-9 w-9 p-0 flex items-center justify-center font-normal aria-selected:opacity-100",
              day_selected: "bg-[#0077B6] text-white hover:bg-[#0077B6] hover:text-white focus:bg-[#0077B6] focus:text-white rounded-md",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </div>
      )}
      
      {/* Time slot selection */}
      <div>
        <Label className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block flex items-center">
          <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#0077B6]" />
          Available Time Slots
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 md:gap-2">
          {getAvailableSlots().map((slot) => (
            <Button
              key={slot}
              variant={timeSlot === slot ? "default" : "outline"}
              onClick={() => setTimeSlot(slot)}
              className={`text-xs md:text-sm h-8 md:h-10 px-1 md:px-3 ${timeSlot === slot ? 'bg-[#0077B6] hover:bg-[#03045E]' : 'hover:border-[#0077B6] hover:text-[#0077B6]'}`}
            >
              {slot}
            </Button>
          ))}
        </div>
        {getAvailableSlots().length === 0 && (
          <div className="p-3 md:p-4 bg-red-50 rounded-lg mt-2 text-center">
            <p className="text-xs md:text-sm text-red-500">
              No available slots for this date. Please select another day.
            </p>
          </div>
        )}
        
        {/* Selection Summary - More detailed on mobile */}
        {date && timeSlot && (
          <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-medium text-sm text-[#0077B6]">Selected Time:</p>
            <p className="text-sm md:text-base text-gray-700">
              {date.toLocaleDateString('en-US', { 
                weekday: isMobile ? 'short' : 'long', 
                year: 'numeric', 
                month: isMobile ? 'short' : 'long', 
                day: 'numeric' 
              })} at {timeSlot}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}