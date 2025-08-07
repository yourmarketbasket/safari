"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { permissions as initialPermissions, Permission } from '../../../data/permissions';

// Mock API functions
const getPermissions = async (): Promise<Permission[]> => {
  // In a real app, this would be an API call.
  // We'll simulate it with a delay.
  await new Promise(resolve => setTimeout(resolve, 500));
  return initialPermissions;
};

const addPermission = async (newPermission: Omit<Permission, 'permissionNumber'>): Promise<Permission> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const permission = { ...newPermission, permissionNumber: `P${Math.floor(Math.random() * 1000)}` };
  // In a real app, you'd post to the server and it would return the new permission with an ID.
  console.log('Adding permission:', permission);
  return permission;
};

const bulkAddPermissions = async (newPermissions: Omit<Permission, 'permissionNumber'>[]): Promise<Permission[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const permissionsWithIds = newPermissions.map(p => ({ ...p, permissionNumber: `P${Math.floor(Math.random() * 1000)}` }));
    console.log('Bulk adding permissions:', permissionsWithIds);
    return permissionsWithIds;
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
    } catch (e) {
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
          <input name="description" value={newPermission.description} onChange={handleInputChange} placeholder="Description" className="p-2 border rounded" />
          <input name="roles" value={rolesInput} onChange={handleRolesChange} placeholder="Roles (comma-separated)" className="p-2 border rounded" />
          <input name="modulePage" value={newPermission.modulePage} onChange={handleInputChange} placeholder="Module/Page" className="p-2 border rounded" />
          <select name="httpMethod" value={newPermission.httpMethod} onChange={handleInputChange} className="p-2 border rounded">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input name="constraints" value={newPermission.constraints} onChange={handleInputChange} placeholder="Constraints" className="p-2 border rounded md:col-span-2" />
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

      {/* Permissions Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading && <p className="p-4">Loading permissions...</p>}
          {error && <p className="p-4 text-red-500">Error loading permissions: {error.message}</p>}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions?.map((permission) => (
                <tr key={permission.permissionNumber}>
                  <td className="px-6 py-4 whitespace-nowrap">{permission.permissionNumber}</td>
                  <td className="px-6 py-4 whitespace-normal">{permission.description}</td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="flex flex-wrap gap-1">
                      {permission.roles.map(role => (
                        <span key={role} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">{role}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
