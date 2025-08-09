import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useToast } from '../components/ToastProvider'

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedMatch = sessionStorage.getItem('match')
    if (storedMatch) {
      try {
        setMatch(JSON.parse(storedMatch))
      } catch (e) {
        console.error('Failed to parse stored match:', e)
      }
    }

    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      setLoading(true)
      const response = await api('/dashboard/stats')
      setDashboardData(response.stats)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      toast('Failed to load dashboard data', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Loading state - premium AI loader + skeletons
  if (loading) {
    return (
      <div className="relative min-h-[70vh] overflow-hidden">
        {/* Background grid and orbs */}
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="absolute inset-0 bg-grid dark:opacity-40 opacity-20" />
        </div>

        {/* Center AI core */}
        <div className="flex items-center justify-center pt-16">
          <div className="relative w-44 h-44">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent bg-[conic-gradient(from_0deg,theme(colors.primary.500),theme(colors.indigo.500),theme(colors.coral),theme(colors.primary.500))] blur-[2px] opacity-80" />
            <div className="absolute inset-1 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-white/30 dark:border-white/10" />

            {/* Decorative rotating arcs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-primary-500/30 rotate-slow" />
              <div className="absolute w-28 h-28 rounded-full border border-indigo-500/30 rotate-reverse" />
              <div className="absolute w-20 h-20 rounded-full border border-coral/40 rotate-slower" />
            </div>

            {/* Neural sparks */}
            <div className="absolute inset-0">
              <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-300 rounded-full neural-spark" style={{ animationDelay: '0s' }} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-300 rounded-full neural-spark" style={{ animationDelay: '0.3s' }} />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-indigo-300 rounded-full neural-spark" style={{ animationDelay: '0.6s' }} />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-pink-300 rounded-full neural-spark" style={{ animationDelay: '0.9s' }} />
            </div>

            {/* AI icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-500 text-white shadow-xl loader-glow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ai-pulse">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Big card skeleton */}
          <div className="lg:col-span-2 card p-4 md:p-6 relative overflow-hidden skeleton-shimmer">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="absolute inset-0 pointer-events-none" />
          </div>

          {/* Side small cards */}
          <div className="space-y-4">
            <div className="card p-4 relative overflow-hidden skeleton-shimmer">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="card p-4 relative overflow-hidden skeleton-shimmer">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        {/* Lower skeletons */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card p-4 relative overflow-hidden skeleton-shimmer">
              <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 mb-3" />
              <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // No data state
  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Failed to load dashboard data</p>
        <button onClick={loadDashboardData} className="btn btn-primary mt-4">
          Retry
        </button>
      </div>
    )
  }

  const score = dashboardData.careerHealthScore.overall
  const breakdown = dashboardData.careerHealthScore.breakdown
  const stats = dashboardData.userStats
  const resumeData = dashboardData.resumeInsights
  const recentActivity = dashboardData.recentActivity

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
      case 'upload':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-500">
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" />
            <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case 'interview':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
            <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case 'job':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <path d="M3 7h18v12H3z" stroke="currentColor" strokeWidth="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case 'learning':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-500">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Career Health Score */}
        <div className="lg:col-span-2 card flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
          <div className="relative flex-shrink-0">
            <svg width="140" height="140" viewBox="0 0 140 140" className="text-gray-200 sm:w-[160px] sm:h-[160px]">
              <circle cx="70" cy="70" r={radius} stroke="currentColor" strokeWidth="12" fill="none" className="opacity-40 sm:cx-80 sm:cy-80 sm:stroke-[14]" />
              <circle cx="70" cy="70" r={radius} stroke="url(#grad)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} className="progress-ring sm:cx-80 sm:cy-80 sm:stroke-[14]" />
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
                <div className={`text-3xl sm:text-4xl font-extrabold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">/ 100</div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
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
                  <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${breakdown.skillsMatch}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{breakdown.skillsMatch}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Experience Level</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: `${breakdown.experienceLevel}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{breakdown.experienceLevel}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Market Relevance</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: `${breakdown.marketRelevance}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{breakdown.marketRelevance}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-0 lg:flex lg:flex-col lg:space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Active Role Match</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-500">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">{match?.matchPercentage ?? 0}%</div>
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
            <div className="text-2xl sm:text-3xl font-bold mb-1">{stats.avgInterviewScore}/100</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Based on {stats.totalInterviews} mock interviews
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white sm:w-6 sm:h-6">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-xl sm:text-2xl font-bold">{stats.totalResumes}</div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Resumes</div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white sm:w-6 sm:h-6">
              <path d="M3 7h18v12H3z" stroke="currentColor" strokeWidth="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-xl sm:text-2xl font-bold">{stats.totalJobApplications}</div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Job Apps</div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white sm:w-6 sm:h-6">
              <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-xl sm:text-2xl font-bold">{stats.totalInterviews}</div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Interviews</div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white sm:w-6 sm:h-6">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <div className="text-xl sm:text-2xl font-bold">{stats.totalQuestions}</div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Questions</div>
        </div>
      </div>

      {/* Recent Activity & Resume Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p className="text-sm">No recent activity</p>
                <p className="text-xs mt-1">Start by uploading a resume or practicing interviews</p>
              </div>
            )}
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
                  <span className="text-sm font-medium">Experience</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resumeData.experienceYears}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Education</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resumeData.education}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Skills Count</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resumeData.skillsCount}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(resumeData.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Top Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {resumeData.topSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-lg dark:bg-primary-950/30 dark:text-primary-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {resumeData.suggestions && resumeData.suggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Suggestions</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {resumeData.suggestions.slice(0, 3).map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-orange-500 mt-0.5">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            className="p-4 rounded-xl border border-primary-200 bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/40 dark:border-primary-700 dark:hover:bg-primary-950/60 transition-colors text-left"
            onClick={() => window.location.href = '/jd'}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white sm:w-5 sm:h-5">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-primary-900 dark:text-primary-100 text-sm sm:text-base">Analyze Job</div>
                <div className="text-xs sm:text-sm text-primary-700 dark:text-primary-300">Check resume fit</div>
              </div>
            </div>
          </button>

          <button
            className="p-4 rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 dark:bg-green-950/30 dark:border-green-800 dark:hover:bg-green-950/50 transition-colors text-left"
            onClick={() => window.location.href = '/interview'}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white sm:w-5 sm:h-5">
                  <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-green-900 dark:text-green-100 text-sm sm:text-base">Mock Interview</div>
                <div className="text-xs sm:text-sm text-green-700 dark:text-green-300">Practice questions</div>
              </div>
            </div>
          </button>

          {/* <button
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
          </button> */}
        </div>
      </div>
    </div>
  )
}