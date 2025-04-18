// additional-details-section.tsx
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { AdditionalDetailsSectionProps } from "./types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function AdditionalDetailsSection({ formData, handleInputChange }: AdditionalDetailsSectionProps) {
  const [uploadStatus, setUploadStatus] = useState<{status: 'idle' | 'uploading' | 'success' | 'error', message?: string}>({
    status: 'idle'
  });

  const handleFileUpload = async (file: File) => {
    // Update the form data first
    handleInputChange("supportingFile", file);

    // Start the upload process
    setUploadStatus({status: 'uploading'});

    try {
      // Create a FormData object for the file upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Send the file to the backend
      const response = await fetch('/api/uploads/supporting-data', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      
      // Update upload status
      setUploadStatus({
        status: 'success',
        message: 'File uploaded successfully'
      });
      
      // Store the file reference in the form data
      handleInputChange("supportingFileId", result.fileId);
    } catch (error) {
      setUploadStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Additional Details</h2>
      <div className="space-y-6">
        {/* Upload Status Messages */}
        {uploadStatus.status === 'uploading' && (
          <Alert className="mb-4 bg-blue-50">
            <div className="flex items-center">
              <div className="mr-2 animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
              <AlertDescription>Uploading your file...</AlertDescription>
            </div>
          </Alert>
        )}
        
        {uploadStatus.status === 'success' && (
          <Alert className="mb-4 bg-green-50">
            <AlertDescription className="text-green-700">{uploadStatus.message}</AlertDescription>
          </Alert>
        )}
        
        {uploadStatus.status === 'error' && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{uploadStatus.message}</AlertDescription>
          </Alert>
        )}

        {/* Centered Upload Area */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Label htmlFor="fileUpload" className="mb-4">Upload Suppressing Data</Label>
          <div className="w-full max-w-md p-8 border-2 border-dashed border-cyan-400 rounded-lg bg-cyan-50 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 rounded-full border-2 border-cyan-400 flex justify-center items-center overflow-hidden shadow-[0_0_100px_rgba(1,235,252,1),inset_0_0_10px_rgba(1,235,252,1),0_0_5px_rgba(255,255,255,1)] animate-[flicker_2s_linear_infinite]">
              <input 
                id="fileUpload"
                type="file" 
                title="Upload Suppressing Data"
                className="absolute opacity-0 w-full h-full cursor-pointer z-10" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                strokeLinejoin="round" 
                strokeLinecap="round" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                fill="none" 
                stroke="currentColor" 
                className="text-cyan-400 text-2xl animate-[iconflicker_2s_linear_infinite]"
              >
                <polyline points="16 16 12 12 8 16" />
                <line y2={21} x2={12} y1={12} x1={12} />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                <polyline points="16 16 12 12 8 16" />
              </svg>
            </div>
            {formData.supportingFile ? (
              <p className="mt-4 text-sm text-gray-600">
                File selected: {formData.supportingFile.name}
              </p>
            ) : (
              <p className="mt-4 text-sm text-gray-600">
                Click to browse or drag and drop files
              </p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="additionalDetails">Additional Notes</Label>
          <Textarea
            id="additionalDetails"
            placeholder="Any other specific requirements or preferences..."
            value={formData.additionalDetails}
            onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
          />
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes flicker {
          0% {
            border-color: rgb(1,235,252);
            box-shadow: 0px 0px 100px rgb(1,235,252), inset 0px 0px 10px rgb(1,235,252), 0px 0px 5px rgb(255,255,255);
          }
          5% {
            border-color: transparent;
            box-shadow: none;
          }
          10% {
            border-color: rgb(1,235,252);
            box-shadow: 0px 0px 100px rgb(1,235,252), inset 0px 0px 10px rgb(1,235,252), 0px 0px 5px rgb(255,255,255);
          }
          25% {
            border-color: transparent;
            box-shadow: none;
          }
          30% {
            border-color: rgb(1,235,252);
            box-shadow: 0px 0px 100px rgb(1,235,252), inset 0px 0px 10px rgb(1,235,252), 0px 0px 5px rgb(255,255,255);
          }
          100% {
            border-color: rgb(1,235,252);
            box-shadow: 0px 0px 100px rgb(1,235,252), inset 0px 0px 10px rgb(1,235,252), 0px 0px 5px rgb(255,255,255);
          }
        }
        
        @keyframes iconflicker {
          0% { opacity: 1; }
          5% { opacity: 0.2; }
          10% { opacity: 1; }
          25% { opacity: 0.2; }
          30% { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>
    </Card>
  );
}