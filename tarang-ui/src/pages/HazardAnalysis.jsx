import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const HazardAnalysis = () => {
  const [selectedHazard, setSelectedHazard] = useState('tsunami');

  const hazardData = {
    tsunami: [
      { location: 'Coastal Area A', severity: 8, date: '2023-10-01' },
      { location: 'Bay B', severity: 6, date: '2023-09-28' },
      { location: 'Island C', severity: 9, date: '2023-09-25' },
    ],
    storm: [
      { location: 'Delta D', severity: 7, date: '2023-10-02' },
      { location: 'River E', severity: 5, date: '2023-09-30' },
      { location: 'Lake F', severity: 4, date: '2023-09-27' },
    ],
    flood: [
      { location: 'Valley G', severity: 6, date: '2023-10-03' },
      { location: 'Plain H', severity: 8, date: '2023-09-29' },
      { location: 'Hill I', severity: 3, date: '2023-09-26' },
    ],
  };

  const currentData = hazardData[selectedHazard];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Hazard Analysis</h1>
        <p>Detailed analysis of ocean hazards with severity charts and historical data</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Hazard Type</h2>
          <select
            value={selectedHazard}
            onChange={(e) => setSelectedHazard(e.target.value)}
            style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
          >
            <option value="tsunami">Tsunami</option>
            <option value="storm">Storm Surge</option>
            <option value="flood">Flood</option>
          </select>
          <div style={{marginTop: '20px'}}>
            <h3>Severity Chart</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {currentData.map((item, index) => (
                <motion.div
                  key={item.location}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <span>{item.location}</span>
                    <span>{item.severity}/10</span>
                  </div>
                  <div style={{height: '25px', backgroundColor: '#e9ecef', borderRadius: '12px', overflow: 'hidden'}}>
                    <motion.div
                      style={{
                        height: '100%',
                        backgroundColor: item.severity > 7 ? '#dc3545' : item.severity > 5 ? '#ffc107' : '#28a745',
                        width: `${(item.severity / 10) * 100}%`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.severity / 10) * 100}%` }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Hazard Details Table</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Location</th>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Severity</th>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Date</th>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <motion.tr
                  key={item.location}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                >
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.location}</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.severity}/10</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.date}</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      backgroundColor: item.severity > 7 ? '#dc3545' : item.severity > 5 ? '#ffc107' : '#28a745',
                      color: 'white'
                    }}>
                      {item.severity > 7 ? 'High' : item.severity > 5 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default HazardAnalysis;
