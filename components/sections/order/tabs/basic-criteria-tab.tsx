// components/sections/order/tabs/basic-criteria-tab.tsx
import React from "react"
import { FormData } from "../types"
import { LeadTypesSection } from "./Basic-sections/lead-types-section"
import { PropertyTypesSection } from "./Basic-sections/property-types-section"
import { PriceEquitySection } from "./Basic-sections/price-equity-section"
import { PropertyDetailsSection } from "./Basic-sections/property-details-section"
import { QuantitySection } from "./Basic-sections/quantity-section"

interface BasicCriteriaTabProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  onRemoveLeadType?: (type: string) => void;
  onRemovePropertyType?: (type: string) => void;
}

export function BasicCriteriaTab({ 
  formData, 
  handleInputChange,
  onRemoveLeadType,
  onRemovePropertyType
}: BasicCriteriaTabProps) {
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
      <LeadTypesSection 
        formData={formData}
        handleInputChange={handleInputChangeWithSave}
        onRemoveLeadType={onRemoveLeadType}
      />
      
      <PropertyTypesSection 
        formData={formData}
        handleInputChange={handleInputChangeWithSave}
        onRemovePropertyType={onRemovePropertyType}
      />
      
      <PriceEquitySection 
        formData={formData}
        handleInputChange={handleInputChangeWithSave}
      />
      
      <PropertyDetailsSection 
        formData={formData}
        handleInputChange={handleInputChangeWithSave}
      />
      
      <QuantitySection 
        formData={formData}
        handleInputChange={handleInputChangeWithSave}
      />
    </div>
  );
}