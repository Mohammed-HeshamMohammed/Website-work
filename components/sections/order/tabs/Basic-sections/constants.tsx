// components/sections/order/tabs/sections/constants.tsx
import React from "react"
import { 
  X, 
  AlertCircle, 
  Home, 
  Building2, 
  Warehouse, 
  Map, 
  FileQuestion,
  UserX,
  MapPin,
  CalendarX,
  AlertTriangle,
  Percent,
  Building,
  Factory as FactoryIcon,
  Timer,
  Briefcase,
  Landmark,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Star,
  Clock,
  Plus
} from "lucide-react"

export const leadTypeOptions = [
  { label: "Tired Landlord", value: "tired_landlord", icon: <UserX className="h-4 w-4 mr-2" /> },
  { label: "Absentee Owners", value: "absentee_owners", icon: <MapPin className="h-4 w-4 mr-2" /> },
  { label: "Expired Listings", value: "expired_listings", icon: <CalendarX className="h-4 w-4 mr-2" /> },
  { label: "Pre-Foreclosures", value: "pre_foreclosures", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { label: "High Equity", value: "high_equity", icon: <Percent className="h-4 w-4 mr-2" /> },
  { label: "Vacant Properties", value: "vacant_properties", icon: <FactoryIcon className="h-4 w-4 mr-2" /> },
  { label: "Inherited Properties", value: "inherited_properties", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { label: "Tax Delinquent", value: "tax_delinquent", icon: <Landmark className="h-4 w-4 mr-2" /> },
  { label: "Other", value: "other", icon: <Plus className="h-4 w-4 mr-2" /> }
];

export const propertyTypeOptions = [
  { label: "Single Family", value: "single_family", icon: <Home className="h-4 w-4 mr-2" /> },
  { label: "Multi-Family", value: "multi_family", icon: <Building className="h-4 w-4 mr-2" /> },
  { label: "Condo/Townhouse", value: "condo_townhouse", icon: <Building2 className="h-4 w-4 mr-2" /> },
  { label: "Commercial", value: "commercial", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { label: "Land/Vacant Lot", value: "land", icon: <Map className="h-4 w-4 mr-2" /> },
  { label: "Other", value: "other", icon: <FileQuestion className="h-4 w-4 mr-2" /> }
];

export const propertyConditionIcons = {
  any: <Building className="h-4 w-4 mr-2" />,
  excellent: <Star className="h-4 w-4 mr-2 text-yellow-500" />,
  good: <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />,
  fair: <Building className="h-4 w-4 mr-2 text-blue-500" />,
  poor: <ThumbsDown className="h-4 w-4 mr-2 text-orange-500" />,
  distressed: <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
};

export const ownershipDurationIcons = {
  any: <Clock className="h-4 w-4 mr-2" />,
  less_than_1: <Clock className="h-4 w-4 mr-2 text-green-500" />,
  "1_to_5": <Clock className="h-4 w-4 mr-2 text-blue-500" />,
  "5_to_10": <Clock className="h-4 w-4 mr-2 text-purple-500" />,
  over_10: <Clock className="h-4 w-4 mr-2 text-red-500" />
};

export const propertyConditionOptions = [
  { value: "any", label: "Any Condition", icon: propertyConditionIcons.any },
  { value: "excellent", label: "Excellent", icon: propertyConditionIcons.excellent },
  { value: "good", label: "Good", icon: propertyConditionIcons.good },
  { value: "fair", label: "Fair", icon: propertyConditionIcons.fair },
  { value: "poor", label: "Poor / Needs Repair", icon: propertyConditionIcons.poor },
  { value: "distressed", label: "Distressed", icon: propertyConditionIcons.distressed }
];

export const ownershipDurationOptions = [
  { value: "any", label: "Any Duration", icon: ownershipDurationIcons.any },
  { value: "less_than_1", label: "Less than 1 year", icon: ownershipDurationIcons.less_than_1 },
  { value: "1_to_5", label: "1-5 years", icon: ownershipDurationIcons["1_to_5"] },
  { value: "5_to_10", label: "5-10 years", icon: ownershipDurationIcons["5_to_10"] },
  { value: "over_10", label: "Over 10 years", icon: ownershipDurationIcons.over_10 }
];