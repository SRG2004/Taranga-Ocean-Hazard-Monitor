
import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const dangerZone = [[18.5, 73.8], [18.5, 73.9], [18.6, 73.9], [18.6, 73.8]];

const PublicDashboard = () => {
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-content">
        <div className="public-header">
            <h1>Community Dashboard</h1>
            <select className="language-selector">
                <option>English</option>
                <option>Marathi</option>
                <option>Hindi</option>
            </select>
        </div>

        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

            <div className="public-layout">
                <div className="public-main">
                    <motion.section className="dashboard-section" variants={sectionVariants}>
                        <h2>Hazard Status</h2>
                        <div className="hazard-status-cards">
                            <div className="hazard-card danger">DANGER</div>
                            <div className="hazard-card warning">WARNING</div>
                            <div className="hazard-card safe">SAFE</div>
                        </div>
                    </motion.section>

                    <motion.section className="dashboard-section" variants={sectionVariants}>
                        <h2>Affected Zone Map</h2>
                        <MapContainer center={[18.55, 73.85]} zoom={11} scrollWheelZoom={false} className="map-container-public">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Polygon pathOptions={{ color: 'red' }} positions={dangerZone} />
                        </MapContainer>
                    </motion.section>

                    <motion.section className="dashboard-section what-to-do" variants={sectionVariants}>
                        <h2>What To Do Now</h2>
                        <p>1. Evacuate coastal areas immediately.</p>
                        <p>2. Move to higher ground.</p>
                        <p>3. Listen to local news for updates.</p>
                    </motion.section>
                </div>

                <div className="public-sidebar">
                    <motion.section className="dashboard-section" variants={sectionVariants}>
                        <h3>Live Weather</h3>
                        {/* Weather details here */}
                    </motion.section>
                    <motion.section className="dashboard-section" variants={sectionVariants}>
                        <h3>Preparedness Tips</h3>
                        {/* Tips list here */}
                    </motion.section>
                    <motion.section className="dashboard-section" variants={sectionVariants}>
                        <h3>Subscribe for Alerts</h3>
                        <input type="text" placeholder="Enter phone or email" style={{width: '100%', padding: '8px'}}/>
                        <button className="btn" style={{marginTop: '10px'}}>Subscribe</button>
                    </motion.section>
                </div>
            </div>

        </motion.div>
    </div>
  );
};

export default PublicDashboard;
