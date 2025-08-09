import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadResume } from '../lib/api'

export default function Onboarding() {
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleFiles(files) {
    setError('')
    const file = files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const { resume } = await uploadResume(file)
      sessionStorage.setItem('resumeId', resume._id)
      navigate('/jd')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Your <span className="ai-text">AI Career Co‑Pilot</span>
        </h1>
        <p className="text-gray-600 text-lg">Upload your resume, paste a JD, and let AI create a tailored interview plan, learning path, and job search workflow.</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">Resume Parsing</span>
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">JD Match</span>
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">Mock Interviews</span>
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">Learning Plan</span>
        </div>
        <div className="flex gap-3">
          <label className={`btn btn-primary cursor-pointer sheen ${loading ? 'opacity-80' : ''}`}>
            {loading ? 'Parsing…' : 'Upload Resume (PDF)'}
            <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFiles(e.target.files)} />
          </label>
          <button className="btn btn-secondary" onClick={() => navigate('/jd')}>Paste JD</button>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>
      <div>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
          className={`card h-72 flex items-center justify-center text-center border-2 border-dashed transition ${dragging ? 'border-primary-500 bg-white/70' : 'border-white/60'}`}
        >
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-500 text-white flex items-center justify-center shadow-soft">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="text-lg font-semibold">Drag & Drop your Resume</div>
            <div className="text-gray-500">We’ll parse it with AI and build your path forward</div>
          </div>
        </div>
      </div>
    </div>
  )
}


