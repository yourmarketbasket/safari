"use client";

import { NextPage } from "next";

const CancellationsReallocationsPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cancellations & Reallocations</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Cancellations Today</h2>
          <p className="text-4xl font-bold text-red-500">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Reallocations Today</h2>
          <p className="text-4xl font-bold text-blue-500">35</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Success Rate</h2>
          <p className="text-4xl font-bold text-green-500">98%</p>
        </div>
      </div>

      {/* Cancellations Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Trip Cancellations</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Passenger</th>
              <th className="py-2 px-4 border-b">Route</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Sacco</th>
              <th className="py-2 px-4 border-b">Reason</th>
            </tr>
          </thead>
          <tbody>
            {[
              { passenger: "Alice Johnson", route: "Nairobi - Mombasa", amount: "KES 1200", sacco: "Modern Coast", reason: "Mechanical Issue" },
              { passenger: "Bob Williams", route: "Kisumu - Nairobi", amount: "KES 1000", sacco: "Easy Coach", reason: "Driver Unavailability" },
            ].map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.passenger}</td>
                <td className="py-2 px-4 border-b">{item.route}</td>
                <td className="py-2 px-4 border-b">{item.amount}</td>
                <td className="py-2 px-4 border-b">{item.sacco}</td>
                <td className="py-2 px-4 border-b">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 border rounded-lg mr-2">&lt;</button>
          <button className="px-4 py-2 border rounded-lg">&gt;</button>
        </div>
      </div>

      {/* Reallocations Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Passenger Reallocations</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Passenger</th>
              <th className="py-2 px-4 border-b">Original Trip</th>
              <th className="py-2 px-4 border-b">New Trip</th>
              <th className="py-2 px-4 border-b">Sacco</th>
            </tr>
          </thead>
          <tbody>
            {[
              { passenger: "Charlie Brown", original: "Nairobi - Nakuru (8 AM)", new: "Nairobi - Nakuru (9 AM)", sacco: "Prestige" },
            ].map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.passenger}</td>
                <td className="py-2 px-4 border-b">{item.original}</td>
                <td className="py-2 px-4 border-b">{item.new}</td>
                <td className="py-2 px-4 border-b">{item.sacco}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 border rounded-lg mr-2">&lt;</button>
          <button className="px-4 py-2 border rounded-lg">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default CancellationsReallocationsPage;
