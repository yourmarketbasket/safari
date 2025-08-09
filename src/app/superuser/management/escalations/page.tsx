"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Escalation data
type Escalation = {
  id: number;
  issue: string;
  escalatedBy: string;
  department: "Technical" | "Payments" | "Operations";
  date: string;
  status: "Pending" | "In Review" | "Resolved";
};

// Dummy data for escalations
const dummyEscalations: Escalation[] = [
  { id: 1, issue: "Repeated Cancellations on Route 5", escalatedBy: "Jane Doe", department: "Operations", date: "2023-10-26", status: "In Review" },
  { id: 2, issue: "Large Refund Request #F999", escalatedBy: "John Smith", department: "Payments", date: "2023-10-25", status: "Resolved" },
  { id: 3, issue: "System-wide login failures", escalatedBy: "Tech Team", department: "Technical", date: "2023-10-27", status: "Pending" },
];

// Column definitions for the escalation table
const columns: ColumnDef<Escalation>[] = [
  { header: "Issue", accessorKey: "issue" },
  { header: "Escalated By", accessorKey: "escalatedBy" },
  { header: "Department", accessorKey: "department" },
  { header: "Date", accessorKey: "date" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const statusColor =
        status === "Resolved" ? "bg-green-200 text-green-800" :
        status === "In Review" ? "bg-yellow-200 text-yellow-800" :
        "bg-red-200 text-red-800";
      return <span className={`px-2 py-1 rounded-full font-semibold text-xs ${statusColor}`}>{status}</span>;
    },
  },
   {
      header: "Actions",
      accessorKey: "id",
      cell: () => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Review</button>
  }
];

const EscalationsPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Escalation Management</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escalation Queue</h2>
        <DataTable data={dummyEscalations} columns={columns} filterColumn="department" />
      </div>
    </div>
  );
};

export default EscalationsPage;
