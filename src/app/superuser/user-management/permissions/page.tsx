"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Permission } from "@/app/models/Permission.model";

// Dummy data for permissions
const dummyPermissions: Permission[] = [
  { _id: "60d0fe4f5311236168a10c01", permissionNumber: "1001", description: "Can create, edit, and delete users", roles: ["admin", "superuser"] },
  { _id: "60d0fe4f5311236168a10c02", permissionNumber: "1002", description: "Can respond to and resolve support tickets", roles: ["support_staff"] },
  { _id: "60d0fe4f5311236168a10c03", permissionNumber: "1003", description: "Can adjust route pricing", roles: ["admin"] },
  { _id: "60d0fe4f5311236168a10c04", permissionNumber: "2001", description: "Can view passenger list for a trip", roles: ["driver"] },
  { _id: "60d0fe4f5311236168a10c05", permissionNumber: "3001", description: "Can manage bus queues at stations", roles: ["queue_manager"] },
];

// Column definitions for the permission table
const columns: ColumnDef<Permission>[] = [
  { header: "Permission #", accessorKey: "permissionNumber" },
  { header: "Description", accessorKey: "description" },
  {
    header: "Roles",
    accessorKey: "roles",
    cell: (row) => <span>{row.roles.join(', ')}</span>
  },
  {
      header: "Actions",
      accessorKey: "_id",
      cell: () => (
          <div className="flex gap-2">
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
              <button className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
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
        <DataTable data={dummyPermissions} columns={columns} filterColumn="permissionNumber" />
      </div>
    </div>
  );
};

export default PermissionsPage;
