"use client"

import { User, Mail, Phone, MessageSquare } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BookingFormProps = {
  date: Date | undefined
  timeSlot: string
  onBack: () => void
  onSubmit: (e: React.FormEvent) => void
  isMobile: boolean
}

export function BookingForm({ date, timeSlot, onBack, onSubmit, isMobile }: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
      {/* Mobile: Show meeting summary */}
      {isMobile && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium text-xs text-[#0077B6]">Booking for:</p>
          <p className="text-sm text-gray-700">
            {date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {timeSlot}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="firstName" className="text-xs md:text-sm font-medium flex items-center">
            <User className="h-3 w-3 mr-1 text-[#0077B6]" /> First Name
          </Label>
          <Input id="firstName" placeholder="John" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6] h-9 md:h-10 text-sm" required />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="lastName" className="text-xs md:text-sm font-medium">Last Name</Label>
          <Input id="lastName" placeholder="Doe" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6] h-9 md:h-10 text-sm" required />
        </div>
      </div>
      
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="email" className="text-xs md:text-sm font-medium flex items-center">
          <Mail className="h-3 w-3 mr-1 text-[#0077B6]" /> Email Address
        </Label>
        <Input id="email" type="email" placeholder="john.doe@example.com" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6] h-9 md:h-10 text-sm" required />
      </div>
      
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="phone" className="text-xs md:text-sm font-medium flex items-center">
          <Phone className="h-3 w-3 mr-1 text-[#0077B6]" /> Phone Number
        </Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6] h-9 md:h-10 text-sm" required />
      </div>
      
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="meetingType" className="text-xs md:text-sm font-medium">Meeting Type</Label>
        <Select required>
          <SelectTrigger className="border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6] h-9 md:h-10 text-sm">
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
      
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="notes" className="text-xs md:text-sm font-medium flex items-center">
          <MessageSquare className="h-3 w-3 mr-1 text-[#0077B6]" /> Additional Notes
        </Label>
        <Textarea 
          id="notes" 
          placeholder="Please share any specific topics you'd like to discuss..." 
          className="min-h-20 md:min-h-32 border-gray-300 focus:border-[#0077B6] focus:ring-[#0077B6] text-sm" 
        />
      </div>
      
      <div className="pt-2 md:pt-4 flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
        {/* On mobile, put the back button first */}
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="md:order-1"
        >
          Back to Calendar
        </Button>
        <Button 
          type="submit" 
          className="bg-[#0077B6] hover:bg-[#03045E] md:order-2"
        >
          Complete Booking
        </Button>
      </div>
    </form>
  )
}