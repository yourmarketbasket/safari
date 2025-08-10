"use client";

import { useState, useEffect } from 'react';
import { FiX, FiUserPlus, FiTrash2 } from 'react-icons/fi';
import { SupportGroup } from '../models/SupportGroup.model';
import { User } from '../models/User.model';
import superuserService from '../services/superuser.service';
import Message from './Message';
import { Button } from './ui/Button';

interface ManageSupportGroupMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGroupUpdate: (group: SupportGroup) => void;
  group: SupportGroup | null;
  users: User[];
}

export default function ManageSupportGroupMembersModal({ isOpen, onClose, onGroupUpdate, group, users }: ManageSupportGroupMembersModalProps) {
  const [members, setMembers] = useState<User[]>([]);
  const [usersToAdd, setUsersToAdd] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && group) {
      setMembers(group.members);
      const nonMembers = users.filter(u => !group.members.some(m => m._id === u._id));
      setUsersToAdd(nonMembers);
      setSelectedUser('');
      setError(null);
    }
  }, [isOpen, group, users]);

  if (!isOpen || !group) return null;

  const handleAddMember = async () => {
    if (!selectedUser) return;
    setIsLoading(true);
    setError(null);
    try {
      const updatedGroup = await superuserService.addSupportGroupMember(group._id, selectedUser);
      onGroupUpdate(updatedGroup);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to add member.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedGroup = await superuserService.removeSupportGroupMember(group._id, userId);
      onGroupUpdate(updatedGroup);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to remove member.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full text-gray-800 relative">
        <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
          <FiX size={20} />
        </Button>
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Manage Members for {group.name}</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>Select a user to add</option>
              {usersToAdd.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
            <Button onClick={handleAddMember} disabled={!selectedUser || isLoading}>
              <FiUserPlus /> Add Member
            </Button>
          </div>
          {error && <Message type="error" message={error} />}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Current Members</h3>
            <ul className="space-y-2">
              {members.map(member => (
                <li key={member._id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <span>{member.name}</span>
                  <Button onClick={() => handleRemoveMember(member._id)} variant="danger">
                    <FiTrash2 />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
