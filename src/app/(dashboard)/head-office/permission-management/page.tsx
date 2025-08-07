"use client";

import { permissions, Permission } from '../../../../data/permissions';

export default function PermissionManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Permission Management</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module/Page
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HTTP Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Constraints
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions.map((permission: Permission) => (
                <tr key={permission.permissionNumber}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {permission.permissionNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-gray-900">{permission.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="flex flex-wrap gap-1">
                      {permission.roles.map(role => (
                        <span key={role} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{permission.modulePage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono px-2 py-1 rounded bg-purple-100 text-purple-700">
                      {permission.httpMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-gray-700">{permission.constraints}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
