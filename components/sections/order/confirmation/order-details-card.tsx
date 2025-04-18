// components/sections/order/confirmation/order-details-card.tsx
import { Card } from "@/components/ui/card";
import { Clipboard, Star, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FormData } from "@/components/sections/order/types";
import { LeadPropertyTypes } from "@/components/sections/order/Summary/lead-property-types";
import { BasicCriteria } from "@/components/sections/order/Summary/basic-criteria";
import { AdditionalFilters } from "@/components/sections/order/Summary/additional-filters";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderDetailsCardProps {
  formData?: FormData;
  hasAdvancedFilters?: boolean;
  hasFinancialFilters?: boolean;
  hasPremiumFilters?: boolean;
  loading?: boolean;
}

export function OrderDetailsCard({ 
  formData,
  hasAdvancedFilters = false,
  hasFinancialFilters = false,
  hasPremiumFilters = false,
  loading = false
}: OrderDetailsCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <Clipboard className="h-5 w-5 text-green-500" />
        )}
        Order Details
      </h2>
      
      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}
      
      {!loading && !formData && (
        <p className="text-gray-500 text-sm py-2">
          Order details will be displayed once provided.
        </p>
      )}
      
      {!loading && formData && (
        <div className="space-y-6">
          {/* Lead & Property Types */}
          <LeadPropertyTypes formData={formData} />
          
          {/* Basic Criteria */}
          <BasicCriteria formData={formData} />
          
          {/* Additional Filters */}
          {(hasAdvancedFilters || hasFinancialFilters) && (
            <AdditionalFilters 
              formData={formData} 
              hasAdvancedFilters={hasAdvancedFilters} 
              hasFinancialFilters={hasFinancialFilters} 
            />
          )}
          
          {/* Premium Filters Summary */}
          {hasPremiumFilters && <PremiumFilters formData={formData} />}
        </div>
      )}
    </Card>
  );
}

function PremiumFilters({ formData }: { formData: FormData }) {
  return (
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
                <Star className="h-3 w-3 mr-1 fill-amber-900" />
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
                <Star className="h-3 w-3 mr-1 fill-amber-900" />
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
                <Star className="h-3 w-3 mr-1 fill-amber-900" />
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
    </div>
  );
}