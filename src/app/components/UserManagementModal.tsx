"use client";

import { User, UserRank, ApprovedStatus } from "@/app/models/User.model";
import { FiX } from "react-icons/fi";
import { Chip } from "./Chip";

interface UserManagementModalProps {
  user: User | null;
  onClose: () => void;
}

const ranks: UserRank[] = [ "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager", "Supervisor", "Team Lead", "Staff", "Intern", "Ordinary" ];
const statuses: ApprovedStatus[] = [ "pending", "approved", "suspended", "blocked" ];

export default function UserManagementModal({ user, onClose }: UserManagementModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-purple-600">Manage User</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">User Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Current Status & Verification</h3>
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

          <div className="pt-4 border-t space-y-4">
            <h3 className="font-semibold text-lg">Update Actions</h3>
            <div className="flex items-center gap-4">
                <label htmlFor="rank-select" className="font-semibold w-24">Update Rank:</label>
                <select id="rank-select" defaultValue={user.rank} className="border border-gray-400 rounded-lg px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow">
                    {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="status-select" className="font-semibold w-24">Update Status:</label>
                <select id="status-select" defaultValue={user.approvedStatus} className="border border-gray-400 rounded-lg px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
             <div className="flex justify-end pt-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold">
                    Save Changes
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
