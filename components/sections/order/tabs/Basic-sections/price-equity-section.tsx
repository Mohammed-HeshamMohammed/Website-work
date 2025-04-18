// components/sections/order/tabs/sections/price-equity-section.tsx
import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DollarSign, Percent } from "lucide-react"
import { FormData } from "../../types"

interface PriceEquitySectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
}

export function PriceEquitySection({ 
  formData, 
  handleInputChange 
}: PriceEquitySectionProps) {
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

  // Format number with commas for thousands
  const formatNumberWithCommas = (value: string): string => {
    // Remove existing commas and non-numeric characters (except for decimal point)
    const cleanValue = value.replace(/,/g, '').replace(/[^0-9.-]/g, '');
    
    // If empty or invalid, return as is
    if (!cleanValue || isNaN(Number(cleanValue))) return cleanValue;
    
    // Format with commas for thousands
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return parts.join('.');
  };

  // Handle price input change with formatting
  const handlePriceChange = (value: string) => {
    // Store the raw value but display formatted value
    handleInputChangeWithSave("priceRestrictions", value);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <Label htmlFor="priceRestrictions" className="text-gray-700">Price Range</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            id="priceRestrictions" 
            value={formData.priceRestrictions || ""} 
            onChange={(e) => handlePriceChange(e.target.value)} 
            className="mt-1 pl-10"
            placeholder="e.g. $100,000 - $500,000"
            onBlur={(e) => {
              // Format on blur for better display
              const formatted = e.target.value
                .split('-')
                .map(part => {
                  // Format each part of the range
                  const trimmed = part.trim().replace(/^\$/, '');
                  if (trimmed && !isNaN(Number(trimmed.replace(/,/g, '')))) {
                    return '$' + formatNumberWithCommas(trimmed);
                  }
                  return part.trim();
                })
                .join(' - ');
                
              handleInputChangeWithSave("priceRestrictions", formatted);
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="equityPercentage" className="text-gray-700">Equity Percentage</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Percent className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            id="equityPercentage" 
            value={formData.equityPercentage || ""} 
            onChange={(e) => handleInputChangeWithSave("equityPercentage", e.target.value)} 
            className="mt-1 pl-10"
            placeholder="e.g. At least 30%"
          />
        </div>
      </div>
    </div>
  );
}