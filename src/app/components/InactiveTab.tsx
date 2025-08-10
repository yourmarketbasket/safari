"use client";

interface InactiveTabProps {
  onTakeOver: () => void;
}

export default function InactiveTab({ onTakeOver }: InactiveTabProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl text-gray-800 mb-4">This tab is inactive</h1>
        <p className="text-gray-600 mb-6">The application is currently running in another tab.</p>
        <button
          onClick={onTakeOver}
          className="px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Take Over
        </button>
      </div>
    </div>
  );
}
