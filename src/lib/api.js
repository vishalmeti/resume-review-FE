const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  })
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    
    // If token is invalid, clear it and redirect to login
    if (res.status === 401 && token) {
      localStorage.removeItem('token');
      sessionStorage.clear();
      window.location.href = '/login';
    }
    
    throw new Error(errorData.error || 'Request failed')
  }
  
  return res.json()
}

export async function uploadResume(fileOrText) {
  const token = localStorage.getItem('token');
  const headers = {};
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const form = new FormData()
  form.append('file', fileOrText)
  const res = await fetch(`${BASE_URL}/resume/upload`, { 
    method: 'POST', 
    headers,
    body: form 
  })
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    
    // If token is invalid, clear it and redirect to login
    if (res.status === 401 && token) {
      localStorage.removeItem('token');
      sessionStorage.clear();
      window.location.href = '/login';
    }
    
    throw new Error(errorData.error || 'Upload failed')
  }
  
  return res.json()
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


