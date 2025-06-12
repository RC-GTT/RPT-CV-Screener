'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function CriteriaPage() {
  const [criteria, setCriteria] = useState({
    skills: '',
    experience: '',
    education: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCriteria(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/criteria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criteria),
      })

      if (response.ok) {
        router.push('/results')
      } else {
        console.error('Failed to save criteria')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Set Screening Criteria</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="skills">Required Skills (comma-separated)</Label>
            <Input
              type="text"
              id="skills"
              name="skills"
              value={criteria.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>
          <div>
            <Label htmlFor="experience">Minimum Experience (years)</Label>
            <Input
              type="number"
              id="experience"
              name="experience"
              value={criteria.experience}
              onChange={handleChange}
              placeholder="e.g., 3"
            />
          </div>
          <div>
            <Label htmlFor="education">Minimum Education Level</Label>
            <Input
              type="text"
              id="education"
              name="education"
              value={criteria.education}
              onChange={handleChange}
              placeholder="e.g., Bachelor's Degree"
            />
          </div>
          <Button type="submit">Save Criteria</Button>
        </form>
      </div>
    </div>
  )
}
