// components/sections/order/tabs/sections/lead-types-section.tsx
import React, { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/sections/order/multi-select-dropdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, FileQuestion } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FormData } from "../../types"
import { leadTypeOptions } from "./constants"
import { 
  getAllSelectedLeadTypes, 
  getCustomLeadTypes, 
  getLeadTypeDisplayName, 
  getLeadTypeIcon 
} from "./type-selector-utils"

interface LeadTypesSectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  onRemoveLeadType?: (type: string) => void;
}

export function LeadTypesSection({ 
  formData, 
  handleInputChange, 
  onRemoveLeadType 
}: LeadTypesSectionProps) {
  const [customLeadType, setCustomLeadType] = useState("")
  const [leadTypeError, setLeadTypeError] = useState<string | null>(null)

  // Clear errors when input changes
  useEffect(() => {
    if (customLeadType) setLeadTypeError(null);
  }, [customLeadType]);

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

  const handleLeadTypeChange = (selected: string[]) => {
    handleInputChangeWithSave("selectedLeadTypes", selected);
    
    // If "other" was removed, keep the custom types in formData but they won't display
    if (!selected.includes("other") && formData.customLeadTypes?.length > 0) {
      // We don't clear custom types to preserve them if user re-checks "other"
      // Custom types are only displayed if "other" is selected
    }
  };

  const handleAddCustomLeadType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customLeadType.trim() !== "") {
      e.preventDefault();
      
      const trimmedType = customLeadType.trim();
      
      // Check for duplicates in both standard and custom types
      const isDuplicateStandard = leadTypeOptions.some(opt => 
        opt.label.toLowerCase() === trimmedType.toLowerCase() || 
        opt.value.toLowerCase() === trimmedType.toLowerCase()
      );
      
      const isDuplicateCustom = getCustomLeadTypes(formData).some((type: string) => 
        type.toLowerCase() === trimmedType.toLowerCase()
      );
      
      if (isDuplicateStandard || isDuplicateCustom) {
        setLeadTypeError(`"${trimmedType}" already exists in lead types`);
        return;
      }
      
      // Make sure "other" is included in selectedLeadTypes
      const updatedLeadTypes = [...(formData.selectedLeadTypes || [])];
      if (!updatedLeadTypes.includes("other")) {
        updatedLeadTypes.push("other");
      }
      
      // Add the new custom type to the array
      const updatedCustomTypes = [...getCustomLeadTypes(formData), trimmedType];
      
      // Update both states
      handleInputChangeWithSave("selectedLeadTypes", updatedLeadTypes);
      handleInputChangeWithSave("customLeadTypes", updatedCustomTypes);
      
      // Clear the input and error
      setCustomLeadType("");
      setLeadTypeError(null);
    }
  };

  // Handle removing lead types
  const handleRemoveLeadType = (type: string) => {
    if (type === "other") {
      // If removing "other", keep custom types in data but they won't display
      // This allows user to re-check "other" later and see their custom types
      const updatedTypes = formData.selectedLeadTypes.filter((t: string) => t !== type);
      handleInputChangeWithSave("selectedLeadTypes", updatedTypes);
    } else if (leadTypeOptions.find(opt => opt.value === type)) {
      // Standard lead type
      if (onRemoveLeadType) {
        onRemoveLeadType(type);
      } else {
        const updatedTypes = formData.selectedLeadTypes.filter((t: string) => t !== type);
        handleInputChangeWithSave("selectedLeadTypes", updatedTypes);
      }
    } else {
      // Custom lead type (the type parameter will be the custom name)
      const updatedCustomTypes = getCustomLeadTypes(formData).filter((t: string) => t !== type);
      handleInputChangeWithSave("customLeadTypes", updatedCustomTypes);
      
      // If no more custom types, also remove "other" from selected types
      if (updatedCustomTypes.length === 0) {
        const updatedTypes = formData.selectedLeadTypes.filter((t: string) => t !== "other");
        handleInputChangeWithSave("selectedLeadTypes", updatedTypes);
      }
    }
  };

  return (
    <div>
      <Label className="text-gray-700 mb-2 block">Lead Types</Label>
      <MultiSelect
        options={leadTypeOptions.map(option => ({
          ...option,
          labelWithIcon: (
            <div className="flex items-center">
              {option.icon}
              {option.label}
            </div>
          )
        }))}
        selected={formData.selectedLeadTypes || []}
        onChange={handleLeadTypeChange}
        placeholder="Select lead types..."
        emptyText="No lead types found."
        maxHeight={300}
      />
      
      {/* Display selected lead types with remove option */}
      {getAllSelectedLeadTypes(formData).length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {getAllSelectedLeadTypes(formData).map((type: string) => (
            <Badge 
              key={type} 
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 py-1 pl-2 pr-1 flex items-center gap-1"
            >
              <span className="flex items-center">
                {getLeadTypeIcon(type)}
                {getLeadTypeDisplayName(type)}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 hover:bg-blue-200 rounded-full ml-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveLeadType(type);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      
      {formData.selectedLeadTypes?.includes("other") && (
        <div className="mt-3">
          <Label htmlFor="customLeadType" className="text-gray-700">Add another lead type</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileQuestion className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              id="customLeadType" 
              value={customLeadType} 
              onChange={(e) => setCustomLeadType(e.target.value)} 
              onKeyDown={handleAddCustomLeadType}
              className={`mt-1 pl-10 ${leadTypeError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Type and press Enter to add"
            />
          </div>
          {leadTypeError && (
            <Alert variant="destructive" className="mt-2 py-2 px-3 bg-red-50 border border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-sm text-red-600">
                {leadTypeError}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}