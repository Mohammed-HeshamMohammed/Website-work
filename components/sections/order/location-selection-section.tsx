import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/sections/order/multi-select-dropdown"
import { OrderDetail } from "./types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, MapPin } from "lucide-react"

interface LocationSelectionSectionProps {
  selectedLocations: {
    states: string[]
    counties: Array<{
      name: string
      state: string
      county: string
    }>
  }
  zipError: string
  handleLocationManagement: {
    handleLocationAdd: () => void
    handleStateChange: (selected: string[]) => void
    handleCountyChange: (selected: string[]) => void
    handleZipCodeSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleRemoveDetail: (detail: OrderDetail) => void
  }
}

export default function LocationSelectionSection({
  selectedLocations,
  zipError,
  handleLocationManagement
}: LocationSelectionSectionProps) {
  const [states, setStates] = useState<string[]>([])
  const [counties, setCounties] = useState<Array<{name: string, state: string, county: string}>>([])
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [isLoadingCounties, setIsLoadingCounties] = useState(false)
  const [stateError, setStateError] = useState<string | null>(null)
  const [countyError, setCountyError] = useState<string | null>(null)
  
  // Fetch states from API on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setIsLoadingStates(true)
      setStateError(null)
      
      try {
        const response = await fetch('/api/locations/states')
        
        if (!response.ok) {
          throw new Error('Failed to fetch states')
        }
        
        const data = await response.json()
        setStates(data.states)
      } catch (error) {
        console.error("Error fetching states:", error)
        setStateError("Failed to load states. Please try again.")
      } finally {
        setIsLoadingStates(false)
      }
    }
    
    fetchStates()
  }, [])
  
  // Fetch counties when selected states change
  useEffect(() => {
    const fetchCounties = async () => {
      if (selectedLocations.states.length === 0) {
        setCounties([])
        return
      }
      
      setIsLoadingCounties(true)
      setCountyError(null)
      
      try {
        const stateParams = selectedLocations.states.map(state => `states=${encodeURIComponent(state)}`).join('&')
        const response = await fetch(`/api/locations/counties?${stateParams}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch counties')
        }
        
        const data = await response.json()
        setCounties(data.counties)
      } catch (error) {
        console.error("Error fetching counties:", error)
        setCountyError("Failed to load counties. Please try again.")
      } finally {
        setIsLoadingCounties(false)
      }
    }
    
    fetchCounties()
  }, [selectedLocations.states])

  // Transform data for dropdowns
  const countyOptions = counties.map((county) => ({
    label: `${county.name} (${county.state})`,
    value: `${county.state}:${county.name}`,
  }))
  
  const stateOptions = states.map((state) => ({
    label: state,
    value: state,
  }))

  // Add validation function for zip codes
  const validateZipCode = async (zipCode: string, state: string) => {
    try {
      const response = await fetch(
        `/api/validate/zipcode?zipCode=${encodeURIComponent(zipCode)}&state=${encodeURIComponent(state)}`
      )
      
      const data = await response.json()
      return data.isValid
    } catch (error) {
      console.error("Error validating zip code:", error)
      return false
    }
  }

  // Enhanced zip code submission
  const handleZipCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem("zipCode") as HTMLInputElement
    const zipCode = input.value.trim()
    const stateForZip = (e.currentTarget.elements.namedItem("zipState") as HTMLSelectElement)?.value

    if (!stateForZip) {
      // Use the original error handling for state selection
      handleLocationManagement.handleZipCodeSubmit(e)
      return
    }

    try {
      const isValid = await validateZipCode(zipCode, stateForZip)
      
      if (!isValid) {
        input.value = ""
        // Let parent component handle the error
        handleLocationManagement.handleZipCodeSubmit(e)
      } else {
        // Let parent component handle the success case
        handleLocationManagement.handleZipCodeSubmit(e)
      }
    } catch (error) {
      console.error("Error in zip code validation:", error)
      // Let parent component handle the error
      handleLocationManagement.handleZipCodeSubmit(e)
    }
  }

  return (
    <Card className="overflow-hidden border-t-4 border-t-green-600">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Target Locations</h2>
        <p className="text-sm text-gray-500 mt-1">Select states, counties, or zip codes for your data</p>
      </div>
      <div className="p-6">
        {stateError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{stateError}</AlertDescription>
          </Alert>
        )}
        
        {countyError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{countyError}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label className="text-gray-700 mb-2 block">States</Label>
              {isLoadingStates ? (
                <div className="h-10 flex items-center">
                  <div className="animate-spin mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">Loading states...</span>
                </div>
              ) : (
                <MultiSelect
                  options={stateOptions}
                  selected={selectedLocations.states}
                  onChange={handleLocationManagement.handleStateChange}
                  placeholder="Select states..."
                />
              )}
            </div>
            <div>
              <Label className="text-gray-700 mb-2 block">Counties</Label>
              {isLoadingCounties ? (
                <div className="h-10 flex items-center">
                  <div className="animate-spin mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">Loading counties...</span>
                </div>
              ) : selectedLocations.states.length === 0 ? (
                <div>
                  <MultiSelect
                    options={[]}
                    selected={[]}
                    onChange={() => {}}
                    placeholder="Select counties..."
                  />
                  <p className="text-sm text-gray-500 mt-1">Please select at least one state first</p>
                </div>
              ) : (
                <MultiSelect
                  options={countyOptions}
                  selected={selectedLocations.counties.map((c) => `${c.state}:${c.name}`)}
                  onChange={handleLocationManagement.handleCountyChange}
                  placeholder="Select counties..."
                />
              )}
            </div>
          </div>
          
          <div>
            <Label className="text-gray-700 mb-2 block">Add Zip Code</Label>
            <form onSubmit={handleZipCodeSubmit} className="flex gap-2">
              <Input 
                name="zipCode" 
                placeholder="Enter 5-digit zip code" 
                className="flex-1" 
                pattern="\d{5}" 
                title="Five digit zip code"
              />
              <select 
                name="zipState" 
                id="zipState"
                aria-label="State for zip code"
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Button type="submit" variant="outline">
                <MapPin className="h-4 w-4 mr-1" />
                Add
              </Button>
            </form>
            {zipError && <p className="text-sm text-red-500 mt-1">{zipError}</p>}
          </div>
          
          <div>
            <Button 
              onClick={handleLocationManagement.handleLocationAdd} 
              disabled={selectedLocations.states.length === 0 && selectedLocations.counties.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Add Selected Locations
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}