import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useToast } from '../components/ToastProvider'
import CustomDropdown from '../components/CustomDropdown'

const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Accepted', 'On Hold']

const statusConfig = {
  'Applied': { color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800', icon: '📋' },
  'Interviewing': { color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800', icon: '💼' },
  'Offer': { color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800', icon: '🎉' },
  'Rejected': { color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800', icon: '❌' },
  'Accepted': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800', icon: '✅' },
  'On Hold': { color: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800', icon: '⏸️' }
}

export default function JobTracker() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({
    company: '',
    title: '',
    status: 'Applied',
    link: '',
    notes: '',
    followUpDate: '',
    salary: '',
    location: ''
  })
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function load() {
    try {
      const res = await api('/jobs')
      setItems(res.items || [])
    } catch (error) {
      toast('Failed to load jobs', { type: 'error' })
    }
  }

  useEffect(() => { load() }, [])

  async function add() {
    if (!form.company.trim() || !form.title.trim()) {
      toast('Please fill in company and title', { type: 'error' })
      return
    }

    setIsSubmitting(true)
    try {
      await api('/jobs', { method: 'POST', body: JSON.stringify(form) })
      setForm({
        company: '',
        title: '',
        status: 'Applied',
        link: '',
        notes: '',
        followUpDate: '',
        salary: '',
        location: ''
      })
      setShowForm(false)
      load()
      toast('Job application added successfully!', { type: 'success' })
    } catch (error) {
      toast('Failed to add job', { type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function update(id, patch) {
    try {
      await api(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(patch) })
      load()
      toast('Job updated', { type: 'success' })
    } catch (error) {
      toast('Failed to update job', { type: 'error' })
    }
  }

  async function remove(id) {
    if (!confirm('Are you sure you want to delete this job application?')) return

    try {
      await api(`/jobs/${id}`, { method: 'DELETE' })
      load()
      toast('Job application deleted', { type: 'success' })
    } catch (error) {
      toast('Failed to delete job', { type: 'error' })
    }
  }

  const getStats = () => {
    const stats = statuses.reduce((acc, status) => {
      acc[status] = items.filter(item => item.status === status).length
      return acc
    }, {})
    return stats
  }

  const stats = getStats()

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Job Application Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage and track your job applications in one place
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
          </svg>
          Add Job
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statuses.map(status => (
          <div
            key={status}
            className="bg-white/60 backdrop-blur border border-white/40 rounded-xl p-4 text-center dark:border-white/10 dark:bg-white/10"
          >
            <div className="text-2xl mb-1">{statusConfig[status].icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats[status] || 0}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{status}</div>
          </div>
        ))}
      </div>

      {/* Add Job Form */}
      {showForm && (
        <div className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 mb-6 dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Add New Job Application</h2>
            <button
              onClick={() => setShowForm(false)}
              className="btn btn-ghost p-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company *</label>
              <input
                placeholder="e.g. Google, Microsoft"
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <CustomDropdown
                value={form.status}
                onChange={value => setForm({ ...form, status: value })}
                options={statuses.map(status => ({
                  value: status,
                  label: status,
                  icon: <span className="text-lg">{statusConfig[status].icon}</span>,
                  description: `Mark application as ${status.toLowerCase()}`
                }))}
                label="Status"
                placeholder="Select status..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                placeholder="e.g. San Francisco, Remote"
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Salary Range</label>
              <input
                placeholder="e.g. $120k - $150k"
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={form.salary}
                onChange={e => setForm({ ...form, salary: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Follow-up Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={form.followUpDate}
                onChange={e => setForm({ ...form, followUpDate: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium mb-2">Job Posting Link</label>
              <input
                placeholder="https://..."
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                placeholder="Add any notes about the application, interview process, etc..."
                rows={3}
                className="w-full px-3 py-2 border border-white/40 rounded-xl bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="btn btn-primary px-6"
              onClick={add}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                'Add Job Application'
              )}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Job Applications List */}
      <div className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">No Applications Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Start tracking your job applications by clicking "Add Job" above
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                Add Your First Job
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item._id}
                className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-6 dark:border-white/10 dark:bg-white/10 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{item.company}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusConfig[item.status].color}`}>
                        {statusConfig[item.status].icon} {item.status}
                      </span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">{item.title}</div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          {item.location}
                        </div>
                      )}
                      {item.salary && (
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          {item.salary}
                        </div>
                      )}
                      {item.link && (
                        <a
                          className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline underline-offset-2"
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" />
                            <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" />
                            <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          View Job Posting
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <CustomDropdown
                      value={item.status}
                      onChange={value => update(item._id, { status: value })}
                      options={statuses.map(status => ({
                        value: status,
                        label: status,
                        icon: <span className="text-sm">{statusConfig[status].icon}</span>
                      }))}
                      size="sm"
                      className="min-w-40"
                    />
                    <button
                      className="btn btn-ghost p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
                      onClick={() => remove(item._id)}
                      title="Delete application"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" />
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {item.notes && (
                  <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-3 mb-3">
                    <div className="text-sm text-gray-700 dark:text-gray-300">{item.notes}</div>
                  </div>
                )}

                {item.followUpDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">
                      Follow-up: {new Date(item.followUpDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}