import React, { useState } from 'react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { Lock } from 'lucide-react';

export function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');

      // Reauthenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setError('Current password is incorrect');
      } else {
        setError('Failed to update password. Please try again.');
      }
      console.error('Error updating password:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#002F49] text-white px-6 py-3 rounded-lg font-semibold 
                 hover:bg-[#003a5d] transition-colors shadow-md hover:shadow-lg
                 transform hover:-translate-y-0.5 duration-200 disabled:opacity-50
                 disabled:cursor-not-allowed"
      >
        {loading ? 'Updating Password...' : 'Update Password'}
      </button>
    </form>
  );
}