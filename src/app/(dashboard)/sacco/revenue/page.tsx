"use client";

import PrivateRoute from '@/app/components/PrivateRoute';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockRevenueData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue (KES)',
      data: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
      backgroundColor: 'rgba(139, 92, 246, 0.5)',
    },
  ],
};

export default function RevenuePage() {
  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800">Revenue</h1>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <Bar data={mockRevenueData} />
        </div>
      </div>
    </PrivateRoute>
  );
}
