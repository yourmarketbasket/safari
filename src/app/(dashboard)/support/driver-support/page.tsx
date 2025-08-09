"use client";

import { useState, useMemo, useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';
import { DataTable, ColumnDef } from '@/app/components/DataTable';
import Modal from '@/app/components/Modal';
import { Chip } from '@/app/components/Chip';

interface DriverSupportRequest {
    _id: string;
    driverName: string;
    vehiclePlate: string;
    issue: string;
    status: 'open' | 'in-progress' | 'resolved';
    timestamp: Date;
}

const mockDriverSupportRequests: DriverSupportRequest[] = [
    { _id: 'dsr-1', driverName: 'James Kamau', vehiclePlate: 'KBC 123D', issue: 'Mechanical issue', status: 'open', timestamp: new Date() },
    { _id: 'dsr-2', driverName: 'Susan Njeri', vehiclePlate: 'KDE 456F', issue: 'Passenger dispute', status: 'in-progress', timestamp: new Date() },
    { _id: 'dsr-3', driverName: 'David Omondi', vehiclePlate: 'KFG 789H', issue: 'Connectivity problem', status: 'resolved', timestamp: new Date() },
];

const DriverSupportPage = () => {
    const { setTitle } = usePageTitleStore();
    useEffect(() => {
        setTitle("Driver Support");
    }, [setTitle]);

    const [requests, setRequests] = useState(mockDriverSupportRequests);
    const [selectedRequest, setSelectedRequest] = useState<DriverSupportRequest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewRequest = (request: DriverSupportRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const columns: ColumnDef<DriverSupportRequest>[] = useMemo(() => [
        { header: 'Driver Name', accessorKey: 'driverName' },
        { header: 'Vehicle Plate', accessorKey: 'vehiclePlate' },
        { header: 'Issue', accessorKey: 'issue' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row: DriverSupportRequest) => (
                <Chip
                    text={row.status}
                    type={
                        row.status === 'open' ? 'error' :
                        row.status === 'in-progress' ? 'warning' :
                        'success'
                    }
                />
            )
        },
        { header: 'Timestamp', accessorKey: 'timestamp', cell: (row: DriverSupportRequest) => new Date(row.timestamp).toLocaleString() },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: (row: DriverSupportRequest) => (
                <button
                    onClick={() => handleViewRequest(row)}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    View
                </button>
            )
        }
    ], []);

    return (
        <PrivateRoute allowedRoles={['support_staff']}>
            <div className="container mx-auto px-6 py-8">
                <DataTable columns={columns} data={requests} filterColumn="status" />

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {selectedRequest && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800">{selectedRequest.issue}</h2>
                            <p className="mt-2 text-sm text-gray-500">Driver: {selectedRequest.driverName} ({selectedRequest.vehiclePlate})</p>
                            <div className="mt-4">
                                <h3 className="font-semibold">Details</h3>
                                <p className="text-sm">The driver reported a mechanical issue with the bus. Needs immediate attention.</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Close
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                                    Assign Technician
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </PrivateRoute>
    );
};

export default DriverSupportPage;
