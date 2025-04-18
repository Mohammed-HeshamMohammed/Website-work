// basic-information-section.tsx
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormData } from "./types"

interface BasicInformationSectionProps {
  formData: FormData
  handleInputChange: (field: string, value: string | string[] | boolean) => void
}

export default function BasicInformationSection({ 
  formData, 
  handleInputChange 
}: BasicInformationSectionProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Debounced validation for email field
  useEffect(() => {
    if (!formData.email || formData.email.trim().length === 0) {
      setEmailError("");
      return;
    }

    const timer = setTimeout(async () => {
      // Only validate if email looks somewhat valid
      if (formData.email.includes('@') && formData.email.includes('.')) {
        setIsValidating(true);
        try {
          const response = await fetch(`/api/validate/email?email=${encodeURIComponent(formData.email)}`);
          const data = await response.json();
          
          if (!response.ok) {
            setEmailError(data.message || "Failed to validate email");
          } else if (!data.isValid) {
            setEmailError("Please enter a valid email address");
          } else {
            setEmailError("");
          }
        } catch (error) {
          console.error("Email validation error:", error);
          setEmailError("");
        } finally {
          setIsValidating(false);
        }
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [formData.email]);

  // Phone number validation
  const validatePhoneNumber = async (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      setPhoneError("");
      return;
    }

    try {
      const response = await fetch(`/api/validate/phone?phone=${encodeURIComponent(phoneNumber)}`);
      const data = await response.json();
      
      if (!response.ok) {
        setPhoneError(data.message || "Failed to validate phone number");
      } else if (!data.isValid) {
        setPhoneError("Please enter a valid phone number");
      } else {
        setPhoneError("");
      }
    } catch (error) {
      console.error("Phone validation error:", error);
      setPhoneError("");
    }
  };

  const handlePhoneChange = (value: string) => {
    handleInputChange("phone", value);
    validatePhoneNumber(value);
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-blue-600">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
        <p className="text-sm text-gray-500 mt-1">Let us know who you are</p>
      </div>
      <div className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name" className="text-gray-700">Full Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => handleInputChange("name", e.target.value)} 
              className="mt-1"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={(e) => handleInputChange("email", e.target.value)} 
              className={`mt-1 ${emailError ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
            />
            {isValidating && <p className="text-xs text-gray-500 mt-1">Validating...</p>}
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`mt-1 ${phoneError ? 'border-red-500' : ''}`}
              placeholder="(123) 456-7890"
            />
            {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
          </div>
        </div>
      </div>
    </Card>
  )
}