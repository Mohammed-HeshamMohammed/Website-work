"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { User, Upload, X } from "lucide-react"

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  description: z.string().max(500).optional(),
})

export function ProfileForm() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      description: user?.description || "",
    },
  })

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        // Set desired dimensions for avatar (200x200)
        const size = 200
        canvas.width = size
        canvas.height = size

        // Calculate dimensions to maintain aspect ratio
        const scale = Math.max(size / img.width, size / img.height)
        const x = (size - img.width * scale) / 2
        const y = (size - img.height * scale) / 2

        if (ctx) {
          // Draw background (optional)
          ctx.fillStyle = "#f8f9fa"
          ctx.fillRect(0, 0, size, size)

          // Draw image
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

          // Create circular clip (optional)
          ctx.globalCompositeOperation = "destination-in"
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()

          setPreviewImage(canvas.toDataURL())
        }
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, avatar: previewImage }),
      })

      if (!response.ok) throw new Error("Failed to update profile")

      updateUser({ ...values, image: previewImage || undefined })
      router.refresh()
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-8 bg-white border border-[#caf0f8]">
      <div className="mb-8">
        <div className="flex flex-col items-center gap-6">
          <div
            className={`relative group cursor-pointer ${
              isDragging ? "scale-105" : ""
            } transition-transform duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="h-32 w-32 border-4 border-[#caf0f8] group-hover:border-[#00B4D8] transition-colors">
              <AvatarImage src={previewImage || user?.image} alt={user?.name} />
              <AvatarFallback className="bg-[#03045e] text-white text-4xl">
                {user?.name?.charAt(0).toUpperCase() || <User />}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            title="Upload your profile image"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
            }}
          />
          <p className="text-sm text-gray-600">Drag and drop an image or click to select</p>
          {previewImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewImage(null)}
              className="text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4 mr-2" />
              Remove Image
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#03045e]">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" className="border-[#caf0f8] focus:border-[#00B4D8]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#03045e]">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" className="border-[#caf0f8] focus:border-[#00B4D8]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#03045e]">Bio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tell us about yourself"
                    className="border-[#caf0f8] focus:border-[#00B4D8]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Brief description for your profile. Maximum 160 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#03045e]">About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about yourself"
                    className="resize-none border-[#caf0f8] focus:border-[#00B4D8]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-600">
                  More detailed information about you. Maximum 500 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-[#03045e] hover:bg-[#00B4D8] text-white">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}