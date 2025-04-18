// components/sections/order/property-criteria-section.tsx
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, DollarSign, BuildingIcon } from "lucide-react"
import { FormData } from "./types"
import { BasicCriteriaTab } from "./tabs/basic-criteria-tab"
import { AdvancedFiltersTab } from "./tabs/advanced-filters-tab"
import { FinancialFiltersTab } from "./tabs/financial-filters-tab"

interface PropertyCriteriaSectionProps {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  onRemoveLeadType?: (type: string) => void;
  onRemovePropertyType?: (type: string) => void;
}

export function PropertyCriteriaSection({ 
  formData, 
  handleInputChange,
  onRemoveLeadType,
  onRemovePropertyType
}: PropertyCriteriaSectionProps) {
  const [activeTab, setActiveTab] = useState("basic");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Track user behavior
    try {
      fetch('/api/analytics/tab-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'property-criteria',
          tabChanged: value,
          timestamp: new Date().toISOString()
        }),
      }).catch(() => {
        // Silent fail for analytics
      });
    } catch (error) {
      // Silent fail for analytics
      console.log("Analytics error:", error);
    }
  };
  
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
  
  return (
    <Card className="overflow-hidden border-t-4 border-t-yellow-600">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Property Criteria</h2>
        <p className="text-sm text-gray-500 mt-1">Define the types of properties you're looking for</p>
      </div>
      
      <div className="p-6">
        <Tabs 
          defaultValue="basic" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Basic Criteria
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <BuildingIcon className="h-4 w-4" />
              Advanced Filters
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial Filters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicCriteriaTab 
              formData={formData} 
              handleInputChange={handleInputChange}
              onRemoveLeadType={onRemoveLeadType}
              onRemovePropertyType={onRemovePropertyType}
            />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedFiltersTab 
              formData={formData}
              handleInputChange={handleInputChange} orderDetails={[]}            />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialFiltersTab 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}