"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { User, UserRank } from "@/app/models/User.model";

// Dummy data for ranks - using the User model
const dummyUsersForRanks: User[] = [
  { _id: "60d0fe4f5311236168a10b01", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "passenger", rank: "Ordinary", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b02", name: "Jane Smith", email: "jane.smith@example.com", phone: "123-456-7891", role: "driver", rank: "Staff", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b03", name: "Admin User", email: "admin@example.com", phone: "123-456-7892", role: "admin", rank: "Manager", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
];

const ranks: UserRank[] = [ "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager", "Supervisor", "Team Lead", "Staff", "Intern", "Ordinary" ];

// Column definitions for the rank table
const columns: ColumnDef<User>[] = [
  { header: "User Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Current Rank", accessorKey: "rank" },
  {
      header: "Update Rank",
      accessorKey: "rank", // Changed for semantics
      cell: (row) => (
          <div className="flex gap-2">
              <select defaultValue={row.rank} className="border border-gray-300 rounded-lg px-2 py-1 text-gray-800 bg-white">
                {ranks.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <button className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
          </div>
      )
  }
];

const RanksPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Rank Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update User Ranks</h2>
        <DataTable data={dummyUsersForRanks} columns={columns} filterColumn="rank" />
      </div>
    </div>
  );
};

export default RanksPage;
