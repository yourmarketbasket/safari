"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { User } from "@/app/models/User.model";

// Dummy data for staff, conforming to the User model
const dummyStaff: User[] = [
  { _id: "60d0fe4f5311236168a10d01", name: "Manager Mike", email: "mike@example.com", phone: "234-567-8901", role: "admin", rank: "Manager", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10d02", name: "Agent Alice", email: "alice@example.com", phone: "234-567-8902", role: "support_staff", rank: "Staff", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10d03", name: "Tech Tom", email: "tom@example.com", phone: "234-567-8903", role: "support_staff", rank: "Staff", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10d04", name: "Agent Bob", email: "bob@example.com", phone: "234-567-8904", role: "support_staff", rank: "Staff", approvedStatus: "suspended", permissions: [], verified: { email: true, phone: false }, createdAt: new Date() },
];

// Column definitions for the staff table
const columns: ColumnDef<User>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
  {
    header: "Status",
    accessorKey: "approvedStatus",
    cell: (row) => {
      const status = row.approvedStatus;
      const type = status === "approved" ? "success" : "warning";
      return <Chip text={status} type={type} />;
    },
  },
  { header: "Rank", accessorKey: "rank" },
  {
      header: "Actions",
      accessorKey: "_id",
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
