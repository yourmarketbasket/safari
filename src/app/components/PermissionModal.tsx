"use client";

import { useState, useEffect, FormEvent } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { Permission } from '../models/Permission.model';
import { UserRole } from '../models/User.model';
import superuserService from '../services/superuser.service';
import Message from './Message';
import { Button } from './ui/Button';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permission: Permission | Permission[]) => void;
  permissionToEdit?: Permission | null;
}

const allRoles: UserRole[] = ["sacco", "owner", "admin", "driver", "passenger", "support_staff", "queue_manager", "superuser"];

export default function PermissionModal({ isOpen, onClose, onSave, permissionToEdit }: PermissionModalProps) {
  const [permissionNumber, setPermissionNumber] = useState('');
  const [description, setDescription] = useState('');
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [bulkJson, setBulkJson] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  const isEditMode = !!permissionToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && permissionToEdit) {
        setPermissionNumber(permissionToEdit.permissionNumber);
        setDescription(permissionToEdit.description);
        setRoles(permissionToEdit.roles);
      } else {
        // Reset form for new permission
        setPermissionNumber('');
        setDescription('');
        setRoles([]);
      }
      setError(null);
    }
  }, [isOpen, permissionToEdit, isEditMode]);

  const handleRoleChange = (role: UserRole) => {
    setRoles(prevRoles =>
      prevRoles.includes(role)
        ? prevRoles.filter(r => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === 'single') {
        const permissionData = { permissionNumber, description, roles };
        let savedPermission;

        if (isEditMode && permissionToEdit) {
          savedPermission = await superuserService.updatePermission(permissionToEdit.permissionNumber, permissionData);
        } else {
          savedPermission = await superuserService.createPermission(permissionData);
        }
        onSave(savedPermission);
      } else { // bulk
        const permissionsToCreate = JSON.parse(bulkJson);
        // Add more validation here if needed
        const savedPermissions = await superuserService.createPermissions(permissionsToCreate);
        onSave(savedPermissions);
      }

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
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full text-gray-800 relative">
        <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
          <FiX size={20} />
        </Button>

        <h2 className="text-2xl font-bold text-purple-700 mb-4">{isEditMode ? 'Edit Permission' : 'Add New Permission'}</h2>

        {!isEditMode && (
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <button
                type="button"
                onClick={() => setActiveTab('single')}
                className={`${
                  activeTab === 'single'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-normal text-sm focus:outline-none`}
              >
                Single Permission
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bulk')}
                className={`${
                  activeTab === 'bulk'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-normal text-sm focus:outline-none`}
              >
                Bulk Add
              </button>
            </nav>
          </div>
        )}

        {activeTab === 'single' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="permissionNumber" className="block text-sm font-normal text-gray-700 mb-1">Permission Number (e.g., P101)</label>
            <input
              id="permissionNumber"
              type="text"
              value={permissionNumber}
              onChange={(e) => setPermissionNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={isEditMode} // Cannot change permission number for existing permissions
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-normal text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">Assign to Roles</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {allRoles.map(role => (
                <label key={role} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={roles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <Message type="error" message={error} />}

          <div className="flex justify-end pt-4 mt-4 border-t">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="success" disabled={isLoading}>
              <FiSave className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Permission'}
            </Button>
          </div>
        </form>
        )}

        {activeTab === 'bulk' && (
          <div>
            <label htmlFor="bulkJson" className="block text-sm font-normal text-gray-700 mb-1">
              Paste JSON array of permissions
            </label>
            <textarea
              id="bulkJson"
              value={bulkJson}
              onChange={(e) => setBulkJson(e.target.value)}
              className="w-full h-64 border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder='[&#10;  { "permissionNumber": "P101", "description": "...", "roles": ["admin"] },&#10;  { "permissionNumber": "P102", "description": "...", "roles": ["sacco"] }&#10;]'
            />
            <div className="flex justify-end pt-4 mt-4 border-t">
                <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="button" onClick={handleSubmit} variant="success" disabled={isLoading}>
                    <FiSave className="mr-2" />
                    {isLoading ? 'Saving...' : 'Save Permissions'}
                </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
