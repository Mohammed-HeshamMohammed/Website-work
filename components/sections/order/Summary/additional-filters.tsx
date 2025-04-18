// additional-filters.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Building, DollarSign, Bed, Bath, SquareIcon, CalendarIcon, LandPlot, BanIcon, User, Ship, Calendar as Calendar1, Percent, FileText, Wallet, AlertOctagon, Check, CircleDollarSign, Lock, Waves } from "lucide-react"
import { FilterSection } from "./filter-section"

interface FilterDisplayHelpers {
  displayRangeFilter: (label: string, icon: React.ReactNode, min?: string, max?: string) => React.ReactNode | null;
  displayBooleanFilter: (label: string, icon: React.ReactNode, value?: boolean) => React.ReactNode | null;
  displaySelectFilter: (label: string, icon: React.ReactNode, value?: string) => React.ReactNode | null;
}

interface AdditionalFiltersProps {
  formData: any; // Using any to simplify, but you should define a proper type
  hasAdvancedFilters: boolean;
  hasFinancialFilters: boolean;
}

export function AdditionalFilters({ formData, hasAdvancedFilters, hasFinancialFilters }: AdditionalFiltersProps) {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [advancedFiltersExpanded, setAdvancedFiltersExpanded] = useState(false);
  const [financialFiltersExpanded, setFinancialFiltersExpanded] = useState(false);

  // Helper function to display range filters
  const displayRangeFilter = (label: string, icon: React.ReactNode, min?: string, max?: string) => {
    if (!min && !max) return null;
    return (
      <div className="flex justify-between text-sm items-center">
        <span className="text-gray-600 flex items-center">
          {icon}
          <span className="ml-1">{label}:</span>
        </span>
        <span>
          {min ? min : "Any"} - {max ? max : "Any"}
        </span>
      </div>
    );
  };

  // Helper function for boolean filters
  const displayBooleanFilter = (label: string, icon: React.ReactNode, value?: boolean) => {
    if (value === undefined || value === false) return null;
    return (
      <div className="flex justify-between text-sm items-center">
        <span className="text-gray-600 flex items-center">
          {icon}
          <span className="ml-1">{label}</span>
        </span>
        <Check className="h-4 w-4 text-green-500" />
      </div>
    );
  };

  // Helper function for select filters
  const displaySelectFilter = (label: string, icon: React.ReactNode, value?: string) => {
    if (!value || value === "any") return null;
    
    const formatValue = (val: string) => {
      return val.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };
    
    return (
      <div className="flex justify-between text-sm items-center">
        <span className="text-gray-600 flex items-center">
          {icon}
          <span className="ml-1">{label}:</span>
        </span>
        <span>{formatValue(value)}</span>
      </div>
    );
  };

  const filterHelpers: FilterDisplayHelpers = {
    displayRangeFilter,
    displayBooleanFilter,
    displaySelectFilter
  };

  return (
    <Collapsible open={filtersExpanded} onOpenChange={setFiltersExpanded}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between px-2 py-1">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">Additional Filters</span>
          </span>
          <span className="text-xs text-gray-500">
            {filtersExpanded ? "Hide" : "Show"}
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="h-[200px] pr-3">
          {/* Advanced Filters Summary */}
          {hasAdvancedFilters && (
            <AdvancedFilters 
              formData={formData} 
              expanded={advancedFiltersExpanded}
              setExpanded={setAdvancedFiltersExpanded}
              filterHelpers={filterHelpers}
            />
          )}
          
          {/* Financial Filters Summary */}
          {hasFinancialFilters && (
            <FinancialFilters 
              formData={formData}
              expanded={financialFiltersExpanded}
              setExpanded={setFinancialFiltersExpanded}
              filterHelpers={filterHelpers}
            />
          )}
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface FilterSectionProps {
  formData: any;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  filterHelpers: FilterDisplayHelpers;
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  renderContent: () => React.ReactNode;
}

// Separating out the filter sections
function AdvancedFilters({ formData, expanded, setExpanded, filterHelpers }: { 
  formData: any, 
  expanded: boolean, 
  setExpanded: (expanded: boolean) => void,
  filterHelpers: FilterDisplayHelpers
}) {
  const { displayRangeFilter, displayBooleanFilter } = filterHelpers;
  
  return (
    <Collapsible open={expanded} onOpenChange={setExpanded} className="mb-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between px-2 py-1 mb-2">
          <span className="flex items-center gap-2">
            <Building className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Advanced Filters</span>
          </span>
          <span className="text-xs text-gray-500">
            {expanded ? "Hide" : "Show"}
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-gray-50 rounded-md p-3 space-y-2">
          {displayRangeFilter("Bedrooms", <Bed className="h-4 w-4" />, formData.bedroomsMin, formData.bedroomsMax)}
          {displayRangeFilter("Bathrooms", <Bath className="h-4 w-4" />, formData.bathroomsMin, formData.bathroomsMax)}
          {displayRangeFilter("Square Footage", <SquareIcon className="h-4 w-4" />, formData.squareFootageMin, formData.squareFootageMax)}
          {displayRangeFilter("Year Built", <CalendarIcon className="h-4 w-4" />, formData.yearBuiltMin, formData.yearBuiltMax)}
          {displayRangeFilter("Lot Size (acres)", <LandPlot className="h-4 w-4" />, formData.lotSizeMin, formData.lotSizeMax)}
          {displayBooleanFilter("Exclude Recently Sold", <BanIcon className="h-4 w-4" />, formData.excludeRecentlySold)}
          {displayBooleanFilter("Exclude Active Listings", <BanIcon className="h-4 w-4" />, formData.excludeRecentlyListed)}
          {displayBooleanFilter("Exclude Bank Owned", <BanIcon className="h-4 w-4" />, formData.excludeBankOwned)}
          {displayBooleanFilter("Only Non-Owner Occupied", <User className="h-4 w-4" />, formData.onlyNonOwnerOccupied)}
          {displayBooleanFilter("Has Pool", <Waves className="h-4 w-4" />, formData.hasPool)}
          {displayBooleanFilter("Waterfront Property", <Ship className="h-4 w-4" />, formData.waterfront)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function FinancialFilters({ formData, expanded, setExpanded, filterHelpers }: { 
  formData: any, 
  expanded: boolean, 
  setExpanded: (expanded: boolean) => void,
  filterHelpers: FilterDisplayHelpers
}) {
  const { displayRangeFilter, displayBooleanFilter, displaySelectFilter } = filterHelpers;
  
  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between px-2 py-1 mb-2">
          <span className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Financial Filters</span>
          </span>
          <span className="text-xs text-gray-500">
            {expanded ? "Hide" : "Show"}
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-gray-50 rounded-md p-3 space-y-2">
          {displayRangeFilter("Mortgage Age (years)", <Calendar1 className="h-4 w-4" />, formData.mortgageAgeMin, formData.mortgageAgeMax)}
          {displayRangeFilter("LTV Ratio (%)", <Percent className="h-4 w-4" />, formData.ltvRatioMin, formData.ltvRatioMax)}
          {displayRangeFilter("Assessed Value ($)", <CircleDollarSign className="h-4 w-4" />, formData.assessedValueMin, formData.assessedValueMax)}
          {displaySelectFilter("Tax Delinquency", <FileText className="h-4 w-4" />, formData.taxDelinquencyStatus)}
          {displaySelectFilter("Free & Clear", <Lock className="h-4 w-4" />, formData.freeAndClearStatus)}
          {displaySelectFilter("Foreclosure", <AlertOctagon className="h-4 w-4" />, formData.foreclosureStatus)}
          {displayBooleanFilter("Has Mortgage", <Wallet className="h-4 w-4" />, formData.hasMortgage)}
          {displayBooleanFilter("Has Second Mortgage", <Wallet className="h-4 w-4" />, formData.hasSecondMortgage)}
          {displayBooleanFilter("Has Liens", <AlertTriangle className="h-4 w-4" />, formData.hasLien)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}