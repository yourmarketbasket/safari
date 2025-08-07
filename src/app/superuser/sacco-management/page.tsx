"use client";

import { useMemo, useState } from "react";

const mockSaccos = [
  { id: '1', name: 'Prestige Shuttle', status: 'Active' },
  { id: '2', name: 'Climax Coaches', status: 'Inactive' },
  { id: '3', name: 'Modern Coast', status: 'Active' },
];

export default function SaccoManagementPage() {
  const saccos = mockSaccos;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSaccos = useMemo(() => {
    return saccos.filter(sacco =>
      sacco.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [saccos, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sacco Management</h1>
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
                <th className="py-3 px-6 text-left font-light">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs font-light">
              {filteredSaccos.map((sacco) => (
                <tr key={sacco.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-left whitespace-nowrap">{sacco.name}</td>
                  <td className="py-4 px-6 text-left">{sacco.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
