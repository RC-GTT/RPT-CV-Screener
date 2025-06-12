'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  matchesCriteria: boolean
}

export default function ResultsPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results')
        if (response.ok) {
          const data = await response.json()
          setCandidates(data)
        } else {
          console.error('Failed to fetch results')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchResults()
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Screening Results</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Matches Criteria</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.phone}</TableCell>
                <TableCell>{candidate.matchesCriteria ? '✓' : '❌'}</TableCell>
                <TableCell>
                  <Link href={`/candidate/${candidate.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
