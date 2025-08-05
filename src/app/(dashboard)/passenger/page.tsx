"use client";

// Mock Data
const mockTickets = [
    { id: 't-1', route: 'Nairobi - Nakuru', date: '2024-10-26', status: 'upcoming' },
    { id: 't-2', route: 'Mombasa - Nairobi', date: '2024-10-22', status: 'completed' },
];

const mockLoyalty = {
    points: 450,
};

export default function PassengerDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">My Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome! Here are your recent tickets and loyalty points.
      </p>

      {/* Loyalty Points */}
      <div className="mt-8">
        <div className="p-6 bg-indigo-600 text-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Loyalty Points</h2>
            <p className="text-4xl font-bold mt-2">{mockLoyalty.points}</p>
        </div>
      </div>

      {/* My Tickets */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tickets</h2>
        <div className="space-y-4">
            {mockTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-900">{ticket.route}</p>
                        <p className="text-sm text-gray-600">{ticket.date}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        ticket.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                        {ticket.status}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
