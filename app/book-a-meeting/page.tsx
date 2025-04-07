"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Calendar as CalendarIcon, User, Check } from "lucide-react"
import { StepProgress } from "@/components/sections/book-a-meeting/StepProgress"
import { BookingCalendar } from "@/components/sections/book-a-meeting/BookingCalendar"
import { BookingForm } from "@/components/sections/book-a-meeting/BookingForm"
import { BookingConfirmation } from "@/components/sections/book-a-meeting/BookingConfirmation"

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [formStep, setFormStep] = useState<number>(1)
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false) // For mobile calendar view toggle
  const isMobile = useMediaQuery("(max-width: 768px)")
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep(3) // Move to confirmation step
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-0">
      <div className="container px-4 md:px-6 mx-auto py-6 md:py-10">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#03045E] bg-clip-text">Book a Meeting</h1>
          <p className="text-blue-600/70 max-w-md mx-auto text-sm md:text-base">Schedule time with our team to discuss how we can help grow your business</p>
        </div>
        
        {/* Progress Steps */}
        <StepProgress currentStep={formStep} />
        
        {formStep === 1 && (
          <Card className="shadow-lg border-t-4 border-t-[#0077B6] max-w-4xl mx-auto">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex items-center mb-1 md:mb-2">
                <CalendarIcon className="mr-2 h-4 w-4 md:h-5 md:w-5 text-[#0077B6]" />
                <CardTitle className="text-lg md:text-xl">Select Date & Time</CardTitle>
              </div>
              <CardDescription className="text-sm">Choose an available slot for your meeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <BookingCalendar 
                date={date}
                setDate={setDate}
                timeSlot={timeSlot}
                setTimeSlot={setTimeSlot}
                isMobile={isMobile}
                calendarOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
              />
            </CardContent>
            <CardFooter className="flex justify-end pt-2 pb-4">
              <button 
                onClick={() => date && timeSlot && setFormStep(2)} 
                disabled={!date || !timeSlot}
                className="bg-[#0077B6] hover:bg-[#03045E] text-white py-2 px-4 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Details
              </button>
            </CardFooter>
          </Card>
        )}
        
        {formStep === 2 && (
          <Card className="shadow-lg border-t-4 border-t-[#0077B6] max-w-4xl mx-auto">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex items-center mb-1 md:mb-2">
                <User className="mr-2 h-4 w-4 md:h-5 md:w-5 text-[#0077B6]" />
                <CardTitle className="text-lg md:text-xl">Your Information</CardTitle>
              </div>
              <CardDescription className="text-sm">Please provide your details to complete the booking</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm 
                date={date}
                timeSlot={timeSlot}
                onBack={() => setFormStep(1)}
                onSubmit={handleSubmit}
                isMobile={isMobile}
              />
            </CardContent>
          </Card>
        )}
        
        {formStep === 3 && (
          <Card className="shadow-lg border-t-4 border-t-green-500 max-w-4xl mx-auto">
            <CardHeader className="text-center pb-2 md:pb-4">
              <div className="mx-auto bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Check className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              </div>
              <CardTitle className="text-xl md:text-2xl">Booking Confirmed!</CardTitle>
              <CardDescription className="text-sm">Your meeting has been scheduled successfully</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingConfirmation 
                date={date}
                timeSlot={timeSlot}
                isMobile={isMobile}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
