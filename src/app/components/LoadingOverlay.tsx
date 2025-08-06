"use client";

import { FiLoader } from 'react-icons/fi';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <FiLoader className="animate-spin text-white text-6xl" />
    </div>
  );
}
