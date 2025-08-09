"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import Link from "next/link";
import { FiTrendingUp, FiList } from "react-icons/fi";

const AdminDashboardPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Admin Dashboard");
    }, [setTitle]);

    const features = [
        { name: "Performance Monitoring", href: "/admin/performance-monitoring", icon: FiTrendingUp },
        { name: "Escalation Queue", href: "/admin/escalation-queue", icon: FiList },
        { name: "System Reports", href: "/admin/system-reports", icon: FiList },
    ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
                <Link href={feature.href} key={feature.name}>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
                        <feature.icon className="w-8 h-8 text-purple-600" />
                        <h2 className="text-lg font-semibold">{feature.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default AdminDashboardPage;
