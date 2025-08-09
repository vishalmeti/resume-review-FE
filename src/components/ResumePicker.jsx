import { useEffect, useState, useMemo } from 'react'
import { listResumes } from '../lib/api'
import CustomDropdown from './CustomDropdown'

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

  // Transform resumes into dropdown options
  const options = [
    { value: '', label: 'Select Resume...', description: 'Choose a resume to analyze' },
    ...resumes.map(resume => ({
      value: resume._id,
      label: resume.filename || resume.name || 'Untitled',
      description: `Uploaded ${new Date(resume.createdAt).toLocaleDateString()}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" />
          <polyline points="14,2 14,8 20,8" fill="white" />
          <text x="12" y="16" fontSize="6" textAnchor="middle" fill="white" fontWeight="bold">PDF</text>
        </svg>
      )
    }))
  ]

  return (
    <div className="flex flex-col gap-2">
      <CustomDropdown
        value={selected}
        onChange={select}
        options={options}
        placeholder="Select Resume..."
        label="Resume"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
            <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="2" />
            <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="9" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="2" />
          </svg>
        }
        className="min-w-64"
      />
      {error && (
        <div className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}