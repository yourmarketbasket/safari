"use client";

import { User, UserRank, ApprovedStatus } from "@/app/models/User.model";
import { FiX, FiUser } from "react-icons/fi";
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
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>

        <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" /> : <FiUser className="text-gray-500" size={32}/>}
            </div>
            <div>
                <h2 className="text-xl font-bold text-purple-600">{user.name}</h2>
                <p className="text-xs text-gray-500">{user.email}</p>
            </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3 text-xs">
          <div>
            <h3 className="font-semibold text-sm mb-1">Contact Details</h3>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Current Status & Verification</h3>
            <div className="flex items-center gap-3">
                <p><strong>Status:</strong> <Chip text={user.approvedStatus} type={user.approvedStatus === 'approved' ? 'success' : 'warning'} /></p>
                <p><strong>Email Verified:</strong> <Chip text={user.verified.email ? 'Yes' : 'No'} type={user.verified.email ? 'success' : 'error'} /></p>
                <p><strong>Phone Verified:</strong> <Chip text={user.verified.phone ? 'Yes' : 'No'} type={user.verified.phone ? 'success' : 'error'} /></p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Permissions</h3>
            <div className="flex flex-wrap gap-1">
              {user.permissions.length > 0 ? (
                user.permissions.map(p => <Chip key={p} text={p} type="info" />)
              ) : (
                <p className="text-xs text-gray-500">No specific permissions assigned.</p>
              )}
            </div>
          </div>

          <div className="pt-3 border-t space-y-3">
            <h3 className="font-semibold text-sm">Update Actions</h3>
            <div className="flex items-center gap-3">
                <label htmlFor="rank-select" className="font-semibold w-20 text-xs">Update Rank:</label>
                <select id="rank-select" defaultValue={user.rank} className="border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex-grow">
                    {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-3">
                <label htmlFor="status-select" className="font-semibold w-20 text-xs">Update Status:</label>
                <select id="status-select" defaultValue={user.approvedStatus} className="border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 flex-grow">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4 mt-4 border-t">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm mr-2" onClick={onClose}>
                Cancel
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-bold">
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
}
