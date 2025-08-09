import { useState } from 'react'
import { uploadResume } from '../lib/api'
import { useToast } from '../components/ToastProvider'

export default function ResumeUpload() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Drop PDF(s) to begin')
  const [error, setError] = useState('')
  const { toast } = useToast()

  async function handleFiles(fileList) {
    setError('')
    const files = Array.from(fileList || [])
    if (files.length === 0) return
    for (const file of files) {
      try {
        setMessage(`Uploading ${file.name}…`)
        setProgress(20)
        const { resume } = await uploadResume(file)
        setProgress(80)
        sessionStorage.setItem('resumeId', resume._id)
        setProgress(100)
        setMessage(`Parsed ${file.name} successfully!`)
        toast(`Parsed ${file.name} successfully!`, { type: 'success' })
      } catch (e) {
        setProgress(0)
        setError(e.message || 'Upload failed')
        setMessage('Drop PDF(s) to begin')
        toast(e.message || 'Upload failed', { type: 'error' })
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="card">
        <div className="text-lg font-semibold mb-2">Upload & Parse</div>
        <div
          className="h-40 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500 bg-white/50 dark:bg-white/10 dark:text-gray-300 dark:border-white/10"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        >
          <div className="text-center">
            <div>{message}</div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-coral transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 flex justify-between">
          <label className="btn btn-primary cursor-pointer">
            Choose PDF
            <input type="file" className="hidden" accept="application/pdf" multiple onChange={(e) => handleFiles(e.target.files)}/>
          </label>
        </div>
      </div>
    </div>
  )
}


