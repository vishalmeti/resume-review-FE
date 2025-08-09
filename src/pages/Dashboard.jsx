import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Dashboard() {
  const [score, setScore] = useState(72)
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const resumeId = sessionStorage.getItem('resumeId')
    const storedMatch = sessionStorage.getItem('match')
    if (storedMatch) setMatch(JSON.parse(storedMatch))
    if (!resumeId) return
  }, [])

  const radius = 56
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(100, score))
  const dash = (progress / 100) * circumference

  return (
    <div className="grid md:grid-cols-4 gap-5">
      <div className="card col-span-2 flex items-center gap-6">
        <svg width="160" height="160" viewBox="0 0 160 160" className="text-gray-200">
          <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="14" fill="none" className="opacity-40" />
          <circle cx="80" cy="80" r={radius} stroke="url(#grad)" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} className="progress-ring" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4"/>
              <stop offset="60%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#ff7f50"/>
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="text-sm text-gray-500">Career Health Score</div>
          <div className="text-5xl font-extrabold mt-1 ai-text">{score}</div>
          <div className="text-sm text-gray-500">Based on skills coverage, recent experience, and momentum</div>
        </div>
      </div>
      <div className="card">
        <div className="text-sm text-gray-500">Active Role Match</div>
        <div className="text-3xl font-bold mt-2">{match?.matchPercentage ?? 0}%</div>
        <div className="text-xs text-gray-500 mt-1">{match?.summary || 'No role selected yet'}</div>
      </div>
      <div className="card">
        <div className="text-sm text-gray-500">Next Action</div>
        <div className="mt-2">Start a mock interview or generate your learning plan</div>
      </div>
    </div>
  )
}


