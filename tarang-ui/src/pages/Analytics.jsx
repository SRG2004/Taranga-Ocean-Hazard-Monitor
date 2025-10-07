import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Analytics = () => {
  const data = [
    { label: 'Tsunami Alerts', value: 45, color: '#dc3545' },
    { label: 'Storm Warnings', value: 32, color: '#ffc107' },
    { label: 'High Wave Advisories', value: 28, color: '#28a745' },
    { label: 'Flood Alerts', value: 18, color: '#007bff' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Comprehensive insights into ocean hazard patterns and response effectiveness</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Hazard Distribution</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {data.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div style={{height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden'}}>
                  <motion.div
                    style={{
                      height: '100%',
                      backgroundColor: item.color,
                      width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Response Times</h2>
          <ul style={{listStyle: 'none', padding: 0}}>
            {[
              { region: 'Coastal Region A', time: '12 min' },
              { region: 'Bay Area B', time: '8 min' },
              { region: 'Island C', time: '15 min' },
              { region: 'Delta D', time: '10 min' },
            ].map((item, index) => (
              <motion.li
                key={item.region}
                style={{padding: '10px 0', borderBottom: '1px solid #eee'}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                <strong>{item.region}:</strong> {item.time}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Monthly Trends</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {[
              { month: 'September', alerts: 67 },
              { month: 'August', alerts: 52 },
              { month: 'July', alerts: 41 },
              { month: 'June', alerts: 38 },
            ].map((item, index) => (
              <motion.div
                key={item.month}
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
              >
                <span>{item.month}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{width: '100px', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px'}}>
                    <motion.div
                      style={{
                        height: '100%',
                        backgroundColor: 'var(--primary-color)',
                        width: `${(item.alerts / 70) * 100}%`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.alerts / 70) * 100}%` }}
                      transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
                    />
                  </div>
                  <span style={{fontWeight: 'bold'}}>{item.alerts}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
