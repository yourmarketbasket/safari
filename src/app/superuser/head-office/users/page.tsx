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
import ToggleSwitch from "@/app/components/ToggleSwitch";
import UserDetailCard from "@/app/components/UserDetailCard";
import {
    FiLoader, FiRefreshCw, FiMail, FiPhone, FiCheckCircle, FiXCircle,
    FiUsers, FiUserX, FiBriefcase
} from "react-icons/fi";
import { FaUsers, FaUserTie, FaCar, FaUser, FaClipboardList, FaUserShield } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { AxiosError } from "axios";

const ranks: UserRank[] = [
  "CEO", "CFO", "COO", "CTO", "VP", "Director", "Manager",
  "Supervisor", "Team Lead", "Staff", "Intern", "Ordinary"
];

const statuses: UserStatus[] = ['pending', 'approved', 'suspended', 'blocked'];
const roles: UserRole[] = ["passenger", "sacco", "owner", "queue_manager", "driver", "support_staff", "admin", "superuser", "headoffice"];

const StatusChip = ({ status }: { status: UserStatus }) => {
    const statusMap: Record<UserStatus, { icon: React.ElementType, color: string }> = {
        pending: { icon: FiLoader, color: 'text-yellow-600 animate-spin' },
        approved: { icon: FiCheckCircle, color: 'text-green-600' },
        suspended: { icon: FiUserX, color: 'text-orange-600' },
        blocked: { icon: FiXCircle, color: 'text-red-600' },
    };
    const { icon: Icon, color } = statusMap[status] || { icon: FiUsers, color: 'text-gray-600' };
    return <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 ${color}`}><Icon /></div>;
};

const VerifiedChip = ({ verified, type }: { verified: boolean, type: 'email' | 'phone' }) => {
    const TypeIcon = type === 'email' ? FiMail : FiPhone;
    const StatusIcon = verified ? FiCheckCircle : FiXCircle;
    return (
        <div className={`flex items-center gap-1 p-1 rounded-full ${verified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <TypeIcon />
            <StatusIcon />
        </div>
    );
};

const roleUIConfig: Record<UserRole, { icon: React.ElementType, color: string }> = {
    passenger: { icon: FaUser, color: "from-blue-400 to-blue-600" },
    driver: { icon: FaCar, color: "from-green-400 to-green-600" },
    sacco: { icon: FaUsers, color: "from-purple-400 to-purple-600" },
    owner: { icon: FaUserTie, color: "from-indigo-400 to-indigo-600" },
    queue_manager: { icon: FaClipboardList, color: "from-pink-400 to-pink-600" },
    admin: { icon: RiAdminLine, color: "from-yellow-400 to-yellow-600" },
    support_staff: { icon: BiSupport, color: "from-teal-400 to-teal-600" },
    superuser: { icon: FaUserShield, color: "from-red-400 to-red-600" },
    headoffice: { icon: FiBriefcase, color: "from-gray-400 to-gray-600" },
};

const SummaryCard = ({ title, value, icon, color, isLoading }: { title: string, value: number, icon: React.ReactNode, color: string, isLoading: boolean }) => (
    <div className={`bg-gradient-to-br ${color} text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300`}>
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="text-4xl opacity-80">{icon}</div>
        </div>
        <div className="mt-4">
            <p className="text-6xl font-bold">{isLoading ? <FiLoader className="animate-spin" /> : value}</p>
        </div>
    </div>
);

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
  const [isEditMode, setIsEditMode] = useState(false);
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

  const userStats = useMemo(() => {
    if (!users) {
        return { totalUsers: 0, byRole: {} };
    }
    const byRole: Record<string, number> = {};
    roles.forEach(role => byRole[role] = 0);

    users.forEach(user => {
        if (byRole.hasOwnProperty(user.role)) {
            byRole[user.role]++;
        }
    });

    return { totalUsers: users.length, byRole };
  }, [users]);

  const handleApiError = (error: Error, defaultMessage: string) => {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    const errorMessage = axiosError.response?.data?.message || axiosError.response?.data?.error || defaultMessage;
    setNotification({ message: errorMessage, type: 'error' });
  };

  const updateUserMutation = useMutation({
    mutationFn: (user: User) => {
        if (!user || !user._id) {
            throw new Error("User ID is missing");
        }
        const promises = [];
        if (updatedRank && updatedRank !== user.rank) {
            promises.push(superuserService.updateUserRank(user._id, updatedRank));
        }
        if (updatedStatus && updatedStatus !== user.approvedStatus) {
            promises.push(superuserService.updateUserStatus(user._id, updatedStatus));
        }
        if (promises.length === 0) {
            return Promise.resolve([]);
        }
        return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedUser(null);
      setNotification({ message: "User updated successfully!", type: 'success' });
    },
    onError: (error: Error) => handleApiError(error, "Failed to update user."),
  });

  const updateBlockStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string, status: UserStatus }) => {
        return superuserService.updateUserStatus(userId, status);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setNotification({ message: "User status updated successfully!", type: 'success' });
    },
    onError: (error: Error) => handleApiError(error, "Failed to update user status."),
  });

  const sortedAndFilteredUsers = useMemo(() => {
    if (!users) return [];
    let filtered = users
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(user => filterRole ? user.role === filterRole : true)
        .filter(user => filterStatus ? user.approvedStatus === filterStatus : true);

    if (sortConfig !== null) {
        filtered = [...filtered].sort((a, b) => {
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

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setUpdatedRank(user.rank);
    setUpdatedStatus(user.approvedStatus);
    setNotification(null);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      updateUserMutation.mutate(selectedUser);
    }
  };

  const handleToggleBlock = (user: User) => {
    const newStatus = user.approvedStatus === 'blocked' ? 'approved' : 'blocked';
    updateBlockStatusMutation.mutate({ userId: user._id, status: newStatus });
  };

  const renderTableContent = () => {
      if (isLoading) {
          return (
              <tr>
                  <td colSpan={8} className="text-center py-8">
                      <FiLoader className="animate-spin text-purple-600 text-4xl mx-auto" />
                  </td>
              </tr>
          );
      }

      if (error) {
          return (
              <tr>
                  <td colSpan={8} className="text-center py-8">
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
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                      No users found.
                  </td>
              </tr>
          );
      }

      return paginatedUsers.map((user) => (
        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => openUserModal(user)}>
          <td className="py-4 px-6 text-left whitespace-nowrap">{user.name}</td>
          <td className="py-4 px-6 text-left">{user.email}</td>
          <td className="py-4 px-6 text-left">{user.phone || "N/A"}</td>
          <td className="py-4 px-6 text-left">{user.role}</td>
          <td className="py-4 px-6 text-left">{user.rank || "N/A"}</td>
          <td className="py-4 px-6 text-left">{user.approvedStatus ? <StatusChip status={user.approvedStatus} /> : null}</td>
          <td className="py-4 px-6 text-left">
            <div className="flex items-center gap-2">
                <VerifiedChip verified={!!user.verified?.email} type="email" />
                <VerifiedChip verified={!!user.verified?.phone} type="phone" />
            </div>
          </td>
          <td className="py-4 px-6 text-left">
            <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                <ToggleSwitch
                    isOn={user.approvedStatus === 'blocked'}
                    onToggle={() => handleToggleBlock(user)}
                    disabled={updateBlockStatusMutation.isPending}
                />
            </div>
          </td>
        </tr>
      ));
  }

  return (
    <div>
        {notification && <Message message={notification.message} type={notification.type} />}
        {updateUserMutation.isPending && <LoadingOverlay />}
        {updateBlockStatusMutation.isPending && <LoadingOverlay />}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {Object.entries(userStats.byRole).map(([role, count]) => {
                const config = roleUIConfig[role as UserRole] || { icon: FiUsers, color: "from-gray-400 to-gray-600" };
                return <SummaryCard key={role} title={role} value={count} icon={<config.icon />} color={config.color} isLoading={isLoading} />
            })}
        </div>

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
                <th className="py-3 px-6 text-left font-light cursor-pointer" onClick={() => requestSort('phone')}>Phone</th>
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
            {isEditMode ? (
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Edit User: {selectedUser.name}</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Rank</label>
                        <select
                            value={updatedRank || ''}
                            onChange={(e) => setUpdatedRank(e.target.value as UserRank)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                             <option value="" disabled>Select a status</option>
                            {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={() => setIsEditMode(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={updateUserMutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <UserDetailCard user={selectedUser} />
                    <div className="flex justify-end gap-2 p-4 bg-gray-50 rounded-b-xl">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Edit User
                        </button>
                    </div>
                </div>
            )}
        </Modal>
      )}
    </div>
  );
}
