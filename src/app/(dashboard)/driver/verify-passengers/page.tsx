"use client";
import React from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import { FiCamera, FiUserCheck, FiUserX, FiLogOut } from 'react-icons/fi';

import { passengersAtStop, passengersToDisembark } from '@/app/data/dummy';

const VerifyPassengersPage = () => {
  const { setTitle } = usePageTitleStore();
  React.useEffect(() => {
    setTitle('Verify Passengers');
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* QR Code Scanner */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><FiCamera className="mr-2" /> Scan QR Code</h2>
        <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Camera View Placeholder</p>
        </div>
      </div>

      {/* Manual Verification */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><FiUserCheck className="mr-2" /> Passengers to Board at Midtown</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2">Name</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengersAtStop.map(passenger => (
              <tr key={passenger.id} className="border-b">
                <td className="py-2">{passenger.name}</td>
                <td className="py-2 flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center">
                    <FiUserCheck className="mr-1" /> Verify
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center">
                    <FiUserX className="mr-1" /> No-show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Disembarkations */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><FiLogOut className="mr-2" /> Passengers to Disembark at Uptown</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2">Name</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengersToDisembark.map(passenger => (
              <tr key={passenger.id} className="border-b">
                <td className="py-2">{passenger.name}</td>
                <td className="py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center">
                    <FiLogOut className="mr-1" /> Confirm Disembarkation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifyPassengersPage;
