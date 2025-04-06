"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Clock, Calendar as CalendarIcon, User, Mail, Phone, MessageSquare, Check } from "lucide-react"

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [formStep, setFormStep] = useState<number>(1)
  
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

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep(3) // Move to confirmation step
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-0">
      <div className="container mx-auto py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 text-[#03045E] bg-clip-text">Book a Meeting</h1>
          <p className="text-blue-600/70 max-w-md mx-auto">Schedule time with our team to discuss how we can help grow your business</p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 w-12 sm:w-20 ${formStep >= 2 ? 'bg-[#0077B6]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <div className={`h-1 w-12 sm:w-20 ${formStep >= 3 ? 'bg-[#0077B6]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
          </div>
        </div>
        
        {formStep === 1 && (
          <Card className="shadow-lg border-t-4 border-t-[#0077B6] max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center mb-2">
                <CalendarIcon className="mr-2 h-5 w-5 text-[#0077B6]" />
                <CardTitle>Select Date & Time</CardTitle>
              </div>
              <CardDescription>Choose an available slot for your meeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="calendar" className="text-sm font-medium text-gray-700 mb-2 block">Select Date</Label>
                  <div className="border rounded-lg p-1 shadow-sm">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md"
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      modifiers={{
                        booked: (date) => hasBookings(date),
                      }}
                      modifiersClassNames={{
                        booked: "bg-blue-50 font-semibold text-[#0077B6]",
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-[#0077B6]" />
                    Available Time Slots
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {getAvailableSlots().map((slot) => (
                      <Button
                        key={slot}
                        variant={timeSlot === slot ? "default" : "outline"}
                        onClick={() => setTimeSlot(slot)}
                        className={`text-sm h-10 ${timeSlot === slot ? 'bg-[#0077B6] hover:bg-[#03045E]' : 'hover:border-[#0077B6] hover:text-[#0077B6]'}`}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                  {getAvailableSlots().length === 0 && (
                    <div className="p-4 bg-red-50 rounded-lg mt-2 text-center">
                      <p className="text-sm text-red-500">
                        No available slots for this date. Please select another day.
                      </p>
                    </div>
                  )}
                  
                  {date && timeSlot && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="font-medium text-[#0077B6]">Selected Time:</p>
                      <p className="text-gray-700">{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {timeSlot}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={() => date && timeSlot && setFormStep(2)} 
                disabled={!date || !timeSlot}
                className="bg-[#0077B6] hover:bg-[#03045E]"
              >
                Continue to Details
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {formStep === 2 && (
          <Card className="shadow-lg border-t-4 border-t-[#0077B6] max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center mb-2">
                <User className="mr-2 h-5 w-5 text-[#0077B6]" />
                <CardTitle>Your Information</CardTitle>
              </div>
              <CardDescription>Please provide your details to complete the booking</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium flex items-center">
                      <User className="h-3 w-3 mr-1 text-[#0077B6]" /> First Name
                    </Label>
                    <Input id="firstName" placeholder="John" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6]" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6]" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-[#0077B6]" /> Email Address
                  </Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6]" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                    <Phone className="h-3 w-3 mr-1 text-[#0077B6]" /> Phone Number
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6]" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meetingType" className="text-sm font-medium">Meeting Type</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6]">
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Initial Consultation</SelectItem>
                      <SelectItem value="followup">Follow-up Meeting</SelectItem>
                      <SelectItem value="demo">Product Demo</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1 text-[#0077B6]" /> Additional Notes
                  </Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Please share any specific topics you'd like to discuss..." 
                    className="min-h-32 border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6]" 
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setFormStep(1)}
                  >
                    Back to Calendar
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-[#0077B6] hover:bg-[#03045E]"
                  >
                    Complete Booking
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {formStep === 3 && (
          <Card className="shadow-lg border-t-4 border-t-green-500 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <CardDescription>Your meeting has been scheduled successfully</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-medium text-gray-900">{date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Time</p>
                    <p className="font-medium text-gray-900">{timeSlot}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Duration</p>
                    <p className="font-medium text-gray-900">30 minutes</p>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-6">
                    A confirmation email has been sent to your inbox with all the details and calendar invitation.
                  </p>
                  <Button className="bg-[#0077B6] hover:bg-[#03045E]">
                    Return to Homepage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}