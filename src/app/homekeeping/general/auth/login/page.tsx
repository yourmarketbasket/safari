"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Message from '@/app/components/Message';
import PublicRoute from '@/app/components/PublicRoute';

// Regex for basic email or phone number validation
const emailOrPhoneRegex = /^(?:\d{10,12}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();
  // force


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhoneRegex.test(emailOrPhone)) {
        setError('Please enter a valid email or phone number.');
        return;
    }

    setLoading(true);
    try {
      await login({ emailOrPhone, password });
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-xl">
          <div className="text-center">
              <h1 className="text-3xl font-bold">Superuser Login</h1>
              <p className="mt-2 text-gray-400">Access the Superuser Dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="relative">
              <input id="emailOrPhone" name="emailOrPhone" type="text" required value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} placeholder=" " className="block w-full px-4 py-3 bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 peer"/>
              <label htmlFor="emailOrPhone" className="absolute left-4 top-3 text-gray-400 transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs">Email or Phone</label>
            </div>
            <div className="relative">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className="block w-full px-4 py-3 bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 peer"/>
              <label htmlFor="password" className="absolute left-4 top-3 text-gray-400 transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.118 3.558-5.558 6.818-6.505M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.542 12c-1.274 4.057-5.064 7-9.542 7-1.096 0-2.144-.196-3.138-.55M2.458 12c.946-3.118 3.558-5.558 6.818-6.505" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Remember me</label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" title="Forgot Password" className="font-medium text-blue-500 hover:text-blue-400">
                  Forgot your password?
                </Link>
              </div>
            </div>
            {error && <Message message={error} type="error" />}
            <div>
              <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-all duration-300">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/homekeeping/general/auth/signup" title="Sign Up" className="font-medium text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}
