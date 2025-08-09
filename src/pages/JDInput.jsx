import { useState } from 'react'
import { api } from '../lib/api'
import ResumePicker from '../components/ResumePicker'
import { useToast } from '../components/ToastProvider'

export default function JDInput() {
  const [jd, setJd] = useState('')
  const [role, setRole] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resumeId, setResumeId] = useState(() => sessionStorage.getItem('resumeId') || '')
  const { toast } = useToast()

  async function onMatch() {
    if (!resumeId) {
      toast('Please select or upload a resume first', { type: 'error' })
      return
    }
    if (!jd.trim()) {
      toast('Please enter a job description', { type: 'error' })
      return
    }

    setLoading(true)
    try {
      const res = await api('/jd/match', {
        method: 'POST',
        body: JSON.stringify({ resumeId, jdText: jd, role })
      })
      setResult(res)
      sessionStorage.setItem('match', JSON.stringify(res))
      toast('Match analysis complete!', { type: 'success' })
    } catch (error) {
      toast('Analysis failed. Please try again.', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400'
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getMatchGradient = (percentage) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500'
    if (percentage >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Job Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Analyze how well your resume matches job requirements</p>
        </div>
        <div className="flex-shrink-0">
          <ResumePicker value={resumeId} onChange={setResumeId} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Job Description Input */}
        <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl dark:border-white/10 dark:bg-white/10">
          <div className="p-4 sm:p-6 border-b border-white/40 dark:border-white/10">
            <h2 className="font-semibold flex items-center gap-2 text-base sm:text-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-500 sm:w-5 sm:h-5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="2" />
                <line x1="7" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="2" />
                <line x1="7" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="2" />
              </svg>
              Job Description
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Paste the job posting you want to analyze</p>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Job Title/Role</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Senior Frontend Engineer"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Job Description</label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the complete job description here...

Include:
• Required skills and qualifications
• Job responsibilities  
• Experience requirements
• Technologies mentioned
• Any specific requirements"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                {jd.length > 0 ? `${jd.length} characters` : 'Start typing...'}
              </span>
              <button
                onClick={onMatch}
                className={`btn btn-primary px-6 py-3 w-full sm:w-auto order-1 sm:order-2 ${loading ? 'opacity-90' : ''}`}
                disabled={loading || !resumeId || !jd.trim()}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative w-4 h-4">
                      <div className="w-4 h-4 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute inset-0 w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
                      <div className="absolute inset-0.5 w-3 h-3 border border-white/40 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm sm:text-base">Analyzing...</span>
                  </div>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    <span className="text-sm sm:text-base">Analyze Match</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl dark:border-white/10 dark:bg-white/10">
          <div className="p-4 sm:p-6 border-b border-white/40 dark:border-white/10">
            <h2 className="font-semibold flex items-center gap-2 text-base sm:text-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-500 sm:w-5 sm:h-5">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2" />
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2" />
                <path d="M13 12h1" stroke="currentColor" strokeWidth="2" />
              </svg>
              Match Results
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI-powered analysis of your resume fit</p>
          </div>

          <div className="p-4 sm:p-6 min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-6">
                  {/* Enhanced AI Brain Animation */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 border-3 sm:border-4 border-transparent border-t-primary-500 border-r-primary-400 rounded-full animate-spin"></div>

                    {/* Middle pulsing ring */}
                    <div className="absolute inset-1.5 sm:inset-2 w-17 h-17 sm:w-20 sm:h-20 border-2 sm:border-3 border-transparent border-t-indigo-500 border-l-indigo-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

                    {/* Inner AI brain icon */}
                    <div className="absolute inset-5 sm:inset-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 via-indigo-500 to-coral rounded-full flex items-center justify-center animate-pulse">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white sm:w-6 sm:h-6">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" fillOpacity="0.1" />
                        <path d="M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.46 14.1 8 13.1 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.1-.46 2.1-1.18 2.82l1.42 1.42C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6z" fill="currentColor" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute -top-2 left-1/2 w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-2 left-1/3 w-1 h-1 bg-coral rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 -left-2 w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                  {/* Enhanced text animation */}
                  <div>
                    <div className="font-semibold text-base sm:text-lg mb-3 bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                      AI Analyzing Your Resume
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                        <span>Parsing resume content...</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <span>Analyzing job requirements...</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-coral rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <span>Calculating match score...</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-40 sm:w-48 mx-auto">
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-coral rounded-full animate-pulse" style={{
                        width: '100%',
                        animation: 'loading-progress 2s ease-in-out infinite'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : result ? (
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="text-center">
                    <div className={`text-4xl sm:text-6xl font-bold bg-gradient-to-r ${getMatchGradient(result.matchPercentage)} bg-clip-text text-transparent mb-2`}>
                      {result.matchPercentage}%
                    </div>
                    <div className="text-base sm:text-lg font-semibold mb-2">Match Score</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-2 sm:h-3 rounded-full bg-gradient-to-r ${getMatchGradient(result.matchPercentage)} transition-all duration-1000 ease-out`}
                        style={{ width: `${result.matchPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white/60 dark:bg-white/5 rounded-xl p-3 sm:p-4 border border-white/40 dark:border-white/10">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Analysis Summary
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Missing Skills */}
                  {result.missingSkills && result.missingSkills.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Skills to Develop
                      </h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {result.missingSkills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 text-xs sm:text-sm border border-orange-200 dark:from-orange-950/30 dark:to-orange-900/20 dark:text-orange-400 dark:border-orange-800 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <p className="text-xs text-orange-700 dark:text-orange-400">
                          💡 Consider adding these skills to your resume or developing them through courses and projects
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/40 dark:border-white/10">
                    {/* <button
                      className="btn btn-primary flex-1"
                      onClick={() => {
                        // You could navigate to learning plan or show next steps
                        toast('Ready for next steps!', { type: 'info' })
                      }}
                    >
                      Generate Learning Plan
                    </button> */}
                    <button
                      className="btn btn-ghost w-full sm:w-auto"
                      onClick={() => {
                        setResult(null)
                        setJd('')
                        setRole('')
                      }}
                    >
                      New Analysis
                    </button>
                  </div>
                </div>
              ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mx-auto">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-400 sm:w-8 sm:h-8">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-base sm:text-lg">Ready to Analyze</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                      Enter a job description and click "Analyze Match" to see how well your resume fits
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}