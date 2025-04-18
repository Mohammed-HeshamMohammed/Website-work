"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder: string
  emptyText?: string
  maxHeight?: number
  maxDisplay?: number
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  emptyText = "No items found.",
  maxHeight = 200,
  maxDisplay = 2,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  
  // Get the labels of selected options
  const selectedOptions = options.filter(option => 
    selected.includes(option.value)
  )

  // Function to remove an item
  const removeItem = (value: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selected.filter(item => item !== value))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between relative min-h-10"
        >
          <div className="flex flex-wrap gap-1 items-center max-w-full">
            {selectedOptions.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <>
                {selectedOptions.slice(0, maxDisplay).map(option => (
                  <Badge 
                    key={option.value} 
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-0 max-w-xs"
                  >
                    <span className="truncate">{option.label}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={(e) => removeItem(option.value, e)}
                    />
                  </Badge>
                ))}
                {selectedOptions.length > maxDisplay && (
                  <Badge variant="secondary">
                    +{selectedOptions.length - maxDisplay}
                  </Badge>
                )}
              </>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup className="overflow-y-auto" style={{ maxHeight: `${maxHeight}px` }}>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    )
                  }}
                >
                  <div className={cn(
                    "mr-2 h-4 w-4 border rounded flex items-center justify-center",
                    selected.includes(option.value) 
                      ? "bg-primary border-primary" 
                      : "opacity-50"
                  )}>
                    {selected.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {selected.length > 0 && (
            <div className="p-2 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selected.length} selected
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onChange([])}
                className="h-8 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}