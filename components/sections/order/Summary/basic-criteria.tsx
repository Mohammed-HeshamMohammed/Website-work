// basic-criteria.tsx
import { Home, DollarSign, Calendar, CheckCircle2, Percent } from "lucide-react"

interface BasicCriteriaProps {
  formData: {
    priceRestrictions: string;
    equityPercentage: string;
    propertyCondition: string;
    ownershipDuration: string;
    quantity: number;
  };
}

export function BasicCriteria({ formData }: BasicCriteriaProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <Home className="h-4 w-4" />
        <h3 className="text-sm font-medium">Basic Criteria</h3>
      </div>
      <div className="bg-gray-50 rounded-md p-3 space-y-2 text-sm">
        {formData.priceRestrictions && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Price Range:
            </span>
            <span>{formData.priceRestrictions}</span>
          </div>
        )}
        {formData.equityPercentage && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center">
              <Percent className="h-4 w-4 mr-1" />
              Equity:
            </span>
            <span>{formData.equityPercentage}</span>
          </div>
        )}
        {formData.propertyCondition && formData.propertyCondition !== "any" && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Condition:
            </span>
            <span className="capitalize">{formData.propertyCondition}</span>
          </div>
        )}
        {formData.ownershipDuration && formData.ownershipDuration !== "any" && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Ownership:
            </span>
            <span>{formData.ownershipDuration.replace(/_/g, ' ')}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Records:
          </span>
          <span>{formData.quantity}</span>
        </div>
      </div>
    </div>
  );
}