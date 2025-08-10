import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-coral/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            AI-Powered Career Platform
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
            Your <span className="ai-text bg-gradient-to-r from-primary-600 via-indigo-600 to-coral bg-clip-text text-transparent">AI Career Co‑Pilot</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your job search with AI-powered resume analysis, smart job matching, personalized mock interviews, and tailored learning plans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="btn btn-primary sheen px-8 py-4 text-lg font-semibold"
              onClick={() => navigate('/register')}
            >
              Start Your AI Journey
            </button>
            <button
              className="btn btn-ghost px-8 py-4 text-lg"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-white/60 dark:border-gray-700/60 font-medium">
              🧠 AI Resume Analysis
            </span>
            <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-white/60 dark:border-gray-700/60 font-medium">
              🎯 Smart Job Matching
            </span>
            <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-white/60 dark:border-gray-700/60 font-medium">
              💬 Mock Interviews
            </span>
            <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-white/60 dark:border-gray-700/60 font-medium">
              📚 Learning Plans
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto pt-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">10k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-coral">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interviews Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">4.9★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="ai-text">Land Your Dream Job</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive tools to accelerate your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Resume Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI extracts key skills, experience, and achievements from your resume with 95% accuracy
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Job Description Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Compare your resume against any job posting and get detailed match analysis
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Mock Interviews</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Practice with AI-powered interviews tailored to your target role and experience level
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get customized learning plans to bridge skill gaps and enhance your profile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="ai-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="card p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-4">Upload Your Resume</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Simply upload your resume in any format. Our AI will analyze and extract all relevant information.
                </p>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600 dark:text-blue-400">
                    <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="card p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-4">Analyze Job Descriptions</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Paste any job description and get instant analysis of how well your resume matches the requirements.
                </p>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-2xl flex items-center justify-center mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-600 dark:text-indigo-400">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="card p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-4">Practice & Improve</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Take mock interviews, follow learning plans, and track your progress to land your dream job.
                </p>
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600 dark:text-green-400">
                    <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 dark:from-gray-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="ai-text">Our Platform</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of professionals who have accelerated their careers with AI
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">95% Match Accuracy</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our advanced AI algorithms provide industry-leading accuracy in resume-job matching
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every analysis, interview, and learning plan is tailored to your specific background and goals
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get comprehensive analysis and feedback in seconds, not hours or days
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-coral to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your data is encrypted and secure. We never share your information with third parties
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-950/30 dark:to-indigo-950/30">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Join 10,000+ Professionals</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Who have already transformed their careers with our AI platform
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">85%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2.5x</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Faster Job Search</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 dark:from-gray-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="ai-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real professionals who transformed their careers with our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Mitchell</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Frontend Developer → Senior Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The AI analysis helped me identify missing skills. Within 3 months, I landed a senior role with 40% salary increase."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 dark:text-green-400">★ 5.0</span>
                <span className="text-gray-500">• 3 months ago</span>
              </div>
            </div>

            {/* Story 2 */}
            <div className="card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  RJ
                </div>
                <div>
                  <h4 className="font-semibold">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data Analyst → ML Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The personalized learning plan was game-changing. Mock interviews built my confidence for technical rounds."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 dark:text-green-400">★ 5.0</span>
                <span className="text-gray-500">• 1 month ago</span>
              </div>
            </div>

            {/* Story 3 */}
            <div className="card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  EL
                </div>
                <div>
                  <h4 className="font-semibold">Emma Lopez</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Manager → Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "AI helped me translate my marketing experience into product skills. Got my dream PM role at a top tech company."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 dark:text-green-400">★ 5.0</span>
                <span className="text-gray-500">• 2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your <span className="ai-text">Career Analytics</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Track your progress with detailed insights and performance metrics
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Real-time Career Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Skill Match Score</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Based on target roles</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">87%</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9l4 4v-4h1a2 2 0 0 0 2-2V7Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Interview Performance</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Average score</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">92%</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Learning Progress</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Skills completed</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">78%</div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-6">Career Growth Trajectory</h3>
              <div className="space-y-4">
                {/* Progress Bars */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Technical Skills</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Communication</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Leadership</span>
                    <span>73%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Problem Solving</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Industry <span className="ai-text">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay ahead with AI-powered market analysis and salary insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Insight Card 1 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Salary Trends</h3>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">+15%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average salary increase in tech roles</p>
            </div>

            {/* Insight Card 2 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Market</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2.3M</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Open positions in tech sector</p>
            </div>

            {/* Insight Card 3 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill Demand</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">AI/ML</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most in-demand skill for 2024</p>
            </div>

            {/* Insight Card 4 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hiring Speed</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">14 days</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average time to hire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by <span className="ai-text">Advanced AI</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built with cutting-edge technologies for the best user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tech Card 1 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Natural Language Processing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced NLP models for accurate resume parsing and job description analysis
              </p>
            </div>

            {/* Tech Card 2 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                ML algorithms for skill matching, interview scoring, and personalized recommendations
              </p>
            </div>

            {/* Tech Card 3 */}
            <div className="card p-6 text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Live performance tracking and career insights with instant feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 dark:from-gray-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Compare <span className="ai-text">Our Value</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how our AI-powered platform compares to traditional career services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Traditional Services */}
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Traditional Services</h3>
              <div className="text-4xl font-bold text-gray-400 mb-6">$500+</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Manual resume review</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Limited job matches</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>No interview practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Generic advice</span>
                </li>
              </ul>
            </div>

            {/* Our Platform */}
            <div className="card p-8 text-center border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">BEST VALUE</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our AI Platform</h3>
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-6">$29</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">per month</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>AI-powered analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Unlimited job matches</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>AI mock interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Personalized learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Real-time analytics</span>
                </li>
              </ul>
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>

            {/* Competitors */}
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Other Platforms</h3>
              <div className="text-4xl font-bold text-gray-400 mb-6">$99+</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Basic AI features</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Limited customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>No interview practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Generic templates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-12 bg-gradient-to-br from-primary-500 to-indigo-600 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="ai-text">Transform Your Career</span>?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have already accelerated their job search with AI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/register')}
              >
                Start Free Trial
              </button>
              <button
                className="btn btn-ghost border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-semibold">Career Navigator</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Built by Vishal Meti • Powered by AI • Transforming careers worldwide
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  )
}


