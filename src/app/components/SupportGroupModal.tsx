"use client";

import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { SupportGroup } from '../models/SupportGroup.model';
import { User } from '../models/User.model';
import superuserService from '../services/superuser.service';
import Message from './Message';
import { Button } from './ui/Button';

interface SupportGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: SupportGroup) => void;
  groupToEdit?: SupportGroup | null;
  users: User[];
}

export default function SupportGroupModal({ isOpen, onClose, onSave, groupToEdit, users }: SupportGroupModalProps) {
  const [name, setName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!groupToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && groupToEdit) {
        setName(groupToEdit.name);
        setSupervisor(groupToEdit.supervisor._id);
      } else {
        setName('');
        setSupervisor('');
      }
      setError(null);
    }
  }, [isOpen, groupToEdit, isEditMode]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const groupData = { name, supervisor };
      let savedGroup;
      if (isEditMode && groupToEdit) {
        savedGroup = await superuserService.updateSupportGroup(groupToEdit._id, groupData);
      } else {
        savedGroup = await superuserService.createSupportGroup(groupData);
      }
      onSave(savedGroup);
      onClose();
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An error occurred.');
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
        <h2 className="text-2xl font-bold text-purple-700 mb-6">{isEditMode ? 'Edit Support Group' : 'Create New Support Group'}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label>
            <select
              id="supervisor"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>Select a user</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          {error && <Message type="error" message={error} />}
          <div className="flex justify-end pt-4 mt-4 border-t">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} variant="success" disabled={isLoading}>
              <FiSave className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Group'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
