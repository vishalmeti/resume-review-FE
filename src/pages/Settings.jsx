import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateProfile({ email: email || undefined });

    if (result.success) {
      toast('Profile updated successfully', { type: 'success' });
    } else {
      toast(result.error, { type: 'error' });
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <div className="font-semibold mb-4">Profile Settings</div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={user?.username || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="card">
        <div className="font-semibold mb-2">Privacy & Data</div>
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Data Security</div>
            <div>All your data stays in your private account database. You have full control over your information.</div>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Export Data</div>
            <div className="mb-2">Download all your data in JSON format for backup or migration.</div>
            <button className="btn btn-secondary">Export JSON</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="font-semibold mb-2">Account Actions</div>
        <div className="space-y-4">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">Sign Out</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              You'll be redirected to the login page.
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-accent"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


