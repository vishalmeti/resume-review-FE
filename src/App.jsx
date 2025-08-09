import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ResumeUpload from './pages/ResumeUpload'
import JDInput from './pages/JDInput'
import MockInterview from './pages/MockInterview'
import LearningPlan from './pages/LearningPlan'
import JobTracker from './pages/JobTracker'
import Settings from './pages/Settings'
import InterviewSessions from './pages/InterviewSessions'

function Nav({ theme, onToggleTheme, onMobileMenuToggle, isMobileNavOpen }) {
  const location = useLocation()
  const { user, logout } = useAuth()

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
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden mobile-nav-toggle p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className={`text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isMobileNavOpen ? 'rotate-45' : ''}`}
            >
              {isMobileNavOpen ? (
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <Link className="flex items-center gap-3" to="/">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-indigo-500 to-coral text-white flex items-center justify-center shadow-soft">AI</div>
          <span className="font-semibold">Career Navigator</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hidden sm:inline">AI Online</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Secondary navigation items - Hidden on mobile */}
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

          {/* User info and actions - Hidden on mobile */}
          {user && (
            <>
              <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.username}
                </span>
                <button
                  onClick={logout}
                  className="btn btn-ghost text-sm px-3 py-1"
                  title="Sign out"
                >
                  Sign out
                </button>
              </div>
            </>
          )}

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

function AppContent() {
  const location = useLocation()

  // Initialize theme from storage immediately to prevent flicker
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark' || saved === 'light') {
        return saved
      }
    } catch (e) {
      console.warn('Could not access localStorage for theme')
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Mobile navigation state
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Detect if we're in focus mode (active interview)
  const isInterviewFocusMode = location.pathname === '/interview' &&
    (location.search.includes('sessionId') || sessionStorage.getItem('interviewSessionId'))
  const { isAuthenticated, user, logout } = useAuth()

  // Secondary/utility navigation items for mobile nav
  const secondaryLinks = [
    {
      to: '/interview-sessions', label: 'Sessions', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      )
    },
    {
      to: '/settings', label: 'Settings', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1 1 0 0 1 .2 1.1l-1 1.8a1 1 0 0 1-1 .5l-1.9-.2a6.9 6.9 0 0 1-1.1.6L13 20a1 1 0 0 1-1 0l-1.6-.9a6.9 6.9 0 0 1-1.1-.6l-1.9.2a1 1 0 0 1-1-.5l-1-1.8a1 1 0 0 1 .2-1.1l1.2-1.5c.06.42.06.86 0 1.3l1.2 1.5Z" stroke="currentColor" strokeWidth="2" /></svg>
      )
    },
  ]

  // Apply theme to <html> element immediately on mount and when changed
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      console.warn('Could not save theme to localStorage')
    }
  }, [theme])

  // Apply theme immediately on component mount to prevent flicker
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, []) // Run only once on mount

  // Create a more robust theme toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      return newTheme
    })
  }

  // Close mobile nav when route changes
  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [location.pathname])

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileNavOpen && !event.target.closest('.mobile-nav') && !event.target.closest('.mobile-nav-toggle')) {
        setIsMobileNavOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileNavOpen])

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
    // {
    //   to: '/plan', label: 'Learning Plan', icon: (
    //   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M4 6h16M6 10h12M8 14h8M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    // ) },
    {
      to: '/jobs', label: 'Job Tracker', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M3 7h18v12H3z" stroke="currentColor" strokeWidth="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/></svg>
      )
    },
  ]

  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  const isLanding = location.pathname === '/'

  // Auth pages (login/register)
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )
  }

  // Landing page - redirect to dashboard if authenticated
  if (isLanding) {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />
    }

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
      {!isInterviewFocusMode && <Nav theme={theme} onToggleTheme={toggleTheme} onMobileMenuToggle={() => setIsMobileNavOpen(!isMobileNavOpen)} isMobileNavOpen={isMobileNavOpen} />}

      {/* Mobile Navigation Sidebar */}
      {!isInterviewFocusMode && (
        <>
          {/* Backdrop */}
          {isMobileNavOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileNavOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div className={`fixed top-0 left-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-r border-gray-200/50 dark:border-gray-700/50 z-50 md:hidden mobile-nav transform transition-transform duration-300 ease-in-out ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 via-indigo-500 to-coral text-white flex items-center justify-center shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">Career Navigator</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Resume Review</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-600 dark:text-gray-400">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-auto p-4">
                {/* Main Navigation */}
                <div className="mb-6">
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-3 uppercase tracking-wider font-medium">Main Features</div>
                  <div className="space-y-1">
                    {mainLinks.map(link => {
                      const active = location.pathname.startsWith(link.to)
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${active
                            ? 'bg-primary-100 text-primary-900 dark:bg-primary-950/50 dark:text-primary-200 font-medium shadow-sm'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                          onClick={() => setIsMobileNavOpen(false)}
                        >
                          <div className={`flex-shrink-0 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
                            {link.icon}
                          </div>
                          <span className="font-medium">{link.label}</span>
                          {active && (
                            <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Secondary Navigation */}
                <div className="mb-6">
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-3 uppercase tracking-wider font-medium">Quick Access</div>
                  <div className="space-y-1">
                    {secondaryLinks.map(link => {
                      const active = location.pathname.startsWith(link.to)
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${active
                            ? 'bg-primary-100 text-primary-900 dark:bg-primary-950/50 dark:text-primary-200 font-medium shadow-sm'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                          onClick={() => setIsMobileNavOpen(false)}
                        >
                          <div className={`flex-shrink-0 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
                            {link.icon}
                          </div>
                          <span className="font-medium">{link.label}</span>
                          {active && (
                            <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* AI Tips Card */}
                <div className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-950/30 dark:to-indigo-950/30 border border-primary-200/50 dark:border-primary-800/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M9.663 17h4.673M12 3v1m6.364-.636-.707.707M21 12h-1M17.657 17.657l-.707-.707M12 21v-1m-6.364.636.707-.707M3 12h1m2.343-5.657.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-primary-900 dark:text-primary-200">AI Tips</div>
                  </div>
                  <div className="text-xs text-primary-700 dark:text-primary-300 leading-relaxed">
                    Upload your resume and analyze job descriptions to get personalized learning recommendations powered by AI.
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
                {user && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.username}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Account</div>
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setIsMobileNavOpen(false)
                        }}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-950/50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-gray-600 dark:text-gray-400">
                    {theme === 'dark' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={`flex-1 overflow-hidden ${isInterviewFocusMode ? 'px-2 py-2' : 'grid md:grid-cols-[260px_1fr] gap-6 px-4 sm:px-6 lg:px-8 py-6'}`}>
        {!isInterviewFocusMode && (
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
        )}

        {/* Focus Mode Header (minimal) */}
        {isInterviewFocusMode && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold ai-text">ResumeReview</div>
                <div className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 text-xs rounded-full font-medium">
                  🎯 Interview Focus Mode
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600 dark:text-gray-400">
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
                      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
                      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
                      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600 dark:text-gray-400">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Exit Focus
                </button>
              </div>
            </div>
          </div>
        )}

        <main className={`page-animate overflow-auto ${isInterviewFocusMode ? 'pt-16' : ''}`}>
          <Routes>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <ResumeUpload />
              </ProtectedRoute>
            } />
            <Route path="/jd" element={
              <ProtectedRoute>
                <JDInput />
              </ProtectedRoute>
            } />
            <Route path="/interview" element={
              <ProtectedRoute>
                <MockInterview />
              </ProtectedRoute>
            } />
            <Route path="/interview-sessions" element={
              <ProtectedRoute>
                <InterviewSessions />
              </ProtectedRoute>
            } />
            <Route path="/plan" element={
              <ProtectedRoute>
                <LearningPlan />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute>
                <JobTracker />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
      <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-4 border-t border-white/20">Built by Vishal Meti ✨</footer>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}