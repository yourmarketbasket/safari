"use client";

import { useState } from "react";

export default function SuperuserSettingsPage() {
  const [siteName, setSiteName] = useState('Safary');
  const [supportEmail, setSupportEmail] = useState('support@safary.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to update the settings
    console.log('Updating settings with:', { siteName, supportEmail });
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">System Settings</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input
              type="text"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="block w-full px-4 py-3 bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input
              type="email"
              id="supportEmail"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="block w-full px-4 py-3 bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
