"use client";

import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { SupportGroup } from '../models/SupportGroup.model';
import { User } from '../models/User.model';
import superuserService from '../services/superuser.service';
import Message from './Message';

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
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>
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
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm mr-3" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-bold flex items-center" disabled={isLoading}>
              <FiSave className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Group'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
