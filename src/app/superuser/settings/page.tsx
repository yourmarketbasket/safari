"use client";

import { useState, useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { Button } from "@/app/components/ui/Button";

export default function SuperuserSettingsPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("System Settings");
  }, [setTitle]);

  const [siteName, setSiteName] = useState('Safary');
  const [supportEmail, setSupportEmail] = useState('support@safary.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to update the settings
    console.log('Updating settings with:', { siteName, supportEmail });
  };

  return (
    <div>
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
            <Button
              type="submit"
            >
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
