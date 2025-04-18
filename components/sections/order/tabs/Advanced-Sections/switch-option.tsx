// components/sections/order/tabs/switch-option.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormData } from "@/components/sections/order/types";

interface SwitchOptionProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  formData?: FormData; // Add formData to match advanced-filters-tab pattern
}

export function SwitchOption({ 
  id, 
  label, 
  description, 
  checked, 
  onCheckedChange,
  formData = {
    company: undefined,
    name: "",
    email: "",
    phone: "",
    quantity: 0,
    states: "",
    counties: "",
    citiesZip: "",
    selectedStates: [],
    selectedCounties: [],
    selectedLeadTypes: [],
    selectedPropertyTypes: [],
    otherLeadType: "",
    otherPropertyType: "",
    customLeadTypes: [],
    customPropertyTypes: [],
    propertyType: "",
    propertyTypeOther: "",
    propertyTypeOptions: [],
    priceRestrictions: "",
    equityPercentage: "",
    propertyCondition: "",
    ownershipDuration: "",
    bedroomsMin: "",
    bedroomsMax: "",
    bathroomsMin: "",
    bathroomsMax: "",
    squareFootageMin: "",
    squareFootageMax: "",
    lotSizeMin: "",
    lotSizeMax: "",
    yearBuiltMin: "",
    yearBuiltMax: "",
    onlyNonOwnerOccupied: false,
    hasPool: false,
    waterfront: false,
    excludeRecentlySold: false,
    excludeRecentlyListed: false,
    excludeBankOwned: false,
    mortgageAgeMin: "",
    mortgageAgeMax: "",
    ltvRatioMin: "",
    ltvRatioMax: "",
    taxDelinquencyStatus: "",
    assessedValueMin: "",
    assessedValueMax: "",
    freeAndClearStatus: "",
    foreclosureStatus: "",
    hasMortgage: false,
    hasSecondMortgage: false,
    hasLien: false,
    codeViolationLocations: [],
    codeViolation: false,
    divorceRecords: "",
    divorceLocations: [],
    divorce: false,
    bankruptcyRecords: false,
    bankruptcyLocations: "",
    bankruptcy: false,
    additionalDetails: "",
    codeViolationRecords: 0
  } 
}: SwitchOptionProps) {
  // Extended handleInputChange that also saves to backend
  const handleCheckedChangeWithSave = (checked: boolean) => {
    // Call the original onCheckedChange
    onCheckedChange(checked);
    
    // Save form state to backend for potential recovery
    try {
      const updatedData = { [id]: checked };
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
    <div className="flex items-center justify-between">
      <div>
        <Label className="text-base" htmlFor={id}>{label}</Label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={handleCheckedChangeWithSave}
      />
    </div>
  );
}