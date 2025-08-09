"use client";

import { useState, useMemo, useEffect } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiEdit, FiTrash, FiCheckCircle } from 'react-icons/fi';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import { Chip } from '@/app/components/Chip';

const mockSaccos = [
  { _id: 's-1', name: 'Prestige', status: 'approved' },
  { _id: 's-2', name: 'Climax', status: 'pending' },
  { _id: 's-3', name: 'Modern Coast', status: 'approved' },
  { _id: 's-4', name: 'Easy Coach', status: 'suspended' },
];

export default function SaccoManagementPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Sacco Management");
  }, [setTitle]);

  const saccos = mockSaccos;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSaccos = useMemo(() => {
    return saccos.filter(sacco =>
      sacco.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [saccos, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['support_staff']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div></div> {/* Placeholder for alignment */}
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Register Sacco
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by Sacco name..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left font-light">Sacco Name</th>
                  <th className="py-3 px-6 text-center font-light">Status</th>
                  <th className="py-3 px-6 text-center font-light">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs font-light">
                {filteredSaccos.map((sacco) => (
                  <tr key={sacco._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap">{sacco.name}</td>
                    <td className="py-4 px-6 text-center">
                      <Chip
                        text={sacco.status}
                        type={
                          sacco.status === 'approved' ? 'success' :
                          sacco.status === 'pending' ? 'warning' :
                          sacco.status === 'suspended' ? 'error' :
                          'default'
                        }
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                          <FiCheckCircle />
                        </button>
                        <button className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-2">
                          <FiEdit />
                        </button>
                        <button className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
