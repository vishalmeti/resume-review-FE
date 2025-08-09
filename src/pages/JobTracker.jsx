import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useToast } from '../components/ToastProvider'

const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Accepted', 'On Hold']

export default function JobTracker() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ company: '', title: '', status: 'Applied', link: '', notes: '', followUpDate: '' })
  const { toast } = useToast()

  async function load() {
    const res = await api('/jobs')
    setItems(res.items)
  }
  useEffect(() => { load() }, [])

  async function add() {
    if (!form.company || !form.title) return
    await api('/jobs', { method: 'POST', body: JSON.stringify(form) })
    setForm({ company: '', title: '', status: 'Applied', link: '', notes: '', followUpDate: '' })
    load()
    toast('Job added', { type: 'success' })
  }

  async function update(id, patch) {
    await api(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(patch) })
    load()
    toast('Updated', { type: 'info' })
  }

  async function remove(id) {
    await api(`/jobs/${id}`, { method: 'DELETE' })
    load()
    toast('Deleted', { type: 'success' })
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card">
        <div className="font-semibold mb-2">Add Job</div>
        <input placeholder="Company" className="w-full border rounded-lg px-3 py-2 mb-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} />
        <input placeholder="Title" className="w-full border rounded-lg px-3 py-2 mb-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <select className="w-full border rounded-lg px-3 py-2 mb-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:border-white/10" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input placeholder="Link" className="w-full border rounded-lg px-3 py-2 mb-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10" value={form.link} onChange={e=>setForm({...form, link:e.target.value})} />
        <input type="date" className="w-full border rounded-lg px-3 py-2 mb-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:border-white/10" value={form.followUpDate} onChange={e=>setForm({...form, followUpDate:e.target.value})} />
        <textarea placeholder="Notes" rows={3} className="w-full border rounded-lg px-3 py-2 mb-2 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:placeholder-gray-400 dark:border-white/10" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
        <button className="btn btn-primary w-full" onClick={add}>Add</button>
      </div>
      <div className="md:col-span-2 space-y-3">
        {items.map(item => (
          <div key={item._id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{item.company} — {item.title}</div>
                <div className="text-xs text-gray-500">{item.link ? <a className="underline" href={item.link} target="_blank" rel="noreferrer">Job Link</a> : 'No link'}</div>
              </div>
              <select className="border rounded-lg px-2 py-1 bg-white/60 dark:bg-white/10 dark:text-gray-100 dark:border-white/10" value={item.status} onChange={e=>update(item._id, { status: e.target.value })}>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {item.notes && <div className="text-sm text-gray-600 mt-2">{item.notes}</div>}
            <div className="text-xs text-gray-500 mt-2">Follow-up: {item.followUpDate ? new Date(item.followUpDate).toLocaleDateString() : '—'}</div>
            <div className="mt-3 flex gap-2">
              <button className="btn btn-accent" onClick={()=>remove(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


