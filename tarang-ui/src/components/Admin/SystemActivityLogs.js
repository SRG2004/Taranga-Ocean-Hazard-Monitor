
import React from 'react';

const SystemActivityLogs = () => {
  const logs = [
    { user: 'Sarthak Sharma', action: 'Logged in', time: '2024-08-15 10:30 AM' },
    { user: 'Jane Smith', action: 'Viewed data', time: '2024-08-15 10:32 AM' },
    { user: 'John Doe', action: 'Generated report', time: '2024-08-15 10:35 AM' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">System Activity Logs</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">User</th>
            <th className="py-2">Action</th>
            <th className="py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{log.user}</td>
              <td className="py-2">{log.action}</td>
              <td className="py-2">{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemActivityLogs;
