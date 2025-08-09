import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="ai-orb orb-1" />
        <div className="ai-orb orb-2" />
      </div>
      <section className="min-h-[70vh] flex items-center justify-center text-center px-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Your <span className="ai-text">AI Career Co‑Pilot</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Upload your resume, analyze any job description, practice mock interviews, and follow a personalized learning plan.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="btn btn-primary sheen" onClick={() => navigate('/upload')}>Get Started</button>
            <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>Explore Dashboard</button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600">
            <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">Resume Parsing</span>
            <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">JD Match</span>
            <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">Mock Interviews</span>
            <span className="px-3 py-1 rounded-full bg-white/60 border border-white/60">Learning Plan</span>
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[{t:'Upload',d:'Parse resume with AI'},{t:'Analyze',d:'Match to JD'},{t:'Practice',d:'Mock interviews'},{t:'Learn',d:'Personal plan'},{t:'Track',d:'Job applications'},{t:'Improve',d:'Insights & tips'}].map((f, i) => (
            <div key={i} className="card">
              <div className="text-lg font-semibold">{f.t}</div>
              <div className="text-sm text-gray-600">{f.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


