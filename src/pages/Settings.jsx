export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto card">
      <div className="font-semibold mb-2">Settings</div>
      <div className="space-y-4 text-sm text-gray-600">
        <div>
          <div className="font-medium text-gray-900">Privacy</div>
          <div>All data stays in your account database. You can export and delete anytime.</div>
        </div>
        <div>
          <div className="font-medium text-gray-900">Export</div>
          <button className="btn btn-secondary mt-2">Export JSON</button>
        </div>
      </div>
    </div>
  )
}


