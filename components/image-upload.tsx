"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, X, Upload } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to upload image")
      }

      const data = await response.json()
      onChange(data.url)

      // Reset the file input
      e.target.value = ""
    } catch (error) {
      console.error("Error uploading image:", error)
      alert(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Enter image URL or upload"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <div className="relative">
          <Input
            type="file"
            id="image-upload"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Button type="button" variant="outline" size="icon" className="border-[hsl(var(--input))]" disabled={isUploading}>
            {isUploading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Upload className="h-4 w-4 " />
            )}
          </Button>
        </div>
        {value && (
          <Button type="button" variant="outline" size="icon" onClick={() => onChange("")}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {value ? (
        <div className="relative aspect-video rounded-md overflow-hidden border">
          <Image src={value || "/placeholder.svg"} alt="Cover image" fill className="object-cover" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-8 bg-[hsl(var(--muted))]/50 border-[hsl(var(--muted-foreground))] rounded-md">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <Label htmlFor="image-upload" className="text-sm text-muted-foreground cursor-pointer hover:underline">
            Upload cover image
          </Label>
        </div>
      )}
    </div>
  )
}

