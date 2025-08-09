"use client";

import { User, UserRank } from "@/app/models/User.model";
import { FiX } from "react-icons/fi";
import { Chip } from "./Chip";

interface UserRankModalProps {
  user: User | null;
  onClose: () => void;
}

const ranks: UserRank[] = [ "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager", "Supervisor", "Team Lead", "Staff", "Intern", "Ordinary" ];

export default function UserRankModal({ user, onClose }: UserRankModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-purple-600">Manage User Rank</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">User Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Status & Verification</h3>
            <div className="flex items-center gap-4">
              <p><strong>Status:</strong> <Chip text={user.approvedStatus} type={user.approvedStatus === 'approved' ? 'success' : 'warning'} /></p>
              <p><strong>Email Verified:</strong> <Chip text={user.verified.email ? 'Yes' : 'No'} type={user.verified.email ? 'success' : 'error'} /></p>
              <p><strong>Phone Verified:</strong> <Chip text={user.verified.phone ? 'Yes' : 'No'} type={user.verified.phone ? 'success' : 'error'} /></p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Permissions</h3>
            <div className="flex flex-wrap gap-2">
              {user.permissions.length > 0 ? (
                user.permissions.map(p => <Chip key={p} text={p} type="info" />)
              ) : (
                <p className="text-sm text-gray-500">No specific permissions assigned.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Update Rank</h3>
            <div className="flex items-center gap-4">
                <label htmlFor="rank-select" className="font-semibold">Current Rank:</label>
                <select id="rank-select" defaultValue={user.rank} className="border border-gray-400 rounded-lg px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold">
                    Save Rank
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
