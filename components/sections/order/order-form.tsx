// order-form.tsx
"use client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { OrderDetail, FormData, FileInfo } from "./types"
import { pageTransition } from "@/utils/animations"
import BasicInformationSection from "./basic-information-section"
import LocationSelectionSection from "./location-selection-section"
import OrderSummary from "@/components/sections/order/order-summary"
import { PropertyCriteriaSection } from "./property-criteria-section"
import { AdditionalDetailsSection } from "./additional-details-section"
import { FileUploadSection } from "./file-upload-section"
import { PageLoader } from "@/components/ui/page-loader"

export function OrderForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pricePerRecord = Number(searchParams.get("pricePerRecord")) || 0.03
  const isManualEntry = pricePerRecord === 0.03
  const isFileUpload = pricePerRecord === 0.02
  
  const [selectedLocations, setSelectedLocations] = useState<{
    states: string[]
    counties: Array<{
      name: string; state: string; county: string; 
    }>
  }>({ states: [], counties: [] })
  
  const [formData, setFormData] = useState<FormData>({
    // Basic information
    name: "",
    email: "",
    phone: "",
    quantity: 100, // Default value
    
    // Location information
    states: "",
    counties: "",
    citiesZip: "",
    selectedStates: [],
    selectedCounties: [] as { state: string; name: string; county: string }[],
    
    // Lead and property types
    selectedLeadTypes: [],
    selectedPropertyTypes: [],
    otherLeadType: "",
    otherPropertyType: "",
    customLeadTypes: [],
    customPropertyTypes: [],
    propertyType: "",
    propertyTypeOther: "",
    propertyTypeOptions: [],
    
    // Property criteria
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
    
    // Special conditions
    onlyNonOwnerOccupied: false,
    hasPool: false,
    waterfront: false,
    excludeRecentlySold: false,
    excludeRecentlyListed: false,
    excludeBankOwned: false,
    
    // Mortgage and financial info
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
    
    // Records
    codeViolationRecords: 0,
    codeViolationLocations: [],
    codeViolation: false,
    divorceRecords: "",
    divorceLocations: [],
    divorce: false,
    bankruptcyRecords: false,
    bankruptcyLocations: "",
    bankruptcy: false,
    
    // Additional details
    additionalDetails: "",
    company: "" // Added missing 'company' property
  })

  const [files, setFiles] = useState<FileInfo[]>([])
  const [totalRecordCount, setTotalRecordCount] = useState(0)
  const [zipCodes, setZipCodes] = useState<string[]>([])
  const [zipError, setZipError] = useState("")
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Updated input change handler to handle all types
  const handleInputChange = (field: string, value: string | string[] | boolean | File) => {
    // If dealing with numeric fields that shouldn't be negative
    if (typeof value === 'string' && ['quantity', 'bedroomsMin', 'bedroomsMax', 'bathroomsMin', 'bathroomsMax', 
          'squareFootageMin', 'squareFootageMax', 'lotSizeMin', 'lotSizeMax', 'yearBuiltMin', 'yearBuiltMax',
          'mortgageAgeMin', 'mortgageAgeMax', 'ltvRatioMin', 'ltvRatioMax', 'assessedValueMin', 'assessedValueMax']
          .includes(field)) {
            
      // Different min values for different fields
      let minValue = 0;
      if (field === 'quantity') minValue = 100;
      if (field === 'yearBuiltMin' || field === 'yearBuiltMax') minValue = 1800;
      
      // Different max values for percentage fields
      let maxValue = Infinity;
      if (field === 'ltvRatioMin' || field === 'ltvRatioMax') maxValue = 100;
      
      // If the value is not empty, ensure it's not less than the min value
      if (value !== '') {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          value = String(Math.max(minValue, Math.min(maxValue, numValue)));
        }
      }
    }
    
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFilesUploadChange = (uploadedFiles: FileInfo[]) => {
    setFiles(uploadedFiles)
    const totalCount = uploadedFiles.reduce((acc, file) => acc + file.recordCount, 0)
    setTotalRecordCount(totalCount)
    setFormData((prev) => ({ ...prev, quantity: totalCount }))
  }

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push("Please enter your name");
    if (!formData.email.trim()) errors.push("Please enter your email address");
    if (!formData.phone.trim()) errors.push("Please enter your phone number");
    
    if (isManualEntry) {
      if (orderDetails.length === 0) errors.push("Please add at least one location");
      
      const quantity = Number(formData.quantity);
      if (!quantity || quantity < 100) errors.push("Please enter a valid quantity (minimum 100)");
      
      if (formData.selectedLeadTypes.length === 0) errors.push("Please select at least one lead type");
      if (formData.selectedPropertyTypes.length === 0) errors.push("Please select at least one property type");
    } else {
      if (files.length === 0) errors.push("Please upload at least one file");
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  }

  const handleProcessOrder = async () => {
    if (!validateForm()) {
      // Scroll to the top to make sure errors are visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Create payload for API
      const orderData = {
        formData,
        orderDetails,
        files,
        recordCount: isManualEntry ? Number(formData.quantity) : totalRecordCount,
        pricePerRecord
      };
      
      // Submit to backend API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit order: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Redirect to confirmation page with the order ID
      router.push(`/order/confirmation/${result.orderId}`);
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to submit order");
      setIsSubmitting(false);
      // Scroll to the top to make sure error is visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Handlers for location management
  const handleLocationManagement = {
    // Location handlers
    handleLocationAdd: () => {
      const { states: selectedStates, counties: selectedCounties } = selectedLocations
      setOrderDetails((prev) => {
        const existingStates = prev.filter((detail) => detail.type === "state")
        const existingCounties = prev.filter((detail) => detail.type === "county")
        const otherDetails = prev.filter((detail) => detail.type === "zipCode")
        const newStates = selectedStates
          .filter((state) => !existingStates.some((existing) => existing.value === state))
          .map((state) => ({ type: "state" as const, value: state, city: "", state, zipCode: "" }))
        const newCounties = selectedCounties
          .filter(
            (county) =>
              !existingCounties.some(
                (existing) =>
                  existing.value === county.name && existing.parentState === county.state
              )
          )
          .map((county) => ({
            type: "county" as const,
            value: county.name,
            parentState: county.state,
            city: "",
            state: county.state,
            zipCode: "",
          }))

        return [...existingStates, ...newStates, ...existingCounties, ...newCounties, ...otherDetails]
      })

      setSelectedLocations({ states: [], counties: [] })
    },

    handleStateChange: (selected: string[]) => {
      setSelectedLocations((prev) => ({ ...prev, states: selected }))
    },

    handleCountyChange: (selected: string[]) => {
      const countyData = selected.map((value) => {
        const [state, name] = value.split(":")
        return { state, county: name, name }
      })
      setSelectedLocations((prev) => ({ ...prev, counties: countyData }))
    },

    handleRemoveDetail: (detail: OrderDetail) => {
      if (detail.type === "state") {
        setOrderDetails((prev) =>
          prev.filter(
            (d) =>
              !(d.type === "state" && d.value === detail.value) &&
              !(d.type === "county" && d.parentState === detail.value)
          )
        )
      } else if (detail.type === "zipCode") {
        setZipCodes((prev) => prev.filter((zip) => zip !== detail.value))
        setOrderDetails((prev) => prev.filter((d) => !(d.type === "zipCode" && d.value === detail.value)))
      } else {
        setOrderDetails((prev) =>
          prev.filter(
            (d) =>
              !(
                d.type === "county" &&
                d.value === detail.value &&
                d.parentState === detail.parentState
              )
          )
        )
      }
    },

    handleZipCodeSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const input = e.currentTarget.elements.namedItem("zipCode") as HTMLInputElement
      const zipCode = input.value.trim()
      const stateForZip = (e.currentTarget.elements.namedItem("zipState") as HTMLSelectElement)?.value

      if (!stateForZip) {
        setZipError("Please select a state for the zip code")
        return
      }

      if (!validateZipCode(zipCode, stateForZip)) {
        setZipError(`Invalid zip code for ${stateForZip}`)
        return
      }
    
      setOrderDetails((prev) => [
        ...prev,
        { type: "zipCode", value: zipCode, parentState: stateForZip, city: "", state: stateForZip, zipCode },
      ])

      if (zipCode && !zipCodes.includes(zipCode)) {
        setOrderDetails((prev) => [
          ...prev,
          { type: "zipCode", value: zipCode, parentState: stateForZip, city: "", state: stateForZip, zipCode }
        ])
        setZipCodes((prev) => [...prev, zipCode])
        input.value = ""
        setZipError("")
      }
    },
  }

  // Utility functions
  const validateZipCode = (zipCode: string, state: string): boolean => {
    // Simple validation - ensure it's 5 digits
    return /^\d{5}$/.test(zipCode);
  }

  // Handlers for lead & property types
  const handleTypeManagement = {
    handleRemoveLeadType: (type: string) => {
      setFormData(prev => ({
        ...prev,
        selectedLeadTypes: prev.selectedLeadTypes.filter(t => t !== type)
      }));
    },

    handleRemovePropertyType: (type: string) => {
      setFormData(prev => ({
        ...prev,
        selectedPropertyTypes: prev.selectedPropertyTypes.filter(t => t !== type)
      }));
    },
  }

  // Show loading state during submission
  if (isSubmitting) {
    return <PageLoader message="Processing your order..." />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Your Custom Order</h1>
          <div className="text-sm text-gray-500">
            {isManualEntry ? "Manual Entry ($0.03/record)" : "File Upload ($0.02/record)"}
          </div>
        </div>
        
        {formErrors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc pl-5">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {submitError}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div className="lg:col-span-2 space-y-6" variants={pageTransition}>
            {/* Basic Information */}
            <BasicInformationSection 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />

            {/* Location Selection - Only for Manual Entry */}
            {isManualEntry && (
              <LocationSelectionSection
                selectedLocations={selectedLocations}
                zipError={zipError}
                handleLocationManagement={handleLocationManagement}
              />
            )}

            {/* Property Criteria Section - Only for Manual Entry */}
            {isManualEntry && (
              <PropertyCriteriaSection
                formData={formData}
                handleInputChange={handleInputChange}
                onRemoveLeadType={handleTypeManagement.handleRemoveLeadType}
                onRemovePropertyType={handleTypeManagement.handleRemovePropertyType}
              />
            )}

            {/* Input Section - Conditional based on pricePerRecord */}
            {isManualEntry ? (
              <AdditionalDetailsSection 
                formData={formData}
                handleInputChange={handleInputChange}
              />
            ) : (
              <FileUploadSection
                handleFilesUploadChange={handleFilesUploadChange}
                formData={formData}
                handleInputChange={handleInputChange}
                onTotalRecordCountChange={(count) => setTotalRecordCount(count)}
              />
            )}
          </motion.div>

          {/* Order Summary */}
          <OrderSummary
            formData={formData}
            orderDetails={orderDetails}
            onRemoveDetail={handleLocationManagement.handleRemoveDetail}
            pricePerRecord={pricePerRecord}
            recordCount={isManualEntry ? Number(formData.quantity) : totalRecordCount}
            files={files}
            onProcessOrder={handleProcessOrder}
            onRemoveLeadType={handleTypeManagement.handleRemoveLeadType}
            onRemovePropertyType={handleTypeManagement.handleRemovePropertyType}
            onRemoveState={function (state: string): void {
              // Find and remove the state from orderDetails
              const stateDetail = orderDetails.find(d => d.type === "state" && d.value === state);
              if (stateDetail) handleLocationManagement.handleRemoveDetail(stateDetail);
            }}
            onRemoveCounty={function (county: string, state: string): void {
              // Find and remove the county from orderDetails
              const countyDetail = orderDetails.find(
                d => d.type === "county" && d.value === county && d.parentState === state
              );
              if (countyDetail) handleLocationManagement.handleRemoveDetail(countyDetail);
            }}          
          />
        </div>
      </div>
    </motion.div>
  )
}