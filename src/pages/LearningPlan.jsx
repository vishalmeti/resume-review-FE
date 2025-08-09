import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import ResumePicker from '../components/ResumePicker'
import { useToast } from '../components/ToastProvider'

export default function LearningPlan() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function generate() {
    const resumeId = sessionStorage.getItem('resumeId')
    if (!resumeId) return alert('Upload a resume first')
    setLoading(true)
    try {
      const res = await api('/learning-plan/generate', { method: 'POST', body: JSON.stringify({ resumeId, role: 'General' }) })
      setPlan(res.plan)
      toast('Learning plan updated', { type: 'success' })
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
    const res = await api('/learning-plan/update-status', { method: 'POST', body: JSON.stringify({ planId: plan._id, index: idx, status }) })
    setPlan(res.plan)
    toast(`Marked as ${status}`, { type: 'info' })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <ResumePicker />
        <button onClick={generate} className="btn btn-primary">{loading ? 'Generating…' : 'Generate / Refresh Plan'}</button>
      </div>
      {!plan && <div className="text-gray-500">No plan yet. Generate one to get started.</div>}
      {plan && (
        <div className="grid md:grid-cols-2 gap-4">
          {plan.items.map((item, idx) => (
            <div className="card" key={idx}>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{item.title}</div>
                <span className="text-xs px-2 py-1 rounded-lg bg-white/70 border border-white/60 dark:bg-white/10 dark:border-white/10 dark:text-gray-100">{item.durationWeeks} wks</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">{item.description}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(item.resources || []).map((r, i) => (
                  <a className="text-xs text-primary-700 underline" key={i} href={r} target="_blank" rel="noreferrer">Resource {i+1}</a>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => updateStatus(idx, 'In Progress')} className="btn btn-secondary">Start</button>
                <button onClick={() => updateStatus(idx, 'Done')} className="btn btn-accent">Done</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


