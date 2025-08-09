"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Type for Edge Case data
type EdgeCase = {
  _id: string;
  scenario: string;
  description: string;
  lastOccurred: string;
  status: "Monitored" | "Action Required" | "Resolved";
};

// Dummy data for edge cases
const dummyEdgeCases: EdgeCase[] = [
  { _id: "60d0fe4f5311236168a11201", scenario: "Support Staff Overload", description: "High volume of support tickets during peak hours", lastOccurred: "2023-10-27", status: "Monitored" },
  { _id: "60d0fe4f5311236168a11202", scenario: "Reallocation Failures", description: "No available seats on subsequent buses for reallocation", lastOccurred: "2023-10-26", status: "Action Required" },
  { _id: "60d0fe4f5311236168a11203", scenario: "System Downtime", description: "Main booking server offline for 30 minutes", lastOccurred: "2023-10-20", status: "Resolved" },
];

// Column definitions for the edge case table
const columns: ColumnDef<EdgeCase>[] = [
  { header: "Scenario", accessorKey: "scenario" },
  { header: "Description", accessorKey: "description" },
  { header: "Last Occurred", accessorKey: "lastOccurred" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.status;
      const type =
        status === "Resolved" ? "success" :
        status === "Action Required" ? "error" :
        "warning";
      return <Chip text={status} type={type} />;
    },
  },
  {
      header: "Actions",
      accessorKey: "_id",
      cell: (_row) => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">View Log</button>
  }
];

const EdgeCasesPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Edge Case Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
