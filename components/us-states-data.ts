interface County {
  name: string
  description: string
  zipCodes: string[]
}

interface State {
  name: string
  abbreviation: string
  description: string
  counties: County[]
  zipCodes: string[]
}

const usStates: State[] = [
  {
    name: "Alabama",
    abbreviation: "AL",
    description: "Located in the southeastern United States",
    zipCodes: ["35001-36925"],
    counties: [
      {
        name: "Jefferson County",
        description: "Most populous county in Alabama",
        zipCodes: ["35201-35298"],
      },
      {
        name: "Mobile County",
        description: "Second most populous county in Alabama",
        zipCodes: ["36601-36695"],
      },
      // Add more counties...
    ],
  },
  {
    name: "Alaska",
    abbreviation: "AK",
    description: "The largest state by area in the United States",
    zipCodes: ["99501-99950"],
    counties: [
      {
        name: "Anchorage Municipality",
        description: "Most populous city in Alaska",
        zipCodes: ["99501-99524"],
      },
      // Add more counties...
    ],
  },
  // Add more states...
]

export const validateZipCode = (zipCode: string, state: string): boolean => {
  const selectedState = usStates.find((s) => s.name === state)
  if (!selectedState) return false

  const zipRanges = selectedState.zipCodes.flatMap((range) => {
    const [start, end] = range.split("-")
    return { start: Number.parseInt(start), end: Number.parseInt(end) }
  })

  const zip = Number.parseInt(zipCode)
  return zipRanges.some((range) => zip >= range.start && zip <= range.end)
}

export default usStates

