"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { User } from "@/app/models/User.model";
import UserRankModal from "@/app/components/UserRankModal";

// Dummy data for ranks - using the User model
const dummyUsersForRanks: User[] = [
  { _id: "60d0fe4f5311236168a10b01", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "passenger", rank: "Ordinary", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b02", name: "Jane Smith", email: "jane.smith@example.com", phone: "123-456-7891", role: "driver", rank: "Staff", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b03", name: "Admin User", email: "admin@example.com", phone: "123-456-7892", role: "admin", rank: "Manager", approvedStatus: "approved", permissions: ["manage_users"], verified: { email: true, phone: true }, createdAt: new Date() },
];

const RanksPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Define columns inside the component so they can use state setters
    const columns: ColumnDef<User>[] = [
        { header: "User Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { header: "Current Rank", accessorKey: "rank" },
        {
            header: "Actions",
            accessorKey: "_id",
            cell: (row) => (
                <button
                    onClick={() => setSelectedUser(row)}
                    className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                >
                    Manage Rank
                </button>
            )
        }
    ];

    useEffect(() => {
        setTitle("Rank Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update User Ranks</h2>
        <DataTable data={dummyUsersForRanks} columns={columns} filterColumn="rank" />
      </div>
      <UserRankModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default RanksPage;
