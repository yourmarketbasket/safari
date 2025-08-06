"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

const mockPromotions = [
  { id: 'promo-1', name: '10% Off', type: 'Percentage', value: 10 },
  { id: 'promo-2', name: '50 KES Off', type: 'Fixed', value: 50 },
];

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPromotions = useMemo(() => {
    return promotions.filter(promo =>
      promo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [promotions, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Promotions</h1>
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Add Promotion
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by promotion name..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-right">Value</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {filteredPromotions.map((promo) => (
                  <tr key={promo.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{promo.name}</td>
                    <td className="py-4 px-6 text-left">{promo.type}</td>
                    <td className="py-4 px-6 text-right font-semibold">{promo.value}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex item-center justify-center">
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
