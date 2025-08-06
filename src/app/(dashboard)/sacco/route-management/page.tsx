"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

const mockRoutes = [
  { id: 'route-1', name: 'Nairobi - Nakuru', distance: 160, baseFare: 500, economyFare: 500, businessFare: 700, firstClassFare: 1000 },
  { id: 'route-2', name: 'Mombasa - Nairobi', distance: 480, baseFare: 1200, economyFare: 1200, businessFare: 1500, firstClassFare: 2000 },
  { id: 'route-3', name: 'Kisumu - Nairobi', distance: 340, baseFare: 800, economyFare: 800, businessFare: 1000, firstClassFare: 1500 },
];

export default function RouteManagementPage() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = useMemo(() => {
    return routes.filter(route =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [routes, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Route Management</h1>
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Add Route
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by route name..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Route Name</th>
                  <th className="py-3 px-6 text-left">Distance (km)</th>
                  <th className="py-3 px-6 text-right">Base Fare (KES)</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {filteredRoutes.map((route) => (
                  <tr key={route.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{route.name}</td>
                    <td className="py-4 px-6 text-left">{route.distance}</td>
                    <td className="py-4 px-6 text-right font-semibold">{route.baseFare.toLocaleString()}</td>
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
