import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="space-y-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Your <span className="ai-text">AI Career Co‑Pilot</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Upload your resume, analyze any job description, practice mock interviews, and follow a personalized learning plan.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="btn btn-primary sheen" onClick={() => navigate('/upload')}>Get Started</button>
          <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>Explore Dashboard</button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60 dark:bg-white/10 dark:border-white/20">Resume Parsing</span>
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60 dark:bg-white/10 dark:border-white/20">JD Match</span>
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60 dark:bg-white/10 dark:border-white/20">Mock Interviews</span>
          <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60 dark:bg-white/10 dark:border-white/20">Learning Plan</span>
        </div>
      </div>
    </div>
  )
}


