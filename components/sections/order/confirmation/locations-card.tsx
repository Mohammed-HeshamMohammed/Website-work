// components/sections/order/confirmation/locations-card.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Loader2 } from "lucide-react";
import { OrderDetail } from "@/components/sections/order/types";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationsCardProps {
  orderDetails?: OrderDetail[];
  codeViolationLocations?: string[];
  divorceLocations?: string[];
  loading?: boolean;
}

export function LocationsCard({ 
  orderDetails,
  codeViolationLocations,
  divorceLocations,
  loading = false
}: LocationsCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <MapPin className="h-5 w-5 text-blue-500" />
        )}
        Selected Locations
      </h2>
      
      {loading && (
        <>
          <Skeleton className="h-20 w-full mb-4" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </>
      )}
      
      {!loading && (!orderDetails || orderDetails.length === 0) && (
        <p className="text-gray-500 text-sm py-2">
          No locations have been selected yet.
        </p>
      )}
      
      {!loading && orderDetails && orderDetails.length > 0 && (
        <>
          <LocationsStatsSummary orderDetails={orderDetails} />
          
          <div className="space-y-2">
            {orderDetails.map((detail, idx) => {
              let displayText = "";
              let iconColor = "text-blue-500";
              
              if (detail.type === "state") {
                displayText = detail.value;
                iconColor = "text-blue-500";
              } else if (detail.type === "county") {
                displayText = `${detail.value}, ${detail.parentState || detail.state}`;
                iconColor = "text-purple-500";
              } else {
                displayText = `${detail.zipCode} - ${detail.city}, ${detail.state}`;
                iconColor = "text-green-500";
              }
              
              const isPremiumLocation = 
                codeViolationLocations?.includes(displayText) || 
                divorceLocations?.includes(displayText);
              
              return (
                <div key={idx} className="flex items-center p-2 bg-gray-50 rounded-md">
                  <MapPin className={`h-4 w-4 mr-2 ${iconColor}`} />
                  <span>{displayText}</span>
                  {isPremiumLocation && (
                    <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900">
                      <Star className="h-3 w-3 mr-1 fill-amber-900" />
                      Premium
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}

function LocationsStatsSummary({ orderDetails }: { orderDetails: OrderDetail[] }) {
  const stateCount = orderDetails.filter(d => d.type === "state").length;
  const countyCount = orderDetails.filter(d => d.type === "county").length;
  const zipCount = orderDetails.filter(d => d.type === "zipCode").length;
  
  return (
    <div className="bg-blue-50 p-3 rounded-md mb-4 grid grid-cols-4 gap-2 text-center">
      <div>
        <p className="text-xs text-blue-600">States</p>
        <p className="font-semibold text-lg">{stateCount}</p>
      </div>
      <div>
        <p className="text-xs text-blue-600">Counties</p>
        <p className="font-semibold text-lg">{countyCount}</p>
      </div>
      <div>
        <p className="text-xs text-blue-600">Zipcodes</p>
        <p className="font-semibold text-lg">{zipCount}</p>
      </div>
      <div>
        <p className="text-xs text-blue-600">Total</p>
        <p className="font-semibold text-lg">{orderDetails.length}</p>
      </div>
    </div>
  );
}