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
import { FiPlus, FiEdit, FiTrash2, FiShield, FiUser, FiTruck, FiKey, FiHelpCircle, FiPocket, FiList, FiUserCheck, FiChevronDown } from "react-icons/fi";
import PermissionModal from "@/app/components/PermissionModal";
import { Chip } from "@/app/components/Chip";
import SummaryCard from "@/app/components/SummaryCard";
import { Button } from "@/app/components/ui/Button";
import Pagination from "@/app/components/Pagination";

const allRoles: UserRole[] = ["sacco", "owner", "admin", "driver", "passenger", "support_staff", "queue_manager", "superuser", "ordinary"];

const roleDisplayConfig: Record<UserRole, { icon: React.ElementType, color: string }> = {
    sacco: { icon: FiTruck, color: 'blue' },
    owner: { icon: FiKey, color: 'yellow' },
    admin: { icon: FiUserCheck, color: 'green' },
    driver: { icon: FiUser, color: 'purple' },
    passenger: { icon: FiPocket, color: 'indigo' },
    support_staff: { icon: FiHelpCircle, color: 'pink' },
    queue_manager: { icon: FiList, color: 'teal' },
    superuser: { icon: FiShield, color: 'red' },
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

    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    const groupedPermissions = useMemo(() => {
        return allRoles.map(role => ({
            role,
            permissions: permissions.filter(p => p.roles.includes(role)),
        })).filter(group => group.permissions.length > 0);
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
        // This logic might need adjustment if the backend returns the full updated list
        fetchPermissions(); // Easiest way to get the updated state
    };

    const handleDeletePermission = async (permissionNumber: string) => {
        if (window.confirm(`Are you sure you want to delete permission ${permissionNumber}? This action cannot be undone.`)) {
            try {
                await superuserService.deletePermission(permissionNumber);
                fetchPermissions(); // Refresh the list
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(`Failed to delete permission ${permissionNumber}.`);
                }
            }
        }
    };

    const AccordionItem = ({ group, isOpen, onToggle }: { group: any, isOpen: boolean, onToggle: () => void }) => {
        const { role, permissions } = group;
        const config = roleDisplayConfig[role as UserRole];
        const formattedRole = role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
            <div className="border-b border-gray-200">
                <h2>
                    <button type="button" onClick={onToggle} className="flex items-center justify-between w-full p-5 font-normal text-left text-gray-800 bg-gray-50 hover:bg-gray-100">
                        <div className="flex items-center">
                            <config.icon className={`w-6 h-6 text-${config.color}-500 mr-4`} />
                            <span className="text-lg">{formattedRole}</span>
                            <span className="ml-4 text-sm font-semibold text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">{permissions.length}</span>
                        </div>
                        <FiChevronDown className={`w-6 h-6 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </h2>
                {isOpen && (
                    <div className="p-5 border-t-0 border-gray-200 bg-white">
                        <ul className="space-y-2">
                            {permissions.map((p: Permission) => (
                                <li key={p._id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                                    <div>
                                        <p className="font-semibold text-gray-700">{p.permissionNumber}</p>
                                        <p className="text-sm text-gray-500">{p.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleOpenModal(p)} size="sm"><FiEdit /></Button>
                                        <Button onClick={() => handleDeletePermission(p.permissionNumber)} size="sm" variant="danger"><FiTrash2 /></Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen relative">
            {isLoading && <LoadingOverlay />}

            <div className="mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Permission Configuration</h2>
                        <p className="text-gray-600 mt-1">Create new permissions and assign them to roles, grouped by role below.</p>
                    </div>
                    <Button onClick={() => handleOpenModal()}>
                        <FiPlus /> Add Permission
                    </Button>
                </div>
            </div>

            {error && <Message type="error" message={error} />}
            {!isLoading && !error && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {groupedPermissions.map(group => (
                        <AccordionItem
                            key={group.role}
                            group={group}
                            isOpen={activeAccordion === group.role}
                            onToggle={() => setActiveAccordion(activeAccordion === group.role ? null : group.role)}
                        />
                    ))}
                </div>
            )}

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
