"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  AppleIcon,
  CreditCardIcon as GooglePay,
  ShoppingCartIcon as PaypalIcon,
} from "lucide-react"
import * as XLSX from "xlsx"
import { MultiSelect } from "./multi-select-dropdown"
import { OrderDetails } from "./order-details"
import { counties, states } from "@/utils/location-data"

const defaultLeadTypes = [
  "Absentee Owners",
  "High Equity",
  "Tired Landlord",
  "Pre-Probate",
  "Pre-foreclosure",
]
const defaultPropertyTypes = [
  "Single-Family Homes",
  "Condos",
  "Townhouses",
  "Multi-Family",
  "Mobile Homes",
  "Land",
  "Commercial",
]

interface OrderDetail {
  type: "state" | "county" | "zipCode"
  value: string
  parentState?: string
}

const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export function OrderForm() {
  // The pricePerRecord from the URL is only for display purposes.
  // The backend will calculate the final price securely.
  const searchParams = useSearchParams()
  const pricePerRecord = Number(searchParams.get("pricePerRecord")) || 0.03
  const allowFileUpload = pricePerRecord === 0.02

  const [selectedLocations, setSelectedLocations] = useState<{
    states: string[]
    counties: Array<{ state: string; name: string }>
  }>({ states: [], counties: [] })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 0, // Used when pricePerRecord is 0.03 (manual entry)
    states: "",
    counties: "",
    citiesZip: "",
    selectedLeadTypes: [] as string[],
    selectedPropertyTypes: [] as string[],
    otherLeadType: "",
    otherPropertyType: "",
    priceRestrictions: "",
    equityPercentage: "",
    propertyCondition: "",
    ownershipDuration: "",
    additionalDetails: "",
  })

  const [file, setFile] = useState<File | null>(null)
  const [recordCount, setRecordCount] = useState(0)
  const [zipCodes, setZipCodes] = useState<string[]>([])
  const [zipError, setZipError] = useState("")
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])

  // Calculate effective quantity and totalPrice for display.
  // For manual orders (pricePerRecord = 0.03), quantity comes from formData.quantity.
  // For file uploads (pricePerRecord = 0.02), quantity comes from recordCount.
  const quantity = pricePerRecord === 0.03 ? Number(formData.quantity) : recordCount
  const totalPrice = quantity * pricePerRecord

  // Transform data for dropdowns
  const countyOptions = counties.map((county) => ({
    label: `${county.name} (${county.state})`,
    value: `${county.state}:${county.name}`,
  }))

  const stateOptions = states.map((state) => ({
    label: state,
    value: state,
  }))

  // Location handlers
  const handleLocationAdd = () => {
    const { states: selectedStates, counties: selectedCounties } = selectedLocations

    setOrderDetails((prev) => {
      const existingStates = prev.filter((detail) => detail.type === "state")
      const existingCounties = prev.filter((detail) => detail.type === "county")
      const otherDetails = prev.filter((detail) => detail.type === "zipCode")

      const newStates = selectedStates
        .filter((state) => !existingStates.some((existing) => existing.value === state))
        .map((state) => ({ type: "state" as const, value: state }))

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
        }))

      return [...existingStates, ...newStates, ...existingCounties, ...newCounties, ...otherDetails]
    })

    setSelectedLocations({ states: [], counties: [] })
  }

  const handleStateChange = (selected: string[]) => {
    setSelectedLocations((prev) => ({ ...prev, states: selected }))
  }

  const handleCountyChange = (selected: string[]) => {
    const countyData = selected.map((value) => {
      const [state, name] = value.split(":")
      return { state, name }
    })
    setSelectedLocations((prev) => ({ ...prev, counties: countyData }))
  }

  const handleZipCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem("zipCode") as HTMLInputElement
    const zipCode = input.value.trim()
    const stateForZip = (e.currentTarget.elements.namedItem("zipState") as HTMLSelectElement).value

    if (!stateForZip) {
      setZipError("Please select a state for the zip code")
      return
    }

    if (!validateZipCode(zipCode, stateForZip)) {
      setZipError(`Invalid zip code for ${stateForZip}`)
      return
    }

    if (zipCode && !zipCodes.includes(zipCode)) {
      setOrderDetails((prev) => [...prev, { type: "zipCode", value: zipCode, parentState: stateForZip }])
      setZipCodes((prev) => [...prev, zipCode])
      input.value = ""
      setZipError("")
    }
  }

  const handleRemoveDetail = (detail: OrderDetail) => {
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
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: "array" })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          setRecordCount(jsonData.length)
          // For file uploads, quantity is derived from row count.
          setFormData((prev) => ({ ...prev, quantity: jsonData.length }))
        } catch (error) {
          console.error("Error reading file:", error)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateZipCode = (zipCode: string, state: string): boolean => {
    // Placeholder zip validation logic.
    return true
  }

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Please fill out your Name, Email, and Phone.")
      return false
    }
    if (orderDetails.length === 0) {
      alert("Please add at least one location.")
      return false
    }
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity (number of records).")
      return false
    }
    if (formData.selectedLeadTypes.length === 0) {
      alert("Please select at least one lead type.")
      return false
    }
    if (formData.selectedPropertyTypes.length === 0) {
      alert("Please select at least one property type.")
      return false
    }
    return true
  }

  // Determine the order type based on pricePerRecord.
  // If pricePerRecord is 0.02 then the orderType is "fileUpload"; otherwise, "manual".
  const orderType = pricePerRecord === 0.02 ? "fileUpload" : "manual"

  // Handle PayPal payment by sending raw order details to the backend.
  const handlePayWithPayPal = async () => {
    if (!validateForm()) return

    try {
      const response = await fetch("http://localhost:5000/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send raw order details; backend securely calculates the total price.
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          quantity, // Send the raw quantity (manual entry or file row count)
          orderType, // Send the order type so backend knows which price to use
          orderLocations: orderDetails,
          propertyCriteria: {
            selectedLeadTypes: formData.selectedLeadTypes,
            selectedPropertyTypes: formData.selectedPropertyTypes,
            otherLeadType: formData.otherLeadType,
            otherPropertyType: formData.otherPropertyType,
            priceRestrictions: formData.priceRestrictions,
            equityPercentage: formData.equityPercentage,
            propertyCondition: formData.propertyCondition,
            ownershipDuration: formData.ownershipDuration,
            additionalDetails: formData.additionalDetails,
          },
        }),
      })

      const data = await response.json()
      if (data.id) {
        // Redirect to PayPal's checkout page using the order token returned by your backend.
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`
      } else {
        alert("Failed to create PayPal order.")
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error)
      alert("An error occurred while processing your payment.")
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-white"
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" variants={pageTransition}>
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
          </Card>

          {/* Location Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Location Selection</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Select States</Label>
                  <MultiSelect
                    options={stateOptions}
                    selected={selectedLocations.states}
                    onChange={handleStateChange}
                    placeholder="Select states..."
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Select Counties</Label>
                  <MultiSelect
                    options={countyOptions}
                    selected={selectedLocations.counties.map((c) => `${c.state}:${c.name}`)}
                    onChange={handleCountyChange}
                    placeholder="Select counties..."
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Add Zip Code</Label>
                  <form onSubmit={handleZipCodeSubmit} className="flex gap-2">
                    <Input name="zipCode" placeholder="Enter zip code..." className="flex-1" />
                    <Button type="submit">Add</Button>
                  </form>
                  {zipError && <p className="text-sm text-red-500 mt-1">{zipError}</p>}
                </div>
                <Button onClick={handleLocationAdd} disabled={selectedLocations.states.length === 0 && selectedLocations.counties.length === 0}>
                  Add Locations
                </Button>
              </div>
            </div>
          </Card>

          {/* Property Criteria */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Property Criteria</h2>
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Type of Leads</Label>
                <div className="grid grid-cols-2 gap-3">
                  {defaultLeadTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lead-${type}`}
                        checked={formData.selectedLeadTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("selectedLeadTypes", [...formData.selectedLeadTypes, type])
                          } else {
                            handleInputChange("selectedLeadTypes", formData.selectedLeadTypes.filter((t) => t !== type))
                          }
                        }}
                      />
                      <Label htmlFor={`lead-${type}`}>{type}</Label>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <Label htmlFor="otherLeadType">Other (please specify)</Label>
                    <Input
                      id="otherLeadType"
                      value={formData.otherLeadType}
                      onChange={(e) => handleInputChange("otherLeadType", e.target.value)}
                      placeholder="Enter other lead type..."
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="mb-3 block">Type of Properties</Label>
                <div className="grid grid-cols-2 gap-3">
                  {defaultPropertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`property-${type}`}
                        checked={formData.selectedPropertyTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("selectedPropertyTypes", [...formData.selectedPropertyTypes, type])
                          } else {
                            handleInputChange("selectedPropertyTypes", formData.selectedPropertyTypes.filter((t) => t !== type))
                          }
                        }}
                      />
                      <Label htmlFor={`property-${type}`}>{type}</Label>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <Label htmlFor="otherPropertyType">Other (please specify)</Label>
                    <Input
                      id="otherPropertyType"
                      value={formData.otherPropertyType}
                      onChange={(e) => handleInputChange("otherPropertyType", e.target.value)}
                      placeholder="Enter other property type..."
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="priceRestrictions">Price Restrictions</Label>
                <Textarea
                  id="priceRestrictions"
                  placeholder="Enter any specific price range requirements..."
                  value={formData.priceRestrictions}
                  onChange={(e) => handleInputChange("priceRestrictions", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="equityPercentage">Preferred Owner Equity Percentage</Label>
                <Input
                  id="equityPercentage"
                  placeholder="e.g., 30%"
                  value={formData.equityPercentage}
                  onChange={(e) => handleInputChange("equityPercentage", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Order Input Section */}
          {pricePerRecord === 0.03 ? (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Additional Details</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="quantity">Number of Records Requested</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="additionalDetails">Additional Notes</Label>
                  <Textarea
                    id="additionalDetails"
                    placeholder="Any other specific requirements or preferences..."
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">List Upload</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Upload Your List</Label>
                  <Input id="file" type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
                  {file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Found {recordCount.toLocaleString()} records in {file.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="additionalDetails">Additional Details</Label>
                  <Textarea
                    id="additionalDetails"
                    placeholder="Any additional information or special requirements..."
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Order Summary & Payment Options */}
        {pricePerRecord === 0.03 ? (
          <motion.div className="lg:col-span-1" variants={pageTransition}>
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary for $0.03 Records</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Selected Locations</h3>
                  <OrderDetails details={orderDetails} onRemove={handleRemoveDetail} />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Number of Records</span>
                    <span>{formData.quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per Record</span>
                    <span>$0.03</span>
                  </div>
                  <Separator />
                  {/* Displayed total is for reference only */}
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Price</span>
                    <span>
                      ${totalPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <Button className="w-full bg-[#03045e] hover:bg-[#00B4D8] flex items-center justify-center gap-2">
                    <GooglePay className="h-5 w-5" />
                    Pay with Google Pay
                  </Button>
                  <Button className="w-full bg-black hover:bg-gray-800 flex items-center justify-center gap-2">
                    <AppleIcon className="h-5 w-5" />
                    Pay with Apple Pay
                  </Button>
                  <Button className="w-full bg-[#0070ba] hover:bg-[#003087] flex items-center justify-center gap-2" onClick={handlePayWithPayPal}>
                    <PaypalIcon className="h-5 w-5" />
                    Pay with PayPal
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div className="lg:col-span-1" variants={pageTransition}>
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Selected Locations</h3>
                  <OrderDetails details={orderDetails} onRemove={handleRemoveDetail} />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Number of Records</span>
                    <span>{recordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per Record</span>
                    <span>${pricePerRecord.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Price</span>
                    <span>
                      ${totalPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <Button className="w-full bg-[#03045e] hover:bg-[#00B4D8] flex items-center justify-center gap-2">
                    <GooglePay className="h-5 w-5" />
                    Pay with Google Pay
                  </Button>
                  <Button className="w-full bg-black hover:bg-gray-800 flex items-center justify-center gap-2">
                    <AppleIcon className="h-5 w-5" />
                    Pay with Apple Pay
                  </Button>
                  <Button className="w-full bg-[#0070ba] hover:bg-[#003087] flex items-center justify-center gap-2" onClick={handlePayWithPayPal}>
                    <PaypalIcon className="h-5 w-5" />
                    Pay with PayPal
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
