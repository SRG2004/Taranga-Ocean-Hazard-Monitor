
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

// Mock Data
const tideData = [
    { time: '00:00', height: 1.2 }, { time: '03:00', height: 2.5 }, { time: '06:00', height: 1.5 },
    { time: '09:00', height: 2.8 }, { time: '12:00', height: 1.8 }, { time: '15:00', height: 2.9 },
    { time: '18:00', height: 2.0 }, { time: '21:00', height: 2.7 },
];
const waveData = [
    { time: 'Now', height: 1.5 }, { time: '+3h', height: 1.7 }, { time: '+6h', height: 2.0 }, { time: '+9h', height: 1.8 },
];
const safeZone = [[19.0, 72.8], [19.0, 72.9], [19.1, 72.9], [19.1, 72.8]];

const MaritimeDashboard = () => {
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-content">
      <h1>Maritime / Fishermen Dashboard</h1>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

        <div className="maritime-grid">
            <motion.div className="dashboard-section main-indicator" variants={sectionVariants}>
                <h2>Sea Condition: <span className="condition-caution">CAUTION</span></h2>
                <div className="sea-condition-indicator">
                    <div className="light safe"></div>
                    <div className="light caution active"></div>
                    <div className="light unsafe"></div>
                </div>
            </motion.div>

            <motion.div className="dashboard-section" variants={sectionVariants}>
                <h2>Safe Fishing Zones</h2>
                <MapContainer center={[19.05, 72.85]} zoom={11} scrollWheelZoom={false} className="map-container-maritime">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polygon pathOptions={{ color: 'green', fillColor: 'green' }} positions={safeZone} />
                </MapContainer>
            </motion.div>

            <motion.div className="dashboard-section" variants={sectionVariants}>
                <h2>Tide & Wave Forecast</h2>
                <div className="maritime-charts">
                    <div className="chart-container">
                        <h3>Tide Timing</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={tideData}><XAxis dataKey="time"/><YAxis/><Tooltip/><Line type="monotone" dataKey="height" stroke="#1a73e8" /></LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-container">
                        <h3>Wave Height (meters)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={waveData}><XAxis dataKey="time"/><YAxis/><Tooltip/><Bar dataKey="height" fill="#82ca9d" /></BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

            <motion.div className="dashboard-section wind-compass" variants={sectionVariants}>
                <h2>Wind Speed & Direction</h2>
                {/* Placeholder for compass */}
                <p>15 KPH from NW</p>
            </motion.div>

            <motion.div className="dashboard-section" variants={sectionVariants}>
                <h2>Notifications</h2>
                {/* Notification list */}
            </motion.div>

            <motion.div className="dashboard-section" variants={sectionVariants}>
                <h2>Offline Advisories</h2>
                <button className="btn">Download Map</button>
                <button className="btn" style={{marginLeft: '10px'}}>Download PDF</button>
            </motion.div>

             <motion.div className="dashboard-section" variants={sectionVariants}>
                <h2>Voice Alert</h2>
                <button className="btn">Play Critical Alert</button>
            </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default MaritimeDashboard;
