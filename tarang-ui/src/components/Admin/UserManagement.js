
import React from 'react';

const UserManagement = () => {
  const users = [
    { name: 'Sarthak Sharma', role: 'Admin', status: 'Active', lastLogin: '2024-08-15 10:30 AM' },
    { name: 'Jane Smith', role: 'Researcher', status: 'Inactive', lastLogin: '2024-08-14 05:00 PM' },
    { name: 'John Doe', role: 'Government Authority', status: 'Active', lastLogin: '2024-08-15 09:00 AM' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">User Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Status</th>
            <th className="py-2">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">{user.status}</td>
              <td className="py-2">{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
