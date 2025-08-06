"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

const mockVehicles = [
  { id: 'vehicle-1', licensePlate: 'KDA 123A', capacity: 14, owner: 'John Doe', condition: 'Good', vehicleClass: 'Economy' },
  { id: 'vehicle-2', licensePlate: 'KDB 456B', capacity: 33, owner: 'Jane Doe', condition: 'Excellent', vehicleClass: 'Business' },
  { id: 'vehicle-3', licensePlate: 'KDC 789C', capacity: 49, owner: 'Peter Jones', condition: 'Fair', vehicleClass: 'First Class' },
];

export default function VehicleManagementPage() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle =>
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vehicles, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Vehicle Management</h1>
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Add Vehicle
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by license plate..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">License Plate</th>
                  <th className="py-3 px-6 text-left">Capacity</th>
                  <th className="py-3 px-6 text-left">Owner</th>
                  <th className="py-3 px-6 text-left">Condition</th>
                  <th className="py-3 px-6 text-left">Class</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{vehicle.licensePlate}</td>
                    <td className="py-4 px-6 text-left">{vehicle.capacity}</td>
                    <td className="py-4 px-6 text-left">{vehicle.owner}</td>
                    <td className="py-4 px-6 text-left">{vehicle.condition}</td>
                    <td className="py-4 px-6 text-left">{vehicle.vehicleClass}</td>
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
