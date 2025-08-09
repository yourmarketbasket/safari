"use client";

import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { Team } from '../models/Team.model';
import { User } from '../models/User.model';
import superuserService from '../services/superuser.service';
import Message from './Message';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: Team) => void;
  teamToEdit?: Team | null;
  users: User[];
}

export default function TeamModal({ isOpen, onClose, onSave, teamToEdit, users }: TeamModalProps) {
  const [name, setName] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!teamToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && teamToEdit) {
        setName(teamToEdit.name);
        setTeamLead(teamToEdit.teamLead._id);
      } else {
        setName('');
        setTeamLead('');
      }
      setError(null);
    }
  }, [isOpen, teamToEdit, isEditMode]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const teamData = { name, teamLead };
      let savedTeam;
      if (isEditMode && teamToEdit) {
        savedTeam = await superuserService.updateTeam(teamToEdit._id, teamData);
      } else {
        savedTeam = await superuserService.createTeam(teamData);
      }
      onSave(savedTeam);
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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>
        <h2 className="text-2xl font-bold text-purple-700 mb-6">{isEditMode ? 'Edit Team' : 'Create New Team'}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
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
            <label htmlFor="teamLead" className="block text-sm font-medium text-gray-700 mb-1">Team Lead</label>
            <select
              id="teamLead"
              value={teamLead}
              onChange={(e) => setTeamLead(e.target.value)}
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
              {isLoading ? 'Saving...' : 'Save Team'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
