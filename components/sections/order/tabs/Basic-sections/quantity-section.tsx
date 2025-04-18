// components/sections/order/tabs/sections/quantity-section.tsx
import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FileQuestion } from "lucide-react"
import { FormData } from "../../types"

interface QuantitySectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
}

export function QuantitySection({ 
  formData, 
  handleInputChange 
}: QuantitySectionProps) {
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

  // Prevent scrolling on number inputs
  const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div>
      <Label htmlFor="quantity" className="text-gray-700">Quantity (Number of Records)</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FileQuestion className="h-4 w-4 text-gray-400" />
        </div>
        <Input 
          id="quantity" 
          type="number" 
          value={formData.quantity || 100} 
          onChange={(e) => handleInputChangeWithSave("quantity", e.target.value)} 
          className="mt-1 pl-10"
          placeholder="Enter desired quantity"
          onWheel={preventScroll}
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">Minimum 100 records</p>
    </div>
  );
}