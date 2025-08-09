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
  const { toast } = useToast()

  async function start() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) return alert('Upload a resume first')
    setLoading(true)
    try {
      const res = await api('/interview/start', { method: 'POST', body: JSON.stringify({ resumeId, role: 'General', numQuestions: 5 }) })
      setSessionId(res.sessionId)
      setQuestions(res.questions)
      setIndex(res.currentIndex)
      setFeedback(null)
      setAnswer('')
      setCompleted(false)
      toast('New interview session started', { type: 'info' })
    } finally {
      setLoading(false)
    }
  }

  async function submit() {
    if (!sessionId) return
    setLoading(true)
    try {
      const res = await api(`/interview/${sessionId}/answer`, { method: 'POST', body: JSON.stringify({ answer }) })
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
        toast('Session complete!', { type: 'success' })
        // Refresh past sessions list after completion
        loadSessions()
      }
    } finally {
      setLoading(false)
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

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex gap-3 items-center">
        <ResumePicker />
        <button onClick={start} className="btn btn-primary">{loading ? 'Preparing…' : 'Start New Session'}</button>
      </div>
      {currentQuestion && (
        <div className="card">
          <div className="text-sm text-gray-500">Question {index + 1} of {questions.length}</div>
          <div className="text-lg font-semibold mt-1">{currentQuestion}</div>
          <textarea className="w-full border rounded-xl p-3 mt-3 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10" rows={6} placeholder="Type your answer…" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <button onClick={submit} disabled={loading || !answer.trim()} className="btn btn-secondary mt-3">Submit Answer</button>
        </div>
      )}
      {feedback && (
        <div className="card bg-green-50/70">
          <div className="font-semibold">Feedback</div>
          <div className="text-sm mt-1">{feedback.feedback}</div>
          <div className="text-sm text-gray-500 mt-1">Score: {feedback.score}/100</div>
        </div>
      )}
      {completed && (
        <div className="card">
          <div className="font-semibold">Session complete!</div>
          <div className="text-sm text-gray-500">Review your answers and feedback below.</div>
        </div>
      )}
      {!currentQuestion && !loading && sessionId && !completed && (
        <div className="card">
          <div className="font-semibold">Session complete!</div>
          <div className="text-sm text-gray-500">Start a new session anytime.</div>
        </div>
      )}

      {pastSessions.length > 0 && (
        <div className="card">
          <div className="font-semibold mb-2">Past Sessions</div>
          <ul className="space-y-2">
            {pastSessions.map(s => (
              <li key={s._id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.role || 'General'}</div>
                  <div className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleString()} · {s.isCompleted ? 'Completed' : `In progress (${(s.currentIndex||0)+1})`}</div>
                </div>
                <button className="btn btn-secondary" onClick={async () => {
                  const full = await getInterviewSession(s._id)
                  const sess = full.session
                  setSessionId(sess._id)
                  setQuestions(sess.questions)
                  setIndex(sess.currentIndex)
                  setFeedback(null)
                  setAnswer('')
                  setCompleted(sess.isCompleted)
                }}>Open</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


