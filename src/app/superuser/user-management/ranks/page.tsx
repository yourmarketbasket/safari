"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Rank data
type Rank = {
  id: number;
  name: string;
  email: string;
  currentRank: string;
  newRank: string;
};

// Dummy data for ranks
const dummyRanks: Rank[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", currentRank: "Passenger Tier 1", newRank: "Passenger Tier 2" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", currentRank: "Driver Level 3", newRank: "Driver Level 4" },
  { id: 3, name: "Admin User", email: "admin@example.com", currentRank: "Lead Admin", newRank: "Lead Admin" },
];

// Column definitions for the rank table
const columns: ColumnDef<Rank>[] = [
  { header: "User Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Current Rank", accessorKey: "currentRank" },
  {
      header: "Update Rank",
      accessorKey: "id",
      cell: () => (
          <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg px-2 py-1 text-gray-800 bg-white">
                <option>Passenger Tier 1</option>
                <option>Passenger Tier 2</option>
                <option>Driver Level 3</option>
                <option>Driver Level 4</option>
                <option>Lead Admin</option>
              </select>
              <button className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
          </div>
      )
  }
];

const RanksPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Rank Management</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update User Ranks</h2>
        <DataTable data={dummyRanks} columns={columns} filterColumn="currentRank" />
      </div>
    </div>
  );
};

export default RanksPage;
