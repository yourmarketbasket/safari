"use client";

import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const barChartData = {
    labels: ['Sacco A', 'Sacco B', 'Sacco C', 'Sacco D', 'Sacco E'],
    datasets: [
        {
            label: 'Trips per Sacco',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

export default function PerformanceDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Over Time</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Trips per Sacco</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}
