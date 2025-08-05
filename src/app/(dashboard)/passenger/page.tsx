"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import TicketDialog from '@/app/components/TicketDialog';

// Mock Data
const mockTicketsData = [
  { id: 't-1', route: 'Nairobi - Nakuru', date: '2024-10-26', status: 'upcoming' },
  { id: 't-2', route: 'Mombasa - Nairobi', date: '2024-10-22', status: 'completed' },
  { id: 't-3', route: 'Kisumu - Nairobi', date: '2024-11-01', status: 'upcoming' },
  { id: 't-4', route: 'Eldoret - Nairobi', date: '2024-09-15', status: 'completed' },
  // Add more mock data for pagination
];

const mockLoyalty = { points: 450 };
const mockPaymentMethods = [
  { id: 'p-1', type: 'Visa', last4: '4242', isDefault: true },
  { id: 'p-2', type: 'M-Pesa', last4: '7890', isDefault: false },
];

export default function PassengerDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredTickets = useMemo(() => {
    let tickets = mockTicketsData.filter((ticket) =>
      ticket.route.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== 'all') {
      tickets = tickets.filter((ticket) => ticket.status === filterStatus);
    }

    if (sortConfig !== null) {
      tickets.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return tickets;
  }, [searchTerm, filterStatus, sortConfig]);

  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTickets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTickets, currentPage, itemsPerPage]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <PrivateRoute allowedRoles={['passenger']}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Loyalty Points */}
          <div className="p-6 bg-indigo-600 text-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Loyalty Points</h2>
            <p className="text-4xl font-bold mt-2">{mockLoyalty.points}</p>
          </div>

          {/* Payment Methods */}
          <div className="p-6 bg-white rounded-lg shadow-md md:col-span-2">
            <h2 className="text-lg font-bold text-gray-800">Payment Methods</h2>
            <div className="mt-4 space-y-2">
              {mockPaymentMethods.map((method) => (
                <div key={method.id} className="flex justify-between items-center">
                  <p className="text-gray-600">{method.type} ending in {method.last4}</p>
                  {method.isDefault && <span className="text-xs font-semibold text-green-800 bg-green-100 px-2 py-1 rounded-full">Default</span>}
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800">Add Payment Method</button>
          </div>
        </div>

        {/* My Tickets Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Tickets</h2>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by route..."
              className="px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-blue-600 focus:border-blue-600 text-gray-900"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-blue-600 focus:border-blue-600 text-gray-900"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 cursor-pointer" onClick={() => requestSort('route')}>Route</th>
                <th className="py-3 px-4 border-b border-gray-300 cursor-pointer" onClick={() => requestSort('date')}>Date</th>
                <th className="py-3 px-4 border-b border-gray-300 cursor-pointer" onClick={() => requestSort('status')}>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {paginatedTickets.map((ticket, index) => (
                <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="py-3 px-4 border-b border-gray-300">{ticket.route}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{ticket.date}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        ticket.status === 'upcoming'
                          ? 'bg-green-200 text-green-900'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TicketDialog ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
          <div className="flex justify-between items-center mt-4">
            <select
              className="px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-blue-600 focus:border-blue-600 text-gray-900"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 border-2 border-gray-400 rounded-lg mr-2 hover:bg-gray-200 disabled:opacity-50 text-gray-900"
              >
                Previous
              </button>
              <button
                disabled={currentPage * itemsPerPage >= filteredTickets.length}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-900"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
