import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

// Mock Data
const incidents = [
  { id: 1, type: 'Tsunami', location: 'Western Coast', severity: 'High', status: 'Active', time: '2025-09-28 11:15 AM' },
  { id: 2, type: 'Storm Surge', location: 'Eastern Bay', severity: 'Medium', status: 'Monitoring', time: '2025-09-28 09:00 AM' },
  { id: 3, type: 'High Waves', location: 'Southern Peninsula', severity: 'Low', status: 'Resolved', time: '2025-09-27 08:30 PM' },
];

const pledgedResources = [
    { item: 'Water Bottles', quantity: 500 },
    { item: 'Blankets', quantity: 200 },
    { item: 'First-Aid Kits', quantity: 150 },
];

const GovernmentDashboard = () => {
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-content">
      <div className="notification-ticker">
        <p>Priority Alert: Tsunami warning issued for the Western Coast. Evacuation of Zone A recommended.</p>
      </div>
      <h1>Government Authority Dashboard</h1>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

        <div className="gov-layout">
            <div className="gov-main-content">
                <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Incident Summary</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr><th>Type</th><th>Location</th><th>Severity</th><th>Status</th><th>Reported Time</th></tr>
                            </thead>
                            <tbody>
                                {incidents.map(inc => (
                                    <tr key={inc.id}><td>{inc.type}</td><td>{inc.location}</td><td>{inc.severity}</td><td>{inc.status}</td><td>{inc.time}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.section>

                <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Live Hazard Map</h2>
                    <MapContainer center={[18.8, 73.3]} zoom={7} scrollWheelZoom={false} className="map-container-gov">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {/* Markers would be dynamically added here */}
                    </MapContainer>
                </motion.section>
            </div>

            <div className="gov-sidebar">
                <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Real-Time Alerts</h2>
                    <div className="alert-cards">
                        <div className="alert-card high">Tsunami - High Severity</div>
                        <div className="alert-card medium">Storm Surge - Medium</div>
                        <div className="alert-card low">High Waves - Low</div>
                    </div>
                </motion.section>

                <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Pledged Resources</h2>
                    <ul className="resource-list">
                        {pledgedResources.map((r, i) => (
                            <li key={i}><strong>{r.item}:</strong> {r.quantity}</li>
                        ))}
                    </ul>
                </motion.section>

                <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Decision Support</h2>
                    <p>Recommended Action: Evacuate Zone A.</p>
                </motion.section>

                 <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Emergency Contacts</h2>
                    <input type="text" placeholder="Search contacts..." style={{width: '100%', padding: '8px', marginBottom: '10px'}}/>
                </motion.section>

                <motion.section className="dashboard-section" variants={sectionVariants}>
                    <h2>Official Advisories</h2>
                    <button className="btn">Download All</button>
                </motion.section>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default GovernmentDashboard;