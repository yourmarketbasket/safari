"use client";

import { useMemo, useState } from "react";

const mockWallets = [
  { id: '1', userId: 'user-1', balance: '$1,234.56' },
  { id: '2', userId: 'user-2', balance: '$789.01' },
  { id: '3', userId: 'user-3', balance: '$2,345.67' },
];

export default function WalletManagementPage() {
  const wallets = mockWallets;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWallets = useMemo(() => {
    return wallets.filter(wallet =>
      wallet.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [wallets, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Wallet Management</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Search by user ID..."
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">Balance</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-light">
              {filteredWallets.map((wallet) => (
                <tr key={wallet.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-left whitespace-nowrap font-medium">{wallet.userId}</td>
                  <td className="py-4 px-6 text-left">{wallet.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
