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

  return (
    <div className="grid md:grid-cols-3 md:grid-rows-[auto_1fr] gap-6 h-[calc(100dvh-96px)] overflow-hidden">
      <div className="md:col-span-3 flex items-center justify-between">
        <ResumePicker onChange={() => loadSessions()} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>
      <div className="card h-full overflow-auto">
        <div className="font-semibold mb-2">Sessions</div>
        {loadingList && <div className="text-sm text-gray-500">Loading…</div>}
        {!loadingList && sessions.length === 0 && (
          <div className="text-sm text-gray-500">No sessions for selected resume.</div>
        )}
        <ul className="divide-y">
          {sessions.map((s) => (
            <li key={s._id} className={`py-2 cursor-pointer ${selectedId === s._id ? 'bg-white/70 rounded-lg px-2' : ''}`} onClick={() => setSelectedId(s._id)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.role || 'General'}</div>
                  <div className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleString()}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-lg border ${s.isCompleted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {s.isCompleted ? 'Completed' : `In progress (${(s.currentIndex||0)+1})`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-2 min-h-0">
        <div className="card h-full overflow-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Session Details</div>
              <div className="text-xs text-gray-500">{selected ? (selected.role || 'General') : '—'}</div>
            </div>
            {selected && (
              <div className="text-sm text-gray-700">Avg Score: <span className="font-semibold">{avgScore}</span></div>
            )}
          </div>
          {loadingSession && <div className="text-sm text-gray-500 mt-2">Loading session…</div>}
          {!loadingSession && selected && (
            <div className="mt-3 space-y-3">
              {selected.questions.map((q, idx) => {
                const h = selected.history[idx]
                return (
                  <div key={idx} className="border rounded-xl p-3 bg-white/60 dark:bg-white/10">
                    <div className="text-xs text-gray-500">Question {idx + 1}</div>
                    <div className="font-medium mt-1">{q}</div>
                    {h ? (
                      <div className="mt-2 space-y-2">
                        <div>
                          <div className="text-xs text-gray-500">Your Answer</div>
                          <div className="text-sm">{h.answer}</div>
                        </div>
                        <div className="bg-green-50/70 rounded-lg p-2">
                          <div className="text-xs text-gray-600">Feedback</div>
                          <div className="text-sm">{h.feedback}</div>
                          <div className="text-xs text-gray-500 mt-1">Score: {h.score}/100</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 mt-2">No answer yet.</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          {!loadingSession && !selected && (
            <div className="text-sm text-gray-500 mt-2">Select a session to view details.</div>
          )}
        </div>
      </div>
    </div>
  )
}


