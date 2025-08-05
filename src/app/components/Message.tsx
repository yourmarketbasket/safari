"use client";

import React from 'react';

interface MessageProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const messageConfig = {
  success: {
    bgColor: 'bg-green-100',
    borderColor: 'border-green-400',
    textColor: 'text-green-700',
    icon: (
      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    bgColor: 'bg-red-100',
    borderColor: 'border-red-400',
    textColor: 'text-red-700',
    icon: (
      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  },
  info: {
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-700',
    icon: (
       <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v.01a1 1 0 102 0V7zm-1 2.99a1 1 0 00-1 1V14a1 1 0 102 0v-3.01a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export default function Message({ message, type }: MessageProps) {
  if (!message) {
    return null;
  }

  const config = messageConfig[type];

  return (
    <div className={`rounded-md ${config.bgColor} p-4 border ${config.borderColor}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${config.textColor}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
