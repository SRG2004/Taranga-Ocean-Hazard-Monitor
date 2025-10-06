import React from 'react';
import HazardMap from '../components/HazardMap'; // Import the map component

const FishermanDashboard = () => {
  const safetyAlerts = [
    { id: 1, title: 'Strong Current Warning', message: 'Strong currents reported near the coast. Avoid fishing in this area.' },
    { id: 2, title: 'High Surf Advisory', message: 'High surf expected today. Be cautious near the shore.' },
    { id: 3, title: 'Shark Sighting', message: 'A shark has been sighted in the area. Please be aware and stay safe.' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fisherman Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Daily Safe Fishing Zones Map */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Safe Fishing Zones and Hazard Hotspots</h2>
          <HazardMap />
        </div>

        {/* Safety Alerts */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Safety Alerts</h2>
          <div className="space-y-2">
            {safetyAlerts.map(alert => (
              <div key={alert.id} className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p className="font-bold">{alert.title}</p>
                <p>{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tide & Wave Graphs */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Tides & Waves</h2>
          <p>Tide and wave graphs will be displayed here.</p>
        </div>

        {/* Wind Speed & Direction Compass */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Wind Conditions</h2>
          <p>Wind speed and direction compass will be displayed here.</p>
        </div>

        {/* Real-time Weather Updates */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Real-time Weather</h2>
          <p>Weather updates will be displayed here.</p>
        </div>

      </div>
    </div>
  );
};

export default FishermanDashboard;
