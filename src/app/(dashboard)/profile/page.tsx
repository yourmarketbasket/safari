"use client";

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import PrivateRoute from '@/app/components/PrivateRoute';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import FileUpload from '@/app/components/FileUpload';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit, FiSave, FiX, FiMessageSquare, FiCreditCard, FiPlus } from 'react-icons/fi';
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
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                {user && (
                    isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="flex justify-center">
                        <FileUpload onFileChange={handleFileChange} />
                        </div>
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        </div>
                        <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            <FiX className="mr-1" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            <FiSave className="mr-1" />
                            Save
                        </button>
                        </div>
                    </form>
                    ) : (
                    <div className="text-center">
                        {user.avatar ? (
                            <Image src={user.avatar} alt="Avatar" width={100} height={100} className="rounded-full mx-auto" />
                        ) : (
                        <FaUserCircle className="w-24 h-24 text-gray-300 mx-auto" />
                        )}
                        <h2 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone || 'N/A'}</p>
                        <p className="mt-2 inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">{user.role}</p>
                        <div className="mt-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center mx-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            <FiEdit className="mr-1" />
                            Edit Profile
                        </button>
                        </div>
                    </div>
                    )
                )}
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Loyalty Points</h3>
                <div className="text-center">
                    <p className="text-5xl font-bold text-indigo-600">{mockLoyalty.points}</p>
                    <p className="text-sm text-gray-500">Points</p>
                </div>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-900">Payment Methods</h3>
                    <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        <FiPlus className="mr-1"/>
                        Add Method
                    </button>
                </div>
                <div className="space-y-3">
                {mockPaymentMethods.map((method) => (
                    <div key={method._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                            <FiCreditCard className="w-6 h-6 text-gray-400 mr-4"/>
                            <div>
                                <p className="text-gray-800 font-semibold">{method.type}</p>
                                <p className="text-sm text-gray-500">**** **** **** {method.last4}</p>
                            </div>
                        </div>
                        {method.isDefault && <span className="text-xs font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">Default</span>}
                    </div>
                ))}
                </div>
            </div>
        </div>

        {/* My Tickets Table */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Tickets</h2>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by route..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-1/3"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
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
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold" onClick={() => requestSort('route')}>Route</th>
                  <th className="py-3 px-6 text-left font-semibold" onClick={() => requestSort('registrationTimestamp')}>Date</th>
                  <th className="py-3 px-6 text-center font-semibold" onClick={() => requestSort('status')}>Status</th>
                  <th className="py-3 px-6 text-right font-semibold" onClick={() => requestSort('totalCost')}>Total Cost</th>
                  <th className="py-3 px-6 text-left font-semibold">Class</th>
                  <th className="py-3 px-6 text-center font-semibold">Rating</th>
                  <th className="py-3 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {paginatedTickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{ticket.route}</td>
                    <td className="py-3 px-6 text-left">{new Date(ticket.registrationTimestamp).toLocaleDateString()}</td>
                    <td className="py-3 px-6 text-center">
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
                    <td className="py-3 px-6 text-right">Ksh {ticket.totalCost.toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">{ticket.class}</td>
                    <td className="py-3 px-6 text-center">
                      <Rating rating={ticket.rating} readOnly={ticket.status !== 'boarded'} />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-indigo-600 hover:text-indigo-800">
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
