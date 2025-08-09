"use client";

import { User, UserRank, ApprovedStatus } from "@/app/models/User.model";
import { Permission } from "@/app/models/Permission.model";
import { FiX, FiUser, FiPlus, FiTrash2 } from "react-icons/fi";
import { Chip } from "./Chip";
import { useState, useEffect, FormEvent } from "react";
import superuserService from "@/app/services/superuser.service";
import Message from "./Message";
import Image from "next/image";

interface UserManagementModalProps {
  user: User | null;
  onClose: () => void;
  onUserUpdate: (updatedUser: User) => void;
  allPermissions: Permission[];
}

const ranks: UserRank[] = [ "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager", "Supervisor", "Team Lead", "Staff", "Intern", "Ordinary" ];
const statuses: ApprovedStatus[] = [ "pending", "approved", "suspended", "blocked" ];

export default function UserManagementModal({ user, onClose, onUserUpdate, allPermissions }: UserManagementModalProps) {
  const [currentRank, setCurrentRank] = useState<UserRank | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<ApprovedStatus | undefined>(undefined);
  const [currentUserPermissions, setCurrentUserPermissions] = useState<string[]>([]);
  const [newPermission, setNewPermission] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setCurrentRank(user.rank);
      setCurrentStatus(user.approvedStatus);
      setCurrentUserPermissions(user.permissions || []);
      setError(null);
      setNewPermission("");
    }
  }, [user]);

  if (!user) return null;

  const handleRemovePermission = (permissionToRemove: string) => {
    setCurrentUserPermissions(currentUserPermissions.filter(p => p !== permissionToRemove));
  };

  const handleAddPermission = (e: FormEvent) => {
    e.preventDefault();
    if (newPermission && !currentUserPermissions.includes(newPermission)) {
      setCurrentUserPermissions([...currentUserPermissions, newPermission]);
      setNewPermission("");
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let updatedUser = { ...user };

      if (currentRank && currentRank !== user.rank) {
        updatedUser = await superuserService.updateUserRank(user._id, currentRank);
      }

      if (currentStatus && currentStatus !== user.approvedStatus) {
        updatedUser = await superuserService.updateUserStatus(user._id, currentStatus);
      }

      const originalPermissions = new Set(user.permissions || []);
      const currentPermissions = new Set(currentUserPermissions);

      const permissionsToAdd = [...currentPermissions].filter(p => !originalPermissions.has(p));
      const permissionsToRemove = [...originalPermissions].filter(p => !currentPermissions.has(p));

      if (permissionsToAdd.length > 0) {
        updatedUser = await superuserService.addUserPermissions(user._id, permissionsToAdd);
      }

      for (const p of permissionsToRemove) {
        updatedUser = await superuserService.removeUserPermission(user._id, p);
      }

      onUserUpdate(updatedUser);
      onClose();

    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        setError(axiosError.response?.data?.error || err.message || 'An error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Well = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-md mb-3 text-gray-600">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>

        <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4 relative">
                {user.avatar ? <Image src={user.avatar} alt={user.name} layout="fill" className="rounded-full" /> : <FiUser className="text-gray-500" size={32}/>}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-purple-700">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto pr-2 space-y-5">
          <Well title="User Information">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Phone:</strong> {user.phone || 'N/A'}</div>
                <div><strong>Role:</strong> <Chip text={user.role} type="default"/></div>
                <div><strong>Status:</strong> <Chip text={user.approvedStatus} type={user.approvedStatus === 'approved' ? 'success' : 'warning'} /></div>
                <div><strong>Rank:</strong> {user.rank}</div>
                <div><strong>Email Verified:</strong> <Chip text={user.verified.email ? 'Yes' : 'No'} type={user.verified.email ? 'success' : 'error'} /></div>
                <div><strong>Phone Verified:</strong> <Chip text={user.verified.phone ? 'Yes' : 'No'} type={user.verified.phone ? 'success' : 'error'} /></div>
            </div>
          </Well>

          <Well title="Update Actions">
             <div className="flex items-center gap-4">
                <label htmlFor="rank-select" className="font-semibold w-24 text-sm">Update Rank:</label>
                <select id="rank-select" value={currentRank} onChange={(e) => setCurrentRank(e.target.value as UserRank)} className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow">
                    {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="status-select" className="font-semibold w-24 text-sm">Update Status:</label>
                <select id="status-select" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value as ApprovedStatus)} className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
          </Well>

          <Well title="Manage Permissions">
            <div className="flex flex-wrap gap-2 mb-4">
              {currentUserPermissions.length > 0 ? (
                currentUserPermissions.map(p => (
                  <div key={p} className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs font-medium">
                    <span>{allPermissions.find(ap => ap.permissionNumber === p)?.description || p}</span>
                    <button onClick={() => handleRemovePermission(p)} className="ml-2 text-purple-600 hover:text-purple-800">
                      <FiTrash2 />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No specific permissions assigned.</p>
              )}
            </div>
            <form onSubmit={handleAddPermission} className="flex items-center gap-3">
               <select value={newPermission} onChange={e => setNewPermission(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow">
                 <option value="" disabled>Select a permission to add</option>
                 {allPermissions
                    .filter(p => !currentUserPermissions.includes(p.permissionNumber))
                    .map(p => <option key={p._id} value={p.permissionNumber}>{p.description} ({p.permissionNumber})</option>)}
               </select>
               <button type="submit" className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 flex items-center justify-center">
                 <FiPlus size={20}/>
               </button>
            </form>
          </Well>

          {error && <Message type="error" message={error} />}
        </div>

        <div className="flex justify-end pt-4 mt-4 border-t">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm mr-3" onClick={onClose} disabled={isLoading}>
                Cancel
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-bold flex items-center" onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </div>
    </div>
  );
}
