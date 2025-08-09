"use client";

import { NextPage } from "next";

const SystemErrorsPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">System Errors</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">New Errors</h2>
          <p className="text-4xl font-bold text-red-500">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-500">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Resolved Today</h2>
          <p className="text-4xl font-bold text-green-500">28</p>
        </div>
      </div>

      {/* System Errors Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Error Log</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Error Code</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: "E5001", desc: "Overbooking queue failure", time: "2023-10-27 10:00 AM", status: "New" },
              { code: "E4041", desc: "Route mismatch for Bus 12", time: "2023-10-27 09:30 AM", status: "In Progress" },
              { code: "E2003", desc: "Connectivity failure, server X", time: "2023-10-27 08:00 AM", status: "Resolved" },
            ].map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.code}</td>
                <td className="py-2 px-4 border-b">{item.desc}</td>
                <td className="py-2 px-4 border-b">{item.time}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    item.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                    item.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'}`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemErrorsPage;
