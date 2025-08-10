"use client";

import { useState } from 'react';
import authService from '../services/auth.service';
import Link from 'next/link';
import Message from '../components/Message';
import { Button } from '../components/ui/Button';

const emailOrPhoneRegex = /^(?:\d{10,12}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export default function ForgotPasswordPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!emailOrPhoneRegex.test(emailOrPhone)) {
        setError('Please enter a valid email or phone number.');
        return;
    }

    setLoading(true);
    try {
        await authService.forgotPassword({ emailOrPhone });
        setMessage('If an account with that email or phone exists, an OTP has been sent.');
    } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";
  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
            <p className="mt-2 text-gray-800">We&apos;ll send a recovery link to your email or phone.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="relative">
            <input id="emailOrPhone" name="emailOrPhone" type="text" required value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="emailOrPhone" className={labelClasses}>Email or Phone</label>
          </div>

          {error && <Message message={error} type="error" />}
          {message && <Message message={message} type="info" />}

          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending...' : 'Send Recovery Link'}
            </Button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link href="/login" title="Login" className="font-medium text-indigo-800 hover:text-indigo-600">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
