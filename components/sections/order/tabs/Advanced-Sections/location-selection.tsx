// components/sections/order/tabs/location-selection.tsx
import React, { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultiSelect } from "@/components/sections/order/multi-select-dropdown";
import { OrderDetail, FormData } from "@/components/sections/order/types";
import { counties, states } from "@/utils/location-data";

interface LocationSelectionProps {
  recordsFieldName: string;
  recordsValue: string | number;
  locationsFieldName: string;
  locationValues: string[];
  orderDetails: OrderDetail[];
  handleInputChange: (field: string, value: any) => void;
  configTitle: string;
  formData?: FormData; // Add formData to match advanced-filters-tab pattern
}

export function LocationSelection({
  recordsFieldName,
  recordsValue,
  locationsFieldName,
  locationValues = [],
  orderDetails = [],
  handleInputChange,
  configTitle,
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
}: LocationSelectionProps) {
  const [locationType, setLocationType] = useState("allMarkets");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);

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

  // Transform data for dropdowns
  const countyOptions = useMemo(() => 
    counties.map((county) => ({
      label: `${county.name} (${county.state})`,
      value: `${county.state}:${county.name}`,
    })),
    []
  );
  
  const stateOptions = useMemo(() => 
    states.map((state) => ({
      label: state,
      value: state,
    })),
    []
  );

  // Handle location type selection
  const handleLocationTypeChange = (type: string) => {
    setLocationType(type);
    if (type === "allMarkets") {
      // Set "All your markets" when that option is selected
      handleInputChangeWithSave(locationsFieldName, ["All your markets"]);
    } else {
      // Clear locations when switching to specific areas
      handleInputChangeWithSave(locationsFieldName, []);
    }
  };

  // Format location options for MultiSelect from orderDetails
  const locationOptions = useMemo(() => {
    const locations: { label: string; value: string }[] = [];
    
    if (!orderDetails || orderDetails.length === 0) {
      return locations;
    }
    
    orderDetails.forEach(detail => {
      let locationName = "";
      let locationValue = "";
      
      if (detail.type === "county") {
        locationName = `${detail.value}, ${detail.parentState || detail.state}`;
        locationValue = `county:${detail.value}:${detail.parentState || detail.state}`;
      } else if (detail.type === "zipCode") {
        locationName = `${detail.zipCode} ${detail.city}, ${detail.state}`;
        locationValue = `zipCode:${detail.zipCode}:${detail.city}:${detail.state}`;
      } else if (detail.type === "state") {
        locationName = detail.value;
        locationValue = `state:${detail.value}`;
      }
      
      if (locationName && !locations.some(loc => loc.value === locationValue)) {
        locations.push({ label: locationName, value: locationValue });
      }
    });
    
    return locations;
  }, [orderDetails]);

  // State options for zip code selection
  const stateOptions2 = useMemo(() => {
    const uniqueStates = new Set<string>();
    orderDetails.forEach(detail => {
      if (detail.state) {
        uniqueStates.add(detail.state);
      }
      if (detail.parentState) {
        uniqueStates.add(detail.parentState);
      }
    });
    return Array.from(uniqueStates);
  }, [orderDetails]);

  // Handle state selection change
  const handleStateChange = (selected: string[]) => {
    setSelectedStates(selected);
  };

  // Handle county selection change
  const handleCountyChange = (selected: string[]) => {
    setSelectedCounties(selected);
  };

  // Add selected locations to orderDetails
  const handleAddLocations = () => {
    // Process selected states
    const newStateDetails: OrderDetail[] = selectedStates.map(state => ({
      type: "state" as const,
      value: state,
      state,
      city: "",
      zipCode: ""
    }));

    // Process selected counties
    const newCountyDetails: OrderDetail[] = selectedCounties.map(countyValue => {
      const [state, county] = countyValue.split(':');
      return {
        type: "county" as const,
        value: county,
        parentState: state,
        state,
        city: "",
        zipCode: ""
      };
    });

    // Create updated locations array
    const newLocationNames = [
      ...newStateDetails.map(detail => detail.value),
      ...newCountyDetails.map(detail => `${detail.value}, ${detail.parentState}`)
    ];

    // Update form data with new locations using the backend save method
    handleInputChangeWithSave(locationsFieldName, [...locationValues, ...newLocationNames]);

    // Clear selections
    setSelectedStates([]);
    setSelectedCounties([]);
  };

  // Transform array of location strings to values for the MultiSelect
  const transformLocationsToValues = (locations: string[]): string[] => {
    if (!locations || locations.length === 0) return [];
    
    // Handle the special case of "All your markets"
    if (locations.includes("All your markets")) {
      return [];
    }
    
    return locations.map(location => {
      // Try to match the location string with our locationOptions
      const matchingOption = locationOptions.find(option => 
        option.label === location || option.value.includes(location)
      );
      return matchingOption ? matchingOption.value : '';
    }).filter(Boolean);
  };

  // Transform values from MultiSelect back to location strings
  const transformValuesToLocations = (values: string[]): string[] => {
    if (!values || values.length === 0) return [];
    
    return values.map(value => {
      const matchingOption = locationOptions.find(option => option.value === value);
      return matchingOption ? matchingOption.label : '';
    }).filter(Boolean);
  };

  // Get the transformed values for the current location type
  const currentLocationValues = transformLocationsToValues(locationValues);

  // Handle location selection changes
  const handleLocationsChange = (selected: string[]) => {
    const newLocations = transformValuesToLocations(selected);
    handleInputChangeWithSave(locationsFieldName, newLocations);
  };

  // Handle zip code submission
  const handleZipCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("zipCode") as HTMLInputElement;
    const zipCode = input.value.trim();
    const stateForZip = (e.currentTarget.elements.namedItem("zipState") as HTMLSelectElement)?.value;

    if (!stateForZip) {
      // Handle error - no state selected
      return;
    }

    if (!/^\d{5}$/.test(zipCode)) {
      // Handle error - invalid zip code
      return;
    }

    const locationName = `${zipCode} ${stateForZip}, ${stateForZip}`;
    handleInputChangeWithSave(locationsFieldName, [...locationValues, locationName]);
    input.value = "";
  };

  return (
    <>
      <h4 className="font-medium text-amber-900 mb-2">{configTitle}</h4>
      
      <div className="mb-3">
        <Label htmlFor={recordsFieldName} className="text-sm text-amber-900">Number of Records Needed</Label>
        <Input 
          id={recordsFieldName} 
          type="number" 
          className="mt-1 border-amber-300 focus:border-amber-500 focus:ring-amber-500"
          placeholder="Enter number of records" 
          value={recordsValue}
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value) : "";
            handleInputChangeWithSave(recordsFieldName, value);
          }}
        />
      </div>
      
      <div className="mb-4">
        <Label className="text-sm text-amber-900 mb-2 block">Location Selection</Label>
        <RadioGroup 
          value={locationType} 
          onValueChange={handleLocationTypeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="allMarkets" id={`${recordsFieldName}-all`} />
            <Label htmlFor={`${recordsFieldName}-all`} className="text-amber-900">
              All your markets (All selected locations)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specificAreas" id={`${recordsFieldName}-specific`} />
            <Label htmlFor={`${recordsFieldName}-specific`} className="text-amber-900">
              Specific areas only
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {locationType === "specificAreas" && (
        <div className="space-y-3 mt-3 border-t border-amber-200 pt-3">
          <div>
            <Label className="text-sm text-amber-900 mb-2 block">Select Locations</Label>
            {orderDetails && orderDetails.length > 0 ? (
              <MultiSelect
                options={locationOptions}
                selected={currentLocationValues}
                onChange={handleLocationsChange}
                placeholder="Select locations"
                emptyText="No locations available"
                maxHeight={150}
              />
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-amber-700 mb-1 block">Select States</Label>
                  <MultiSelect
                    options={stateOptions}
                    selected={selectedStates}
                    onChange={handleStateChange}
                    placeholder="Select states..."
                    emptyText="No states available"
                    maxHeight={150}
                  />
                </div>
                
                <div>
                  <Label className="text-sm text-amber-700 mb-1 block">Select Counties</Label>
                  <MultiSelect
                    options={countyOptions}
                    selected={selectedCounties}
                    onChange={handleCountyChange}
                    placeholder="Select counties..."
                    emptyText="No counties available"
                    maxHeight={150}
                  />
                </div>
                
                <Button 
                  onClick={handleAddLocations} 
                  disabled={selectedStates.length === 0 && selectedCounties.length === 0}
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                >
                  Add Selected Locations
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <Label className="text-sm text-amber-900 mb-2 block">Add Zip Code</Label>
            <form onSubmit={handleZipCodeSubmit} className="flex gap-2">
              <Input 
                name="zipCode" 
                placeholder="Enter 5-digit zip code" 
                className="flex-1" 
              />
              <select 
                name="zipState" 
                id={`zipState-${recordsFieldName}`}
                aria-label="State for zip code"
                className="rounded-md border border-amber-200 px-3 py-2"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Button type="submit" className="border-amber-400 hover:bg-amber-100">Add</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}