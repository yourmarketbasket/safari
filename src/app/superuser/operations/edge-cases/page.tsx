"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Edge Case data
type EdgeCase = {
  id: number;
  scenario: string;
  description: string;
  lastOccurred: string;
  status: "Monitored" | "Action Required" | "Resolved";
};

// Dummy data for edge cases
const dummyEdgeCases: EdgeCase[] = [
  { id: 1, scenario: "Support Staff Overload", description: "High volume of support tickets during peak hours", lastOccurred: "2023-10-27", status: "Monitored" },
  { id: 2, scenario: "Reallocation Failures", description: "No available seats on subsequent buses for reallocation", lastOccurred: "2023-10-26", status: "Action Required" },
  { id: 3, scenario: "System Downtime", description: "Main booking server offline for 30 minutes", lastOccurred: "2023-10-20", status: "Resolved" },
];

// Column definitions for the edge case table
const columns: ColumnDef<EdgeCase>[] = [
  { header: "Scenario", accessorKey: "scenario" },
  { header: "Description", accessorKey: "description" },
  { header: "Last Occurred", accessorKey: "lastOccurred" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const statusColor =
        status === "Resolved" ? "bg-green-200 text-green-800" :
        status === "Action Required" ? "bg-red-200 text-red-800" :
        "bg-yellow-200 text-yellow-800";
      return <span className={`px-2 py-1 rounded-full font-semibold text-xs ${statusColor}`}>{status}</span>;
    },
  },
  {
      header: "Actions",
      accessorKey: "id",
      cell: () => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">View Log</button>
  }
];

const EdgeCasesPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edge Case Management</h1>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Define New Edge Case Protocol</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">New Protocol</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Monitored Edge Cases</h2>
        <DataTable data={dummyEdgeCases} columns={columns} filterColumn="status" />
      </div>
    </div>
  );
};

export default EdgeCasesPage;
