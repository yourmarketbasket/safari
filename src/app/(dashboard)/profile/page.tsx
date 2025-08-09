"use client";

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import PrivateRoute from '@/app/components/PrivateRoute';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import FileUpload from '@/app/components/FileUpload';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit, FiSave, FiX, FiMessageSquare } from 'react-icons/fi';
import Image from 'next/image';
import { Ticket } from '@/app/models/Ticket.model';
import { Chip } from '@/app/components/Chip';
import Rating from '@/app/components/Rating';
import Pagination from '@/app/components/Pagination';
import TicketDialog from '@/app/components/TicketDialog';

// Mock Data from passenger/page.tsx
const mockTicketsData: (Omit<Ticket, 'passengerId' | 'tripId' | 'routeId'> & { route: string, rating: number, comments: string, totalCost: number })[] = [
  { _id: 't-1', route: 'Nairobi - Nakuru', registrationTimestamp: new Date('2024-10-26'), status: 'paid', class: 'economy', systemFee: 50, comments: 'Window seat preferred', rating: 0, totalCost: 500 },
  { _id: 't-2', route: 'Mombasa - Nairobi', registrationTimestamp: new Date('2024-10-22'), status: 'boarded', class: 'business', systemFee: 100, comments: '', rating: 4, totalCost: 1200 },
  { _id: 't-3', route: 'Kisumu - Nairobi', registrationTimestamp: new Date('2024-11-01'), status: 'registered', class: 'economy', systemFee: 75, comments: '', rating: 0, totalCost: 800 },
  { _id: 't-4', route: 'Eldoret - Nairobi', registrationTimestamp: new Date('2024-09-15'), status: 'boarded', class: 'first_class', systemFee: 100, comments: 'Extra luggage', rating: 5, totalCost: 750 },
  { _id: 't-5', route: 'Nairobi - Kisumu', registrationTimestamp: new Date('2024-08-20'), status: 'canceled', class: 'economy', systemFee: 75, comments: 'User cancelled', rating: 0, totalCost: 800 },
];

const mockLoyalty = { points: 450 };
const mockPaymentMethods = [
  { _id: 'p-1', type: 'Visa', last4: '4242', isDefault: true },
  { _id: 'p-2', type: 'M-Pesa', last4: '7890', isDefault: false },
];


export default function ProfilePage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("My Profile");
  }, [setTitle]);

  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // State and logic from passenger/page.tsx
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

    if (sortConfig) {
      tickets.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA == null) return 1;
        if (valB == null) return -1;
        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
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


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to update the user's profile
    console.log('Updating profile with:', { name, phone, avatar });
    setIsEditing(false);
  };

  const handleFileChange = (file: File) => {
    setAvatar(file);
  };

  return (
    <PrivateRoute allowedRoles={['admin', 'sacco', 'owner', 'passenger', 'support_staff', 'headoffice', 'queue_manager']}>
      <div className="container mx-auto px-6 py-8">
        {user && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <FileUpload onFileChange={handleFileChange} />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                {user.avatar ? (
                    <Image src={user.avatar} alt="Avatar" width={128} height={128} className="rounded-full mx-auto mb-4" />
                ) : (
                  <FaUserCircle className="w-32 h-32 text-gray-400 mx-auto mb-4" />
                )}
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone || 'N/A'}</p>
                <p className="mt-2 inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">{user.role}</p>
                <div className="mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center mx-auto px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Added sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
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
              <option value="registered">Registered</option>
              <option value="paid">Paid</option>
              <option value="boarded">Boarded</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left cursor-pointer font-light" onClick={() => requestSort('route')}>Route</th>
                  <th className="py-3 px-6 text-left cursor-pointer font-light" onClick={() => requestSort('registrationTimestamp')}>Date</th>
                  <th className="py-3 px-6 text-center cursor-pointer font-light" onClick={() => requestSort('status')}>Status</th>
                  <th className="py-3 px-6 text-right cursor-pointer font-light" onClick={() => requestSort('totalCost')}>Total Cost</th>
                  <th className="py-3 px-6 text-left font-light">Class</th>
                  <th className="py-3 px-6 text-center font-light">Rating</th>
                  <th className="py-3 px-6 text-center font-light">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs font-light">
                {paginatedTickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap">{ticket.route}</td>
                    <td className="py-4 px-6 text-left">{new Date(ticket.registrationTimestamp).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-center">
                      <Chip
                        text={ticket.status}
                        type={
                          ticket.status === 'boarded' ? 'success' :
                          ticket.status === 'canceled' ? 'error' :
                          ticket.status === 'paid' || ticket.status === 'registered' ? 'info' :
                          'default'
                        }
                      />
                    </td>
                    <td className="py-4 px-6 text-right">Ksh {ticket.totalCost.toLocaleString()}</td>
                    <td className="py-4 px-6 text-left">{ticket.class}</td>
                    <td className="py-4 px-6 text-center">
                      <Rating rating={ticket.rating} readOnly={ticket.status !== 'boarded'} />
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
