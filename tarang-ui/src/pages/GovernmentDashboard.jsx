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
    <div className="page-content">
      <div className="page-header">
        <h1>Government Official Dashboard</h1>
      </div>
      <div className="dashboard-grid">

        {/* Real-Time Alerts Panel */}
        <div className="dashboard-card" style={{gridColumn: 'span 2'}}>
          <h2>Send Alert</h2>
          <form onSubmit={handleSendAlert}>
            <div style={{marginBottom: '15px'}}>
              <label htmlFor="title" style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Title</label>
              <input type="text" name="title" id="title" value={alert.title} onChange={handleInputChange} style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}} />
            </div>
            <div style={{marginBottom: '15px'}}>
              <label htmlFor="message" style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Message</label>
              <textarea name="message" id="message" value={alert.message} onChange={handleInputChange} rows="3" style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}></textarea>
            </div>
            <div style={{marginBottom: '15px'}}>
              <label htmlFor="priority" style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Priority</label>
              <select name="priority" id="priority" value={alert.priority} onChange={handleInputChange} style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" style={{width: '100%', backgroundColor: '#dc3545', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Send Alert</button>
          </form>
        </div>

        {/* Priority Notifications Feed */}
        <div className="dashboard-card">
          <h2>Priority Notifications</h2>
          <p>Priority notifications will be displayed here.</p>
        </div>

        {/* Interactive Map */}
        <div className="dashboard-card" style={{gridColumn: 'span 3'}}>
          <h2>Interactive Map with Live Hazard Zones</h2>
          <HazardMap />
        </div>

        {/* Decision Support Panel */}
        <div className="dashboard-card">
          <h2>Decision Support</h2>
          <p>Decision support panel will be here.</p>
        </div>

        {/* Emergency Contacts Directory */}
        <div className="dashboard-card">
          <h2>Emergency Contacts</h2>
          <p>Emergency contacts directory will be here.</p>
        </div>

      </div>
    </div>
  );
};

export default GovernmentDashboard;
