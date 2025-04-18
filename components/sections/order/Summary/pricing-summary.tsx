// pricing-summary.tsx
import { Separator } from "@/components/ui/separator"

interface PricingSummaryProps {
  quantity: number;
  pricePerRecord: number;
  totalPrice: number;
}

export function PricingSummary({ quantity, pricePerRecord, totalPrice }: PricingSummaryProps) {
  return (
    <div className="space-y-3">
      <Separator />
      <div className="flex justify-between text-gray-600">
        <span>Number of Records</span>
        <span className="font-medium">{quantity.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Price per Record</span>
        <span className="font-medium">${pricePerRecord.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-lg font-semibold">
        <span>Total Price</span>
        <span className="text-blue-600">
          ${totalPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}