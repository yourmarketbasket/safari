"use client";

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';
import SummaryCard from '@/app/components/SummaryCard';
import { FiUsers, FiTruck, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const SupportDashboardPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle("Support Dashboard");
  }, [setTitle]);

  const summaryData = {
    activeTrips: 125,
    busesOnline: 80,
    openTickets: 15,
    resolvedTickets: 230,
  };

  return (
    <PrivateRoute allowedRoles={['support_staff']}>
        <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard
                    icon={FiTruck}
                    title="Active Trips"
                    value={summaryData.activeTrips}
                    color="blue"
                />
                <SummaryCard
                    icon={FiUsers}
                    title="Buses Online"
                    value={summaryData.busesOnline}
                    color="green"
                />
                <SummaryCard
                    icon={FiAlertTriangle}
                    title="Open Tickets"
                    value={summaryData.openTickets}
                    color="yellow"
                />
                <SummaryCard
                    icon={FiCheckCircle}
                    title="Resolved Tickets"
                    value={summaryData.resolvedTickets}
                    color="purple"
                />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Real-time Trip Monitoring</h2>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Map Placeholder</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Alerts Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    </PrivateRoute>
  );
};

export default SupportDashboardPage;
