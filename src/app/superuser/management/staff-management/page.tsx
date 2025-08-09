"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Type for Staff data
type Staff = {
  id: number;
  name: string;
  role: "Support Lead" | "Support Agent" | "Technical Support";
  status: "Active" | "On Leave";
  performance: "Excellent" | "Good" | "Needs Improvement";
};

// Dummy data for staff
const dummyStaff: Staff[] = [
  { id: 1, name: "Manager Mike", role: "Support Lead", status: "Active", performance: "Excellent" },
  { id: 2, name: "Agent Alice", role: "Support Agent", status: "Active", performance: "Good" },
  { id: 3, name: "Tech Tom", role: "Technical Support", status: "On Leave", performance: "Excellent" },
  { id: 4, name: "Agent Bob", role: "Support Agent", status: "Active", performance: "Needs Improvement" },
];

// Column definitions for the staff table
const columns: ColumnDef<Staff>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const type = status === "Active" ? "success" : "default";
      return <Chip text={status} type={type} />;
    },
  },
  {
    header: "Performance",
    accessorKey: "performance",
     cell: (performance) => {
      const type =
        performance === "Excellent" ? "info" :
        performance === "Good" ? "success" :
        "warning";
      return <Chip text={performance} type={type} />;
    },
  },
  {
      header: "Actions",
      accessorKey: "id",
      cell: () => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Manage</button>
  }
];

const StaffManagementPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Staff Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Staff Member</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Add Staff</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Support Staff</h2>
        <DataTable data={dummyStaff} columns={columns} filterColumn="role" />
      </div>
    </div>
  );
};

export default StaffManagementPage;
