"use client";

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';

const ReportsPage = () => {
    const { setTitle } = usePageTitleStore();
    useEffect(() => {
        setTitle("Generate Reports");
    }, [setTitle]);

    const handleGenerateReport = (reportType: string) => {
        alert(`Generating ${reportType} report...`);
    };

    return (
        <PrivateRoute allowedRoles={['support_staff']}>
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold mb-6">Reports</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Trip Performance</h2>
                        <p className="text-gray-600 mb-4">Generate a report on trip performance, including on-time rates and passenger load.</p>
                        <button
                            onClick={() => handleGenerateReport('Trip Performance')}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                            Generate
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Cancellation Rates</h2>
                        <p className="text-gray-600 mb-4">Generate a report on trip cancellation rates and reasons.</p>
                        <button
                            onClick={() => handleGenerateReport('Cancellation Rates')}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                            Generate
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Support Interactions</h2>
                        <p className="text-gray-600 mb-4">Generate a report on support interactions and resolution times.</p>
                        <button
                            onClick={() => handleGenerateReport('Support Interactions')}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default ReportsPage;
