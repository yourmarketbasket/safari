"use client";

import { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Permission } from "@/app/models/Permission.model";
import { UserRole } from "@/app/models/User.model";
import superuserService from "@/app/services/superuser.service";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import Message from "@/app/components/Message";
import { FiPlus, FiEdit, FiTrash2, FiShield, FiUser, FiTruck, FiKey, FiHelpCircle, FiPocket, FiList, FiUserCheck } from "react-icons/fi";
import PermissionModal from "@/app/components/PermissionModal";
import { Chip } from "@/app/components/Chip";
import SummaryCard from "@/app/components/SummaryCard";

const allRoles: UserRole[] = ["sacco", "owner", "admin", "driver", "passenger", "support_staff", "queue_manager", "superuser"];

const roleDisplayConfig: Record<UserRole, { icon: React.ElementType, color: string }> = {
    sacco: { icon: FiTruck, color: 'blue' },
    owner: { icon: FiKey, color: 'yellow' },
    admin: { icon: FiUserCheck, color: 'green' },
    driver: { icon: FiUser, color: 'purple' },
    passenger: { icon: FiPocket, color: 'indigo' },
    support_staff: { icon: FiHelpCircle, color: 'pink' },
    queue_manager: { icon: FiList, color: 'teal' },
    superuser: { icon: FiShield, color: 'red' },
};

const PermissionsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [permissionToEdit, setPermissionToEdit] = useState<Permission | null>(null);

    const summaryStats = useMemo(() => {
        const total = permissions.length;
        const rolesCount = allRoles.reduce((acc, role) => {
            acc[role] = permissions.filter(p => p.roles.includes(role)).length;
            return acc;
        }, {} as Record<string, number>);
        return { total, rolesCount };
    }, [permissions]);

    const fetchPermissions = async () => {
        setIsLoading(true);
        try {
            const data = await superuserService.getAllPermissions();
            setPermissions(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to fetch permissions.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTitle("Permission Management");
        fetchPermissions();
    }, [setTitle]);

    const handleOpenModal = (permission?: Permission) => {
        setPermissionToEdit(permission || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setPermissionToEdit(null);
        setIsModalOpen(false);
    };

    const handleSavePermission = (savedData: Permission | Permission[]) => {
        if (Array.isArray(savedData)) {
            setPermissions(prev => [...prev, ...savedData]);
        } else if (permissionToEdit) {
            setPermissions(prev => prev.map(p => p._id === savedData._id ? savedData : p));
        } else {
            setPermissions(prev => [...prev, savedData]);
        }
    };

    const handleDeletePermission = async (permissionNumber: string) => {
        if (window.confirm(`Are you sure you want to delete permission ${permissionNumber}? This action cannot be undone.`)) {
            try {
                await superuserService.deletePermission(permissionNumber);
                setPermissions(permissions.filter(p => p.permissionNumber !== permissionNumber));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(`Failed to delete permission ${permissionNumber}.`);
                }
            }
        }
    };

    const columns: ColumnDef<Permission>[] = [
      { header: "Permission #", accessorKey: "permissionNumber" },
      { header: "Description", accessorKey: "description" },
      {
        header: "Roles",
        accessorKey: "roles",
        cell: (row) => (
            <div className="flex flex-wrap gap-1">
                {row.roles.map((r, index) => <Chip key={`${row._id}-${r}-${index}`} text={r} type="default" />)}
            </div>
        )
      },
      {
          header: "Actions",
          accessorKey: "_id", // Use a unique key for actions
          cell: (row) => (
              <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(row)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeletePermission(row.permissionNumber)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
              </div>
          )
      }
    ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}

      <div className="grid grid-auto-fit gap-6 mb-8">
        <SummaryCard icon={FiShield} title="Total Permissions" value={summaryStats.total} color="blue" />
        {Object.entries(summaryStats.rolesCount).map(([role, count]) => {
            const config = roleDisplayConfig[role as UserRole];
            const formattedRole = role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
                <SummaryCard key={role} icon={config.icon} title={formattedRole} value={count} color={config.color} />
            );
        })}
      </div>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Permission Configuration</h2>
                <p className="text-gray-600 mt-1">Create new permissions and assign them to roles.</p>
            </div>
            <button onClick={() => handleOpenModal()} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                <FiPlus /> Add Permission
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Existing Permissions</h2>
        {error && <Message type="error" message={error} />}
        {!isLoading && !error && <DataTable data={permissions} columns={columns} filterColumn="description" />}
      </div>

      <PermissionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePermission}
        permissionToEdit={permissionToEdit}
      />
    </div>
  );
};

export default PermissionsPage;
