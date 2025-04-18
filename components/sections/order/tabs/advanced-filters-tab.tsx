// components/sections/order/tabs/advanced-filters-tab.tsx
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FormData } from "../types"
import { MinMaxInput } from "../tabs/min-max-input"
import { SwitchOption } from "./Advanced-Sections/switch-option"
import { PremiumFilter } from "./Advanced-Sections/premium-filter"
import { LocationSelection } from "./Advanced-Sections/location-selection"
import { OrderDetail } from "../types"

interface AdvancedFiltersTabProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  orderDetails: OrderDetail[];
}

export function AdvancedFiltersTab({ formData, handleInputChange, orderDetails = [] }: AdvancedFiltersTabProps) {
  // Prevent scrolling on number inputs
  const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  // State for expanded sections
  const [codeViolationExpanded, setCodeViolationExpanded] = useState(false);
  const [divorceExpanded, setDivorceExpanded] = useState(false);

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

  // Handle premium filter expansion
  const toggleCodeViolation = (checked: boolean) => {
    handleInputChangeWithSave("codeViolation", checked);
    setCodeViolationExpanded(checked);
  };

  const toggleDivorce = (checked: boolean) => {
    handleInputChangeWithSave("divorce", checked);
    setDivorceExpanded(checked);
  };

  return (
    <div className="space-y-6">
      {/* Property Size Filters */}
      <div className="grid gap-6 sm:grid-cols-2">
        <MinMaxInput
          label="Bedrooms"
          minId="bedroomsMin"
          maxId="bedroomsMax"
          minValue={formData.bedroomsMin || ""}
          maxValue={formData.bedroomsMax || ""}
          onMinChange={(e) => handleInputChangeWithSave("bedroomsMin", e.target.value)}
          onMaxChange={(e) => handleInputChangeWithSave("bedroomsMax", e.target.value)}
          preventScroll={preventScroll}
        />
        
        <MinMaxInput
          label="Bathrooms"
          minId="bathroomsMin"
          maxId="bathroomsMax"
          minValue={formData.bathroomsMin || ""}
          maxValue={formData.bathroomsMax || ""}
          onMinChange={(e) => handleInputChangeWithSave("bathroomsMin", e.target.value)}
          onMaxChange={(e) => handleInputChangeWithSave("bathroomsMax", e.target.value)}
          preventScroll={preventScroll}
        />
      </div>

      {/* Property Details Filters */}
      <div className="grid gap-6 sm:grid-cols-2">
        <MinMaxInput
          label="Square Footage"
          minId="squareFootageMin"
          maxId="squareFootageMax"
          minValue={formData.squareFootageMin || ""}
          maxValue={formData.squareFootageMax || ""}
          onMinChange={(e) => handleInputChangeWithSave("squareFootageMin", e.target.value)}
          onMaxChange={(e) => handleInputChangeWithSave("squareFootageMax", e.target.value)}
          preventScroll={preventScroll}
        />
        
        <MinMaxInput
          label="Year Built"
          minId="yearBuiltMin"
          maxId="yearBuiltMax"
          minValue={formData.yearBuiltMin || ""}
          maxValue={formData.yearBuiltMax || ""}
          onMinChange={(e) => handleInputChangeWithSave("yearBuiltMin", e.target.value)}
          onMaxChange={(e) => handleInputChangeWithSave("yearBuiltMax", e.target.value)}
          preventScroll={preventScroll}
        />
      </div>

      {/* Lot Size Field */}
      <div>
        <Label htmlFor="lotSizeMin" className="text-gray-700">Lot Size (acres)</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            id="lotSizeMin"
            type="number"
            step="0.01"
            placeholder="Min"
            value={formData.lotSizeMin || ""}
            onChange={(e) => handleInputChangeWithSave("lotSizeMin", e.target.value)}
            onWheel={preventScroll}
          />
          <span>to</span>
          <Input
            id="lotSizeMax"
            type="number"
            step="0.01"
            placeholder="Max"
            value={formData.lotSizeMax || ""}
            onChange={(e) => handleInputChangeWithSave("lotSizeMax", e.target.value)}
            onWheel={preventScroll}
          />
        </div>
      </div>

      {/* Switch Options */}
      <div className="space-y-4">
        <SwitchOption
          id="excludeRecentlySold"
          label="Exclude Recently Sold"
          description="Filter out properties sold in the last 6 months"
          checked={formData.excludeRecentlySold || false}
          onCheckedChange={(checked) => handleInputChangeWithSave("excludeRecentlySold", checked)}
        />
        
        <SwitchOption
          id="excludeRecentlyListed"
          label="Exclude Active Listings"
          description="Filter out properties currently on the market"
          checked={formData.excludeRecentlyListed || false}
          onCheckedChange={(checked) => handleInputChangeWithSave("excludeRecentlyListed", checked)}
        />
        
        <SwitchOption
          id="excludeBankOwned"
          label="Exclude Bank Owned"
          description="Filter out REO/bank-owned properties"
          checked={formData.excludeBankOwned || false}
          onCheckedChange={(checked) => handleInputChangeWithSave("excludeBankOwned", checked)}
        />

        <SwitchOption
          id="onlyNonOwnerOccupied"
          label="Only Non-Owner Occupied"
          description="Filter for investment properties only"
          checked={formData.onlyNonOwnerOccupied || false}
          onCheckedChange={(checked) => handleInputChangeWithSave("onlyNonOwnerOccupied", checked)}
        />

        {/* Premium Features with Location Selection */}
        <PremiumFilter
          id="codeViolation"
          label="Code Violation"
          description="Properties with building code violations or citations"
          tooltipContent="Pricing varies by region and number of records. Additional fees may apply."
          checked={formData.codeViolation || false}
          onCheckedChange={toggleCodeViolation}
          expanded={codeViolationExpanded}
        >
          <LocationSelection
            recordsFieldName="codeViolationRecords"
            recordsValue={formData.codeViolationRecords || ""}
            locationsFieldName="codeViolationLocations"
            locationValues={formData.codeViolationLocations || []}
            orderDetails={orderDetails}
            handleInputChange={handleInputChangeWithSave}
            configTitle="Code Violation Configuration"
          />
        </PremiumFilter>

        <PremiumFilter
          id="divorce"
          label="Divorce"
          description="Properties associated with divorce proceedings"
          tooltipContent="Pricing varies by region and number of records. Additional fees may apply."
          checked={formData.divorce || false}
          onCheckedChange={toggleDivorce}
          expanded={divorceExpanded}
        >
          <LocationSelection
            recordsFieldName="divorceRecords"
            recordsValue={formData.divorceRecords || ""}
            locationsFieldName="divorceLocations"
            locationValues={formData.divorceLocations || []}
            orderDetails={orderDetails}
            handleInputChange={handleInputChangeWithSave}
            configTitle="Divorce Configuration"
          />
        </PremiumFilter>
      </div>
    </div>
  );
}