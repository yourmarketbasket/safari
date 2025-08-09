"use client";

import { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { User } from "@/app/models/User.model";
import { Permission } from "@/app/models/Permission.model";
import UserManagementModal from "@/app/components/UserManagementModal";
import superuserService from "@/app/services/superuser.service";
import { FiUser, FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";
import Message from "@/app/components/Message";
import LoadingOverlay from "@/app/components/LoadingOverlay";

const UsersPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [users, setUsers] = useState<User[]>([]);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsersAndPermissions = async () => {
        setIsLoading(true);
        try {
            const [usersData, permissionsData] = await Promise.all([
                superuserService.getAllUsers(),
                superuserService.getAllPermissions()
            ]);
            setUsers(usersData);
            setAllPermissions(permissionsData);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTitle("User Management");
        fetchUsersAndPermissions();
    }, [setTitle]);

    const handleUserUpdate = (updatedUser: User) => {
        setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
    };

    const summaryStats = useMemo(() => {
        const total = users.length;
        const active = users.filter(u => u.approvedStatus === 'approved').length;
        const suspended = users.filter(u => u.approvedStatus === 'suspended').length;
        return { total, active, suspended };
    }, [users]);

    const columns: ColumnDef<User>[] = [
        {
            header: "Avatar",
            accessorKey: "avatar",
            cell: (row) => (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {row.avatar ? <img src={row.avatar} alt={row.name} className="w-full h-full rounded-full" /> : <FiUser className="text-gray-500" />}
                </div>
            )
        },
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { header: "Role", accessorKey: "role" },
        {
            header: "Status",
            accessorKey: "approvedStatus",
            cell: (row) => {
                const status = row.approvedStatus;
                const type =
                    status === "approved" ? "success" :
                    status === "suspended" ? "warning" :
                    status === "pending" ? "info" :
                    "error";
                return <Chip text={status} type={type} />;
            },
        },
        { header: "Rank", accessorKey: "rank" },
        {
            header: "Permissions",
            accessorKey: "permissions",
            cell: (row) => (
                <div className="flex flex-wrap gap-1">
                    {row.permissions.slice(0, 2).map(p => <Chip key={p} text={p} type="info" />)}
                    {row.permissions.length > 2 && <Chip text={`+${row.permissions.length - 2}`} type="default" />}
                </div>
            )
        },
        {
            header: "Actions",
            accessorKey: "_id",
            cell: (row) => (
                <button
                    onClick={() => setSelectedUser(row)}
                    className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
                >
                    Manage
                </button>
            )
        }
    ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard icon={FiUsers} title="Total Users" value={summaryStats.total} color="blue" />
        <SummaryCard icon={FiUserCheck} title="Active Users" value={summaryStats.active} color="green" />
        <SummaryCard icon={FiUserX} title="Suspended Users" value={summaryStats.suspended} color="yellow" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Users List</h2>
        {error && <Message type="error" message={error} />}
        {!isLoading && !error && <DataTable data={users} columns={columns} filterColumn="name" />}
      </div>

      {selectedUser && (
        <UserManagementModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onUserUpdate={handleUserUpdate}
            allPermissions={allPermissions}
        />
      )}
    </div>
  );
};

const SummaryCard = ({ icon: Icon, title, value, color }: { icon: React.ElementType, title: string, value: number, color: string }) => {
    const colorClasses = {
        blue: 'text-blue-500',
        green: 'text-green-500',
        yellow: 'text-yellow-500',
    }[color] || 'text-gray-500';

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className={`p-3 rounded-full bg-${color}-100`}>
                <Icon className={`w-6 h-6 ${colorClasses}`} />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                <p className={`text-3xl font-bold ${colorClasses}`}>{value}</p>
            </div>
        </div>
    );
};

export default UsersPage;
