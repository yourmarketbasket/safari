"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";

const HRPayrollPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("HR/Payroll");
    }, [setTitle]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">HR/Payroll</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p>HR and Payroll functionality will be implemented here.</p>
            </div>
        </div>
    );
};

export default HRPayrollPage;
