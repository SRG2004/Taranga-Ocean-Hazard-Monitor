
import React from 'react';

const SystemHealthOverview = () => {
  const healthStatus = [
    { name: 'Data Feed', status: 'Active' },
    { name: 'API Status', status: 'Active' },
    { name: 'Storage Usage', status: '75%' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">System Health Overview</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {healthStatus.map((item, index) => (
          <div key={index} className="p-4 text-center bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-2xl">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealthOverview;
