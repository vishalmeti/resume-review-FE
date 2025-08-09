import { useEffect, useMemo, useState } from 'react'
import ResumePicker from '../components/ResumePicker'
import { listInterviewSessions, getInterviewSession } from '../lib/api'

export default function InterviewSessions() {
  const [sessions, setSessions] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [loadingList, setLoadingList] = useState(false)
  const [loadingSession, setLoadingSession] = useState(false)
  const [error, setError] = useState('')

  async function loadSessions() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) {
      setSessions([])
      setSelectedId(null)
      setSelected(null)
      return
    }
    setLoadingList(true)
    setError('')
    try {
      const res = await listInterviewSessions(resumeId)
      setSessions(res.sessions || [])
      if ((res.sessions || []).length > 0) {
        setSelectedId(res.sessions[0]._id)
      } else {
        setSelectedId(null)
        setSelected(null)
      }
    } catch (e) {
      setError(e.message || 'Failed to load sessions')
    } finally {
      setLoadingList(false)
    }
  }

  async function loadSelected(id) {
    if (!id) return
    setLoadingSession(true)
    try {
      const res = await getInterviewSession(id)
      setSelected(res.session)
    } catch (e) {
      setError(e.message || 'Failed to load session')
    } finally {
      setLoadingSession(false)
    }
  }

  useEffect(() => { loadSessions() }, [])
  useEffect(() => { if (selectedId) loadSelected(selectedId) }, [selectedId])

  const avgScore = useMemo(() => {
    if (!selected || !selected.history || selected.history.length === 0) return 0
    const sum = selected.history.reduce((acc, h) => acc + (h.score || 0), 0)
    return Math.round(sum / selected.history.length)
  }, [selected])

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
          <h1 className="text-2xl font-bold">Interview Sessions</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Review your mock interview performance</p>
        </div>
        <ResumePicker onChange={() => loadSessions()} />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="flex-1 grid md:grid-cols-[320px_1fr] gap-6 min-h-0">
        {/* Sessions List */}
        <div className="flex flex-col bg-white/60 backdrop-blur border border-white/40 rounded-2xl dark:border-white/10 dark:bg-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/40 dark:border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="2" />
                <path d="M4 6h16l-1 10c0 1-1 2-2 2H7c-1 0-2-1-2-2L4 6Z" stroke="currentColor" strokeWidth="2" />
              </svg>
              Interview History
            </h2>
            {sessions.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sessions.length} session{sessions.length !== 1 ? 's' : ''} found</p>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            {loadingList && (
              <div className="p-4 text-center">
                <div className="ai-loader mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Loading sessions...</p>
              </div>
            )}

            {!loadingList && sessions.length === 0 && (
              <div className="p-6 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 opacity-40">
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 6h16l-1 10c0 1-1 2-2 2H7c-1 0-2-1-2-2L4 6Z" stroke="currentColor" strokeWidth="2" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">No interview sessions yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Start a mock interview to see your history here</p>
              </div>
            )}

            <div className="p-2">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 mb-2 ${selectedId === session._id
                      ? 'bg-primary-50 border-2 border-primary-200 dark:bg-primary-950/30 dark:border-primary-700'
                      : 'hover:bg-white/60 dark:hover:bg-white/5 border-2 border-transparent'
                    }`}
                  onClick={() => setSelectedId(session._id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{session.role || 'General Interview'}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(session.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-1 rounded-full border ${session.isCompleted
                          ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800'
                          : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800'
                        }`}>
                        {session.isCompleted ? 'Complete' : `Q${(session.currentIndex || 0) + 1}`}
                      </span>
                      {session.history && session.history.length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {session.history.length} answered
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Session Details - Chat Interface */}
        <div className="flex flex-col bg-white/60 backdrop-blur border border-white/40 rounded-2xl dark:border-white/10 dark:bg-white/10 overflow-hidden">
          {selected ? (
            <>
              {/* Session Header */}
              <div className="p-4 border-b border-white/40 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">{selected.role || 'General Interview'}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(selected.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getScoreColor(avgScore)}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                      </svg>
                      {avgScore}/100
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average Score</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {loadingSession ? (
                  <div className="text-center py-8">
                    <div className="ai-loader mx-auto mb-3"></div>
                    <p className="text-sm text-gray-500">Loading conversation...</p>
                  </div>
                ) : (
                  selected.questions.map((question, idx) => {
                    const history = selected.history[idx]
                    return (
                      <div key={idx} className="space-y-3">
                        {/* Question Bubble */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 via-indigo-500 to-coral flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                            AI
                          </div>
                          <div className="flex-1 max-w-[80%]">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl rounded-tl-md p-4 shadow-sm">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Question {idx + 1}</span>
                              </div>
                              <p className="text-gray-900 dark:text-gray-100">{question}</p>
                            </div>
                          </div>
                        </div>

                        {/* Answer and Feedback */}
                        {history ? (
                          <div className="space-y-3 ml-11">
                            {/* User Answer */}
                            <div className="flex items-start gap-3 justify-end">
                              <div className="flex-1 max-w-[80%]">
                                <div className="bg-primary-500 text-white rounded-2xl rounded-tr-md p-4 shadow-sm">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium text-primary-100">Your Answer</span>
                                  </div>
                                  <p>{history.answer}</p>
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                U
                              </div>
                            </div>

                            {/* AI Feedback */}
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                                </svg>
                              </div>
                              <div className="flex-1 max-w-[80%]">
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-2xl rounded-tl-md p-4 shadow-sm">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-green-700 dark:text-green-400">AI Feedback</span>
                                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getScoreColor(history.score)}`}>
                                      {history.score}/100
                                    </span>
                                  </div>
                                  <p className="text-green-900 dark:text-green-100">{history.feedback}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="ml-11 flex items-start gap-3 justify-end opacity-50">
                            <div className="flex-1 max-w-[80%]">
                              <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl rounded-tr-md p-4">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No answer provided yet</p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm font-semibold flex-shrink-0">
                              ?
                            </div>
                          </div>
                        )}

                        {/* Divider between questions */}
                        {idx < selected.questions.length - 1 && (
                          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 opacity-40">
                  <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Select a Session</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose an interview session from the left to view the conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}