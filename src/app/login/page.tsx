"use client";

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';
import Message from '../components/Message';

// Regex for basic email or phone number validation
const emailOrPhoneRegex = /^(?:\d{10,12}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!emailOrPhoneRegex.test(emailOrPhone)) {
        setError('Please enter a valid email or phone number.');
        return;
    }

    setLoading(true);
    try {
      await login({ emailOrPhone, password });
      setSuccess('Login successful! Redirecting...');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-800">Login to your Safary account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="relative">
            <input id="emailOrPhone" name="emailOrPhone" type="text" required value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="emailOrPhone" className={labelClasses}>Email or Phone</label>
          </div>
          <div className="relative">
            <input id="password" name="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="password" className={labelClasses}>Password</label>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="remember-me" className="ml-2 block text-sm text-black">Remember me</label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" title="Forgot Password" className="font-medium text-indigo-800 hover:text-indigo-600">
                Forgot your password?
              </Link>
            </div>
          </div>
          {error && <Message message={error} type="error" />}
          {success && <Message message={success} type="success" />}
          <div>
            <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-800">
          Don&apos;t have an account?{' '}
          <Link href="/signup" title="Sign Up" className="font-medium text-indigo-800 hover:text-indigo-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
