"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Audit Log data
type AuditLog = {
  id: number;
  user: string;
  action: string;
  details: string;
  timestamp: string;
};

// Dummy data for audit trails
const dummyAuditLogs: AuditLog[] = [
  { id: 1, user: "Admin User", action: "Updated Fare", details: "Route Nairobi-Mombasa fare changed to KES 1300", timestamp: "2023-10-27 11:00 AM" },
  { id: 2, user: "Jane Doe", action: "Processed Refund", details: "Ticket #1234 refunded", timestamp: "2023-10-27 10:05 AM" },
  { id: 3, user: "System", action: "Auto-reallocation", details: "35 passengers reallocated from Bus A to Bus B", timestamp: "2023-10-27 09:00 AM" },
  { id: 4, user: "Superuser", action: "Blocked User", details: "User 'blocked@example.com' blocked", timestamp: "2023-10-26 05:00 PM" },
];

// Column definitions for the audit log table
const columns: ColumnDef<AuditLog>[] = [
  { header: "Timestamp", accessorKey: "timestamp" },
  { header: "User", accessorKey: "user" },
  { header: "Action", accessorKey: "action" },
  { header: "Details", accessorKey: "details" },
];

const AuditTrailsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Audit Trails");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">System Action Log</h2>
        <DataTable data={dummyAuditLogs} columns={columns} filterColumn="action" />
      </div>
    </div>
  );
};

export default AuditTrailsPage;
