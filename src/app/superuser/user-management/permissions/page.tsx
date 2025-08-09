"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Permission data
type Permission = {
  _id: string;
  role: "Admin" | "Support" | "Driver" | "Queue Manager";
  permission: string;
  description: string;
  assigned: number;
};

// Dummy data for permissions
const dummyPermissions: Permission[] = [
  { _id: "60d0fe4f5311236168a10c01", role: "Admin", permission: "manage_users", description: "Can create, edit, and delete users", assigned: 5 },
  { _id: "60d0fe4f5311236168a10c02", role: "Support", permission: "handle_tickets", description: "Can respond to and resolve support tickets", assigned: 20 },
  { _id: "60d0fe4f5311236168a10c03", role: "Admin", permission: "set_fares", description: "Can adjust route pricing", assigned: 3 },
  { _id: "60d0fe4f5311236168a10c04", role: "Driver", permission: "view_manifest", description: "Can view passenger list for a trip", assigned: 150 },
  { _id: "60d0fe4f5311236168a10c05", role: "Queue Manager", permission: "manage_queues", description: "Can manage bus queues at stations", assigned: 15 },
];

// Column definitions for the permission table
const columns: ColumnDef<Permission>[] = [
  { header: "Role", accessorKey: "role" },
  { header: "Permission", accessorKey: "permission" },
  { header: "Description", accessorKey: "description" },
  { header: "Users Assigned", accessorKey: "assigned" },
  {
      header: "Actions",
      accessorKey: "_id",
      cell: (_row) => (
          <div className="flex gap-2">
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
              <button className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Revoke</button>
          </div>
      )
  }
];

const PermissionsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Permission Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Permission</h2>
            <p className="text-gray-600 mb-4">A form will be provided here to create a new permission and assign it to a role.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Add Permission</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Existing Permissions</h2>
        <DataTable data={dummyPermissions} columns={columns} filterColumn="role" />
      </div>
    </div>
  );
};

export default PermissionsPage;
