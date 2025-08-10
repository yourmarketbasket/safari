"use client";

import { useState, useMemo, useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';
import { DataTable, ColumnDef } from '@/app/components/DataTable';
import Pagination from '@/app/components/Pagination';

interface SystemError {
    _id: string;
    errorCode: string;
    message: string;
    timestamp: Date;
}

const mockSystemErrors: SystemError[] = [
    { _id: 'err-1', errorCode: 'E5001', message: 'Overbooking detected on trip T-123', timestamp: new Date() },
    { _id: 'err-2', errorCode: 'E5002', message: 'Queue processing failed for route R-456', timestamp: new Date() },
    { _id: 'err-3', errorCode: 'E5003', message: 'Route mismatch for bus B-789', timestamp: new Date() },
];

const SystemErrorsPage = () => {
    const { setTitle } = usePageTitleStore();
    const [errors, setErrors] = useState(mockSystemErrors);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setTitle("System Errors");
    }, [setTitle]);

    const columns: ColumnDef<SystemError>[] = useMemo(() => [
        { header: 'Error Code', accessorKey: 'errorCode' },
        { header: 'Message', accessorKey: 'message' },
        { header: 'Timestamp', accessorKey: 'timestamp', cell: (row: SystemError) => new Date(row.timestamp).toLocaleString() },
    ], []);

    const totalPages = Math.ceil(errors.length / itemsPerPage);

    return (
        <PrivateRoute allowedRoles={['support_staff']}>
            <div className="container mx-auto px-6 py-8">
                <DataTable
                    columns={columns}
                    data={errors}
                    filterColumn="errorCode"
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </div>
        </PrivateRoute>
    );
};

export default SystemErrorsPage;
