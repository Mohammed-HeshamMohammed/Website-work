"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  MapPin,
  Star,
  CrownIcon
} from "lucide-react"
import { OrderDetail, FormData, FileInfo } from "./types"
import { useState } from "react"
import { FileUploadSummary } from "./Summary/file-upload-summary"
import { LeadPropertyTypes } from "./Summary/lead-property-types"
import { BasicCriteria } from "./Summary/basic-criteria"
import { AdditionalFilters } from "./Summary/additional-filters"
import { PricingSummary } from "./Summary/pricing-summary"
import { Badge } from "@/components/ui/badge"
import { LocationSummary } from "./Summary/location-summary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrderSummaryProps {
  formData: FormData;
  orderDetails: OrderDetail[];
  onRemoveDetail: (detail: OrderDetail) => void;
  pricePerRecord: number;
  recordCount: number;
  files: FileInfo[];
  onProcessOrder: () => void;
  onRemoveLeadType: (type: string) => void;
  onRemovePropertyType: (type: string) => void;
  onRemoveState: (state: string) => void;
  onRemoveCounty: (county: string, state: string) => void;
}

export function OrderSummary({
  formData,
  orderDetails,
  onRemoveDetail,
  pricePerRecord,
  recordCount,
  files = [],
  onProcessOrder,
  onRemoveLeadType,
  onRemovePropertyType,
  onRemoveState,
  onRemoveCounty
}: OrderSummaryProps) {
  const quantity = recordCount;
  const totalPrice = quantity * pricePerRecord;
  const showLocations = pricePerRecord === 0.03;
  const isFileUpload = pricePerRecord === 0.02;
  const [activeTab, setActiveTab] = useState<string>("summary");
  
  const hasAdvancedFilters = () => {
    return !!(
      formData.bedroomsMin || formData.bedroomsMax || 
      formData.bathroomsMin || formData.bathroomsMax ||
      formData.squareFootageMin || formData.squareFootageMax ||
      formData.yearBuiltMin || formData.yearBuiltMax ||
      formData.lotSizeMin || formData.lotSizeMax ||
      formData.excludeRecentlySold || formData.excludeRecentlyListed || 
      formData.excludeBankOwned || formData.onlyNonOwnerOccupied ||
      formData.codeViolation || formData.divorce || formData.bankruptcy
    );
  };

  const hasFinancialFilters = () => {
    return !!(
      formData.mortgageAgeMin || formData.mortgageAgeMax ||
      formData.ltvRatioMin || formData.ltvRatioMax ||
      formData.taxDelinquencyStatus ||
      formData.assessedValueMin || formData.assessedValueMax ||
      formData.freeAndClearStatus || formData.foreclosureStatus ||
      formData.hasMortgage || formData.hasSecondMortgage || formData.hasLien
    );
  };

  const hasPremiumFilters = () => {
    return !!(formData.codeViolation || formData.divorce || formData.bankruptcy);
  };

  const isButtonDisabled = () => {
    return !formData.name || 
      !formData.email || 
      !formData.phone || 
      (showLocations && orderDetails.length === 0) ||
      (isFileUpload && files.length === 0) ||
      (!quantity || quantity <= 0) ||
      formData.selectedLeadTypes.length === 0 ||
      formData.selectedPropertyTypes.length === 0;
  };

  return (
    <motion.div className="lg:col-span-1">
      <Card className="p-6 sticky top-6 border-t-4 border-t-blue-500 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            ${pricePerRecord.toFixed(2)}/record
          </div>
        </div>

        {showLocations && (
          <Tabs defaultValue="summary" className="w-full mb-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Locations
                {orderDetails.length > 0 && (
                  <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1.5 rounded-full">
                    {orderDetails.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="locations" className="mt-0">
              <LocationSummary 
                orderDetails={orderDetails}
                onRemoveDetail={onRemoveDetail}
                formData={formData}
              />
            </TabsContent>
            
            <TabsContent value="summary" className="mt-0 space-y-6">
              {/* Show file information for file uploads */}
              {isFileUpload && files.length > 0 && (
                <FileUploadSummary files={files} recordCount={recordCount} />
              )}

              {/* Lead & Property Types */}
              <LeadPropertyTypes 
                formData={formData} 
                onRemoveLeadType={onRemoveLeadType}
                onRemovePropertyType={onRemovePropertyType}
              />

              {/* Basic Criteria Summary */}
              <BasicCriteria formData={formData} />
              
              {/* Additional Filters */}
              {(hasAdvancedFilters() || hasFinancialFilters()) && (
                <AdditionalFilters 
                  formData={formData} 
                  hasAdvancedFilters={hasAdvancedFilters()} 
                  hasFinancialFilters={hasFinancialFilters()} 
                />
              )}

              {/* Premium Filters Summary */}
              {hasPremiumFilters() && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <h3 className="text-sm font-medium text-gray-700">Premium Filters</h3>
                  </div>
                  <div className="space-y-2 bg-amber-50 p-3 rounded-md border border-amber-200">
                    {formData.codeViolation && (
                      <div>
                        <div className="flex items-center gap-2">
                          <CrownIcon className="h-3 w-3 mr-1 text-amber-900" />
                          <span className="font-medium">Code Violation</span>
                        </div>
                        {formData.codeViolationRecords && (
                          <p className="text-sm ml-6 mt-1">Records: {formData.codeViolationRecords}</p>
                        )}
                        {formData.codeViolationLocations && formData.codeViolationLocations.length > 0 && (
                          <div className="ml-6 mt-1">
                            <span className="text-sm">Locations: </span>
                            <span className="text-sm text-gray-600">{formData.codeViolationLocations.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {formData.divorce && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <CrownIcon className="h-3 w-3 mr-1 text-amber-900" />
                          <span className="font-medium">Divorce</span>
                        </div>
                        {formData.divorceRecords && (
                          <p className="text-sm ml-6 mt-1">Records: {formData.divorceRecords}</p>
                        )}
                        {formData.divorceLocations && formData.divorceLocations.length > 0 && (
                          <div className="ml-6 mt-1">
                            <span className="text-sm">Locations: </span>
                            <span className="text-sm text-gray-600">{formData.divorceLocations.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {formData.bankruptcy && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900">
                            <Star className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                          <span className="font-medium">Bankruptcy</span>
                        </div>
                        {formData.bankruptcyLocations && (
                          <div className="ml-6 mt-1">
                            <span className="text-sm">Locations: </span>
                            <span className="text-sm text-gray-600">{formData.bankruptcyLocations}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Separator className="mt-4" />
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
        
        {!showLocations && (
          <div className="space-y-6">
            {/* Show file information for file uploads */}
            {isFileUpload && files.length > 0 && (
              <FileUploadSummary files={files} recordCount={recordCount} />
            )}

            {/* Lead & Property Types */}
            <LeadPropertyTypes 
              formData={formData}
              onRemoveLeadType={onRemoveLeadType}
              onRemovePropertyType={onRemovePropertyType}
            />

            {/* Basic Criteria Summary */}
            <BasicCriteria formData={formData} />
            
            {/* Additional Filters */}
            {(hasAdvancedFilters() || hasFinancialFilters()) && (
              <AdditionalFilters 
                formData={formData} 
                hasAdvancedFilters={hasAdvancedFilters()} 
                hasFinancialFilters={hasFinancialFilters()} 
              />
            )}

            {/* Premium Filters Summary */}
            {hasPremiumFilters() && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <h3 className="text-sm font-medium text-gray-700">Premium Filters</h3>
                </div>
                <div className="space-y-2 bg-amber-50 p-3 rounded-md border border-amber-200">
                  {formData.codeViolation && (
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                        <span className="font-medium">Code Violation</span>
                      </div>
                      {formData.codeViolationRecords && (
                        <p className="text-sm ml-6 mt-1">Records: {formData.codeViolationRecords}</p>
                      )}
                      {formData.codeViolationLocations && formData.codeViolationLocations.length > 0 && (
                        <div className="ml-6 mt-1">
                          <span className="text-sm">Locations: </span>
                          <span className="text-sm text-gray-600">{formData.codeViolationLocations.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {formData.divorce && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                        <span className="font-medium">Divorce</span>
                      </div>
                      {formData.divorceRecords && (
                        <p className="text-sm ml-6 mt-1">Records: {formData.divorceRecords}</p>
                      )}
                      {formData.divorceLocations && formData.divorceLocations.length > 0 && (
                        <div className="ml-6 mt-1">
                          <span className="text-sm">Locations: </span>
                          <span className="text-sm text-gray-600">{formData.divorceLocations.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.bankruptcy && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                        <span className="font-medium">Bankruptcy</span>
                      </div>
                      {formData.bankruptcyLocations && (
                        <div className="ml-6 mt-1">
                          <span className="text-sm">Locations: </span>
                          <span className="text-sm text-gray-600">{formData.bankruptcyLocations}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Separator className="mt-4" />
              </div>
            )}
          </div>
        )}

        {/* Pricing Section - Always shown */}
        <div className="pt-4">
          <PricingSummary quantity={quantity} pricePerRecord={pricePerRecord} totalPrice={totalPrice} />

          {/* Order Button */}
          <div className="pt-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-6"
              onClick={onProcessOrder}
              disabled={isButtonDisabled()}
            >
              Process Order
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-2">
              You'll review your order details before final confirmation
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default OrderSummary;