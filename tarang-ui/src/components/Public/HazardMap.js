
import React from 'react';

const HazardMap = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Hazard Map & Alerts</h2>
      <div className="h-64 bg-gray-200 rounded-lg">{/* Placeholder for map */}</div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">Real-time Alerts</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-red-100 rounded-lg">High tide warning for coastal areas.</li>
          <li className="p-2 bg-yellow-100 rounded-lg">Moderate currents expected in the afternoon.</li>
        </ul>
      </div>
    </div>
  );
};

export default HazardMap;
