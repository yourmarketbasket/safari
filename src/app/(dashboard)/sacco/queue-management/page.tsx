"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiTrash } from 'react-icons/fi';

const mockQueue = [
  { id: 'q-1', licensePlate: 'KDA 123A', route: 'Nairobi - Nakuru', timestamp: '2024-10-26 10:00:00', vehicleClass: 'Economy' },
  { id: 'q-2', licensePlate: 'KDB 456B', route: 'Nairobi - Nakuru', timestamp: '2024-10-26 10:05:00', vehicleClass: 'Business' },
  { id: 'q-3', licensePlate: 'KDC 789C', route: 'Mombasa - Nairobi', timestamp: '2024-10-26 10:10:00', vehicleClass: 'First Class' },
];

export default function QueueManagementPage() {
  const [queue, setQueue] = useState(mockQueue);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueue = useMemo(() => {
    return queue.filter(item =>
      item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.route.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [queue, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Queue Management</h1>
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Add to Queue
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by license plate or route..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">License Plate</th>
                  <th className="py-3 px-6 text-left">Route</th>
                  <th className="py-3 px-6 text-left">Timestamp</th>
                  <th className="py-3 px-6 text-left">Class</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {filteredQueue.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{item.licensePlate}</td>
                    <td className="py-4 px-6 text-left">{item.route}</td>
                    <td className="py-4 px-6 text-left">{item.timestamp}</td>
                    <td className="py-4 px-6 text-left">{item.vehicleClass}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex item-center justify-center">
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
