"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link href="/" className="text-gray-800 text-xl font-bold hover:text-gray-700">
              SafarEasy
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#features" className="py-2 px-3 text-gray-600 hover:text-gray-800">Features</Link>
            <Link href="#about" className="py-2 px-3 text-gray-600 hover:text-gray-800">About Us</Link>
            <Link href="/login" className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Login
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mt-4 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <Link href="#features" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Features</Link>
          <Link href="#about" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">About Us</Link>
          <Link href="/login" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Login</Link>
        </div>
      </div>
    </nav>
  );
}
