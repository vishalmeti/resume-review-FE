import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Dashboard() {
  const [score, setScore] = useState(72)
  const [match, setMatch] = useState(null)
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalAnalyses: 0,
    totalInterviews: 0,
    avgScore: 0,
    recentActivity: []
  })
  const [resumeData, setResumeData] = useState(null)

  useEffect(() => {
    const resumeId = sessionStorage.getItem('resumeId')
    const storedMatch = sessionStorage.getItem('match')
    if (storedMatch) setMatch(JSON.parse(storedMatch))

    // Load dashboard data
    loadDashboardData()
    if (resumeId) loadResumeData(resumeId)
  }, [])

  async function loadDashboardData() {
    try {
      // This would come from your API - simulating for now
      setStats({
        totalResumes: 3,
        totalAnalyses: 12,
        totalInterviews: 8,
        avgScore: 78,
        recentActivity: [
          { type: 'analysis', description: 'Analyzed Software Engineer role at Google', date: new Date(Date.now() - 86400000) },
          { type: 'interview', description: 'Completed mock interview (5 questions)', date: new Date(Date.now() - 172800000) },
          { type: 'upload', description: 'Uploaded updated resume', date: new Date(Date.now() - 259200000) }
        ]
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  async function loadResumeData(resumeId) {
    try {
      // This would come from your API - simulating parsed resume data
      setResumeData({
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
        experience: '3.5 years',
        education: 'Computer Science',
        lastUpdated: new Date(Date.now() - 259200000)
      })
    } catch (error) {
      console.error('Failed to load resume data:', error)
    }
  }

  const radius = 56
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(100, score))
  const dash = (progress / 100) * circumference

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'analysis':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case 'interview':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
            <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case 'upload':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-500">
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" />
            <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Your AI-powered career insights at a glance</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Health Score */}
        <div className="lg:col-span-2 card flex items-center gap-8">
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160" className="text-gray-200">
              <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="14" fill="none" className="opacity-40" />
              <circle cx="80" cy="80" r={radius} stroke="url(#grad)" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} className="progress-ring" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="60%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ff7f50" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-extrabold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">/ 100</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">Career Health Score</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' :
                score >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                }`}>
                {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Based on skills coverage, recent experience, and market relevance
            </p>

            {/* Score Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Skills Match</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-xs font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Experience Level</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="text-xs font-medium">82%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Market Relevance</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs font-medium">65%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Active Role Match</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-500">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-3xl font-bold mb-1">{match?.matchPercentage ?? 0}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {match?.summary || 'No role analyzed yet. Start by analyzing a job description.'}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Interview Average</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.avgScore}/100</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Based on {stats.totalInterviews} mock interviews
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{stats.totalResumes}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Resumes</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{stats.totalAnalyses}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Analyses</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{stats.totalInterviews}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Interviews</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{stats.avgScore}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Avg Score</div>
        </div>
      </div>

      {/* Recent Activity & Resume Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-500">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
            </svg>
            Recent Activity
          </h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Insights */}
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
            </svg>
            Resume Insights
          </h3>

          {resumeData ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Experience Level</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resumeData.experience}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Education</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resumeData.education}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {resumeData.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Top Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.slice(0, 6).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-lg dark:bg-primary-950/30 dark:text-primary-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 text-gray-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No resume uploaded yet</p>
              <button
                className="btn btn-primary text-sm px-4 py-2"
                onClick={() => window.location.href = '/upload'}
              >
                Upload Resume
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            className="p-4 rounded-xl border border-primary-200 bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/40 dark:border-primary-700 dark:hover:bg-primary-950/60 transition-colors text-left"
            onClick={() => window.location.href = '/jd'}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-primary-900 dark:text-primary-100">Analyze Job</div>
                <div className="text-sm text-primary-700 dark:text-primary-300">Check resume fit</div>
              </div>
            </div>
          </button>

          <button
            className="p-4 rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 dark:bg-green-950/30 dark:border-green-800 dark:hover:bg-green-950/50 transition-colors text-left"
            onClick={() => window.location.href = '/interview'}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-green-900 dark:text-green-100">Mock Interview</div>
                <div className="text-sm text-green-700 dark:text-green-300">Practice questions</div>
              </div>
            </div>
          </button>

          <button
            className="p-4 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/30 dark:border-purple-800 dark:hover:bg-purple-950/50 transition-colors text-left"
            onClick={() => window.location.href = '/plan'}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-purple-900 dark:text-purple-100">Learning Plan</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Skill development</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}