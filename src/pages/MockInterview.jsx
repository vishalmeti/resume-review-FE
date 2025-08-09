import { useEffect, useState } from 'react'
import { api, listInterviewSessions, getInterviewSession } from '../lib/api'
import ResumePicker from '../components/ResumePicker'
import { useToast } from '../components/ToastProvider'
import CustomDropdown from '../components/CustomDropdown'

export default function MockInterview() {
  const [sessionId, setSessionId] = useState(null)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [pastSessions, setPastSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('General')
  const [numQuestions, setNumQuestions] = useState(5)
  const { toast } = useToast()

  // Focus mode detection - hide distractions during active interview
  const isActiveInterview = sessionId && questions.length > 0 && !completed

  async function start() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) {
      toast('Please select a resume first', { type: 'error' })
      return
    }
    setLoading(true)
    try {
      const res = await api('/interview/start', {
        method: 'POST',
        body: JSON.stringify({ resumeId, role, numQuestions })
      })
      setSessionId(res.sessionId)
      setQuestions(res.questions)
      setIndex(res.currentIndex)
      setFeedback(null)
      setAnswer('')
      setCompleted(false)
      // Store session for focus mode detection
      sessionStorage.setItem('interviewSessionId', res.sessionId)
      toast('New interview session started', { type: 'info' })
    } catch (error) {
      toast('Failed to start interview session', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function submit() {
    if (!sessionId || !answer.trim()) return
    setLoading(true)
    try {
      const res = await api(`/interview/${sessionId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ answer })
      })
      setFeedback({ feedback: res.feedback, score: res.score })

      // Ensure next question is available locally and move index forward
      if (res.nextQuestion !== null) {
        setQuestions(prev => {
          const copy = [...prev]
          copy[res.nextIndex] = res.nextQuestion
          return copy
        })
      }
      setIndex(res.nextIndex)
      setAnswer('')

      if (res.nextQuestion === null) {
        setCompleted(true)
        toast('Session complete! Great job!', { type: 'success' })
        loadSessions()
      } else {
        toast('Answer submitted successfully', { type: 'success' })
      }
    } catch (error) {
      toast('Failed to submit answer', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex(prev => prev + 1)
      setFeedback(null)
      setAnswer('')
    }
  }

  // When moving to the next question, clear previous feedback/answer
  useEffect(() => {
    setFeedback(null)
    setAnswer('')
  }, [index])

  async function loadSessions() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) return
    try {
      const res = await listInterviewSessions(resumeId)
      setPastSessions(res.sessions || [])
    } catch (_) {}
  }

  useEffect(() => { loadSessions() }, [])

  const currentQuestion = questions[index]
  const progress = questions.length > 0 ? ((index + (feedback ? 1 : 0)) / questions.length) * 100 : 0

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-800'
    return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800'
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header - Hidden in focus mode */}
      {!isActiveInterview && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Mock Interview</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Practice with AI-powered interview questions</p>
          </div>
          <ResumePicker onChange={() => loadSessions()} />
        </div>
      )}

      {/* Interview Setup & Progress */}
      {!sessionId && (
        <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 mb-6 dark:border-white/10 dark:bg-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-500">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
            </svg>
            Start New Interview Session
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Role/Position</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Software Engineer, Product Manager"
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <CustomDropdown
                value={numQuestions}
                onChange={(value) => setNumQuestions(parseInt(value))}
                options={[
                  { value: 3, label: '3 Questions', description: 'Quick practice session (~15 mins)', icon: '⚡' },
                  { value: 5, label: '5 Questions', description: 'Standard interview length (~25 mins)', icon: '📋' },
                  { value: 8, label: '8 Questions', description: 'Comprehensive practice (~40 mins)', icon: '📚' },
                  { value: 10, label: '10 Questions', description: 'Full interview simulation (~50 mins)', icon: '🎯' }
                ]}
                label="Number of Questions"
                placeholder="Select question count..."
              />
            </div>
          </div>

          <button
            onClick={start}
            disabled={loading}
            className="btn btn-primary w-full md:w-auto px-8 py-3 text-lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Preparing Interview...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
                Start Interview
                </div>
            )}
          </button>
        </div>
      )}

      {/* Active Interview */}
      {sessionId && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Progress Bar - Hidden in focus mode */}
          {!isActiveInterview && (
            <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-4 mb-4 dark:border-white/10 dark:bg-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Interview Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Question {index + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className="flex-1 bg-white/60 backdrop-blur border border-white/40 rounded-2xl overflow-hidden dark:border-white/10 dark:bg-white/10 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {currentQuestion && (
                <>
                  {/* AI Question */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 via-indigo-500 to-coral flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      AI
                    </div>
                    <div className="flex-1 max-w-[85%]">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl rounded-tl-md p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            Question {index + 1}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{role}</span>
                        </div>
                        <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{currentQuestion}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Answer (if submitted and feedback exists OR if currently loading) */}
                  {(feedback || (loading && answer.trim())) && (
                    <>
                      <div className="flex items-start gap-3 justify-end">
                        <div className="flex-1 max-w-[85%]">
                          <div className="bg-primary-500 text-white rounded-2xl rounded-tr-md p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-primary-100">Your Answer</span>
                            </div>
                            <p className="leading-relaxed">{answer || "Your previous answer"}</p>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          U
                        </div>
                      </div>

                      {/* AI Analysis Loading or AI Feedback */}
                      <div className="flex items-start gap-3">
                        {loading ? (
                          // AI Analysis Loading Animation - Enhanced
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 relative overflow-hidden ai-gradient-shift shadow-2xl">
                            {/* Animated Background Layers */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 ai-pulse"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                            {/* Enhanced Neural Network Effect */}
                            <div className="absolute inset-0">
                              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full neural-spark shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0s' }}></div>
                              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-300 rounded-full neural-spark shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.3s' }}></div>
                              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-indigo-300 rounded-full neural-spark shadow-lg shadow-indigo-400/50" style={{ animationDelay: '0.6s' }}></div>
                              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-pink-300 rounded-full neural-spark shadow-lg shadow-pink-400/50" style={{ animationDelay: '0.9s' }}></div>
                              {/* Center neural core */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full ai-pulse shadow-lg shadow-white/50"></div>
                            </div>
                            {/* Enhanced AI Icon */}
                            <div className="relative z-10 ai-pulse">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-pulse drop-shadow-lg">
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.5" />
                                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2.5" />
                                <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-ping" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                        // AI Feedback Icon
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                              </svg>
                            </div>
                        )}
                        <div className="flex-1 max-w-[85%]">
                          {loading ? (
                            // AI Analysis Loading Content
                            <div className="bg-gradient-to-r from-purple-50/80 to-indigo-50/80 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl rounded-tl-md p-4 shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-purple-700 dark:text-purple-400 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                  AI Analyzing Response
                                </span>
                                <div className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-purple-400 rounded-full thinking-dots" style={{ animationDelay: '0ms' }}></div>
                                  <div className="w-1 h-1 bg-indigo-400 rounded-full thinking-dots" style={{ animationDelay: '200ms' }}></div>
                                  <div className="w-1 h-1 bg-cyan-400 rounded-full thinking-dots" style={{ animationDelay: '400ms' }}></div>
                                </div>
                              </div>

                              {/* Analysis Steps */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Processing natural language...</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Evaluating technical accuracy...</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Generating personalized feedback...</span>
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="mt-4">
                                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 rounded-full animate-pulse"></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                          // AI Feedback Content
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-2xl rounded-tl-md p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs font-medium text-green-700 dark:text-green-400">AI Feedback</span>
                                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getScoreColor(feedback.score)}`}>
                                {feedback.score}/100
                              </span>
                            </div>
                            <p className="text-green-900 dark:text-green-100 leading-relaxed mb-3">{feedback.feedback}</p>

                            {!completed && index < questions.length - 1 && (
                              <button
                                onClick={nextQuestion}
                                className="w-full btn btn-secondary mt-2 py-2 text-sm"
                              >
                                Continue to Next Question →
                              </button>
                            )}

                            {completed && (
                              <div className="text-center mt-3">
                                <div className="text-green-700 dark:text-green-400 font-medium mb-2">
                                  🎉 Interview Complete!
                                </div>
                                <button
                                  onClick={() => window.location.reload()}
                                  className="btn btn-primary"
                                >
                                  Start New Interview
                                </button>
                              </div>
                            )}
                              </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Answer Input (only show if no feedback yet) */}
            {currentQuestion && !feedback && (
              <div className="border-t border-white/40 dark:border-white/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    U
                  </div>
                  <span className="text-sm font-medium">Your Answer</span>
                </div>
                <div className="space-y-3">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here... Take your time to think through your response."
                    className="w-full p-4 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {answer.length > 0 ? `${answer.length} characters` : 'Start typing your answer...'}
                    </span>
                    <button
                      onClick={submit}
                      disabled={loading || !answer.trim()}
                      className="btn btn-primary px-6"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {/* Enhanced AI Brain Core */}
                            <div className="w-6 h-6 relative">
                              {/* Outer Pulse Ring */}
                              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping shadow-lg"></div>
                              {/* Middle Rotating Ring */}
                              <div className="absolute inset-0 rounded-full border-2 border-white/60 border-t-white animate-spin shadow-md"></div>
                              {/* Inner Core */}
                              <div className="absolute inset-1 rounded-full bg-white/90 animate-pulse shadow-inner"></div>
                              {/* Enhanced Neural Sparks */}
                              <div className="absolute -inset-2">
                                <div className="absolute top-0 left-1/2 w-1 h-2 bg-cyan-300 transform -translate-x-1/2 neural-spark shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.1s' }}></div>
                                <div className="absolute bottom-0 left-1/2 w-1 h-2 bg-purple-300 transform -translate-x-1/2 neural-spark shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.3s' }}></div>
                                <div className="absolute left-0 top-1/2 w-2 h-1 bg-indigo-300 transform -translate-y-1/2 neural-spark shadow-lg shadow-indigo-400/50" style={{ animationDelay: '0.5s' }}></div>
                                <div className="absolute right-0 top-1/2 w-2 h-1 bg-pink-300 transform -translate-y-1/2 neural-spark shadow-lg shadow-pink-400/50" style={{ animationDelay: '0.7s' }}></div>
                              </div>
                            </div>
                          </div>
                          <span className="relative font-semibold">
                            AI Analyzing
                            <span className="thinking-dots ml-1 inline-flex gap-0.5">
                              <span className="w-1 h-1 bg-white rounded-full thinking-dots" style={{ animationDelay: '0s' }}></span>
                              <span className="w-1 h-1 bg-white rounded-full thinking-dots" style={{ animationDelay: '0.2s' }}></span>
                              <span className="w-1 h-1 bg-white rounded-full thinking-dots" style={{ animationDelay: '0.4s' }}></span>
                            </span>
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Submit Answer
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Past Sessions - Hidden in focus mode */}
      {!isActiveInterview && pastSessions.length > 0 && (
        <div className="mt-6 bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 dark:border-white/10 dark:bg-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" />
            </svg>
            Recent Sessions
          </h3>
          <div className="grid gap-3">
            {pastSessions.slice(0, 3).map(session => (
              <div
                key={session._id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{session.role || 'General Interview'}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full border text-xs ${session.isCompleted
                      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800'
                      : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800'
                      }`}>
                      {session.isCompleted ? 'Completed' : `Question ${(session.currentIndex || 0) + 1}`}
                    </span>
                  </div>
                </div>
                <button
                  className="btn btn-ghost text-sm px-3 py-1"
                  onClick={async () => {
                    try {
                      const full = await getInterviewSession(session._id)
                      const sess = full.session
                      setSessionId(sess._id)
                      setQuestions(sess.questions)
                      setIndex(sess.currentIndex)
                      setFeedback(null)
                      setAnswer('')
                      setCompleted(sess.isCompleted)
                      toast('Session loaded', { type: 'info' })
                    } catch (error) {
                      toast('Failed to load session', { type: 'error' })
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}