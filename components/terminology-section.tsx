"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

const terms = [
  {
    term: "Skiptracing",
    definition: "The automated process of getting phone numbers for a list.",
  },
  {
    term: "Record",
    definition: "A row of data on a list that includes Homeowner Name, Address Details, and maybe even contact info.",
  },
  {
    term: "Count",
    definition: "A number breakdown of how many homeowners are on each list type within your requested market(s).",
  },
  {
    term: "Hit Rate",
    definition: "After the list has been skiptraced, the percent of records that came back with phone numbers.",
  },
  {
    term: "Match Rate",
    definition: "The percent chance of reaching the exact homeowner after contacting all phone numbers on that record.",
  },
  {
    term: "List",
    definition: "A bunch of rows on a csv or excel file that includes all data requested.",
  },
  {
    term: "Criteria",
    definition:
      "Any filters that you want added to your list type (Home Value, Equity %, Years of Ownership, X, Y, Z).",
  },
  {
    term: "Filter",
    definition: "Buttons that allow you to narrow down the exact data range or specific data that you want to target.",
  },
  {
    term: "Field",
    definition: "Each unique header name on your downloaded csv/excel data file.",
  },
  {
    term: "Duplicates",
    definition:
      'If one homeowner owns 26 properties, you do not want that homeowners phone number to show up 26 times. Its best to use the "Remove All Duplicate Mailing Addresses" feature, under our order flow, so you can keep one record of each unique homeowner within the list.',
  },
  {
    term: "Unique Records",
    definition: "Count after removing all duplicate mailing addresses/homeowners from the list.",
  },
  {
    term: "Stacking",
    definition:
      "Combining different lists of motivated property owners to create a more targeted list (2 or more motivations within the list). Example: Deceased + Vacant Houses",
  },
  {
    term: "Scrubbing",
    definition: "Removing the DNC Phone numbers from the list. We do not provide this service.",
  },
  {
    term: "Suppressing",
    definition:
      "Pulling a new list and then removing all the old mailing addresses and homeowners that you have targeted in the past so that you are only targeting homeowners that you haven't targeted before!",
  },
  {
    term: "Combining",
    definition: "Taking multiple lists and merging all the data into 1 master list.",
  },
  {
    term: "Master Phone Column",
    definition:
      "Taking phone 1 to phone 6 and merging all the phone numbers into one master column so that an autodialer reads the data easier and also so that your autodialer does not burn through the data as fast.",
  },
  {
    term: "Macro",
    definition:
      "An excel feature that top real estate companies use to automate data management into their desired data format.",
  },
]

export function TerminologySection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTerms = terms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Search terminology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTerms.map((item) => (
          <Card key={item.term} className="p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-[#03045e] mb-2">{item.term}</h3>
            <p className="text-sm text-gray-600">{item.definition}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

