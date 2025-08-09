const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export async function api(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed')
  return res.json()
}

export async function uploadResume(fileOrText) {
  // if (fileOrText instanceof File) {
    const form = new FormData()
    form.append('file', fileOrText)
    const res = await fetch(`${BASE_URL}/resume/upload`, { method: 'POST', body: form })
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Upload failed')
    return res.json()
  // } else {
  //   return api('/resume/upload', { method: 'POST', body: JSON.stringify({ text: fileOrText }) })
  // }
}

export async function listResumes() {
  return api('/resume')
}

export async function listInterviewSessions(resumeId) {
  const q = resumeId ? `?resumeId=${encodeURIComponent(resumeId)}` : ''
  return api(`/interview${q}`)
}

export async function getInterviewSession(sessionId) {
  return api(`/interview/session/${sessionId}`)
}


