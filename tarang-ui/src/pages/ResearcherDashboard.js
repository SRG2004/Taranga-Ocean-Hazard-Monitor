import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

// Mock Data
const seaTempData = [
  { name: 'Jan', temp: 22 }, { name: 'Feb', temp: 23 }, { name: 'Mar', temp: 24 },
  { name: 'Apr', temp: 25 }, { name: 'May', temp: 27 }, { name: 'Jun', temp: 28 },
];

const hazardFrequency = [
  { year: '2020', Tsunami: 2, Storm: 5 },
  { year: '2021', Tsunami: 1, Storm: 7 },
  { year: '2022', Tsunami: 3, Storm: 4 },
  { year: '2023', Tsunami: 2, Storm: 8 },
];

const hazardZones = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", geometry: { type: "Polygon", coordinates: [[[-74, 40.7], [-74.1, 40.7], [-74.1, 40.8], [-74, 40.8], [-74, 40.7]]] } }
  ]
};

const ResearcherDashboard = () => {
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-content">
      <h1>Researcher / Scientist Dashboard</h1>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        
        <motion.section className="dashboard-section" variants={sectionVariants}>
            <h2>Data Visualization</h2>
            <div className="researcher-grid-large">
                <div className="chart-container">
                    <h3>Sea Temperature Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={seaTempData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="temp" stroke="#1a73e8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-container">
                    <h3>Frequency of Hazards</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hazardFrequency}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Tsunami" fill="#8884d8" />
                            <Bar dataKey="Storm" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.section>

        <div className="researcher-grid-medium">
            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h2>Interactive GIS Map</h2>
                <MapContainer center={[40.7, -74]} zoom={8} scrollWheelZoom={false} className="map-container-researcher">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <GeoJSON data={hazardZones} style={{ color: 'red' }} />
                </MapContainer>
            </motion.section>

            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h2>Simulation Tools</h2>
                <div className="simulation-tools">
                    <p>Input panel + chart for running prediction models.</p>
                    <div className="placeholder-chart"></div>
                </div>
            </motion.section>
        </div>

        <div className="researcher-grid-small">
            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h3>Historical Data</h3>
                <input type="range" style={{width: '100%'}} />
            </motion.section>
            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h3>Annotation Tools</h3>
                <p>Highlight data points and add notes.</p>
            </motion.section>
            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h3>Export Panel</h3>
                <div className="export-buttons">
                    <button className="btn">CSV</button>
                    <button className="btn">JSON</button>
                    <button className="btn">PDF</button>
                </div>
            </motion.section>
        </div>

        <motion.section className="dashboard-section" variants={sectionVariants}>
            <h2>Collaboration Board</h2>
            <div className="collaboration-board">
                <p>Comment/chat section for research teams.</p>
            </div>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default ResearcherDashboard;