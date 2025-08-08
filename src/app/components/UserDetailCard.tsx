"use client";

import React from 'react';
import Image from 'next/image';
import { User } from '../models/User.model';
import { FiMail, FiPhone, FiShield, FiBriefcase } from 'react-icons/fi';

interface UserDetailCardProps {
  user: User;
}

const UserDetailCard: React.FC<UserDetailCardProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-4 mb-6">
        <Image
          className="h-20 w-20 rounded-full object-cover border-4 border-gray-300"
          src={user.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
          alt={`${user.name}'s avatar`}
          width={80}
          height={80}
        />
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
        <div className="flex items-start text-gray-600">
          <FiShield className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-700">Permissions</h4>
            {user.permissions && user.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                {user.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
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
