// types.tsx
export interface FormData {
  company: any
  // Basic information
  name: string
  email: string
  phone: string
  quantity: number

  // Location information
  states: string
  counties: string
  citiesZip: string
  selectedStates: string[] // Added property
  selectedCounties: Array<{ state: string; name: string; county: string }>;

  // Lead and property types
  selectedLeadTypes: string[]
  selectedPropertyTypes: string[]
  otherLeadType: string
  otherPropertyType: string
  customLeadTypes: string[]
  customPropertyTypes: string[]
  propertyType: string
  propertyTypeOther: string
  propertyTypeOptions: string[]

  // Property criteria
  priceRestrictions: string
  equityPercentage: string
  propertyCondition: string
  ownershipDuration: string
  bedroomsMin: string
  bedroomsMax: string
  bathroomsMin: string
  bathroomsMax: string
  squareFootageMin: string
  squareFootageMax: string
  lotSizeMin: string
  lotSizeMax: string
  yearBuiltMin: string
  yearBuiltMax: string

  // Special conditions
  onlyNonOwnerOccupied: boolean
  hasPool: boolean
  waterfront: boolean
  excludeRecentlySold: boolean
  excludeRecentlyListed: boolean
  excludeBankOwned: boolean

  // Mortgage and financial info
  mortgageAgeMin: string
  mortgageAgeMax: string
  ltvRatioMin: string
  ltvRatioMax: string
  taxDelinquencyStatus: string
  assessedValueMin: string
  assessedValueMax: string
  freeAndClearStatus: string
  foreclosureStatus: string
  hasMortgage: boolean
  hasSecondMortgage: boolean
  hasLien: boolean

  // Records
  codeViolationLocations: string[]
  codeViolation: boolean
  divorceRecords: string
  divorceLocations: string[]
  divorce: boolean
  bankruptcyRecords: boolean
  bankruptcyLocations: string
  bankruptcy: boolean

  // Additional details
  additionalDetails: string
  supportingFile?: File;
  uploadDescription?: string;
  codeViolationRecords: number;
}

export interface PropertyCriteriaSectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: string | string[] | boolean) => void;
  onRemoveLeadType: (type: string) => void;
  onRemovePropertyType: (type: string) => void;
}

export interface AdditionalDetailsSectionProps {
  formData: {
    supportingFile?: File;
    uploadDescription?: string;
    additionalDetails?: string;
  };
  handleInputChange: (field: string, value: string | boolean | string[] | File) => void;
}

export interface FileUploadSectionProps {
  handleFilesUploadChange: (files: FileInfo[]) => void;
  formData: FormData;
  handleInputChange: (field: string, value: string | string[] | boolean) => void;
  onTotalRecordCountChange: (count: number) => void;
}

export interface OrderSummaryProps {
  formData: FormData;
  orderDetails: OrderDetail[];
  onRemoveDetail: (detail: OrderDetail) => void;
  pricePerRecord: number;
  recordCount: number;
  files: FileInfo[];
  onProcessOrder: () => void;
  onRemoveLeadType: (type: string) => void;
  onRemovePropertyType: (type: string) => void;
}

export interface OrderSummaryManualProps {
  formData: FormData;
  orderDetails: OrderDetail[];
  onRemoveDetail: (detail: OrderDetail) => void;
  validateForm: () => boolean;
  pageTransition: any; // For framer-motion variants
  recordCount: number;
  pricePerRecord: number;
}

export interface OrderDetail {
  city: any;
  state: any;
  zipCode: any;
  type: "state" | "county" | "zipCode";
  value: string;
  parentState?: string;
}

export interface FileInfo {
  name: string;
  size: number;
  recordCount: number;
  columns: string[]; // Removed optional marker
  selectedColumns: string[]; // Removed optional marker
  file: File; // Removed optional marker to make it required
}

export interface LeadPropertyTypesProps {
  formData: FormData;
  onRemoveLeadType: (type: string) => void;
  onRemovePropertyType: (type: string) => void;
}


export interface OrderSummaryProps {
  formData: FormData;
  orderDetails: OrderDetail[];
  onRemoveDetail: (detail: OrderDetail) => void;
  pricePerRecord: number;
  recordCount: number;
  files: FileInfo[];
  onProcessOrder: () => void;
  onRemoveLeadType: (type: string) => void;
  onRemovePropertyType: (type: string) => void;
  onRemoveCounty: (county: string, state: string) => void;
  onRemoveState: (state: string) => void; // Added this line
}