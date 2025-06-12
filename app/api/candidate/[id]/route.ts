import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  // In a real implementation, this would fetch candidate details from a database
  // For now, we'll return mock data
  const mockCandidate = {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    matchesCriteria: true,
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: 5,
    education: "Bachelor's Degree in Computer Science"
  }
  return NextResponse.json(mockCandidate)
}
