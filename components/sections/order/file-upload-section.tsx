// file-upload-section.tsx
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MultiFileUpload } from "./file-upload"
import { useState } from "react"
import { FileInfo } from "./types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

interface FileUploadSectionProps {
  handleFilesUploadChange: (files: FileInfo[]) => void
  formData: {
    additionalDetails: string
    [key: string]: any
  }
  handleInputChange: (field: string, value: string | string[]) => void
  onTotalRecordCountChange?: (count: number) => void
}

export function FileUploadSection({ 
  handleFilesUploadChange, 
  formData, 
  handleInputChange,
  onTotalRecordCountChange
}: FileUploadSectionProps) {
  const [totalRecordCount, setTotalRecordCount] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([])

  const handleFilesChange = async (files: FileInfo[]) => {
    setUploadedFiles(files)
    
    // Start the batch upload process to backend
    if (files.length > 0) {
      setUploadStatus('uploading')
      setUploadError(null)
      
      try {
        // Create FormData for all files
        const formData = new FormData()
        
        // Add each file to the FormData
        files.forEach((fileInfo, index) => {
          formData.append(`file-${index}`, fileInfo.file)
          formData.append(`metadata-${index}`, JSON.stringify({
            name: fileInfo.name,
            recordCount: fileInfo.recordCount,
            selectedColumns: fileInfo.selectedColumns
          }))
        })
        
        // Send files to backend
        const response = await fetch('/api/uploads/batch', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Upload failed')
        }
        
        const result = await response.json()
        
        // Update upload status
        setUploadStatus('success')
        
        // Pass the files with backend file IDs to parent component
        const filesWithIds = files.map((file, index) => ({
          ...file,
          fileId: result.fileIds[index]
        }))
        
        handleFilesUploadChange(filesWithIds)
        
        // Update record count
        const totalCount = files.reduce((sum, file) => sum + file.recordCount, 0)
        setTotalRecordCount(totalCount)
        onTotalRecordCountChange?.(totalCount)
        
      } catch (error) {
        console.error("Error uploading files:", error)
        setUploadStatus('error')
        setUploadError(error instanceof Error ? error.message : 'Failed to upload files')
      }
    } else {
      // Reset everything if no files
      setUploadStatus('idle')
      setUploadError(null)
      handleFilesUploadChange([])
      setTotalRecordCount(0)
      onTotalRecordCountChange?.(0)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">List Upload</h2>
      
      {/* Status Alerts */}
      {uploadStatus === 'uploading' && (
        <Alert className="mb-4 bg-blue-50">
          <div className="flex items-center">
            <div className="mr-2 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
            <AlertDescription>Uploading your files...</AlertDescription>
          </div>
        </Alert>
      )}
      
      {uploadStatus === 'success' && (
        <Alert className="mb-4 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
          <AlertDescription className="text-green-700">
            Files uploaded successfully. Total records: {totalRecordCount}
          </AlertDescription>
        </Alert>
      )}
      
      {uploadStatus === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="mb-4">
          <div className="mb-8">
            <MultiFileUpload 
              onFilesChange={handleFilesChange} 
              onTotalRecordCountChange={(count) => {
                setTotalRecordCount(count)
                onTotalRecordCountChange?.(count)
              }}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="additionalDetails">Additional Notes</Label>
          <Textarea
            id="additionalDetails"
            placeholder="Any additional information or special requirements..."
            value={formData.additionalDetails}
            onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}