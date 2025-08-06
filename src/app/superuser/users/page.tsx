"use client";

import { useMemo, useState } from "react";

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'sacco' },
  { id: '3', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'owner' },
  { id: '4', name: 'Mary Williams', email: 'mary.williams@example.com', role: 'passenger' },
];

export default function SuperuserUsersPage() {
  const users = mockUsers;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-light">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-left">{user.email}</td>
                  <td className="py-4 px-6 text-left">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
