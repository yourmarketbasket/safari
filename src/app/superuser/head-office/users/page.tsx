"use client";

import { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import superuserService from "@/app/services/superuser.service";
import { User, UserRank, UserStatus, UserRole } from "@/app/models/User.model";
import Modal from "@/app/components/Modal";
import Message from "@/app/components/Message";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import SearchAndFilter from "@/app/components/SearchAndFilter";
import Pagination from "@/app/components/Pagination";
import { FiEdit, FiLoader, FiRefreshCw, FiMail, FiPhone } from "react-icons/fi";
import { AxiosError } from "axios";

const ranks: UserRank[] = [
  "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager",
  "Supervisor", "Team Lead", "Staff", "Intern"
];

const statuses: UserStatus[] = ["pending", "approved", "rejected", "active", "inactive", "suspended"];
const roles: UserRole[] = ["passenger", "sacco", "owner", "queue_manager", "driver", "support_staff", "admin", "superuser", "headoffice"];

const StatusChip = ({ status }: { status: UserStatus }) => {
    const colorMap: Record<UserStatus, string> = {
        pending: 'bg-yellow-200 text-yellow-800',
        approved: 'bg-green-200 text-green-800',
        rejected: 'bg-red-200 text-red-800',
        active: 'bg-blue-200 text-blue-800',
        inactive: 'bg-gray-200 text-gray-800',
        suspended: 'bg-orange-200 text-orange-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorMap[status] || 'bg-gray-200'}`}>{status}</span>;
};

const VerifiedChip = ({ verified, type }: { verified: boolean, type: 'email' | 'phone' }) => {
    const Icon = type === 'email' ? FiMail : FiPhone;
    return (
        <span className={`flex items-center px-2 py-1 text-xs font-medium rounded-full ${verified ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
            <Icon className="mr-1" />
            {verified ? 'Verified' : 'Not Verified'}
        </span>
    );
};

export default function SuperuserUsersPage() {
  const { setTitle } = usePageTitleStore();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedRank, setUpdatedRank] = useState<UserRank | undefined>(undefined);
  const [updatedStatus, setUpdatedStatus] = useState<UserStatus | undefined>(undefined);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setTitle("User Management");
  }, [setTitle]);

  const { data: users, isLoading, error, refetch } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => superuserService.getAllUsers(),
  });

  const updateUserMutation = useMutation({
    mutationFn: (user: User) => {
        if (!user || !user.id) {
            throw new Error("User ID is missing");
        }
        const promises = [];
        if (updatedRank && updatedRank !== user.rank) {
            promises.push(superuserService.updateUserRank(user.id, updatedRank));
        }
        if (updatedStatus && updatedStatus !== user.approvedStatus) {
            promises.push(superuserService.updateUserStatus(user.id, updatedStatus));
        }
        if (promises.length === 0) {
            return Promise.resolve([]);
        }
        return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
      setSelectedUser(null);
      setNotification({ message: "User updated successfully!", type: 'success' });
    },
    onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message?: string; error?: string }>;
        const errorMessage = axiosError.response?.data?.message || axiosError.response?.data?.error || "An unexpected error occurred.";
        setNotification({ message: errorMessage, type: 'error' });
    }
  });

  const sortedAndFilteredUsers = useMemo(() => {
    if (!users) return [];
    const filtered = users
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(user => filterRole ? user.role === filterRole : true)
        .filter(user => filterStatus ? user.approvedStatus === filterStatus : true);

    if (sortConfig !== null) {
        filtered.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue === undefined || aValue === null) return 1;
            if (bValue === undefined || bValue === null) return -1;
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    return filtered;
  }, [users, searchTerm, filterRole, filterStatus, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredUsers, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredUsers.length / itemsPerPage);

  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setUpdatedRank(user.rank);
    setUpdatedStatus(user.approvedStatus);
    setNotification(null);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      updateUserMutation.mutate(selectedUser);
    }
  };

  const renderTableContent = () => {
      if (isLoading) {
          return (
              <tr>
                  <td colSpan={7} className="text-center py-8">
                      <FiLoader className="animate-spin text-purple-600 text-4xl mx-auto" />
                  </td>
              </tr>
          );
      }

      if (error) {
          return (
              <tr>
                  <td colSpan={7} className="text-center py-8">
                      <div className="text-red-500 mb-4">{`Error: ${error.message}`}</div>
                      <button onClick={() => refetch()} className="flex items-center mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                          <FiRefreshCw className="mr-2" />
                          Refresh
                      </button>
                  </td>
              </tr>
          );
      }

      if (paginatedUsers.length === 0) {
          return (
              <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                      No users found.
                  </td>
              </tr>
          );
      }

      return paginatedUsers.map((user) => (
        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-4 px-6 text-left whitespace-nowrap">{user.name}</td>
          <td className="py-4 px-6 text-left">{user.email}</td>
          <td className="py-4 px-6 text-left">{user.role}</td>
          <td className="py-4 px-6 text-left">{user.rank || "N/A"}</td>
          <td className="py-4 px-6 text-left">{user.approvedStatus ? <StatusChip status={user.approvedStatus} /> : "N/A"}</td>
          <td className="py-4 px-6 text-left">
            <div className="flex flex-col gap-1">
                {user.verified ? <VerifiedChip verified={user.verified.email} type="email" /> : <VerifiedChip verified={false} type="email" />}
                {user.verified ? <VerifiedChip verified={user.verified.phone} type="phone" /> : <VerifiedChip verified={false} type="phone" />}
            </div>
          </td>
          <td className="py-4 px-6 text-left">
            <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">
              <FiEdit size={18} />
            </button>
          </td>
        </tr>
      ));
  }

  return (
    <div>
        {notification && <Message message={notification.message} type={notification.type} />}
        {updateUserMutation.isPending && <LoadingOverlay />}
      <div className="bg-white p-8 rounded-2xl shadow-xl mt-4">
        <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
                { value: filterRole, onChange: setFilterRole, options: roles, placeholder: "Filter by Role" },
                { value: filterStatus, onChange: setFilterStatus, options: statuses, placeholder: "Filter by Status" }
            ]}
            sortOrder={sortConfig?.direction || 'asc'}
            onSortChange={(dir) => setSortConfig(sortConfig ? { ...sortConfig, direction: dir } : null)}
        />
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <tr>
                <th className="py-3 px-6 text-left font-light cursor-pointer" onClick={() => requestSort('name')}>Name</th>
                <th className="py-3 px-6 text-left font-light cursor-pointer" onClick={() => requestSort('email')}>Email</th>
                <th className="py-3 px-6 text-left font-light cursor-pointer" onClick={() => requestSort('role')}>Role</th>
                <th className="py-3 px-6 text-left font-light cursor-pointer" onClick={() => requestSort('rank')}>Rank</th>
                <th className="py-3 px-6 text-left font-light cursor-pointer" onClick={() => requestSort('approvedStatus')}>Status</th>
                <th className="py-3 px-6 text-left font-light">Verified</th>
                <th className="py-3 px-6 text-left font-light">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs font-light">
              {renderTableContent()}
            </tbody>
          </table>
        </div>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
      </div>
      {isModalOpen && selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Edit User: {selectedUser.name}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rank</label>
                    <select
                        value={updatedRank || ''}
                        onChange={(e) => setUpdatedRank(e.target.value as UserRank)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="" disabled>Select a rank</option>
                        {ranks.map(rank => <option key={rank} value={rank}>{rank}</option>)}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={updatedStatus || ''}
                        onChange={(e) => setUpdatedStatus(e.target.value as UserStatus)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                         <option value="" disabled>Select a status</option>
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
                        Update
                    </button>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
}
