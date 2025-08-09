"use client";

import { NextPage } from "next";
import { useState, useMemo } from "react";

const dummyCancellations = [
  { id: 1, passenger: "Alice Johnson", route: "Nairobi - Mombasa", amount: "KES 1200", sacco: "Modern Coast", reason: "Mechanical Issue", status: "Refunded" },
  { id: 2, passenger: "Bob Williams", route: "Kisumu - Nairobi", amount: "KES 1000", sacco: "Easy Coach", reason: "Driver Unavailability", status: "Refunded" },
  { id: 3, passenger: "Diana Prince", route: "Mombasa - Malindi", amount: "KES 500", sacco: "Modern Coast", reason: "Passenger Request", status: "Completed" },
  { id: 4, passenger: "Bruce Wayne", route: "Nairobi - Eldoret", amount: "KES 1500", sacco: "North Rift", reason: "Weather", status: "Pending" },
];

const dummyReallocations = [
  { id: 1, passenger: "Charlie Brown", original: "Nairobi - Nakuru (8 AM)", new: "Nairobi - Nakuru (9 AM)", sacco: "Prestige", status: "Completed" },
  { id: 2, passenger: "David Rose", original: "Kisumu - Busia (10 AM)", new: "Kisumu - Busia (11 AM)", sacco: "Western Express", status: "Completed" },
  { id: 3, passenger: "Alexis Rose", original: "Nairobi - Nanyuki (7 AM)", new: "Nairobi - Nanyuki (8 AM)", sacco: "2NK", status: "Pending" },
];

const CancellationsReallocationsPage: NextPage = () => {
  const [cancellationsPage, setCancellationsPage] = useState(1);
  const [reallocationsPage, setReallocationsPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedCancellations = useMemo(() => {
    const startIndex = (cancellationsPage - 1) * itemsPerPage;
    return dummyCancellations.slice(startIndex, startIndex + itemsPerPage);
  }, [cancellationsPage]);

  const paginatedReallocations = useMemo(() => {
    const startIndex = (reallocationsPage - 1) * itemsPerPage;
    return dummyReallocations.slice(startIndex, startIndex + itemsPerPage);
  }, [reallocationsPage]);

  const totalCancellationPages = Math.ceil(dummyCancellations.length / itemsPerPage);
  const totalReallocationPages = Math.ceil(dummyReallocations.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cancellations & Reallocations</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Cancellations Today</h2>
          <p className="text-4xl font-bold text-red-500">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Reallocations Today</h2>
          <p className="text-4xl font-bold text-blue-500">35</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Success Rate</h2>
          <p className="text-4xl font-bold text-green-500">98%</p>
        </div>
      </div>

      {/* Cancellations Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Trip Cancellations</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Passenger</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Route</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Amount</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Sacco</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Reason</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCancellations.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.passenger}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.route}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.amount}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.sacco}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.reason}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                    <span className={`px-2 py-1 rounded-full font-semibold ${
                        item.status === 'Refunded' ? 'bg-green-200 text-green-800' :
                        item.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                    } text-xs`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-4">
            <button
              onClick={() => setCancellationsPage(p => Math.max(1, p - 1))}
              disabled={cancellationsPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg mr-2 disabled:opacity-50"
            >&lt;</button>
            <span className="text-gray-800">Page {cancellationsPage} of {totalCancellationPages}</span>
            <button
              onClick={() => setCancellationsPage(p => Math.min(totalCancellationPages, p + 1))}
              disabled={cancellationsPage === totalCancellationPages}
              className="px-4 py-2 border border-gray-300 rounded-lg ml-2 disabled:opacity-50"
            >&gt;</button>
        </div>
      </div>

      {/* Reallocations Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Passenger Reallocations</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Passenger</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Original Trip</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">New Trip</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Sacco</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReallocations.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.passenger}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.original}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.new}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.sacco}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                    <span className={`px-2 py-1 rounded-full font-semibold ${
                        item.status === 'Completed' ? 'bg-green-200 text-green-800' :
                        'bg-yellow-200 text-yellow-800'
                    } text-xs`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-4">
            <button
              onClick={() => setReallocationsPage(p => Math.max(1, p - 1))}
              disabled={reallocationsPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg mr-2 disabled:opacity-50"
            >&lt;</button>
            <span className="text-gray-800">Page {reallocationsPage} of {totalReallocationPages}</span>
            <button
              onClick={() => setReallocationsPage(p => Math.min(totalReallocationPages, p + 1))}
              disabled={reallocationsPage === totalReallocationPages}
              className="px-4 py-2 border border-gray-300 rounded-lg ml-2 disabled:opacity-50"
            >&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default CancellationsReallocationsPage;
