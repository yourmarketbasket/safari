"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import Link from "next/link";
import { FiTruck, FiList, FiUser, FiTrendingUp, FiGift, FiUsers } from "react-icons/fi";

const SaccoDashboardPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Sacco Dashboard");
    }, [setTitle]);

    const features = [
        { name: "Route Management", href: "/sacco/route-management", icon: FiList },
        { name: "Vehicle Management", href: "/sacco/vehicle-management", icon: FiTruck },
        { name: "Queue Management", href: "/sacco/queue-management", icon: FiList },
        { name: "Driver Management", href: "/sacco/driver-management", icon: FiUser },
        { name: "Revenue", href: "/sacco/revenue", icon: FiTrendingUp },
        { name: "Promotions", href: "/sacco/promotions", icon: FiGift },
        { name: "HR/Payroll", href: "/sacco/hr-payroll", icon: FiUsers },
    ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Sacco Dashboard</h1>
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

export default SaccoDashboardPage;
