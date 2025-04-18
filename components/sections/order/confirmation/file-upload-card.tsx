// components/sections/order/confirmation/file-upload-card.tsx
import { Card } from "@/components/ui/card";
import { FileIcon, Loader2 } from "lucide-react";
import { FileUploadSummary } from "@/components/sections/order/Summary/file-upload-summary";
import { FileInfo } from "@/components/sections/order/types";
import { Skeleton } from "@/components/ui/skeleton";

interface FileUploadCardProps {
  files?: FileInfo[];
  recordCount?: number;
  loading?: boolean;
}

export function FileUploadCard({ files, recordCount, loading = false }: FileUploadCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <FileIcon className="h-5 w-5 text-blue-500" />
        )}
        Uploaded Files
      </h2>
      
      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}
      
      {!loading && (!files || files.length === 0) && (
        <p className="text-gray-500 text-sm py-2">
          No files have been uploaded yet.
        </p>
      )}
      
      {!loading && files && files.length > 0 && recordCount !== undefined && (
        <FileUploadSummary files={files} recordCount={recordCount} />
      )}
    </Card>
  );
}