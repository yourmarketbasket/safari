"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";

const VehicleManagementPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Vehicle Management");
    }, [setTitle]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Vehicle Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p>Vehicle management functionality will be implemented here.</p>
            </div>
        </div>
    );
};

export default VehicleManagementPage;
