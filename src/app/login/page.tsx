"use client";

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ emailOrPhone, password, mfaCode: mfaCode || undefined });
      // On success, the AuthContext will redirect
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Login to your Safary account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">Email or Phone</label>
            <input id="emailOrPhone" name="emailOrPhone" type="text" required value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700">MFA Code</label>
            <input id="mfaCode" name="mfaCode" type="text" value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" title="Forgot Password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" title="Sign Up" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
