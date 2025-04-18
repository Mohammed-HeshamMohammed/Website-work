// file-upload-summary.tsx
import { FileIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface FileInfo {
  file: File
  recordCount: number
  columns: string[]
  selectedColumns: string[]
}

interface FileUploadSummaryProps {
  files: FileInfo[]
  recordCount: number
}

export function FileUploadSummary({ files, recordCount }: FileUploadSummaryProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <FileIcon className="h-4 w-4" />
        <h3 className="text-sm font-medium">Uploaded Files</h3>
      </div>
      <div className="space-y-2 bg-gray-50 rounded-md p-3">
        {files.map((fileInfo, index) => (
          <div key={index} className="flex items-center text-sm">
            <FileIcon className="h-4 w-4 mr-2 text-blue-500" />
            <span className="truncate max-w-[150px]">{fileInfo.file.name}</span>
            <span className="ml-auto text-gray-500">{fileInfo.recordCount.toLocaleString()} records</span>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-200 flex justify-between">
          <span className="font-medium">Total Records:</span>
          <span>{recordCount.toLocaleString()}</span>
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
}