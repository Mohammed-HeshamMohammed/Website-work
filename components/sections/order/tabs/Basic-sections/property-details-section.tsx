// components/sections/order/tabs/sections/property-details-section.tsx
import React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData } from "../../types"
import { propertyConditionOptions, ownershipDurationOptions } from "./constants"

interface PropertyDetailsSectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
}

export function PropertyDetailsSection({ 
  formData, 
  handleInputChange 
}: PropertyDetailsSectionProps) {
  // Extended handleInputChange that also saves to backend
  const handleInputChangeWithSave = (field: string, value: any) => {
    // Call the original handleInputChange
    handleInputChange(field, value);
    
    // Save form state to backend for potential recovery
    try {
      const updatedData = { [field]: value };
      fetch('/api/orders/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyCriteria: {
            ...formData,
            ...updatedData
          },
          lastUpdated: new Date().toISOString()
        }),
      }).catch(error => {
        console.error("Error saving draft:", error);
      });
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <Label htmlFor="propertyCondition" className="text-gray-700">Property Condition</Label>
        <Select
          value={formData.propertyCondition || ""}
          onValueChange={(value) => handleInputChangeWithSave("propertyCondition", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select property condition">
              {formData.propertyCondition && (
                <div className="flex items-center">
                  {propertyConditionOptions.find(opt => opt.value === formData.propertyCondition)?.icon}
                  <span>
                    {propertyConditionOptions.find(opt => opt.value === formData.propertyCondition)?.label}
                  </span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {propertyConditionOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="ownershipDuration" className="text-gray-700">Ownership Duration</Label>
        <Select
          value={formData.ownershipDuration || ""}
          onValueChange={(value) => handleInputChangeWithSave("ownershipDuration", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ownership duration">
              {formData.ownershipDuration && (
                <div className="flex items-center">
                  {ownershipDurationOptions.find(opt => opt.value === formData.ownershipDuration)?.icon}
                  <span>
                    {ownershipDurationOptions.find(opt => opt.value === formData.ownershipDuration)?.label}
                  </span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ownershipDurationOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}