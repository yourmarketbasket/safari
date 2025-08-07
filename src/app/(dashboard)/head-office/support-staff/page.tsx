"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../../../components/Modal';
import AddStaffForm from '../../../components/AddStaffForm';
import superuserService from '../../../services/superuser.service';
import { User } from '../../../models/User.model';
import { NewStaffData } from '@/app/services/superuser.service';

export default function SupportStaffPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Query to fetch support staff
  const { data: staffList, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['supportStaff'],
    queryFn: superuserService.getSupportStaff,
  });

  // Mutation to add a new staff member
  const { mutate: addStaff, isPending: isAddingStaff, error: addStaffError, reset } = useMutation<User, Error, NewStaffData>({
    mutationFn: superuserService.addSupportStaff,
    onSuccess: () => {
      // Invalidate and refetch the staff list query on success
      queryClient.invalidateQueries({ queryKey: ['supportStaff'] });
      setIsModalOpen(false); // Close the modal
    },
  });

  const handleAddStaff = (formData: NewStaffData) => {
    // The role needs to be assigned, let's default it for this example
    const staffDataWithRole = { ...formData, role: formData.role || 'support_staff' };
    addStaff(staffDataWithRole);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Support Staff Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add New Staff
        </button>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg">
        {isLoading && <p className="p-4 text-center">Loading staff...</p>}
        {error && <p className="p-4 text-center text-red-600">Error fetching staff: {error.message}</p>}
        {!isLoading && !error && (
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(staffList || []).map((staff: User) => (
                <tr key={staff.id}>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-xs text-gray-900">{staff.name}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-900">{staff.email}</div>
                    <div className="text-xs text-gray-500">{staff.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-light rounded-full bg-green-100 text-green-800">{staff.role}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-normal"><a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); reset(); }}>
        <AddStaffForm
          onClose={() => { setIsModalOpen(false); reset(); }}
          onSubmit={handleAddStaff}
          isLoading={isAddingStaff}
          error={addStaffError}
        />
      </Modal>
    </div>
  );
}
