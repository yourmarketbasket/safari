"use client";

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiEdit, FiTrash2, FiPlus, FiLoader, FiRefreshCw } from 'react-icons/fi';
import { FaUserShield, FaUsers, FaUserTie, FaCar, FaUser, FaClipboardList } from 'react-icons/fa';
import { RiAdminLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import { Permission } from '../../../models/Permission.model';
import Modal from '../../../components/Modal';
import SearchAndFilter from '../../../components/SearchAndFilter';
import Pagination from '../../../components/Pagination';
import Message from '../../../components/Message';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { usePageTitleStore } from '../../../store/pageTitle.store';
import superuserService from '@/app/services/superuser.service';
import { AxiosError } from 'axios';

const roleColorMap: { [key: string]: string } = {
  Superuser: 'bg-red-200 text-red-800',
  Admin: 'bg-blue-200 text-blue-800',
  'Support Staff': 'bg-green-200 text-green-800',
  Sacco: 'bg-yellow-200 text-yellow-800',
  Owner: 'bg-purple-200 text-purple-800',
  'Queue Manager': 'bg-pink-200 text-pink-800',
  Driver: 'bg-indigo-200 text-indigo-800',
  Passenger: 'bg-gray-200 text-gray-800',
};

const getRoleColor = (role: string) => {
  return roleColorMap[role] || 'bg-gray-200 text-gray-800';
};

const roleIconMap: { [key: string]: React.ElementType } = {
    Superuser: FaUserShield,
    Admin: RiAdminLine,
    'Support Staff': BiSupport,
    Sacco: FaUsers,
    Owner: FaUserTie,
    'Queue Manager': FaClipboardList,
    Driver: FaCar,
    Passenger: FaUser,
};

const ALL_ROLES = ['Superuser', 'Admin', 'Support Staff', 'Sacco', 'Owner', 'Queue Manager', 'Driver', 'Passenger'];


export default function PermissionManagementPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle('Permission Management');
  }, [setTitle]);

  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [activeTab, setActiveTab] = useState('single');
  const [newPermission, setNewPermission] = useState<Omit<Permission, 'permissionNumber'>>({
    description: '',
    roles: [],
    modulePage: '',
    httpMethod: 'GET',
    constraints: '',
  });
  const [bulkJson, setBulkJson] = useState('');
  const [rolesInput, setRolesInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { data: permissions, isLoading, error, refetch } = useQuery<Permission[], Error>({
    queryKey: ['permissions'],
    queryFn: superuserService.getAllPermissions,
  });

  const handleApiError = (error: Error, defaultMessage: string) => {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    const errorMessage = axiosError.response?.data?.message || axiosError.response?.data?.error || defaultMessage;
    setNotification({ message: errorMessage, type: 'error' });
  };

  const createPermissionMutation = useMutation<Permission, Error, Omit<Permission, 'permissionNumber'>>({
    mutationFn: superuserService.createPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      setIsModalOpen(false);
      setNotification({ message: 'Permission created successfully!', type: 'success' });
    },
    onError: (error) => handleApiError(error, 'Failed to create permission.'),
  });

  const bulkCreatePermissionsMutation = useMutation<Permission[], Error, Omit<Permission, 'permissionNumber'>[]>({
    mutationFn: superuserService.createPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      setIsModalOpen(false);
      setNotification({ message: 'Permissions created successfully!', type: 'success' });
    },
    onError: (error) => handleApiError(error, 'Failed to create permissions.'),
  });

  const updatePermissionMutation = useMutation<Permission, Error, Permission>({
    mutationFn: (permission) => superuserService.updatePermission(permission.permissionNumber, permission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      setIsModalOpen(false);
      setNotification({ message: 'Permission updated successfully!', type: 'success' });
    },
    onError: (error) => handleApiError(error, 'Failed to update permission.'),
  });

  const deletePermissionMutation = useMutation<void, Error, string>({
    mutationFn: (permissionNumber) => superuserService.deletePermission(permissionNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      setNotification({ message: 'Permission deleted successfully!', type: 'success' });
    },
    onError: (error) => handleApiError(error, 'Failed to delete permission.'),
  });

  const allRoles = useMemo(() => {
    if (!permissions) return ALL_ROLES;
    const roles = new Set<string>();
    permissions?.forEach(p => p.roles.forEach(r => roles.add(r)));
    return Array.from(roles).sort();
  }, [permissions]);

  const permissionStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    ALL_ROLES.forEach(role => stats[role] = 0);

    if (permissions) {
        permissions.forEach(permission => {
            permission.roles.forEach(role => {
                if (stats.hasOwnProperty(role)) {
                    stats[role]++;
                }
            });
        });
    }
    return stats;
  }, [permissions]);

  const filteredAndSortedPermissions = useMemo(() => {
    if (!permissions) return [];
    let filtered = permissions;

    if (searchTerm) {
      filtered = filtered.filter(p => p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterRole) {
      filtered = filtered.filter(p => p.roles.includes(filterRole));
    }

    const sortedPermissions = [...filtered];

    sortedPermissions.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.description.localeCompare(b.description);
      } else {
        return b.description.localeCompare(a.description);
      }
    });

    return sortedPermissions;
  }, [permissions, searchTerm, filterRole, sortOrder]);

  const paginatedPermissions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPermissions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPermissions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedPermissions.length / itemsPerPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPermission(prev => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRolesInput(e.target.value);
    setNewPermission(prev => ({ ...prev, roles: e.target.value.split(',').map(r => r.trim()) }));
  };

  const handleEdit = (permission: Permission) => {
    setIsEditMode(true);
    setSelectedPermission(permission);
    setNewPermission(permission);
    setRolesInput(permission.roles.join(', '));
    setNotification(null);
    setIsModalOpen(true);
  };

  const handleDelete = (permissionNumber: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      deletePermissionMutation.mutate(permissionNumber);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedPermission) {
        updatePermissionMutation.mutate({ ...newPermission, permissionNumber: selectedPermission.permissionNumber });
    } else {
        createPermissionMutation.mutate(newPermission);
    }
  };

  const handleBulkSubmit = () => {
    try {
      const parsedPermissions = JSON.parse(bulkJson);
      bulkCreatePermissionsMutation.mutate(parsedPermissions);
    } catch {
      alert('Invalid JSON format.');
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setSelectedPermission(null);
    setNewPermission({
      description: '',
      roles: [],
      modulePage: '',
      httpMethod: 'GET',
      constraints: '',
    });
    setRolesInput('');
    setNotification(null);
    setIsModalOpen(true);
  };

  const isMutationLoading = createPermissionMutation.isPending ||
                            updatePermissionMutation.isPending ||
                            deletePermissionMutation.isPending ||
                            bulkCreatePermissionsMutation.isPending;

  const renderTableContent = () => {
    if (isLoading) {
        return (
            <tr>
                <td colSpan={4} className="text-center py-8">
                    <FiLoader className="animate-spin text-purple-600 text-4xl mx-auto" />
                </td>
            </tr>
        );
    }

    if (error) {
        return (
            <tr>
                <td colSpan={4} className="text-center py-8">
                    <div className="text-red-500 mb-4">{`Error: ${error.message}`}</div>
                    <button onClick={() => refetch()} className="flex items-center mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        <FiRefreshCw className="mr-2" />
                        Refresh
                    </button>
                </td>
            </tr>
        );
    }

    if (paginatedPermissions.length === 0) {
        return (
            <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                    No permissions found.
                </td>
            </tr>
        );
    }

    return paginatedPermissions.map((permission) => (
        <tr key={permission.permissionNumber}>
          <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-xs">{permission.permissionNumber}</td>
          <td className="px-6 py-4 whitespace-normal text-gray-900 text-xs">{permission.description}</td>
          <td className="px-6 py-4 whitespace-normal">
            <div className="flex flex-wrap gap-1">
              {permission.roles.map(role => (
                <span key={role} className={`px-2 py-1 text-xs font-light rounded-full ${getRoleColor(role)}`}>{role}</span>
              ))}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-normal">
            <button onClick={() => handleEdit(permission)} className="text-indigo-600 hover:text-indigo-900"><FiEdit size={18} /></button>
            <button onClick={() => handleDelete(permission.permissionNumber)} className="text-red-600 hover:text-red-900 ml-4"><FiTrash2 size={18} /></button>
          </td>
        </tr>
      ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
        {notification && <Message message={notification.message} type={notification.type} />}
        {isMutationLoading && <LoadingOverlay />}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 mt-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Permissions Dashboard</h2>
            <button onClick={openAddModal} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <FiPlus className="mr-2" />
                Add Permissions
            </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(permissionStats).map(([role, count]) => {
                const Icon = roleIconMap[role] || FaUser;
                const roleColors = getRoleColor(role);
                const textColor = roleColors.split(' ')[1] || 'text-gray-800';

                return (
                    <div key={role} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-40 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <h3 className={`text-xl font-semibold ${textColor}`}>{role}</h3>
                            <Icon className={`text-3xl ${textColor}`} />
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-gray-900">{isLoading ? <FiLoader className="animate-spin" /> : count}</p>
                            <p className="text-sm text-gray-500">Permissions</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex border-b mb-4">
            <button onClick={() => setActiveTab('single')} className={`py-2 px-4 ${activeTab === 'single' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}>Add Single</button>
            <button onClick={() => setActiveTab('bulk')} className={`py-2 px-4 ${activeTab === 'bulk' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}>Bulk Add</button>
        </div>
        {activeTab === 'single' && (
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">{isEditMode ? 'Edit Permission' : 'Add New Permission'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="description" value={newPermission.description} onChange={handleInputChange} placeholder="Description" className="p-2 border border-gray-400 rounded text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500" />
                    <input name="roles" value={rolesInput} onChange={handleRolesChange} placeholder="Roles (comma-separated)" className="p-2 border border-gray-400 rounded text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500" />
                    <input name="modulePage" value={newPermission.modulePage} onChange={handleInputChange} placeholder="Module/Page" className="p-2 border border-gray-400 rounded text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500" />
                    <select name="httpMethod" value={newPermission.httpMethod} onChange={handleInputChange} className="p-2 border border-gray-400 rounded text-black focus:ring-2 focus:ring-blue-500">
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                    </select>
                    <input name="constraints" value={newPermission.constraints} onChange={handleInputChange} placeholder="Constraints" className="p-2 border border-gray-400 rounded text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500 md:col-span-2" />
                    <button type="submit" disabled={createPermissionMutation.isPending || updatePermissionMutation.isPending} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 md:col-span-2">
                        {createPermissionMutation.isPending || updatePermissionMutation.isPending ? 'Saving...' : 'Save Permission'}
                    </button>
                </form>
            </div>
        )}
        {activeTab === 'bulk' && (
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Bulk Add Permissions</h2>
                <textarea
                value={bulkJson}
                onChange={(e) => setBulkJson(e.target.value)}
                placeholder="Paste JSON array of permissions here..."
                className="w-full h-32 p-2 border rounded mb-4"
                />
                <button onClick={handleBulkSubmit} disabled={bulkCreatePermissionsMutation.isPending} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400">
                {bulkCreatePermissionsMutation.isPending ? 'Adding...' : 'Bulk Add Permissions'}
                </button>
            </div>
        )}
      </Modal>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
            { value: filterRole, onChange: setFilterRole, options: allRoles, placeholder: "Filter by Role" }
        ]}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
    </div>
  );
}
