"use client";

import { NextPage } from "next";
import { useState, useMemo } from "react";
import { FiSearch, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";

type SupportTicket = {
  id: number;
  issue: string;
  handler: string;
  resolution: string;
  status: "Resolved" | "In Progress" | "Open" | "Escalated";
};

const dummyData: SupportTicket[] = [
  { id: 1, issue: "Payment Failure #1234", handler: "Jane Doe", resolution: "Refund processed", status: "Resolved" },
  { id: 2, issue: "Missed Boarding #5678", handler: "John Smith", resolution: "Reallocated to next bus", status: "In Progress" },
  { id: 3, issue: "Unsuitable Stop #9101", handler: "Alice", resolution: "Pending passenger confirmation", status: "Open" },
  { id: 4, issue: "Lost Luggage #B456", handler: "Jane Doe", resolution: "Investigating", status: "In Progress" },
  { id: 5, issue: "Driver Dispute #C789", handler: "Bob Brown", resolution: "Awaiting driver report", status: "Open" },
  { id: 6, issue: "App Crash on Booking", handler: "Tech Team", resolution: "Patch v1.2 deployed", status: "Resolved" },
  { id: 7, issue: "Double Charge #D112", handler: "John Smith", resolution: "Second charge refunded", status: "Resolved" },
];

const escalatedDummyData: SupportTicket[] = [
    { id: 8, issue: "Repeated Cancellations on Route 5", handler: "Superuser", resolution: "Under review with operator", status: "Escalated" },
    { id: 9, issue: "Large Refund Request #F999", handler: "Superuser", resolution: "Awaiting manager approval", status: "Escalated" },
];

const PassengerDriverSupportPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof SupportTicket; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const sortedAndFilteredData = useMemo(() => {
    let data = [...dummyData];
    if (searchTerm) {
      data = data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (sortConfig !== null) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedAndFilteredData]);

  const requestSort = (key: keyof SupportTicket) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Passenger & Driver Support</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Open Tickets</h2>
          <p className="text-4xl font-bold text-blue-500">125</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-500">32</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Resolved Today</h2>
          <p className="text-4xl font-bold text-green-500">58</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Escalated</h2>
          <p className="text-4xl font-bold text-red-500">{escalatedDummyData.length}</p>
        </div>
      </div>

      {/* Support Issues Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Support Issues</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FiSearch className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search issues..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg mr-2 text-gray-800 bg-white hover:bg-gray-100">
              <FiFilter className="mr-2" /> Filter
            </button>
            <button
              onClick={() => requestSort('status')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white hover:bg-gray-100"
            >
              Sort by Status {sortConfig?.key === 'status' && (sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />)}
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold cursor-pointer" onClick={() => requestSort('issue')}>Issue</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold cursor-pointer" onClick={() => requestSort('handler')}>Handler</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Resolution</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold cursor-pointer" onClick={() => requestSort('status')}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.issue}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.handler}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.resolution}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <span className={`px-2 py-1 rounded-full font-semibold ${
                    item.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                    item.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                    item.status === 'Open' ? 'bg-blue-200 text-blue-800' :
                    'bg-red-200 text-red-800'
                  } text-xs`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="mr-2 text-gray-800">Items per page:</span>
            <select
              className="border border-gray-300 rounded-lg px-2 py-1 text-gray-800"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="flex items-center">
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

      {/* Escalated Issues Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escalated Issues</h2>
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Issue</th>
                    <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Handler</th>
                    <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Resolution</th>
                    <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-800 font-bold">Status</th>
                </tr>
            </thead>
            <tbody>
                {escalatedDummyData.map((item) => (
                    <tr key={item.id}>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.issue}</td>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.handler}</td>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.resolution}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                            <span className="px-2 py-1 rounded-full font-semibold bg-red-200 text-red-800 text-xs">{item.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassengerDriverSupportPage;
