"use client";

import { NextPage } from "next";
import { useState, useMemo } from "react";

const dummyErrors = [
  { id: 1, code: "E5001", desc: "Overbooking queue failure", time: "2023-10-27 10:00 AM", status: "New" },
  { id: 2, code: "E4041", desc: "Route mismatch for Bus 12", time: "2023-10-27 09:30 AM", status: "In Progress" },
  { id: 3, code: "E2003", desc: "Connectivity failure, server X", time: "2023-10-27 08:00 AM", status: "Resolved" },
  { id: 4, code: "E5002", desc: "Payment gateway timeout", time: "2023-10-27 11:00 AM", status: "New" },
  { id: 5, code: "E3010", desc: "GPS sync error on Bus 21", time: "2023-10-27 10:45 AM", status: "In Progress" },
  { id: 6, code: "E2004", desc: "Database connection pool exhausted", time: "2023-10-27 10:30 AM", status: "Resolved" },
];

const SystemErrorsPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedErrors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return dummyErrors.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(dummyErrors.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">System Errors</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">New Errors</h2>
          <p className="text-4xl font-bold text-red-500">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-500">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Resolved Today</h2>
          <p className="text-4xl font-bold text-green-500">28</p>
        </div>
      </div>

      {/* System Errors Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Error Log</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Error Code</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Description</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Timestamp</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedErrors.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.code}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.desc}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.time}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <span className={`px-2 py-1 rounded-full font-semibold ${
                    item.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                    item.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  } text-xs`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg mr-2 disabled:opacity-50"
            >&lt;</button>
            <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg ml-2 disabled:opacity-50"
            >&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default SystemErrorsPage;
