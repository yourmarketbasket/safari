"use client";

import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import { Permission } from '../models/Permission.model';
import { UserRole } from '../models/User.model';
import superuserService from '../services/superuser.service';
import Message from './Message';

type NewPermission = Omit<Permission, '_id'>;

interface BulkPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: Permission[]) => void;
}

const allRoles: UserRole[] = ["sacco", "owner", "admin", "driver", "passenger", "support_staff", "queue_manager", "superuser"];

export default function BulkPermissionModal({ isOpen, onClose, onSave }: BulkPermissionModalProps) {
  const [permissions, setPermissions] = useState<NewPermission[]>([{ permissionNumber: '', description: '', roles: [] }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPermissions([{ permissionNumber: '', description: '', roles: [] }]);
      setError(null);
    }
  }, [isOpen]);

  const handlePermissionChange = (index: number, field: keyof NewPermission, value: string) => {
    const newPermissions = [...permissions];
    newPermissions[index] = { ...newPermissions[index], [field]: value };
    setPermissions(newPermissions);
  };

  const handleRoleChange = (pIndex: number, role: UserRole) => {
    const newPermissions = [...permissions];
    const currentRoles = newPermissions[pIndex].roles;
    if (currentRoles.includes(role)) {
      newPermissions[pIndex].roles = currentRoles.filter(r => r !== role);
    } else {
      newPermissions[pIndex].roles = [...currentRoles, role];
    }
    setPermissions(newPermissions);
  };

  const addPermissionField = () => {
    setPermissions([...permissions, { permissionNumber: '', description: '', roles: [] }]);
  };

  const removePermissionField = (index: number) => {
    if (permissions.length > 1) {
      const newPermissions = permissions.filter((_, i) => i !== index);
      setPermissions(newPermissions);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Basic validation
      for (const p of permissions) {
        if (!p.permissionNumber || !p.description) {
          throw new Error('All permission fields must be filled out.');
        }
      }
      const savedPermissions = await superuserService.createPermissions(permissions);
      onSave(savedPermissions);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        setError(axiosError.response?.data?.error || err.message || 'An error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-4xl w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold text-purple-700 mb-6">Add Permissions in Bulk</h2>

        <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-6">
          {permissions.map((p, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permission Number</label>
                  <input
                    type="text"
                    value={p.permissionNumber}
                    onChange={(e) => handlePermissionChange(index, 'permissionNumber', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={p.description}
                    onChange={(e) => handlePermissionChange(index, 'description', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Roles</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {allRoles.map(role => (
                    <label key={role} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={p.roles.includes(role)}
                        onChange={() => handleRoleChange(index, role)}
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              {permissions.length > 1 && (
                <button onClick={() => removePermissionField(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button onClick={addPermissionField} className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800">
            <FiPlus /> Add Another Permission
          </button>
        </div>

        {error && <Message type="error" message={error} />}

        <div className="flex justify-end pt-4 mt-4 border-t">
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm mr-3" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-bold flex items-center" disabled={isLoading}>
              <FiSave className="mr-2" />
              {isLoading ? 'Saving...' : `Save ${permissions.length} Permissions`}
            </button>
        </div>
      </div>
    </div>
  );
}
