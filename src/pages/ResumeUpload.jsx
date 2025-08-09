import { useState } from 'react'
import { uploadResume } from '../lib/api'
import { useToast } from '../components/ToastProvider'

export default function ResumeUpload() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Drop your PDF here or click to browse')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const { toast } = useToast()

  async function handleFiles(fileList) {
    setError('')
    const files = Array.from(fileList || [])
    if (files.length === 0) return

    // Validate file types
    const invalidFiles = files.filter(file => file.type !== 'application/pdf')
    if (invalidFiles.length > 0) {
      setError('Only PDF files are allowed')
      toast('Only PDF files are allowed', { type: 'error' })
      return
    }

    for (const file of files) {
      try {
        setIsUploading(true)
        setUploadedFile(file)
        setMessage(`Processing ${file.name}...`)
        setProgress(20)

        const { resume } = await uploadResume(file)
        setProgress(80)
        sessionStorage.setItem('resumeId', resume._id)
        setProgress(100)

        setMessage(`Successfully processed ${file.name}!`)
        toast(`Successfully processed ${file.name}!`, { type: 'success' })

        // Reset after a delay
        setTimeout(() => {
          setProgress(0)
          setIsUploading(false)
          setUploadedFile(null)
          setMessage('Drop your PDF here or click to browse')
        }, 2000)

      } catch (e) {
        setProgress(0)
        setIsUploading(false)
        setUploadedFile(null)
        setError(e.message || 'Upload failed')
        setMessage('Drop your PDF here or click to browse')
        toast(e.message || 'Upload failed', { type: 'error' })
      }
    }
  }

  const getProgressColor = () => {
    if (progress === 100) return 'from-green-500 to-emerald-500'
    if (progress > 50) return 'from-blue-500 to-indigo-500'
    return 'from-primary-500 to-indigo-500'
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Resume Upload</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Upload your resume to get started with AI-powered career analysis</p>
      </div>

      {/* Main Upload Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-8 dark:border-white/10 dark:bg-white/10">

            {/* Upload Zone */}
            <div
              className={`relative ${isUploading ? 'h-96' : 'h-64'} border-2 border-dashed rounded-2xl flex items-center justify-center transition-all duration-300 ${isUploading
                ? 'border-primary-300 bg-primary-50/50 dark:border-primary-600 dark:bg-primary-950/30'
                : 'border-gray-300 bg-gray-50/50 hover:border-primary-400 hover:bg-primary-50/30 dark:border-gray-600 dark:bg-gray-800/30 dark:hover:border-primary-500'
                }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
            >
              <div className="text-center px-6">
                {isUploading ? (
                  <div className="space-y-4">
                    {/* Enhanced PDF Processing Animation */}
                    <div className="relative w-24 h-24 mx-auto">
                      {/* Floating PDF Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg transform animate-bounce" style={{ animationDuration: '1s' }}>
                          <div className="w-full h-full relative overflow-hidden rounded-lg">
                            {/* PDF Icon */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" />
                                <polyline points="14,2 14,8 20,8" fill="white" />
                                <text x="12" y="16" fontSize="6" textAnchor="middle" fill="white" fontWeight="bold">PDF</text>
                              </svg>
                            </div>

                            {/* Scanning lines */}
                            <div className="absolute inset-0 overflow-hidden">
                              <div className="absolute w-full h-0.5 bg-white/60 animate-ping" style={{
                                top: '25%',
                                animationDelay: '0s',
                                animationDuration: '2s'
                              }}></div>
                              <div className="absolute w-full h-0.5 bg-white/60 animate-ping" style={{
                                top: '50%',
                                animationDelay: '0.5s',
                                animationDuration: '2s'
                              }}></div>
                              <div className="absolute w-full h-0.5 bg-white/60 animate-ping" style={{
                                top: '75%',
                                animationDelay: '1s',
                                animationDuration: '2s'
                              }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Processing Particles */}
                      <div className="absolute -top-2 left-1/2 w-2 h-2 bg-primary-500 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                      <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute -bottom-2 left-1/3 w-1 h-1 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute top-1/3 -left-3 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>

                      {/* Rotating Analysis Ring */}
                      <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 border-r-blue-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                      <div className="absolute inset-2 border-2 border-transparent border-b-green-500 border-l-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>

                    {/* Processing Status */}
                    <div>
                      <div className="font-semibold text-lg bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {message}
                      </div>

                      {uploadedFile && (
                        <div className="bg-white/60 dark:bg-white/10 rounded-xl p-3 border border-white/40 dark:border-white/10 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                              PDF
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{uploadedFile.name}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Processing...
                              </div>
                            </div>
                            <div className="text-primary-500">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-spin">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Processing Steps */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Extracting text content...</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <span>Parsing skills and experience...</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                          <span>Building AI profile...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
                        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{message}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Supports: PDF files up to 10MB
                      </div>
                    </div>
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-950/30 dark:border-red-800">
                        <div className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            {(isUploading || progress > 0) && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {progress === 100 ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className="text-sm font-semibold">Upload Complete!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {progress < 30 ? 'Uploading file...' :
                            progress < 70 ? 'Processing content...' :
                              progress < 100 ? 'Finalizing...' : 'Complete!'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{progress}%</span>
                  </div>
                </div>

                {/* Enhanced Progress Bar with Glow Effect */}
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-700 ease-out relative overflow-hidden`}
                      style={{ width: `${progress}%` }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>

                      {/* Progress sparkles */}
                      {progress > 10 && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress milestones */}
                  <div className="flex justify-between mt-2 px-1">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${progress >= 25 ? 'bg-primary-500 scale-110' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${progress >= 50 ? 'bg-blue-500 scale-110' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${progress >= 75 ? 'bg-purple-500 scale-110' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${progress >= 100 ? 'bg-green-500 scale-110' : 'bg-gray-300'}`}></div>
                  </div>

                  <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>Upload</span>
                    <span>Process</span>
                    <span>Parse</span>
                    <span>Complete</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <label className="btn btn-primary flex-1 cursor-pointer justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" />
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  disabled={isUploading}
                />
              </label>

              <button
                className="btn btn-ghost flex-1 justify-center"
                onClick={() => {
                  setProgress(0)
                  setError('')
                  setMessage('Drop your PDF here or click to browse')
                  setUploadedFile(null)
                  setIsUploading(false)
                }}
                disabled={isUploading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-2">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" />
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" strokeWidth="2" />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 dark:border-white/10 dark:bg-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-500">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" />
                <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" />
              </svg>
              Upload Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Use recent resume</div>
                    <div className="text-gray-600 dark:text-gray-400">Upload your most current version for best results</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">PDF format only</div>
                    <div className="text-gray-600 dark:text-gray-400">We support PDF files for optimal text extraction</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Clear formatting</div>
                    <div className="text-gray-600 dark:text-gray-400">Avoid complex layouts for better AI analysis</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">File size limit</div>
                    <div className="text-gray-600 dark:text-gray-400">Maximum 10MB per file</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}