"use client";

import { useState, useMemo, useEffect } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const mockDrivers = [
  { id: 'driver-1', name: 'James Smith', license: 'DL12345', phone: '0712345678', ntsaCompliance: true },
  { id: 'driver-2', name: 'Mary Johnson', license: 'DL67890', phone: '0787654321', ntsaCompliance: false },
  { id: 'driver-3', name: 'Robert Williams', license: 'DL54321', phone: '0723456789', ntsaCompliance: true },
];

export default function DriverManagementPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Driver Management");
  }, [setTitle]);

  const drivers = mockDrivers;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [drivers, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end items-center mb-6">
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Add Driver
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by driver name..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left font-light">Name</th>
                  <th className="py-3 px-6 text-left font-light">License</th>
                  <th className="py-3 px-6 text-left font-light">Phone</th>
                  <th className="py-3 px-6 text-left font-light">NTSA Compliance</th>
                  <th className="py-3 px-6 text-center font-light">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs font-light">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap">{driver.name}</td>
                    <td className="py-4 px-6 text-left">{driver.license}</td>
                    <td className="py-4 px-6 text-left">{driver.phone}</td>
                    <td className="py-4 px-6 text-left">
                      <span className={`px-2 inline-flex text-xs leading-5 font-light rounded-full ${driver.ntsaCompliance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {driver.ntsaCompliance ? 'Compliant' : 'Non-Compliant'}
                      </span>
                    </td>
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
