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
    if (!resumeId) return alert('Select or upload a resume first')
    setLoading(true)
    try {
      const res = await api('/jd/match', { method: 'POST', body: JSON.stringify({ resumeId, jdText: jd, role }) })
      setResult(res)
      sessionStorage.setItem('match', JSON.stringify(res))
      toast('Match analysis complete', { type: 'success' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <div className="mb-3">
          <ResumePicker value={resumeId} onChange={setResumeId} />
        </div>
        <div className="font-semibold mb-2">Paste Job Description</div>
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g., Frontend Engineer)" className="w-full mb-2 border rounded-lg px-3 py-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10" />
        <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste JD here…" rows={10} className="w-full border rounded-xl p-3 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10"></textarea>
        <button onClick={onMatch} className={`btn btn-primary mt-3 ${loading ? 'opacity-90 sheen' : ''}`} disabled={loading || !resumeId || !jd.trim()}>{loading ? 'Analyzing…' : 'Analyze Match'}</button>
      </div>
      <div className="card min-h-[240px]">
        <div className="font-semibold mb-2">Match Result</div>
        {loading ? (
          <div className="flex items-center gap-6">
            <div className="ai-loader" aria-label="AI analyzing" />
            <div>
              <div className="h-4 w-40 bg-white/70 rounded mb-2 animate-pulse" />
              <div className="h-3 w-56 bg-white/60 rounded mb-2 animate-pulse" />
              <div className="h-3 w-48 bg-white/60 rounded animate-pulse" />
            </div>
          </div>
        ) : result ? (
          <div>
            <div className="text-4xl font-bold ai-text">{result.matchPercentage}%</div>
            <div className="text-sm text-gray-600">{result.summary}</div>
            <div className="mt-4">
              <div className="font-medium">Missing Skills</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {(result.missingSkills || []).map((s, i) => (
                  <span key={i} className="px-2 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 text-xs border border-orange-200">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Run analysis to see your match</div>
        )}
      </div>
    </div>
  )
}


