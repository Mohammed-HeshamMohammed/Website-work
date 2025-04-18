// components/sections/order/common/min-max-input.tsx
import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface MinMaxInputProps {
  label: string;
  minId: string;
  maxId: string;
  minValue: string | number;
  maxValue: string | number;
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preventScroll: (e: React.WheelEvent<HTMLInputElement>) => void;
  step?: string;
}

export function MinMaxInput({
  label,
  minId,
  maxId,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  preventScroll,
  step = "1"
}: MinMaxInputProps) {
  return (
    <div>
      <Label htmlFor={minId} className="text-gray-700">{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <Input
          id={minId}
          type="number"
          step={step}
          placeholder="Min"
          value={minValue}
          onChange={onMinChange}
          onWheel={preventScroll}
        />
        <span>to</span>
        <Input
          id={maxId}
          type="number"
          step={step}
          placeholder="Max"
          value={maxValue}
          onChange={onMaxChange}
          onWheel={preventScroll}
        />
      </div>
    </div>
  );
}