import React from 'react';
import HazardMap from '../components/HazardMap'; // Import the map component

const FishermanDashboard = () => {
  const safetyAlerts = [
    { id: 1, title: 'Strong Current Warning', message: 'Strong currents reported near the coast. Avoid fishing in this area.' },
    { id: 2, title: 'High Surf Advisory', message: 'High surf expected today. Be cautious near the shore.' },
    { id: 3, title: 'Shark Sighting', message: 'A shark has been sighted in the area. Please be aware and stay safe.' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Fisherman Dashboard</h1>
      </div>
      <div className="dashboard-grid">

        {/* Daily Safe Fishing Zones Map */}
        <div className="dashboard-card" style={{gridColumn: 'span 3'}}>
          <h2>Safe Fishing Zones and Hazard Hotspots</h2>
          <HazardMap />
        </div>

        {/* Safety Alerts */}
        <div className="dashboard-card" style={{gridColumn: 'span 3'}}>
          <h2>Safety Alerts</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {safetyAlerts.map(alert => (
              <div key={alert.id} style={{padding: '15px', backgroundColor: '#f8d7da', borderLeft: '4px solid #dc3545', color: '#721c24'}}>
                <p style={{fontWeight: 'bold'}}>{alert.title}</p>
                <p>{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tide & Wave Graphs */}
        <div className="dashboard-card">
          <h2>Tides & Waves</h2>
          <p>Tide and wave graphs will be displayed here.</p>
        </div>

        {/* Wind Speed & Direction Compass */}
        <div className="dashboard-card">
          <h2>Wind Conditions</h2>
          <p>Wind speed and direction compass will be displayed here.</p>
        </div>

        {/* Real-time Weather Updates */}
        <div className="dashboard-card">
          <h2>Real-time Weather</h2>
          <p>Weather updates will be displayed here.</p>
        </div>

      </div>
    </div>
  );
};

export default FishermanDashboard;
