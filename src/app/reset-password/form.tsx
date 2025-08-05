"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import authService from '../services/auth.service';
import Link from 'next/link';
import Message from '../components/Message';

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

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";
  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="relative">
          <input id="otp" name="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder=" " className={inputClasses} />
          <label htmlFor="otp" className={labelClasses}>One-Time Password (OTP)</label>
        </div>
        <div className="relative">
          <input id="newPassword" name="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder=" " className={inputClasses} />
          <label htmlFor="newPassword" className={labelClasses}>New Password</label>
        </div>
        <div className="relative">
          <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" " className={inputClasses} />
          <label htmlFor="confirmPassword" className={labelClasses}>Confirm New Password</label>
        </div>
        {error && <Message message={error} type="error" />}
        {message && <Message message={message} type="success" />}
        <div>
          <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </form>
      <div className="text-sm text-center">
        <Link href="/login" title="Login" className="font-medium text-indigo-800 hover:text-indigo-600">Back to Login</Link>
      </div>
    </div>
  );
}
