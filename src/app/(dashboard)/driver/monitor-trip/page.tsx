"use client";
import React from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import { FiMapPin, FiUsers, FiAlertTriangle } from 'react-icons/fi';

import { trip } from '@/app/data/dummy';

const MonitorTripPage = () => {
  const { setTitle } = usePageTitleStore();
  React.useEffect(() => {
    setTitle('Monitor Trip');
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Notifications */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">Notifications</p>
        {trip.notifications.map(notification => (
          <div key={notification.id} className="flex items-center mt-2">
            <FiAlertTriangle className="mr-2" />
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      {/* Trip Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Trip Status: <span className="text-purple-600">{trip.status}</span></h2>
      </div>

      {/* Route Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><FiMapPin className="mr-2" /> Route: {trip.route.name}</h2>
        <div className="mb-4">
          <p><strong>Origin:</strong> {trip.route.origin}</p>
          <p><strong>Destination:</strong> {trip.route.destination}</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Stops:</h3>
          <ul className="list-disc list-inside">
            {trip.route.stops.map(stop => <li key={stop}>{stop}</li>)}
          </ul>
        </div>
        <div className="mt-4 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map Placeholder</p>
        </div>
      </div>

      {/* Passenger List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><FiUsers className="mr-2" /> Passengers ({trip.passengers.length})</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2">Name</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Stop</th>
            </tr>
          </thead>
          <tbody>
            {trip.passengers.map(passenger => (
              <tr key={passenger.id} className="border-b">
                <td className="py-2">{passenger.name}</td>
                <td className="py-2">{passenger.status}</td>
                <td className="py-2">{passenger.stop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitorTripPage;
