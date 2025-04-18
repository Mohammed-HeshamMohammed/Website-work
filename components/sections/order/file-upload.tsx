// components/sections/order/file-upload.tsx
import { useState, useEffect } from "react"
import { UploadIcon, X, FileIcon, CheckCircle } from "lucide-react"
import Papa from "papaparse"
import ExcelJS from "exceljs"
import { Button } from "@/components/ui/button"
import { FileInfo } from "./types"

interface MultiFileUploadProps {
  onFilesChange?: (files: FileInfo[]) => void
  onTotalRecordCountChange?: (count: number) => void
}

export function MultiFileUpload({ onFilesChange, onTotalRecordCountChange }: MultiFileUploadProps) {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Update parent component when files change
  useEffect(() => {
    onFilesChange?.(files)
    const totalRecords = files.reduce((acc, file) => acc + file.recordCount, 0)
    onTotalRecordCountChange?.(totalRecords)
  }, [files, onFilesChange, onTotalRecordCountChange])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(Array.from(selectedFiles))
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = ""
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      const validFiles = Array.from(droppedFiles).filter(file => 
        file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
      )
      
      if (validFiles.length > 0) {
        processFiles(validFiles)
      }
    }
  }

  const processFiles = async (uploadedFiles: File[]) => {
    for (const uploadedFile of uploadedFiles) {
      const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase()

      if (fileExtension === "csv") {
        // Process CSV
        Papa.parse(uploadedFile, {
          header: true,
          complete: (results) => {
            const jsonData = results.data
            
            setFiles(prevFiles => [
              ...prevFiles, 
              {
                file: uploadedFile,
                name: uploadedFile.name,
                size: uploadedFile.size,
                recordCount: jsonData.length,
                columns: [], // Add default or parsed columns here
                selectedColumns: [] // Add default or parsed selected columns here
              }
            ])
          },
          error: (error) => {
            console.error("Error parsing CSV file:", error)
          },
        })
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        // Process Excel
        const reader = new FileReader()
        reader.onload = async (e) => {
          try {
            const arrayBuffer = e.target?.result as ArrayBuffer
            const workbook = new ExcelJS.Workbook()
            await workbook.xlsx.load(arrayBuffer)
            const worksheet = workbook.worksheets[0]
            
            // Calculate row count (excluding header)
            const rowCount = worksheet.rowCount > 1 ? worksheet.rowCount - 1 : 0
            
            setFiles(prevFiles => [
              ...prevFiles, 
              {
                file: uploadedFile,
                name: uploadedFile.name,
                size: uploadedFile.size,
                recordCount: rowCount,
                columns: [], // Add default or parsed columns here
                selectedColumns: [] // Add default or parsed selected columns here
              }
            ])
          } catch (error) {
            console.error("Error reading Excel file:", error)
          }
        }
        reader.readAsArrayBuffer(uploadedFile)
      } else {
        console.error("Unsupported file type. Please upload a CSV or Excel file.")
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Upload Your Lists</h1>
        <p className="text-gray-600">Upload multiple files for your skip tracing needs.</p>
      </div>

      <div 
        className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center ${
          isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 bg-orange-100 rounded-full p-3">
          <UploadIcon className="h-6 w-6 text-orange-500" />
        </div>
        <p className="text-center mb-2">
          Drop CSV or Excel files here
          <br />or{" "}
          <label htmlFor="multi-file-upload" className="text-orange-500 cursor-pointer hover:underline">
            click to upload
          </label>
        </p>
        <input
          id="multi-file-upload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Uploaded Files ({files.length})</h2>
          <div className="space-y-3">
            {files.map((fileInfo, index) => (
              <div 
                key={index} 
                className="border rounded-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <FileIcon className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{fileInfo.file.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({fileInfo.recordCount} records)</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>
                <span className="font-medium">{files.length} files</span> successfully uploaded with a total of <span className="font-medium">{files.reduce((acc, file) => acc + file.recordCount, 0)} records</span>
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiFileUpload