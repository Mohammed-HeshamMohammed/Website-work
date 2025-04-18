// components/sections/order/tabs/sections/type-selector-utils.tsx
import { FileQuestion } from "lucide-react"
import React from "react"
import { leadTypeOptions, propertyTypeOptions } from "./constants"

// Helper to get custom items array from formData
export const getCustomLeadTypes = (formData: any) => {
  return formData.customLeadTypes || [];
};

export const getCustomPropertyTypes = (formData: any) => {
  return formData.customPropertyTypes || [];
};

// Get all selected lead types including custom ones
export const getAllSelectedLeadTypes = (formData: any) => {
  const standardTypes = formData.selectedLeadTypes?.filter(
    (type: string) => type !== "other" && leadTypeOptions.some(opt => opt.value === type)
  ) || [];
  
  // Only include custom types if "other" is selected
  const customTypes = formData.selectedLeadTypes?.includes("other") 
    ? getCustomLeadTypes(formData) 
    : [];
  
  // If "other" is selected but no custom types, still show the "other" badge
  const otherType = formData.selectedLeadTypes?.includes("other") && customTypes.length === 0 
    ? ["other"] 
    : [];
  
  return [...standardTypes, ...otherType, ...customTypes];
};

// Get all selected property types including custom ones
export const getAllSelectedPropertyTypes = (formData: any) => {
  const standardTypes = formData.selectedPropertyTypes?.filter(
    (type: string) => type !== "other" && propertyTypeOptions.some(opt => opt.value === type)
  ) || [];
  
  // Only include custom types if "other" is selected
  const customTypes = formData.selectedPropertyTypes?.includes("other") 
    ? getCustomPropertyTypes(formData) 
    : [];
  
  // If "other" is selected but no custom types, still show the "other" badge
  const otherType = formData.selectedPropertyTypes?.includes("other") && customTypes.length === 0 
    ? ["other"] 
    : [];
  
  return [...standardTypes, ...otherType, ...customTypes];
};

// Helper function to get display name for lead types
export const getLeadTypeDisplayName = (type: string) => {
  const standardOption = leadTypeOptions.find(option => option.value === type);
  if (standardOption) return standardOption.label;
  
  // If it's not a standard option, it's a custom type
  return type;
};

// Helper function to get display name for property types
export const getPropertyTypeDisplayName = (type: string) => {
  const standardOption = propertyTypeOptions.find(option => option.value === type);
  if (standardOption) return standardOption.label;
  
  // If it's not a standard option, it's a custom type
  return type;
};

// Helper function to get icon for lead types
export const getLeadTypeIcon = (type: string) => {
  const standardOption = leadTypeOptions.find(option => option.value === type);
  if (standardOption) return standardOption.icon;
  
  // For custom types, use a generic icon
  return <FileQuestion className="h-4 w-4 mr-2" />;
};

// Helper function to get icon for property types
export const getPropertyTypeIcon = (type: string) => {
  const standardOption = propertyTypeOptions.find(option => option.value === type);
  if (standardOption) return standardOption.icon;
  
  // For custom types, use a generic icon
  return <FileQuestion className="h-4 w-4 mr-2" />;
};