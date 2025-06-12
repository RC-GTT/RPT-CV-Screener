'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  matchesCriteria: boolean
  skills: string[]
  experience: number
  education: string
}

export default function CandidateDetailPage() {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`/api/candidate/${id}`)
        if (response.ok) {
          const data = await response.json()
          setCandidate(data)
        } else {
          console.error('Failed to fetch candidate details')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (id) {
      fetchCandidate()
    }
  }, [id])

  if (!candidate) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Candidate Details</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{candidate.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {candidate.matchesCriteria ? 'Matches Criteria' : 'Does Not Match Criteria'}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{candidate.email}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{candidate.phone}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Skills</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {candidate.skills.join(', ')}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Experience</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{candidate.experience} years</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Education</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{candidate.education}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/results">
            <Button variant="outline">Back to Results</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
