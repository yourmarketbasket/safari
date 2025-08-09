"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { AuditLog } from "@/app/models/AuditLog.model";

// Dummy data for audit trails
const dummyAuditLogs: AuditLog[] = [
  { _id: "60d0fe4f5311236168a11301", userId: "60d0fe4f5311236168a10b03", action: "fare_adjusted", details: { route: "Nairobi-Mombasa", newFare: 1300 }, timestamp: new Date("2023-10-27T11:00:00Z") },
  { _id: "60d0fe4f5311236168a11302", userId: "60d0fe4f5311236168a10d02", action: "trip_completed", details: { tripId: "trip-123" }, timestamp: new Date("2023-10-27T10:05:00Z") },
  { _id: "60d0fe4f5311236168a11303", userId: "system", action: "trip_canceled", details: { tripId: "trip-456", reason: "Mechanical issue" }, timestamp: new Date("2023-10-27T09:00:00Z") },
  { _id: "60d0fe4f5311236168a11304", userId: "superuser-01", action: "staff_created", details: { newStaffId: "60d0fe4f5311236168a10d04" }, timestamp: new Date("2023-10-26T17:00:00Z") },
];

// Column definitions for the audit log table
const columns: ColumnDef<AuditLog>[] = [
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    cell: (row) => <span>{new Date(row.timestamp).toLocaleString()}</span>
  },
  { header: "User ID", accessorKey: "userId" },
  { header: "Action", accessorKey: "action" },
  {
    header: "Details",
    accessorKey: "details",
    cell: (row) => <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(row.details, null, 2)}</pre>
  },
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
