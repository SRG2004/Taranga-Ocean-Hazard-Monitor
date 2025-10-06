import React from 'react';
import { Link } from 'react-router-dom';
import HazardMap from '../components/HazardMap'; // Import the map component

const CitizenDashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Citizen Dashboard</h1>
        <Link to="/report-hazard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Report a Hazard
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Interactive Map */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Hazard Hotspots</h2>
          <HazardMap />
        </div>

        {/* Simple Hazard Status Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Hazard Status</h2>
          <p>Simple hazard status cards will be displayed here.</p>
        </div>

        {/* Live Weather Panel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Live Weather</h2>
          <p>Live weather information will be displayed here.</p>
        </div>

        {/* Preparedness Tips Panel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Preparedness Tips</h2>
          <p>Preparedness tips will be displayed here.</p>
        </div>

        {/* Alert Subscription Widget */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Alert Subscriptions</h2>
          <p>Alert subscription widget will be here.</p>
        </div>

      </div>
    </div>
  );
};

export default CitizenDashboard;
