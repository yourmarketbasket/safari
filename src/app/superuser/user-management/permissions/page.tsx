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
import { FiPlus, FiEdit, FiTrash2, FiShield, FiUser, FiTruck, FiKey, FiHelpCircle, FiPocket, FiList, FiUserCheck, FiUsers } from "react-icons/fi";
import PermissionModal from "@/app/components/PermissionModal";
import { Chip } from "@/app/components/Chip";
import SummaryCard from "@/app/components/SummaryCard";
import { Button } from "@/app/components/ui/Button";
import Pagination from "@/app/components/Pagination";

const allRoles: UserRole[] = ["sacco", "owner", "admin", "driver", "passenger", "support_staff", "queue_manager", "Superuser", "ordinary"];

const roleDisplayConfig: Record<UserRole, { icon: React.ElementType, color: string }> = {
    sacco: { icon: FiTruck, color: 'blue' },
    owner: { icon: FiKey, color: 'yellow' },
    admin: { icon: FiUserCheck, color: 'green' },
    driver: { icon: FiUser, color: 'purple' },
    passenger: { icon: FiPocket, color: 'indigo' },
    support_staff: { icon: FiHelpCircle, color: 'pink' },
    queue_manager: { icon: FiList, color: 'teal' },
    Superuser: { icon: FiShield, color: 'red' },
    ordinary: { icon: FiUser, color: 'gray' },
};

const PermissionsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [permissionToEdit, setPermissionToEdit] = useState<Permission | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const summaryStats = useMemo(() => {
        const total = permissions.length;
        const rolesCount = allRoles.reduce((acc, role) => {
            acc[role] = permissions.filter(p => p.roles.includes(role)).length;
            return acc;
        }, {} as Record<string, number>);

        const passengerAndOrdinary = (rolesCount.passenger || 0) + (rolesCount.ordinary || 0);

        return { total, rolesCount, passengerAndOrdinary };
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
                  <Button
                    onClick={() => handleOpenModal(row)}
                    size="sm"
                  >
                    <FiEdit /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDeletePermission(row.permissionNumber)}
                    size="sm"
                    variant="danger"
                  >
                    <FiTrash2 /> Delete
                  </Button>
              </div>
          )
      }
    ];

    const totalPages = Math.ceil(permissions.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}

      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex-1 min-w-[300px]">
            <SummaryCard icon={FiShield} title="Total Permissions" value={summaryStats.total} color="blue" />
        </div>
        <div className="flex-1 min-w-[300px]">
            <SummaryCard icon={FiUsers} title="Passengers & Ordinary Users" value={summaryStats.passengerAndOrdinary} color="indigo" />
        </div>
        {Object.entries(summaryStats.rolesCount).map(([role, count]) => {
            if (role === 'passenger' || role === 'ordinary') return null; // Already grouped
            const config = roleDisplayConfig[role as UserRole];
            const formattedRole = role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
                <div className="flex-1 min-w-[300px]" key={role}>
                    <SummaryCard icon={config.icon} title={formattedRole} value={count} color={config.color} />
                </div>
            );
        })}
      </div>

      <Button
        onClick={() => handleOpenModal()}
        className="fixed bottom-8 right-8 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-all"
        aria-label="Add Permission"
      >
        <FiPlus size={24} />
      </Button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Existing Permissions</h2>
        {error && <Message type="error" message={error} />}
        {!isLoading && !error && (
            <>
                <DataTable
                    data={permissions}
                    columns={columns}
                    filterColumn="description"
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </>
        )}
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
