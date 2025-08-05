"use client";

import { useState } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import PrivateRoute from '@/app/components/PrivateRoute';
import FileUpload from '@/app/components/FileUpload';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to update the user's profile
    console.log('Updating profile with:', { name, phone, avatar });
    setIsEditing(false);
  };

  const handleFileChange = (file: File) => {
    setAvatar(file);
  };

  return (
    <PrivateRoute allowedRoles={['admin', 'sacco', 'owner', 'passenger', 'support_staff', 'headoffice']}>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        {user && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <FileUpload onFileChange={handleFileChange} />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
                ) : (
                  <FaUserCircle className="w-32 h-32 text-gray-400 mx-auto mb-4" />
                )}
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone || 'N/A'}</p>
                <p className="mt-2 inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">{user.role}</p>
                <div className="mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center mx-auto px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
