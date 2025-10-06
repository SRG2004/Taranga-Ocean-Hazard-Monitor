import React, { useState } from 'react';
import HazardMap from '../components/HazardMap'; // Import the map component

const GovernmentDashboard = () => {
  const [alert, setAlert] = useState({ title: '', message: '', priority: 'medium' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlert({ ...alert, [name]: value });
  };

  const handleSendAlert = (e) => {
    e.preventDefault();
    // In a real application, this would send the alert to the backend
    console.log('Sending alert:', alert);
    // Reset form
    setAlert({ title: '', message: '', priority: 'medium' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Government Official Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Real-Time Alerts Panel */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Send Alert</h2>
          <form onSubmit={handleSendAlert}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" value={alert.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" id="message" value={alert.message} onChange={handleInputChange} rows="3" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
              <select name="priority" id="priority" value={alert.priority} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Send Alert</button>
          </form>
        </div>

        {/* Priority Notifications Feed */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Priority Notifications</h2>
          <p>Priority notifications will be displayed here.</p>
        </div>

        {/* Interactive Map */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Interactive Map with Live Hazard Zones</h2>
          <HazardMap />
        </div>

        {/* Decision Support Panel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Decision Support</h2>
          <p>Decision support panel will be here.</p>
        </div>

        {/* Emergency Contacts Directory */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Emergency Contacts</h2>
          <p>Emergency contacts directory will be here.</p>
        </div>

      </div>
    </div>
  );
};

export default GovernmentDashboard;
