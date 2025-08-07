"use client";

import { useMemo, useState } from "react";

const mockTickets = [
  { id: '1', subject: 'Login Issue', user: 'john.doe@example.com', status: 'Open' },
  { id: '2', subject: 'Payment Failed', user: 'jane.smith@example.com', status: 'Closed' },
  { id: '3', subject: 'Cannot find route', user: 'peter.jones@example.com', status: 'Open' },
];

export default function SupportManagementPage() {
  const tickets = mockTickets;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tickets, searchTerm]);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Support Management</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Search by subject or user..."
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <tr>
                <th className="py-3 px-6 text-left font-light">Subject</th>
                <th className="py-3 px-6 text-left font-light">User</th>
                <th className="py-3 px-6 text-left font-light">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs font-light">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-left whitespace-nowrap">{ticket.subject}</td>
                  <td className="py-4 px-6 text-left">{ticket.user}</td>
                  <td className="py-4 px-6 text-left">{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
