import { useEffect, useState } from 'react'
import { api, listInterviewSessions, getInterviewSession } from '../lib/api'
import ResumePicker from '../components/ResumePicker'
import { useToast } from '../components/ToastProvider'

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mock Interview</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Practice with AI-powered interview questions</p>
        </div>
        <ResumePicker onChange={() => loadSessions()} />
      </div>

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
              <label className="block text-sm font-medium mb-2">Number of Questions</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={3}>3 Questions (Quick)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={8}>8 Questions (Comprehensive)</option>
                <option value={10}>10 Questions (Full)</option>
              </select>
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
          {/* Progress Bar */}
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

                  {/* User Answer (if feedback exists) */}
      {feedback && (
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

                      {/* AI Feedback */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div className="flex-1 max-w-[85%]">
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
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Analyzing...
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

      {/* Past Sessions */}
      {pastSessions.length > 0 && (
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