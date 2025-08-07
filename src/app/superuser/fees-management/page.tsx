"use client";

import { useMemo, useState } from "react";

const mockFees = [
  { id: '1', name: 'Platform Fee', type: 'Percentage', value: '2.5%' },
  { id: '2', name: 'Booking Fee', type: 'Fixed', value: '$0.50' },
  { id: '3', name: 'Cancellation Fee', type: 'Percentage', value: '10%' },
];

export default function FeesManagementPage() {
  const fees = mockFees;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = useMemo(() => {
    return fees.filter(fee =>
      fee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fees, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Fees Management</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <tr>
                <th className="py-3 px-6 text-left font-light">Name</th>
                <th className="py-3 px-6 text-left font-light">Type</th>
                <th className="py-3 px-6 text-left font-light">Value</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs font-light">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-left whitespace-nowrap">{fee.name}</td>
                  <td className="py-4 px-6 text-left">{fee.type}</td>
                  <td className="py-4 px-6 text-left">{fee.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
