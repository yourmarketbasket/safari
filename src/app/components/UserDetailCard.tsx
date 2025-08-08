"use client";

import React from 'react';
import Image from 'next/image';
import { User } from '../models/User.model';
import { FiMail, FiPhone, FiShield, FiBriefcase, FiUser } from 'react-icons/fi';
import ToggleSwitch from './ToggleSwitch';

interface UserDetailCardProps {
  user: User;
  onToggleBlock: (user: User) => void;
  isToggling: boolean;
}

const UserDetailCard: React.FC<UserDetailCardProps> = ({ user, onToggleBlock, isToggling }) => {
  return (
    <div className="bg-white rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
            <div className="relative h-20 w-20 rounded-full flex items-center justify-center bg-gray-200 border-4 border-gray-300">
                {user.avatar ? (
                    <Image
                        className="rounded-full object-cover"
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        layout="fill"
                    />
                ) : (
                    <FiUser className="text-gray-500 w-10 h-10" />
                )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FiMail className="w-5 h-5 mr-3 text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiPhone className="w-5 h-5 mr-3 text-gray-400" />
              <span>{user.phone || 'No phone number'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiBriefcase className="w-5 h-5 mr-3 text-gray-400" />
              <span>Rank: {user.rank || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                    <FiShield className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="font-semibold text-gray-700">Block User</span>
                </div>
                <ToggleSwitch
                    isOn={user.approvedStatus === 'blocked'}
                    onToggle={() => onToggleBlock(user)}
                    disabled={isToggling}
                />
            </div>
            <div className="flex items-start text-gray-600">
              <FiShield className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700">Permissions</h4>
                {user.permissions && user.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                    {user.permissions.map((permission, index) => (
                        <span key={`${permission}-${index}`} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {permission}
                        </span>
                    ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 mt-1">No permissions assigned.</p>
                )}
              </div>
            </div>
        </div>
    </div>
  );
};

export default UserDetailCard;
