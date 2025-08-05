"use client";

import { useState } from 'react';

export default function PolicyManagementPage() {
  // Mock state for form inputs
  const [fareMultiplier, setFareMultiplier] = useState(1.1);
  const [systemFee, setSystemFee] = useState(10);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update policies
    alert('Policies would be updated now.');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Policy Management</h1>
      <p className="mt-2 text-gray-600">Define and manage system-wide rules and policies.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Fare Adjustment Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-900">Fare Adjustment Rules</h2>
          <p className="mt-1 text-sm text-gray-600">Set multipliers for dynamic fare adjustments.</p>
          <div className="mt-4">
            <label htmlFor="fareMultiplier" className="block text-sm font-medium text-gray-700">
              Fuel Price Multiplier
            </label>
            <input
              type="number"
              id="fareMultiplier"
              value={fareMultiplier}
              onChange={(e) => setFareMultiplier(parseFloat(e.target.value))}
              className="block w-full max-w-xs px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              step="0.01"
            />
             <p className="mt-2 text-xs text-gray-500">e.g., 1.1 for a 10% increase when fuel prices are high.</p>
          </div>
        </div>

        {/* System Fee Structure Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-900">System Fee Structure</h2>
          <p className="mt-1 text-sm text-gray-600">Define the fee deducted per ticket.</p>
           <div className="mt-4">
            <label htmlFor="systemFee" className="block text-sm font-medium text-gray-700">
              Fee per Ticket (KES)
            </label>
            <input
              type="number"
              id="systemFee"
              value={systemFee}
              onChange={(e) => setSystemFee(parseInt(e.target.value))}
              className="block w-full max-w-xs px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="10"
              max="100"
            />
            <p className="mt-2 text-xs text-gray-500">A value between 10 and 100 KES.</p>
          </div>
        </div>

        {/* Loyalty Program Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-900">Loyalty Program Rules</h2>
          <p className="mt-1 text-sm text-gray-600">Define how loyalty points are earned.</p>
          <div className="mt-4">
            <label htmlFor="loyaltyPoints" className="block text-sm font-medium text-gray-700">
              Points per 100 KES spent
            </label>
            <input
              type="number"
              id="loyaltyPoints"
              value={loyaltyPoints}
              onChange={(e) => setLoyaltyPoints(parseInt(e.target.value))}
              className="block w-full max-w-xs px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-2 text-xs text-gray-500">e.g., 1 point earned for every 100 KES spent.</p>
          </div>
        </div>

        <div className="flex justify-end">
            <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Save Policies
            </button>
        </div>
      </form>
    </div>
  );
}
