"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close account dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountMenuRef]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link href="/" className="text-gray-800 text-xl font-bold hover:text-gray-700">
              Safary
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#features" className="py-2 px-3 text-gray-600 hover:text-gray-800">Features</Link>
            <Link href="#about" className="py-2 px-3 text-gray-600 hover:text-gray-800">About Us</Link>
            <div className="relative" ref={accountMenuRef}>
              <Button onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} variant="ghost" className="flex items-center space-x-1">
                <span>Account</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mt-4 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link href="#features" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Features</Link>
          <Link href="#about" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">About Us</Link>
          <Link href="/login" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Login</Link>
          <Link href="/signup" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Register</Link>
        </div>
      </div>
    </nav>
  );
}
