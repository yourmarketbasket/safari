"use client";

import { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import superuserService from "@/app/services/superuser.service";
import { User, UserRank, UserStatus } from "@/app/models/User.model";
import Modal from "@/app/components/Modal";
import { FiEdit } from "react-icons/fi";

const ranks: UserRank[] = [
  "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager",
  "Supervisor", "Team Lead", "Staff", "Intern"
];

const statuses: UserStatus[] = ["pending", "approved", "rejected", "active", "inactive"];

export default function SuperuserUsersPage() {
  const { setTitle } = usePageTitleStore();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedRank, setUpdatedRank] = useState<UserRank | undefined>(undefined);
  const [updatedStatus, setUpdatedStatus] = useState<UserStatus | undefined>(undefined);

  useEffect(() => {
    setTitle("User Management");
  }, [setTitle]);

  const { data: users, isLoading, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => superuserService.getAllUsers(),
  });

  const updateUserMutation = useMutation({
    mutationFn: (user: User) => {
        if (!user || !user.id) {
            throw new Error("User ID is missing");
        }
        const promises = [];
        if (updatedRank) {
            promises.push(superuserService.updateUserRank(user.id, updatedRank));
        }
        if (updatedStatus) {
            promises.push(superuserService.updateUserStatus(user.id, updatedStatus));
        }
        return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
      setSelectedUser(null);
    },
  });

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setUpdatedRank(user.rank);
    setUpdatedStatus(user.status);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      updateUserMutation.mutate(selectedUser);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 w-full mb-6"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <tr>
                <th className="py-3 px-6 text-left font-light">Name</th>
                <th className="py-3 px-6 text-left font-light">Email</th>
                <th className="py-3 px-6 text-left font-light">Role</th>
                <th className="py-3 px-6 text-left font-light">Rank</th>
                <th className="py-3 px-6 text-left font-light">Status</th>
                <th className="py-3 px-6 text-left font-light">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs font-light">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-left whitespace-nowrap">{user.name}</td>
                  <td className="py-4 px-6 text-left">{user.email}</td>
                  <td className="py-4 px-6 text-left">{user.role}</td>
                  <td className="py-4 px-6 text-left">{user.rank || "N/A"}</td>
                  <td className="py-4 px-6 text-left">{user.status || "N/A"}</td>
                  <td className="py-4 px-6 text-left">
                    <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">
                      <FiEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Edit User: {selectedUser.name}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rank</label>
                    <select
                        value={updatedRank}
                        onChange={(e) => setUpdatedRank(e.target.value as UserRank)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {ranks.map(rank => <option key={rank} value={rank}>{rank}</option>)}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value as UserStatus)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={updateUserMutation.isPending}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {updateUserMutation.isPending ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
}
