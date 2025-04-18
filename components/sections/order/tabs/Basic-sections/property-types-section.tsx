// components/sections/order/tabs/sections/property-types-section.tsx
import React, { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/sections/order/multi-select-dropdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, FileQuestion } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FormData } from "../../types"
import { propertyTypeOptions } from "./constants"
import { 
  getAllSelectedPropertyTypes, 
  getCustomPropertyTypes, 
  getPropertyTypeDisplayName, 
  getPropertyTypeIcon 
} from "./type-selector-utils"

interface PropertyTypesSectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  onRemovePropertyType?: (type: string) => void;
}

export function PropertyTypesSection({ 
  formData, 
  handleInputChange, 
  onRemovePropertyType 
}: PropertyTypesSectionProps) {
  const [customPropertyType, setCustomPropertyType] = useState("")
  const [propertyTypeError, setPropertyTypeError] = useState<string | null>(null)

  // Clear errors when input changes
  useEffect(() => {
    if (customPropertyType) setPropertyTypeError(null);
  }, [customPropertyType]);

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

  const handlePropertyTypeChange = (selected: string[]) => {
    handleInputChangeWithSave("selectedPropertyTypes", selected);
    
    // If "other" was removed, keep the custom types in formData but they won't display
    if (!selected.includes("other") && formData.customPropertyTypes?.length > 0) {
      // We don't clear custom types to preserve them if user re-checks "other"
      // Custom types are only displayed if "other" is selected
    }
  };

  const handleAddCustomPropertyType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customPropertyType.trim() !== "") {
      e.preventDefault();
      
      const trimmedType = customPropertyType.trim();
      
      // Check for duplicates in both standard and custom types
      const isDuplicateStandard = propertyTypeOptions.some(opt => 
        opt.label.toLowerCase() === trimmedType.toLowerCase() || 
        opt.value.toLowerCase() === trimmedType.toLowerCase()
      );
      
      const isDuplicateCustom = getCustomPropertyTypes(formData).some((type: string) => 
        type.toLowerCase() === trimmedType.toLowerCase()
      );
      
      if (isDuplicateStandard || isDuplicateCustom) {
        setPropertyTypeError(`"${trimmedType}" already exists in property types`);
        return;
      }
      
      // Make sure "other" is included in selectedPropertyTypes
      const updatedPropertyTypes = [...(formData.selectedPropertyTypes || [])];
      if (!updatedPropertyTypes.includes("other")) {
        updatedPropertyTypes.push("other");
      }
      
      // Add the new custom type to the array
      const updatedCustomTypes = [...getCustomPropertyTypes(formData), trimmedType];
      
      // Update both states
      handleInputChangeWithSave("selectedPropertyTypes", updatedPropertyTypes);
      handleInputChangeWithSave("customPropertyTypes", updatedCustomTypes);
      
      // Clear the input and error
      setCustomPropertyType("");
      setPropertyTypeError(null);
    }
  };

  // Handle removing property types
  const handleRemovePropertyType = (type: string) => {
    if (type === "other") {
      // If removing "other", keep custom types in data but they won't display
      // This allows user to re-check "other" later and see their custom types
      const updatedTypes = formData.selectedPropertyTypes.filter((t: string) => t !== type);
      handleInputChangeWithSave("selectedPropertyTypes", updatedTypes);
    } else if (propertyTypeOptions.find(opt => opt.value === type)) {
      // Standard property type
      if (onRemovePropertyType) {
        onRemovePropertyType(type);
      } else {
        const updatedTypes = formData.selectedPropertyTypes.filter((t: string) => t !== type);
        handleInputChangeWithSave("selectedPropertyTypes", updatedTypes);
      }
    } else {
      // Custom property type (the type parameter will be the custom name)
      const updatedCustomTypes = getCustomPropertyTypes(formData).filter((t: string) => t !== type);
      handleInputChangeWithSave("customPropertyTypes", updatedCustomTypes);
      
      // If no more custom types, also remove "other" from selected types
      if (updatedCustomTypes.length === 0) {
        const updatedTypes = formData.selectedPropertyTypes.filter((t: string) => t !== "other");
        handleInputChangeWithSave("selectedPropertyTypes", updatedTypes);
      }
    }
  };

  return (
    <div>
      <Label className="text-gray-700 mb-2 block">Property Types</Label>
      <MultiSelect
        options={propertyTypeOptions.map(option => ({
          ...option,
          labelWithIcon: (
            <div className="flex items-center">
              {option.icon}
              {option.label}
            </div>
          )
        }))}
        selected={formData.selectedPropertyTypes || []}
        onChange={handlePropertyTypeChange}
        placeholder="Select property types..."
        emptyText="No property types found."
        maxHeight={300}
      />
      
      {/* Display selected property types with remove option */}
      {getAllSelectedPropertyTypes(formData).length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {getAllSelectedPropertyTypes(formData).map((type: string) => (
            <Badge 
              key={type} 
              className="bg-green-50 text-green-700 hover:bg-green-100 py-1 pl-2 pr-1 flex items-center gap-1"
            >
              <span className="flex items-center">
                {getPropertyTypeIcon(type)}
                {getPropertyTypeDisplayName(type)}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 hover:bg-green-200 rounded-full ml-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemovePropertyType(type);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      
      {formData.selectedPropertyTypes?.includes("other") && (
        <div className="mt-3">
          <Label htmlFor="customPropertyType" className="text-gray-700">Add another property type</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileQuestion className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              id="customPropertyType" 
              value={customPropertyType} 
              onChange={(e) => setCustomPropertyType(e.target.value)} 
              onKeyDown={handleAddCustomPropertyType}
              className={`mt-1 pl-10 ${propertyTypeError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Type and press Enter to add"
            />
          </div>
          {propertyTypeError && (
            <Alert variant="destructive" className="mt-2 py-2 px-3 bg-red-50 border border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-sm text-red-600">
                {propertyTypeError}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}