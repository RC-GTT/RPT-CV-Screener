'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [files, setFiles] = useState<FileList | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files) return

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('resumes', files[i])
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        router.push('/results')
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Resumes</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="file"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.doc,.docx"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          <Button type="submit" disabled={!files || files.length === 0}>
            Upload and Analyze
          </Button>
        </form>
      </div>
    </div>
  )
}
