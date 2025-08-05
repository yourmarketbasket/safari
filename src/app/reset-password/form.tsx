"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import authService from '../services/auth.service';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const initialOtp = searchParams.get('otp') || '';

  const [otp, setOtp] = useState(initialOtp);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
        await authService.resetPassword({ otp, newPassword });
        setMessage('Your password has been reset successfully. You can now log in.');
    } catch (err) {
        setError('Failed to reset password. Please check your OTP and try again.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-900">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">One-Time Password (OTP)</label>
          <input id="otp" name="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} className="block w-full px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <input id="newPassword" name="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block w-full px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full px-3 py-2 mt-1" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}
        <div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </form>
      <div className="text-sm text-center">
        <a href="/login" title="Login" className="font-medium text-indigo-600 hover:text-indigo-500">Back to Login</a>
      </div>
    </div>
  );
}
