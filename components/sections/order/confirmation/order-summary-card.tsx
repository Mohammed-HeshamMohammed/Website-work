// components/sections/order/confirmation/order-summary-card.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, AlertTriangle, Loader2 } from "lucide-react";
import { PricingSummary } from "@/components/sections/order/Summary/pricing-summary";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderSummaryCardProps {
  pricePerRecord?: number;
  recordCount?: number;
  totalPrice?: number;
  loading?: boolean;
  processingOrder?: boolean;
  onGoBack: () => void;
  onConfirmOrder: () => void;
}

export function OrderSummaryCard({
  pricePerRecord,
  recordCount,
  totalPrice,
  loading = false,
  processingOrder = false,
  onGoBack,
  onConfirmOrder
}: OrderSummaryCardProps) {
  const isDataReady = !loading && pricePerRecord !== undefined && 
                      recordCount !== undefined && totalPrice !== undefined;
  
  return (
    <Card className="p-6 sticky top-6 border-t-4 border-t-blue-500 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        {loading ? (
          <Skeleton className="h-6 w-24" />
        ) : isDataReady ? (
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            ${pricePerRecord.toFixed(2)}/record
          </div>
        ) : (
          <div className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Awaiting data
          </div>
        )}
      </div>
      
      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}
      
      {!loading && !isDataReady && (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500 text-sm">
            Order details will be displayed once data is provided.
          </p>
        </div>
      )}
      
      {isDataReady && (
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Order Type:</span>
              <span className="font-medium">
                {pricePerRecord === 0.03 ? "Location Based" : "File Upload"}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Records:</span>
              <span className="font-medium">{recordCount.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Pricing */}
          <PricingSummary 
            quantity={recordCount} 
            pricePerRecord={pricePerRecord} 
            totalPrice={totalPrice} 
          />
        </div>
      )}
      
      {/* Payment and Terms */}
      <div className="mt-6 space-y-4">
        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 mb-1">Important Information</p>
              <p className="text-yellow-700">
                By confirming this order, you agree to our terms of service and understand that all sales are final.
              </p>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={onGoBack}
            disabled={processingOrder}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
            onClick={onConfirmOrder}
            disabled={processingOrder || loading || !isDataReady}
          >
            {processingOrder ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Processing...
              </>
            ) : (
              <>
                Confirm Order
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}