"use client";

import { useEffect } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import SummaryCard from '@/app/components/SummaryCard';
import { FiList, FiMap, FiUser } from 'react-icons/fi';

export default function PassengerDashboardPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("My Dashboard");
  }, [setTitle]);

  // Mock data for summary cards
  const summaryData = {
    trips: 5,
    routes: 12,
    profileCompletion: '80%',
  };

  return (
    <PrivateRoute allowedRoles={['passenger']}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SummaryCard
            icon={FiList}
            title="My Trips"
            value={summaryData.trips}
            color="purple"
          />
          <SummaryCard
            icon={FiMap}
            title="Available Routes"
            value={summaryData.routes}
            color="blue"
          />
          <SummaryCard
            icon={FiUser}
            title="Profile Completion"
            value={summaryData.profileCompletion}
            color="green"
          />
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to your dashboard!</h2>
            <p className="text-gray-600">
                This is your central hub for managing your travel with us. You can view your upcoming trips, explore new routes, and manage your profile information.
            </p>
        </div>
      </div>
    </PrivateRoute>
  );
}
