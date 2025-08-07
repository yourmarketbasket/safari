"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';

const mockRoutesData = [
  { id: 'r-1', from: 'Nairobi', to: 'Nakuru', sacco: 'Prestige', vehicleType: '14-seater', price: 500 },
  { id: 'r-2', from: 'Nairobi', to: 'Nakuru', sacco: 'Climax', vehicleType: 'Bus', price: 450 },
  { id: 'r-3', from: 'Mombasa', to: 'Nairobi', sacco: 'Modern Coast', vehicleType: 'Bus', price: 1200 },
  { id: 'r-4', from: 'Kisumu', to: 'Nairobi', sacco: 'Easy Coach', vehicleType: 'Bus', price: 800 },
  { id: 'r-5', from: 'Eldoret', to: 'Nairobi', sacco: 'North Rift', vehicleType: '14-seater', price: 750 },
];

export default function RoutesDashboardPage() {
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');

  const filteredRoutes = useMemo(() => {
    return mockRoutesData.filter(route => {
      const fromMatch = fromFilter ? route.from.toLowerCase().includes(fromFilter.toLowerCase()) : true;
      const toMatch = toFilter ? route.to.toLowerCase().includes(toFilter.toLowerCase()) : true;
      return fromMatch && toMatch;
    });
  }, [fromFilter, toFilter]);

  return (
    <PrivateRoute allowedRoles={['admin', 'sacco', 'owner', 'passenger', 'support_staff', 'headoffice']}>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Routes</h1>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="From"
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              onChange={(e) => setFromFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="To"
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              onChange={(e) => setToFilter(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left font-light">From</th>
                  <th className="py-3 px-6 text-left font-light">To</th>
                  <th className="py-3 px-6 text-left font-light">Sacco</th>
                  <th className="py-3 px-6 text-left font-light">Vehicle Type</th>
                  <th className="py-3 px-6 text-right font-light">Price</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs font-light">
                {filteredRoutes.map((route) => (
                  <tr key={route.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap">{route.from}</td>
                    <td className="py-4 px-6 text-left">{route.to}</td>
                    <td className="py-4 px-6 text-left">{route.sacco}</td>
                    <td className="py-4 px-6 text-left">{route.vehicleType}</td>
                    <td className="py-4 px-6 text-right">Ksh {route.price.toLocaleString()}</td>
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
