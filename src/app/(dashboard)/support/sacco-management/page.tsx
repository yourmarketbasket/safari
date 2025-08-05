"use client";

// Mock data
const mockSaccos = [
  { id: 'sacco-1', name: '2NK Sacco', license: 'NTSA-123', contact: '0711223344', ntsaCompliance: true, status: 'approved' },
  { id: 'sacco-2', name: 'Prestige Shuttle', license: 'NTSA-456', contact: '0755667788', ntsaCompliance: false, status: 'pending' },
  { id: 'sacco-3', name: 'Climax Coaches', license: 'NTSA-789', contact: '0799887766', ntsaCompliance: true, status: 'rejected' },
];

const statusColors: { [key: string]: string } = {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
}

export default function SaccoManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Sacco Management</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Add New Sacco
        </button>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NTSA Compliance</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSaccos.map((sacco) => (
              <tr key={sacco.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sacco.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sacco.license}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[sacco.status]}`}>
                    {sacco.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sacco.ntsaCompliance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {sacco.ntsaCompliance ? 'Compliant' : 'Non-Compliant'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">View/Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
