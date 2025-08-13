"use client";

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';
import Message from '../components/Message';
import PublicRoute from '../components/PublicRoute';
import { Button } from '../components/ui/Button';
import AuthLayout from '../components/AuthLayout';

// Regex for basic email or phone number validation
const emailOrPhoneRegex = /^(?:\d{10,12}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!emailOrPhoneRegex.test(emailOrPhone)) {
      setMessage({ text: 'Please enter a valid email or phone number.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: 'Logging in...', type: 'info' });
    const errorResponse = await login({ emailOrPhone, password, rememberMe });
    setLoading(false);

    if (errorResponse) {
      setMessage({ text: errorResponse.error || errorResponse.message || 'Login failed', type: 'error' });
    } else {
      // On success, the AuthContext will redirect, so clear any message.
      setMessage({ text: '', type: '' });
    }
  };

  const labelClasses = "absolute left-2 top-3.5 text-gray-400 text-base transition-all pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1";
  const inputClasses = "peer h-12 w-full border border-gray-300 rounded-md bg-transparent px-4 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none";

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-gray-800">Login to your Safary account</p>
          </div>
          <div className="my-4">
            {message.text && <Message message={message.text} type={message.type as 'success' | 'error' | 'info'} />}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="relative">
              <input id="emailOrPhone" name="emailOrPhone" type="text" required value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="emailOrPhone" className={labelClasses}>Email or Phone</label>
            </div>
            <div className="relative">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="password" className={labelClasses}>Password</label>
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
                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-black">Remember me</label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" title="Forgot Password" className="font-medium text-indigo-800 hover:text-indigo-600">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          <div className="text-sm text-center text-gray-800">
            Don&apos;t have an account?{' '}
            <Link href="/signup/role-selection" title="Sign Up" className="font-medium text-indigo-800 hover:text-indigo-600">
              Sign up
            </Link>
          </div>
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
