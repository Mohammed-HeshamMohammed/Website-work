// lead-property-types.tsx
import { 
  Clipboard, 
  UserX, 
  MapPin, 
  CalendarX, 
  AlertTriangle, 
  Percent, 
  FactoryIcon, 
  Briefcase, 
  Landmark, 
  Plus,
  Home,
  Building,
  Building2,
  Warehouse,
  Map,
  FileQuestion,
  X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LeadPropertyTypesProps {
  formData: {
    selectedLeadTypes: string[];
    selectedPropertyTypes: string[];
    otherLeadType?: string;
    otherPropertyType?: string;
    customLeadTypes?: string[];
    customPropertyTypes?: string[];
  };
  onRemoveLeadType?: (type: string) => void;
  onRemovePropertyType?: (type: string) => void;
}

export function LeadPropertyTypes({ formData, onRemoveLeadType, onRemovePropertyType }: LeadPropertyTypesProps) {
  
  // Get lead type icon based on value - using the same icons from constants
  const getLeadTypeIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "tired_landlord": <UserX className="h-3 w-3 mr-1" />,
      "absentee_owners": <MapPin className="h-3 w-3 mr-1" />,
      "expired_listings": <CalendarX className="h-3 w-3 mr-1" />,
      "pre_foreclosures": <AlertTriangle className="h-3 w-3 mr-1" />,
      "high_equity": <Percent className="h-3 w-3 mr-1" />,
      "vacant_properties": <FactoryIcon className="h-3 w-3 mr-1" />,
      "inherited_properties": <Briefcase className="h-3 w-3 mr-1" />,
      "tax_delinquent": <Landmark className="h-3 w-3 mr-1" />,
      "other": <Plus className="h-3 w-3 mr-1" />
    };
    
    return iconMap[type] || <Plus className="h-3 w-3 mr-1" />;
  };

  // Property type icon mapping - using the same icons from constants
  const getPropertyTypeIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "single_family": <Home className="h-3 w-3 mr-1" />,
      "multi_family": <Building className="h-3 w-3 mr-1" />,
      "condo_townhouse": <Building2 className="h-3 w-3 mr-1" />,
      "commercial": <Warehouse className="h-3 w-3 mr-1" />,
      "land": <Map className="h-3 w-3 mr-1" />,
      "other": <FileQuestion className="h-3 w-3 mr-1" />
    };
    
    return iconMap[type] || <FileQuestion className="h-3 w-3 mr-1" />;
  };

  // Determine if a type is a standard type or custom type
  const isStandardLeadType = (type: string) => {
    const standardTypes = ["tired_landlord", "absentee_owners", "expired_listings", 
                          "pre_foreclosures", "high_equity", "vacant_properties", 
                          "inherited_properties", "tax_delinquent", "other"];
    return standardTypes.includes(type);
  };

  const isStandardPropertyType = (type: string) => {
    const standardTypes = ["single_family", "multi_family", "condo_townhouse", 
                          "commercial", "land", "other"];
    return standardTypes.includes(type);
  };

  // Get all lead types to display (with custom handling)
  const getDisplayLeadTypes = () => {
    // Get standard lead types (excluding "other")
    const standardTypes = formData.selectedLeadTypes?.filter(type => type !== "other") || [];
    
    // If "other" is selected and there are custom types, display those instead
    if (formData.selectedLeadTypes?.includes("other")) {
      if (formData.customLeadTypes && formData.customLeadTypes.length > 0) {
        // Display each custom type separately
        return [...standardTypes, ...formData.customLeadTypes];
      } else {
        // If "other" selected but no custom types specified, still show "other"
        return [...standardTypes, "other"];
      }
    }
    
    return standardTypes;
  };

  // Get all property types to display (with custom handling)
  const getDisplayPropertyTypes = () => {
    // Get standard property types (excluding "other")
    const standardTypes = formData.selectedPropertyTypes?.filter(type => type !== "other") || [];
    
    // If "other" is selected and there are custom types, display those instead
    if (formData.selectedPropertyTypes?.includes("other")) {
      if (formData.customPropertyTypes && formData.customPropertyTypes.length > 0) {
        // Display each custom type separately
        return [...standardTypes, ...formData.customPropertyTypes];
      } else {
        // If "other" selected but no custom types specified, still show "other"
        return [...standardTypes, "other"];
      }
    }
    
    return standardTypes;
  };

  // Helper function to get display name for standard lead types
  const getLeadTypeDisplayName = (type: string) => {
    return type.replace(/_/g, ' ');
  };

  // Helper function to get display name for standard property types
  const getPropertyTypeDisplayName = (type: string) => {
    return type.replace(/_/g, ' ');
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <Clipboard className="h-4 w-4" />
        <h3 className="text-sm font-medium">Lead & Property Types</h3>
      </div>
      <div className="bg-gray-50 rounded-md p-3 space-y-3">
        {/* Lead types - read-only now */}
        <div>
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">Lead Types</h4>
          {formData.selectedLeadTypes && formData.selectedLeadTypes.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {getDisplayLeadTypes().map((type) => {
                const isStandard = isStandardLeadType(type);
                return (
                  <Badge 
                    key={type} 
                    className="bg-blue-50 text-blue-700 py-1 px-2 flex items-center group"
                  >
                    <span className="flex items-center">
                      {getLeadTypeIcon(isStandard ? type : "other")}
                      {isStandard ? getLeadTypeDisplayName(type) : type}
                    </span>
                    {onRemoveLeadType && (
                      <button 
                        onClick={() => onRemoveLeadType(type)}
                        className="ml-1 opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-700 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-500">No lead types selected</p>
          )}
        </div>
        
        {/* Property types - read-only now */}
        <div>
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">Property Types</h4>
          {formData.selectedPropertyTypes && formData.selectedPropertyTypes.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {getDisplayPropertyTypes().map((type) => {
                const isStandard = isStandardPropertyType(type);
                return (
                  <Badge 
                    key={type} 
                    className="bg-green-50 text-green-700 py-1 px-2 flex items-center group"
                  >
                    <span className="flex items-center">
                      {getPropertyTypeIcon(isStandard ? type : "other")}
                      {isStandard ? getPropertyTypeDisplayName(type) : type}
                    </span>
                    {onRemovePropertyType && (
                      <button
                        onClick={() => onRemovePropertyType(type)}
                        className="ml-1 opacity-0 group-hover:opacity-100 text-green-400 hover:text-green-700 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-500">No property types selected</p>
          )}
        </div>
      </div>
    </div>
  );
}