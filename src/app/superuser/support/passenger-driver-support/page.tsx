"use client";

import { NextPage } from "next";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const PassengerDriverSupportPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Passenger & Driver Support</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Open Tickets</h2>
          <p className="text-4xl font-bold text-blue-500">125</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-500">32</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Resolved Today</h2>
          <p className="text-4xl font-bold text-green-500">58</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Escalated</h2>
          <p className="text-4xl font-bold text-red-500">7</p>
        </div>
      </div>

      {/* Support Issues Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Support Issues</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
            <input type="text" placeholder="Search issues..." className="pl-10 pr-4 py-2 border rounded-lg" />
          </div>
          <div>
            <button className="flex items-center px-4 py-2 border rounded-lg mr-2">
              <FiFilter className="mr-2" /> Filter
            </button>
            <button className="flex items-center px-4 py-2 border rounded-lg">
              Sort by <FiChevronDown className="ml-2" />
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Issue</th>
              <th className="py-2 px-4 border-b">Handler</th>
              <th className="py-2 px-4 border-b">Resolution</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { issue: "Payment Failure #1234", handler: "Jane Doe", resolution: "Refund processed", status: "Resolved" },
              { issue: "Missed Boarding #5678", handler: "John Smith", resolution: "Reallocated to next bus", status: "In Progress" },
              { issue: "Unsuitable Stop #9101", handler: "Alice", resolution: "Pending passenger confirmation", status: "Open" },
            ].map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.issue}</td>
                <td className="py-2 px-4 border-b">{item.handler}</td>
                <td className="py-2 px-4 border-b">{item.resolution}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    item.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                    item.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-blue-200 text-blue-800'}`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="mr-2">Items per page:</span>
            <select className="border rounded-lg px-2 py-1">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div>
            <button className="px-4 py-2 border rounded-lg mr-2">&lt;</button>
            <button className="px-4 py-2 border rounded-lg">&gt;</button>
          </div>
        </div>
      </div>

      {/* Escalated Issues Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escalated Issues</h2>
        <p>A table of issues escalated to superusers will be displayed here.</p>
      </div>
    </div>
  );
};

export default PassengerDriverSupportPage;
