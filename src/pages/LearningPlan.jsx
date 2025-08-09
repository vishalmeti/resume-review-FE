import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import ResumePicker from '../components/ResumePicker'
import { useToast } from '../components/ToastProvider'

export default function LearningPlan() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('General')
  const { toast } = useToast()

  async function generate() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) {
      toast('Please upload a resume first', { type: 'error' })
      return
    }
    setLoading(true)
    try {
      const res = await api('/learning-plan/generate', {
        method: 'POST',
        body: JSON.stringify({ resumeId, role })
      })
      setPlan(res.plan)
      toast('Learning plan generated successfully!', { type: 'success' })
    } catch (error) {
      toast('Failed to generate learning plan', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function loadLatest() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) return
    try {
      const res = await api(`/learning-plan/${resumeId}`)
      setPlan(res.plan)
    } catch (_) {}
  }

  useEffect(() => { loadLatest() }, [])

  async function updateStatus(idx, status) {
    try {
      const res = await api('/learning-plan/update-status', {
        method: 'POST',
        body: JSON.stringify({ planId: plan._id, index: idx, status })
      })
    setPlan(res.plan)
      toast(`Marked as ${status.toLowerCase()}`, { type: 'success' })
    } catch (error) {
      toast('Failed to update status', { type: 'error' })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800'
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800'
    }
  }

  const getProgressStats = () => {
    if (!plan?.items) return { completed: 0, inProgress: 0, total: 0 }
    const total = plan.items.length
    const completed = plan.items.filter(item => item.status === 'Done').length
    const inProgress = plan.items.filter(item => item.status === 'In Progress').length
    return { completed, inProgress, total }
  }

  const progress = getProgressStats()
  const completionPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Learning Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">AI-generated personalized skill development roadmap</p>
        </div>
        <ResumePicker onChange={() => loadLatest()} />
      </div>

      {/* Plan Generation */}
      {!plan && (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-8 text-center dark:border-white/10 dark:bg-white/10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                </svg>
              </div>

              <h2 className="text-xl font-semibold mb-2">Create Your Learning Plan</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Generate a personalized roadmap to improve your skills and advance your career
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-left">Target Role (Optional)</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-4 py-3 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={generate}
                disabled={loading}
                className="btn btn-primary w-full py-3"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating Plan...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                    </svg>
                    Generate Learning Plan
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Learning Plan Display */}
      {plan && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Progress Overview */}
          <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 mb-6 dark:border-white/10 dark:bg-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Learning Progress</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {progress.completed} of {progress.total} items completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {Math.round(completionPercentage)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">{progress.completed} Done</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">{progress.inProgress} In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">{progress.total - progress.completed - progress.inProgress} Pending</span>
                </div>
              </div>
              <button
                onClick={generate}
                disabled={loading}
                className="btn btn-ghost text-sm px-3 py-1"
              >
                {loading ? 'Updating...' : 'Refresh Plan'}
              </button>
            </div>
          </div>

          {/* Learning Items */}
          <div className="flex-1 overflow-auto">
            <div className="grid lg:grid-cols-2 gap-4">
              {plan.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 dark:border-white/10 dark:bg-white/10 hover:shadow-lg transition-all duration-200"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(item.status)}`}>
                          {item.status || 'Not Started'}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                          {item.durationWeeks} week{item.durationWeeks !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Resources */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-500">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Learning Resources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.resources.map((resource, i) => (
                          <a
                            key={i}
                            className="text-xs text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 underline underline-offset-2 decoration-1 hover:decoration-2 transition-all"
                            href={resource}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Resource {i + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {item.status !== 'In Progress' && (
                      <button
                        onClick={() => updateStatus(idx, 'In Progress')}
                        className="btn btn-secondary flex-1 text-sm py-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1">
                          <polygon points="5,3 19,12 5,21" fill="currentColor" />
                        </svg>
                        Start
                      </button>
                    )}
                    {item.status !== 'Done' && (
                      <button
                        onClick={() => updateStatus(idx, 'Done')}
                        className="btn btn-accent flex-1 text-sm py-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1">
                          <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                        Complete
                      </button>
                    )}
                    {item.status === 'Done' && (
                      <button
                        onClick={() => updateStatus(idx, 'Not Started')}
                        className="btn btn-ghost flex-1 text-sm py-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1">
                          <path d="M3 6h18l-2 13H5L3 6Z" stroke="currentColor" strokeWidth="2" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Reset
                      </button>
                    )}
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}