"use client";

import { useState, useMemo, useEffect } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import TicketDialog from '@/app/components/TicketDialog';
import Rating from '@/app/components/Rating';
import { FiMessageSquare } from 'react-icons/fi';
import Pagination from '@/app/components/Pagination';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import { Chip } from '@/app/components/Chip';

// Mock Data
const mockTicketsData = [
  { _id: 't-1', route: 'Nairobi - Nakuru', date: '2024-10-26', status: 'upcoming', totalCost: 500, comments: 'Window seat preferred', rating: 0 },
  { _id: 't-2', route: 'Mombasa - Nairobi', date: '2024-10-22', status: 'completed', totalCost: 1200, comments: '', rating: 4 },
  { _id: 't-3', route: 'Kisumu - Nairobi', date: '2024-11-01', status: 'upcoming', totalCost: 800, comments: '', rating: 0 },
  { _id: 't-4', route: 'Eldoret - Nairobi', date: '2024-09-15', status: 'completed', totalCost: 750, comments: 'Extra luggage', rating: 5 },
  { _id: 't-5', route: 'Nairobi - Kisumu', date: '2024-08-20', status: 'cancelled', totalCost: 800, comments: 'User cancelled', rating: 0 },
];

const mockLoyalty = { points: 450 };
const mockPaymentMethods = [
  { _id: 'p-1', type: 'Visa', last4: '4242', isDefault: true },
  { _id: 'p-2', type: 'M-Pesa', last4: '7890', isDefault: false },
];

export default function PassengerDashboardPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("My Dashboard");
  }, [setTitle]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof mockTicketsData[0]; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const requestSort = (key: keyof typeof mockTicketsData[0]) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <PrivateRoute allowedRoles={['passenger']}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Loyalty Points */}
          <div className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold">Loyalty Points</h2>
            <p className="text-4xl font-bold mt-2">{mockLoyalty.points}</p>
          </div>

          {/* Payment Methods */}
          <div className="p-6 bg-white rounded-2xl shadow-xl md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
            <div className="mt-4 space-y-3">
              {mockPaymentMethods.map((method) => (
                <div key={method._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700 font-medium">{method.type} ending in {method.last4}</p>
                  {method.isDefault && <span className="text-xs font-semibold text-green-800 bg-green-200 px-3 py-1 rounded-full">Default</span>}
                </div>
              ))}
            </div>
            <button className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-800">Add Payment Method</button>
          </div>
        </div>

        {/* My Tickets Table */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Tickets</h2>
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search by route..."
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-1/3"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left cursor-pointer font-light" onClick={() => requestSort('route')}>Route</th>
                  <th className="py-3 px-6 text-left cursor-pointer font-light" onClick={() => requestSort('date')}>Date</th>
                  <th className="py-3 px-6 text-center cursor-pointer font-light" onClick={() => requestSort('status')}>Status</th>
                  <th className="py-3 px-6 text-right cursor-pointer font-light" onClick={() => requestSort('totalCost')}>Total Cost</th>
                  <th className="py-3 px-6 text-left font-light">Comments</th>
                  <th className="py-3 px-6 text-center font-light">Rating</th>
                  <th className="py-3 px-6 text-center font-light">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs font-light">
                {paginatedTickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap">{ticket.route}</td>
                    <td className="py-4 px-6 text-left">{ticket.date}</td>
                    <td className="py-4 px-6 text-center">
                      <Chip
                        text={ticket.status}
                        type={
                          ticket.status === 'completed' ? 'success' :
                          ticket.status === 'cancelled' ? 'error' :
                          ticket.status === 'upcoming' ? 'info' :
                          'default'
                        }
                      />
                    </td>
                    <td className="py-4 px-6 text-right">Ksh {ticket.totalCost.toLocaleString()}</td>
                    <td className="py-4 px-6 text-left">{ticket.comments || '-'}</td>
                    <td className="py-4 px-6 text-center">
                      <Rating rating={ticket.rating} readOnly={ticket.status !== 'completed'} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-purple-600 hover:text-purple-800">
                        <FiMessageSquare />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TicketDialog ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTickets.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </PrivateRoute>
  );
}
