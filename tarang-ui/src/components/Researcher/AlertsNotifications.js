
import React from 'react';

const AlertsNotifications = () => {
  const alerts = [
    { message: 'High tide warning', severity: 'High', timestamp: '2024-08-15 10:00 AM' },
    { message: 'Strong currents expected', severity: 'Medium', timestamp: '2024-08-15 09:30 AM' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Alerts & Notifications</h2>
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="p-2 bg-yellow-100 rounded-lg">
            <p className="font-semibold">{alert.message}</p>
            <p className="text-sm">Severity: {alert.severity} - {alert.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsNotifications;
