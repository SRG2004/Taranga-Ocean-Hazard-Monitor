import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('hazards');
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReports([
        { id: 1, type: 'Tsunami Warning', location: 'Coastal Area A', date: '2023-10-01', status: 'Active' },
        { id: 2, type: 'Storm Surge', location: 'Bay Area B', date: '2023-09-28', status: 'Resolved' },
        { id: 3, type: 'High Waves', location: 'Beach C', date: '2023-09-25', status: 'Monitoring' },
      ]);
      setLoading(false);
    }, 1000);
  }, [activeTab]);

  const tabs = [
    { id: 'hazards', label: 'Hazard Reports' },
    { id: 'responses', label: 'Response Reports' },
    { id: 'analytics', label: 'Analytics Reports' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card" style={{gridColumn: 'span 3'}}>
          <div style={{display: 'flex', marginBottom: '20px'}}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? 'var(--primary-color)' : '#f0f0f0',
                  color: activeTab === tab.id ? 'white' : '#333',
                  cursor: 'pointer',
                  borderRadius: '6px 6px 0 0',
                  marginRight: '5px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {loading ? (
            <div style={{textAlign: 'center', padding: '50px'}}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '50px',
                  height: '50px',
                  border: '5px solid #f3f3f3',
                  borderTop: '5px solid var(--primary-color)',
                  borderRadius: '50%',
                  margin: '0 auto'
                }}
              />
              <p style={{marginTop: '20px'}}>Loading reports...</p>
            </div>
          ) : (
            <motion.table
              style={{width: '100%', borderCollapse: 'collapse'}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead>
                <tr>
                  <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Type</th>
                  <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Location</th>
                  <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Date</th>
                  <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <td style={{padding: '10px', border: '1px solid #ddd'}}>{report.type}</td>
                    <td style={{padding: '10px', border: '1px solid #ddd'}}>{report.location}</td>
                    <td style={{padding: '10px', border: '1px solid #ddd'}}>{report.date}</td>
                    <td style={{padding: '10px', border: '1px solid #ddd'}}>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        backgroundColor: report.status === 'Active' ? '#dc3545' : report.status === 'Resolved' ? '#28a745' : '#ffc107',
                        color: 'white'
                      }}>
                        {report.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
