"use client";

import { FiLoader } from 'react-icons/fi';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <FiLoader className="animate-spin text-purple-600 text-6xl" />
    </div>
  );
}
