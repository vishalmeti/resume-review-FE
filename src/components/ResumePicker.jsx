import { useEffect, useState, useMemo } from 'react'
import { listResumes } from '../lib/api'

export default function ResumePicker({ value, onChange }) {
  const [resumes, setResumes] = useState([])
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(() => sessionStorage.getItem('resumeId') || '')

  const isControlled = useMemo(() => typeof value !== 'undefined', [value])
  const selected = isControlled ? value : selectedId

  useEffect(() => {
    async function load() {
      try {
        const res = await listResumes()
        setResumes(res.resumes || [])
      } catch (e) {
        setError(e.message || 'Failed to load resumes')
      }
    }
    load()
  }, [])

  function select(id) {
    sessionStorage.setItem('resumeId', id)
    onChange && onChange(id)
    if (!isControlled) setSelectedId(id)
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Resume</label>
      <select
        className="border rounded-lg px-2 py-1 bg-white/80 dark:bg-white/10 dark:text-gray-100 dark:border-white/10"
        value={selected}
        onChange={(e) => select(e.target.value)}
      >
        <option value="">Select…</option>
        {resumes.map(r => (
          <option key={r._id} value={r._id}>
            {(r.filename || r.name || 'Untitled')} · {new Date(r.createdAt).toLocaleDateString()}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}


