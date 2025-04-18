// Updated location-summary.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Star, ChevronDown, ChevronRight, Map } from "lucide-react"
import { OrderDetail, FormData } from "../types"
import { useState, useMemo } from "react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LocationSummaryProps {
  orderDetails: OrderDetail[];
  onRemoveDetail: (detail: OrderDetail) => void;
  formData: FormData;
}

export function LocationSummary({
  orderDetails,
  onRemoveDetail,
  formData
}: LocationSummaryProps) {
  const [viewType, setViewType] = useState<"states" | "counties" | "zipcodes">("states");

  // Function to check if "All your markets" is selected for any premium filter
  const isAllMarketsSelected = useMemo(() => {
    return (
      (formData.codeViolation && formData.codeViolationLocations?.includes("All your markets")) ||
      (formData.divorce && formData.divorceLocations?.includes("All your markets")) ||
      (formData.bankruptcy && formData.bankruptcyLocations?.includes("All your markets"))
    );
  }, [formData]);

  // Function to check if a location is selected for premium filters
  const isLocationSelected = (detail: OrderDetail) => {
    // If "All your markets" is selected for any premium filter,
    // mark all counties and zip codes as premium
    if (isAllMarketsSelected && (detail.type === "county" || detail.type === "zipCode")) {
      return true;
    }
    
    // For specific location selection
    const locationName = detail.type === "county" 
      ? `${detail.value}, ${detail.parentState || detail.state}`
      : detail.type === "zipCode" 
        ? `${detail.zipCode} ${detail.city}, ${detail.state}`
        : detail.value;
        
    return (
      (formData.codeViolation && formData.codeViolationLocations?.includes(locationName)) ||
      (formData.divorce && formData.divorceLocations?.includes(locationName)) ||
      (formData.bankruptcy && formData.bankruptcyLocations?.includes(locationName))
    );
  };

  // Group locations by their types
  const groupedLocations = useMemo(() => {
    const states: Record<string, OrderDetail[]> = {};
    const counties: Record<string, OrderDetail[]> = {};
    const zipcodes: Record<string, OrderDetail[]> = {};
    
    // Create a Set to track unique identifiers for each detail
    const processedDetails = new Set<string>();
    
    orderDetails.forEach(detail => {
      // Create a unique identifier for each detail
      const detailId = `${detail.type}-${detail.value}-${detail.zipCode || ''}-${detail.city || ''}-${detail.state || ''}`;
      
      // Skip if this detail has already been processed
      if (processedDetails.has(detailId)) {
        return;
      }
      
      // Mark detail as processed
      processedDetails.add(detailId);
      
      if (detail.type === "state") {
        if (!states[detail.value]) {
          states[detail.value] = [];
        }
        states[detail.value].push(detail);
      } 
      else if (detail.type === "county") {
        const county = detail.value;
        if (!counties[county]) {
          counties[county] = [];
        }
        counties[county].push(detail);
      }
      else if (detail.type === "zipCode") {
        const zipCode = detail.zipCode || "Unknown";
        if (!zipcodes[zipCode]) {
          zipcodes[zipCode] = [];
        }
        zipcodes[zipCode].push(detail);
      }
    });
    
    return { states, counties, zipcodes };
  }, [orderDetails]);

  // Extract unique stats
  const stats = useMemo(() => {
    // Count unique states by value
    const stateCount = Object.keys(groupedLocations.states).length;
    
    // Count unique counties
    const countyCount = Object.keys(groupedLocations.counties).length;
    
    // Count unique zipcodes
    const zipcodeCount = Object.keys(groupedLocations.zipcodes).filter(zip => zip !== "Unknown").length;
    
    // Total locations - using the deduplicated lists
    const totalLocations = 
      Object.values(groupedLocations.states).flat().length + 
      Object.values(groupedLocations.counties).flat().length + 
      Object.values(groupedLocations.zipcodes).flat().length;
    
    return { stateCount, countyCount, zipcodeCount, totalLocations };
  }, [groupedLocations]);

  if (orderDetails.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <MapPin className="h-6 w-6 mx-auto mb-2 opacity-50" />
        <p>No locations selected yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Location stats at the top */}
      <div className="bg-blue-50 p-3 rounded-md mb-4 grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-xs text-blue-600">States</p>
          <p className="font-semibold text-lg">{stats.stateCount}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600">Counties</p>
          <p className="font-semibold text-lg">{stats.countyCount}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600">Zipcodes</p>
          <p className="font-semibold text-lg">{stats.zipcodeCount}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600">Total</p>
          <p className="font-semibold text-lg">{stats.totalLocations}</p>
        </div>
      </div>

      {/* View type tabs */}
      <Tabs value={viewType} onValueChange={(v) => setViewType(v as any)} className="mb-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="states">States</TabsTrigger>
          <TabsTrigger value="counties">Counties</TabsTrigger>
          <TabsTrigger value="zipcodes">Zipcodes</TabsTrigger>
        </TabsList>

        {/* States view - Showing flat list of states with their details */}
        <TabsContent value="states" className="mt-2">
          {Object.keys(groupedLocations.states).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(groupedLocations.states).map(([state, details]) => {
                // Check if state has premium status
                const hasAnyDetailWithPremium = details.some(isLocationSelected);
                
                return (
                  <div key={state} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{state}</span>
                        <Badge variant="outline" className="ml-1">{details.length}</Badge>
                        {hasAnyDetailWithPremium && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Star className="h-3 w-3 mr-1 text-amber-500" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <button 
                        onClick={() => details.forEach(detail => onRemoveDetail(detail))}
                        className="text-gray-400 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>No states selected</p>
            </div>
          )}
        </TabsContent>

        {/* Counties view - Flat list */}
        <TabsContent value="counties" className="mt-2">
          {Object.keys(groupedLocations.counties).length > 0 ? (
            <div className="space-y-2">
              {Object.values(groupedLocations.counties).flat().map((detail, idx) => {
                // Use the updated isLocationSelected function to check premium status
                const isPremium = isLocationSelected(detail);
                
                return (
                  <div 
                    key={`county-${detail.value}-${detail.state}-${idx}`} 
                    className={`flex items-center justify-between p-3 rounded-md ${
                      isPremium ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">
                        {detail.value}, {detail.parentState || detail.state}
                      </span>
                      {isPremium && (
                        <Badge className="bg-amber-200 text-amber-800 border-0">
                          <Star className="h-3 w-3 mr-1 text-amber-600" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <button 
                      onClick={() => onRemoveDetail(detail)} 
                      className="text-gray-400 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>No counties selected</p>
            </div>
          )}
        </TabsContent>

        {/* Zipcodes view - Flat list */}
        <TabsContent value="zipcodes" className="mt-2">
          {Object.keys(groupedLocations.zipcodes).length > 0 ? (
            <div className="space-y-2">
              {Object.values(groupedLocations.zipcodes).flat().map((detail) => {
                // Use the updated isLocationSelected function to check premium status
                const isPremium = isLocationSelected(detail);
                const key = `zipcode-${detail.zipCode}-${detail.city}-${detail.state}`;
                
                return (
                  <div 
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-md ${
                      isPremium ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">
                        {detail.zipCode} {detail.city}, {detail.state}
                      </span>
                      {isPremium && (
                        <Badge className="bg-amber-200 text-amber-800 border-0">
                          <Star className="h-3 w-3 mr-1 text-amber-600" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <button 
                      onClick={() => onRemoveDetail(detail)} 
                      className="text-gray-400 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>No zipcodes selected</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}