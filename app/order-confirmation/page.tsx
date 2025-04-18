// order-confirmation-page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { OrderDetail, FileInfo, FormData } from "@/components/sections/order/types"
import { OrderDetailsCard } from "@/components/sections/order/confirmation/order-details-card"
import { LocationsCard } from "@/components/sections/order/confirmation/locations-card"
import { FileUploadCard } from "@/components/sections/order/confirmation/file-upload-card"
import { ContactInfoCard } from "@/components/sections/order/confirmation/contact-info-card"
import { OrderSummaryCard } from "@/components/sections/order/confirmation/order-summary-card"
import { PageLoader } from "@/components/ui/page-loader"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function OrderConfirmation({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [formData, setFormData] = useState<FormData | undefined>(undefined);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[] | undefined>(undefined);
  const [files, setFiles] = useState<FileInfo[] | undefined>(undefined);
  const [pricePerRecord, setPricePerRecord] = useState<number | undefined>(undefined);
  const [recordCount, setRecordCount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrderData();
  }, [params.id]);

  const fetchOrderData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch order data from the backend API
      const response = await fetch(`/api/orders/${params.id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch order data: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Set state with data from the backend
      setFormData(data.formData);
      setOrderDetails(data.orderDetails);
      setFiles(data.files);
      setRecordCount(data.recordCount);
      setPricePerRecord(data.pricePerRecord);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError(error instanceof Error ? error.message : "Failed to load order data");
    } finally {
      setIsLoading(false);
    }
  };

  const hasAdvancedFilters = () => {
    if (!formData) return false;
    
    return !!(
      formData.bedroomsMin || formData.bedroomsMax || 
      formData.bathroomsMin || formData.bathroomsMax ||
      formData.squareFootageMin || formData.squareFootageMax ||
      formData.yearBuiltMin || formData.yearBuiltMax ||
      formData.lotSizeMin || formData.lotSizeMax ||
      formData.excludeRecentlySold || formData.excludeRecentlyListed || 
      formData.excludeBankOwned || formData.onlyNonOwnerOccupied ||
      formData.codeViolation || formData.divorce || formData.bankruptcy ||
      formData.hasPool || formData.waterfront
    );
  };

  const hasFinancialFilters = () => {
    if (!formData) return false;
    
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
    if (!formData) return false;
    
    return !!(formData.codeViolation || formData.divorce || formData.bankruptcy);
  };

  const handleConfirmOrder = async () => {
    if (!formData || !recordCount || !pricePerRecord) return;
    
    setProcessingOrder(true);
    
    try {
      // Submit order confirmation to backend
      const response = await fetch('/api/orders/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: params.id,
          formData,
          orderDetails,
          files,
          recordCount,
          pricePerRecord,
          totalPrice: recordCount * pricePerRecord
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to confirm order: ${response.statusText}`);
      }
      
      // After successful confirmation, redirect to completion page
      router.push("/order/complete");
    } catch (error) {
      console.error("Error confirming order:", error);
      setError(error instanceof Error ? error.message : "Failed to confirm order");
      setProcessingOrder(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // Calculate total price
  const totalPrice = recordCount !== undefined && pricePerRecord !== undefined 
    ? recordCount * pricePerRecord 
    : undefined;
  
  if (isLoading) {
    return <PageLoader message="Loading order details..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center">
          <button 
            onClick={() => fetchOrderData()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Confirmation</h1>
        <p className="text-gray-600">Please review your order details below before finalizing your purchase.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Information */}
          <ContactInfoCard formData={formData} loading={isLoading} />
          
          {/* Locations Summary */}
          {pricePerRecord === 0.03 && orderDetails && orderDetails.length > 0 && (
            <LocationsCard 
              orderDetails={orderDetails} 
              codeViolationLocations={formData?.codeViolationLocations}
              divorceLocations={formData?.divorceLocations}
              loading={isLoading} 
            />
          )}
          
          {/* File Upload Summary (if applicable) */}
          {pricePerRecord === 0.02 && files && files.length > 0 && (
            <FileUploadCard 
              files={files} 
              recordCount={recordCount} 
              loading={isLoading} 
            />
          )}
          
          {/* Order Details */}
          <OrderDetailsCard 
            formData={formData}
            hasAdvancedFilters={hasAdvancedFilters()}
            hasFinancialFilters={hasFinancialFilters()}
            hasPremiumFilters={hasPremiumFilters()}
            loading={isLoading}
          />
        </div>
        
        {/* Order Summary - 1/3 width */}
        <div>
          <OrderSummaryCard
            pricePerRecord={pricePerRecord}
            recordCount={recordCount}
            totalPrice={totalPrice}
            loading={isLoading}
            processingOrder={processingOrder}
            onGoBack={handleGoBack}
            onConfirmOrder={handleConfirmOrder}
          />
        </div>
      </div>
    </div>
  );
}