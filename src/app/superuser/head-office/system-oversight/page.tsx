"use client";

// Mock data
const metrics = [
  { name: 'Total Saccos', value: '42', change: '+2', changeType: 'increase' },
  { name: 'Total Trips Today', value: '1,280', change: '-5%', changeType: 'decrease' },
  { name: 'Total Revenue (Month)', value: 'KES 3,450,000', change: '+12%', changeType: 'increase' },
  { name: 'Loyalty Points Used (Week)', value: '5,600', change: '+8%', changeType: 'increase' },
  { name: 'System Fees Collected (Today)', value: 'KES 12,800', change: '+3%', changeType: 'increase' },
  { name: 'Active Support Staff', value: '8', change: '0', changeType: 'increase' },
];

export default function SystemOversightPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">System Oversight</h1>
      <p className="mt-2 text-gray-600">A high-level overview of system activity and performance.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 truncate">{metric.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                    {metric.change !== '0' && (
                        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                            metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {metric.change}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Analytics</h2>
        <div className="mt-4 p-8 bg-white rounded-lg shadow">
            <p className="text-center text-gray-500">Chart components will be added here.</p>
        </div>
      </div>
    </div>
  );
}
