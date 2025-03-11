export interface County {
  fips: string
  name: string
  state: string
}

export const counties: County[] = [
  { fips: "01001", name: "Autauga County", state: "AL" },
  { fips: "01003", name: "Baldwin County", state: "AL" },
  // ... rest of the counties from the CSV
]

export const states = Array.from(new Set(counties.map((county) => county.state))).sort()

export const getCountiesByState = (state: string) => {
  return counties.filter((county) => county.state === state)
}

export const getCountyByFips = (fips: string) => {
  return counties.find((county) => county.fips === fips)
}

export const getStateFromFips = (fips: string) => {
  const county = getCountyByFips(fips)
  return county?.state
}

