"use client";

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { permissions as initialPermissions, Permission } from '../../../data/permissions';

// Mock API functions
const getPermissions = async (): Promise<Permission[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return initialPermissions;
};

const addPermission = async (newPermission: Omit<Permission, 'permissionNumber'>): Promise<Permission> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const permission = { ...newPermission, permissionNumber: `P${Math.floor(Math.random() * 1000)}` };
  console.log('Adding permission:', permission);
  return permission;
};

const bulkAddPermissions = async (newPermissions: Omit<Permission, 'permissionNumber'>[]): Promise<Permission[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const permissionsWithIds = newPermissions.map(p => ({ ...p, permissionNumber: `P${Math.floor(Math.random() * 1000)}` }));
    console.log('Bulk adding permissions:', permissionsWithIds);
    return permissionsWithIds;
  };

type SortConfig = {
    key: keyof Permission;
    direction: 'ascending' | 'descending';
};

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

export default function PermissionManagementPage() {
  const queryClient = useQueryClient();
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
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: permissions, isLoading, error } = useQuery<Permission[], Error>({
    queryKey: ['permissions'],
    queryFn: getPermissions,
  });

  const { mutate: createPermission, isPending: isAdding } = useMutation<Permission, Error, Omit<Permission, 'permissionNumber'>>({
    mutationFn: addPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });

  const { mutate: bulkCreatePermissions, isPending: isBulkAdding } = useMutation<Permission[], Error, Omit<Permission, 'permissionNumber'>[]>({
    mutationFn: bulkAddPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });

  const allRoles = useMemo(() => {
    const roles = new Set<string>();
    permissions?.forEach(p => p.roles.forEach(r => roles.add(r)));
    return Array.from(roles).sort();
  }, [permissions]);

  const filteredAndSortedPermissions = useMemo(() => {
    let filtered = permissions || [];

    if (searchTerm) {
      filtered = filtered.filter(p => p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterRole) {
      filtered = filtered.filter(p => p.roles.includes(filterRole));
    }

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [permissions, searchTerm, filterRole, sortConfig]);

  const paginatedPermissions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPermissions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPermissions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedPermissions.length / itemsPerPage);

  const requestSort = (key: keyof Permission) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPermission(prev => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRolesInput(e.target.value);
    setNewPermission(prev => ({ ...prev, roles: e.target.value.split(',').map(r => r.trim()) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPermission(newPermission);
  };

  const handleBulkSubmit = () => {
    try {
      const parsedPermissions = JSON.parse(bulkJson);
      bulkCreatePermissions(parsedPermissions);
    } catch {
      alert('Invalid JSON format.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Permission Management</h1>

      {/* Add Permission Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Permission</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="description" value={newPermission.description} onChange={handleInputChange} placeholder="Description" className="p-2 border rounded placeholder-gray-400 focus:ring-2 focus:ring-blue-500" />
          <input name="roles" value={rolesInput} onChange={handleRolesChange} placeholder="Roles (comma-separated)" className="p-2 border rounded placeholder-gray-400 focus:ring-2 focus:ring-blue-500" />
          <input name="modulePage" value={newPermission.modulePage} onChange={handleInputChange} placeholder="Module/Page" className="p-2 border rounded placeholder-gray-400 focus:ring-2 focus:ring-blue-500" />
          <select name="httpMethod" value={newPermission.httpMethod} onChange={handleInputChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input name="constraints" value={newPermission.constraints} onChange={handleInputChange} placeholder="Constraints" className="p-2 border rounded placeholder-gray-400 focus:ring-2 focus:ring-blue-500 md:col-span-2" />
          <button type="submit" disabled={isAdding} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 md:col-span-2">
            {isAdding ? 'Adding...' : 'Add Permission'}
          </button>
        </form>
      </div>

      {/* Bulk Add Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bulk Add Permissions</h2>
        <textarea
          value={bulkJson}
          onChange={(e) => setBulkJson(e.target.value)}
          placeholder="Paste JSON array of permissions here..."
          className="w-full h-32 p-2 border rounded mb-4"
        />
        <button onClick={handleBulkSubmit} disabled={isBulkAdding} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400">
          {isBulkAdding ? 'Adding...' : 'Bulk Add Permissions'}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <input
            type="text"
            placeholder="Search descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="p-2 border rounded focus:ring-2 focus:ring-blue-500">
            <option value="">Filter by Role</option>
            {allRoles.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
      </div>

      {/* Permissions Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading && <p className="p-4">Loading permissions...</p>}
          {error && <p className="p-4 text-red-500">Error loading permissions: {error.message}</p>}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th onClick={() => requestSort('permissionNumber')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th onClick={() => requestSort('description')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPermissions.map((permission) => (
                <tr key={permission.permissionNumber}>
                  <td className="px-6 py-4 whitespace-nowrap">{permission.permissionNumber}</td>
                  <td className="px-6 py-4 whitespace-normal">{permission.description}</td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="flex flex-wrap gap-1">
                      {permission.roles.map(role => (
                        <span key={role} className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(role)}`}>{role}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal">
                    <button className="text-indigo-600 hover:text-indigo-900"><FiEdit size={18} /></button>
                    <button className="text-red-600 hover:text-red-900 ml-4"><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded disabled:opacity-50">Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
