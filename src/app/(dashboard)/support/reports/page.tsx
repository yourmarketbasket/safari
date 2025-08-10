"use client";

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';
import { Button } from '@/app/components/ui/Button';

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
                        <Button
                            onClick={() => handleGenerateReport('Trip Performance')}
                            className="w-full"
                        >
                            Generate
                        </Button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Cancellation Rates</h2>
                        <p className="text-gray-600 mb-4">Generate a report on trip cancellation rates and reasons.</p>
                        <Button
                            onClick={() => handleGenerateReport('Cancellation Rates')}
                            className="w-full"
                        >
                            Generate
                        </Button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Support Interactions</h2>
                        <p className="text-gray-600 mb-4">Generate a report on support interactions and resolution times.</p>
                        <Button
                            onClick={() => handleGenerateReport('Support Interactions')}
                            className="w-full"
                        >
                            Generate
                        </Button>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default ReportsPage;
