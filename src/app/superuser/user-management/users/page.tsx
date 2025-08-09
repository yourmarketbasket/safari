"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { User } from "@/app/models/User.model";
import UserManagementModal from "@/app/components/UserManagementModal";
import { FiUser } from "react-icons/fi";

// Dummy data for users
const dummyUsers: User[] = [
  { _id: "60d0fe4f5311236168a10b01", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "passenger", rank: "Ordinary", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b02", name: "Jane Smith", email: "jane.smith@example.com", phone: "123-456-7891", role: "driver", rank: "Staff", approvedStatus: "approved", permissions: ["view_manifest"], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b03", name: "Admin User", email: "admin@example.com", phone: "123-456-7892", role: "admin", rank: "Manager", approvedStatus: "approved", permissions: ["manage_users", "set_fares"], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b04", name: "Suspended Driver", email: "suspend@example.com", phone: "123-456-7893", role: "driver", rank: "Staff", approvedStatus: "suspended", permissions: [], verified: { email: true, phone: false }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b05", name: "Blocked User", email: "blocked@example.com", phone: "123-456-7894", role: "passenger", rank: "Ordinary", approvedStatus: "blocked", permissions: [], verified: { email: false, phone: false }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b06", name: "Pending Passenger", email: "pending@example.com", phone: "123-456-7895", role: "passenger", rank: "Ordinary", approvedStatus: "pending", permissions: [], verified: { email: false, phone: false }, createdAt: new Date() },
];

const UsersPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Define columns inside the component so they can use state setters
    const columns: ColumnDef<User>[] = [
        {
            header: "Avatar",
            accessorKey: "avatar",
            cell: (row) => (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {row.avatar ? <img src={row.avatar} alt={row.name} className="w-full h-full rounded-full" /> : <FiUser className="text-gray-500" />}
                </div>
            )
        },
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { header: "Role", accessorKey: "role" },
        {
            header: "Status",
            accessorKey: "approvedStatus",
            cell: (row) => {
            const status = row.approvedStatus;
            const type =
                status === "approved" ? "success" :
                status === "suspended" ? "warning" :
                status === "pending" ? "info" :
                "error";
            return <Chip text={status} type={type} />;
            },
        },
        { header: "Rank", accessorKey: "rank" },
        {
            header: "Permissions",
            accessorKey: "permissions",
            cell: (row) => (
                <div className="flex flex-wrap gap-1">
                    {row.permissions.slice(0, 2).map(p => <Chip key={p} text={p} type="info" />)}
                    {row.permissions.length > 2 && <Chip text={`+${row.permissions.length - 2}`} type="default" />}
                </div>
            )
        },
        {
            header: "Actions",
            accessorKey: "_id",
            cell: (row) => (
                <button
                    onClick={() => setSelectedUser(row)}
                    className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                >
                    Manage
                </button>
            )
        }
    ];

    useEffect(() => {
        setTitle("User Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-500">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Users</h2>
          <p className="text-4xl font-bold text-green-500">1,100</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Suspended Users</h2>
          <p className="text-4xl font-bold text-yellow-500">50</p>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Users List</h2>
        <DataTable data={dummyUsers} columns={columns} filterColumn="approvedStatus" />
      </div>

      <UserManagementModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default UsersPage;
