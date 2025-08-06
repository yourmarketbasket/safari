"use client";

import { useState, useMemo } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

const mockPayroll = [
  { id: 'payroll-1', driver: 'James Smith', amount: 50000, date: '2024-10-25', status: 'Paid' },
  { id: 'payroll-2', driver: 'Mary Johnson', amount: 45000, date: '2024-10-25', status: 'Paid' },
  { id: 'payroll-3', driver: 'Robert Williams', amount: 55000, date: '2024-10-25', status: 'Pending' },
];

export default function HRPayrollPage() {
  const [payroll, setPayroll] = useState(mockPayroll);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayroll = useMemo(() => {
    return payroll.filter(item =>
      item.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [payroll, searchTerm]);

  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">HR/Payroll</h1>
          <button className="flex items-center px-4 py-2 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <FiPlus className="mr-2" />
            Process Payroll
          </button>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Search by driver name..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Driver</th>
                  <th className="py-3 px-6 text-right">Amount (KES)</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {filteredPayroll.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{item.driver}</td>
                    <td className="py-4 px-6 text-right font-semibold">{item.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-left">{item.date}</td>
                    <td className="py-4 px-6 text-left">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-2">
                          <FiEdit />
                        </button>
                        <button className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
