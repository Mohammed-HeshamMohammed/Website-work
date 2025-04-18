// components/sections/order/tabs/premium-filter.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FormData } from "@/components/sections/order/types";

interface PremiumFilterProps {
  id: string;
  label: string;
  description: string;
  tooltipContent: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  expanded: boolean;
  children: React.ReactNode;
  formData?: FormData; // Add formData to match advanced-filters-tab pattern
}

// Premium Button Component
const PremiumButton = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <svg viewBox="0 0 576 512" height="1em" className="logoIcon"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" /></svg>
        GO PREMIUM
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    width: 150px;
    height: 36px;
    border: none;
    border-radius: 40px;
    background: linear-gradient(to right,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.8em;
    color: rgb(121, 103, 3);
    font-weight: 600;
    cursor: pointer;
    position: relative;
    z-index: 2;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.144);
    background-size: 200% 200%;
    animation: gradient 5s ease infinite;
    background-position: right;
  }
  .logoIcon path {
    fill: rgb(121, 103, 3);
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export function PremiumFilter({
  id,
  label,
  description,
  tooltipContent,
  checked,
  onCheckedChange,
  expanded,
  children,
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
}: PremiumFilterProps) {
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
    <div className="relative">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <Label className="text-base" htmlFor={id}>{label}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id={id}
            checked={checked}
            onCheckedChange={handleCheckedChangeWithSave}
          />
          <PremiumButton />
        </div>
      </div>

      {/* Expandable section */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-md"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}