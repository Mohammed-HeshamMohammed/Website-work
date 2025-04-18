// components/sections/order/confirmation/contact-info-card.tsx
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { FormData } from "@/components/sections/order/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactInfoCardProps {
  formData?: FormData;
  loading?: boolean;
}

export function ContactInfoCard({ formData, loading = false }: ContactInfoCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <Check className="h-5 w-5 text-green-500" />
        )}
        Contact Information
      </h2>
      
      {loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-40" />
            </div>
          ))}
        </div>
      )}
      
      {!loading && !formData && (
        <p className="text-gray-500 text-sm py-2">
          Contact information will be displayed once provided.
        </p>
      )}
      
      {!loading && formData && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{formData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
          {formData.company && (
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{formData.company}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}