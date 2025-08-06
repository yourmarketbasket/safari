"use client";

import SuperuserPrivateRoute from "@/app/components/SuperuserPrivateRoute";
import { SuperuserAuthProvider } from "@/app/lib/SuperuserAuthContext";

function SuperuserDashboardContent() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Superuser Dashboard</h1>
        </div>
    );
}

export default function SuperuserDashboardPage() {
    return (
        <SuperuserAuthProvider>
            <SuperuserPrivateRoute>
                <SuperuserDashboardContent />
            </SuperuserPrivateRoute>
        </SuperuserAuthProvider>
    );
}
