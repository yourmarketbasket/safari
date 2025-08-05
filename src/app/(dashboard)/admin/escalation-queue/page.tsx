"use client";

// Mock data
const mockEscalations = [
  { id: 'esc-1', type: 'Fare Dispute', description: 'Passenger claims overcharge on route R-123.', status: 'open', escalatedBy: 'Alice Johnson' },
  { id: 'esc-2', type: 'Payroll Dispute', description: 'Driver D-456 disputes payment for trip T-789.', status: 'open', escalatedBy: 'Bob Williams' },
  { id: 'esc-3', type: 'Sacco Compliance', description: 'Sacco S-01 fails to meet NTSA requirements repeatedly.', status: 'resolved', escalatedBy: 'Alice Johnson' },
];

const statusColors: { [key: string]: string } = {
    open: 'bg-red-100 text-red-800',
    resolved: 'bg-green-100 text-green-800',
}

export default function EscalationQueuePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Escalation Queue</h1>
      <p className="mt-2 text-gray-600">Review and resolve issues escalated by the support team.</p>

      <div className="mt-8 space-y-4">
        {mockEscalations.map((issue) => (
          <div key={issue.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-gray-900">{issue.type}</p>
                <p className="mt-1 text-sm text-gray-600">{issue.description}</p>
                 <p className="mt-2 text-xs text-gray-500">Escalated by: {issue.escalatedBy}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[issue.status]}`}>
                    {issue.status}
                  </span>
              </div>
            </div>
             {issue.status === 'open' && (
                 <div className="mt-4 flex justify-end">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        Resolve
                    </button>
                 </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}
