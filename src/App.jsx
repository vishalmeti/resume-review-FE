import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ResumeUpload from './pages/ResumeUpload'
import JDInput from './pages/JDInput'
import MockInterview from './pages/MockInterview'
import LearningPlan from './pages/LearningPlan'
import JobTracker from './pages/JobTracker'
import Settings from './pages/Settings'
import InterviewSessions from './pages/InterviewSessions'

function Nav({ theme, onToggleTheme }) {
  const location = useLocation()

  // Secondary/utility navigation items for header
  const secondaryLinks = [
    { to: '/interview-sessions', label: 'Sessions', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    )
    },
    { to: '/settings', label: 'Settings', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1 1 0 0 1 .2 1.1l-1 1.8a1 1 0 0 1-1 .5l-1.9-.2a6.9 6.9 0 0 1-1.1.6L13 20a1 1 0 0 1-1 0l-1.6-.9a6.9 6.9 0 0 1-1.1-.6l-1.9.2a1 1 0 0 1-1-.5l-1-1.8a1 1 0 0 1 .2-1.1l1.2-1.5c.06.42.06.86 0 1.3l1.2 1.5Z" stroke="currentColor" strokeWidth="2" /></svg>
    ) },
  ]

  return (
    <header className="sticky top-0 z-20 bg-white/60 backdrop-blur border-b border-white/60 dark:bg-slate-950/60 dark:border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link className="flex items-center gap-3" to="/">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-indigo-500 to-coral text-white flex items-center justify-center shadow-soft">AI</div>
          <span className="font-semibold">Career Navigator</span>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">AI Online</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Secondary navigation items */}
          <div className="hidden md:flex items-center gap-1">
            {secondaryLinks.map(link => {
              const active = location.pathname.startsWith(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${active ? 'nav-link-active' : ''} flex items-center gap-2 px-3 py-2 rounded-lg text-sm`}
                  title={link.label}
                >
                  {link.icon}
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          {/* Theme toggle */}
          <button
            className="btn btn-ghost p-2"
            aria-label="Toggle color theme"
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" stroke="currentColor" strokeWidth="2" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  const location = useLocation()
  const [theme, setTheme] = useState('light')

  // Initialize theme from storage or system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const initial = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(initial)
  }, [])

  // Apply theme to <html> element for Tailwind dark mode
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  // Main navigation items for sidebar
  const mainLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M3 12h8V3H3v9Zm0 9h8v-7H3v7Zm10 0h8V12h-8v9Zm0-19v7h8V2h-8Z" fill="currentColor"/></svg>
    ) },
    {
      to: '/upload', label: 'Upload Resume', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ) },
    {
      to: '/jd', label: 'Job Analysis', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ) },
    {
      to: '/interview', label: 'Mock Interview', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2"/></svg>
    ) },
    {
      to: '/plan', label: 'Learning Plan', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M4 6h16M6 10h12M8 14h8M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ) },
    {
      to: '/jobs', label: 'Job Tracker', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M3 7h18v12H3z" stroke="currentColor" strokeWidth="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/></svg>
      )
    },
  ]

  const isLanding = location.pathname === '/'

  if (isLanding) {
    return (
      <div className="h-screen app-bg bg-grid flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="ai-orb orb-1" />
          <div className="ai-orb orb-2" />
        </div>
        <main className="page-animate flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <div className="h-screen app-bg bg-grid flex flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ai-orb orb-1" />
        <div className="ai-orb orb-2" />
      </div>
      <Nav theme={theme} onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))} />
      <div className="flex-1 overflow-hidden grid md:grid-cols-[260px_1fr] gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <aside className="hidden md:block overflow-auto">
          <div className="card p-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-1">Main Features</div>
            <div className="flex flex-col">
              {mainLinks.map(link => {
                const active = location.pathname.startsWith(link.to)
                return (
                  <Link key={link.to} to={link.to} className={`nav-link ${active ? 'nav-link-active' : ''} flex items-center gap-2`}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="card mt-4">
            <div className="text-sm font-semibold mb-1">AI Tips</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Use Job Analysis to analyze match and generate a personalized learning plan.</div>
          </div>
        </aside>
        <main className="page-animate overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/jd" element={<JDInput />} />
            <Route path="/interview" element={<MockInterview />} />
            <Route path="/interview-sessions" element={<InterviewSessions />} />
            <Route path="/plan" element={<LearningPlan />} />
            <Route path="/jobs" element={<JobTracker />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
      <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-4 border-t border-white/20">Built with AI ✨</footer>
    </div>
  )
}