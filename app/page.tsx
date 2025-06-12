import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Bulk Resume Screener</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/upload">
            <Button className="w-full">Upload Resumes</Button>
          </Link>
          <Link href="/criteria">
            <Button className="w-full">Set Screening Criteria</Button>
          </Link>
          <Link href="/results">
            <Button className="w-full">View Results</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
