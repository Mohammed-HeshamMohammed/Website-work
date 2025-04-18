// components/sections/order/tabs/financial-filters-tab.tsx
import React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData } from "../types"
import { MinMaxInput } from "../tabs/min-max-input"

interface FinancialFiltersTabProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
}

export function FinancialFiltersTab({ formData, handleInputChange }: FinancialFiltersTabProps) {
  // Prevent scrolling on number inputs
  const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

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
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <MinMaxInput
          label="Assessed Value ($)"
          minId="assessedValueMin"
          maxId="assessedValueMax"
          minValue={formData.assessedValueMin || ""}
          maxValue={formData.assessedValueMax || ""}
          onMinChange={(e: { target: { value: any } }) => handleInputChangeWithSave("assessedValueMin", e.target.value)}
          onMaxChange={(e: { target: { value: any } }) => handleInputChangeWithSave("assessedValueMax", e.target.value)}
          preventScroll={preventScroll}
        />
        
        <div>
          <Label htmlFor="taxDelinquencyStatus" className="text-gray-700">Tax Delinquency Status</Label>
          <Select
            value={formData.taxDelinquencyStatus || ""}
            onValueChange={(value) => handleInputChangeWithSave("taxDelinquencyStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Status</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="1_year">1+ Year Delinquent</SelectItem>
              <SelectItem value="2_years">2+ Years Delinquent</SelectItem>
              <SelectItem value="3_plus_years">3+ Years Delinquent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="freeAndClearStatus" className="text-gray-700">Free & Clear Status</Label>
          <Select
            value={formData.freeAndClearStatus || ""}
            onValueChange={(value) => handleInputChangeWithSave("freeAndClearStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Status</SelectItem>
              <SelectItem value="free_and_clear">Free & Clear Only</SelectItem>
              <SelectItem value="with_mortgage">With Mortgage Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="foreclosureStatus" className="text-gray-700">Foreclosure Status</Label>
          <Select
            value={formData.foreclosureStatus || ""}
            onValueChange={(value) => handleInputChangeWithSave("foreclosureStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Status</SelectItem>
              <SelectItem value="pre_foreclosure">Pre-Foreclosure Only</SelectItem>
              <SelectItem value="auction_scheduled">Auction Scheduled</SelectItem>
              <SelectItem value="reo">Bank Owned (REO)</SelectItem>
              <SelectItem value="not_in_foreclosure">Not In Foreclosure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}