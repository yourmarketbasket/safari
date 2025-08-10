"use client";

import { Button } from './ui/Button';

interface InactiveTabProps {
  onTakeOver: () => void;
}

export default function InactiveTab({ onTakeOver }: InactiveTabProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600 mb-6">The application is currently running in another tab.</p>
        <Button onClick={onTakeOver}>
          Take Over
        </Button>
      </div>
    </div>
  );
}
