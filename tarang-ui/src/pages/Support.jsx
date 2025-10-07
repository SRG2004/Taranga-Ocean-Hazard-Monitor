import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Support = () => {
  const { user } = useAuth();
  const userRoles = user?.roles || [];
  const isAdmin = userRoles.includes('admin');
  const isResearcher = userRoles.includes('researcher');
  const isGovernment = userRoles.includes('government');
  const isCitizen = !isAdmin && !isResearcher && !isGovernment;

  const [statusFilter, setStatusFilter] = useState('all');

  // For citizens: Show awareness and tips content
  if (isCitizen) {
    const awarenessTips = [
      {
        category: 'Storm Preparedness',
        icon: '🌊',
        tips: [
          'Monitor weather forecasts regularly',
          'Secure boats and fishing equipment',
          'Have emergency supplies ready',
          'Know evacuation routes and safe zones'
        ]
      },
      {
        category: 'Tsunami Safety',
        icon: '🌊',
        tips: [
          'Move to higher ground immediately',
          'Stay away from the coast for several hours',
          'Follow official evacuation orders',
          'Help others but don\'t risk your life'
        ]
      },
      {
        category: 'Flood Prevention',
        icon: '💧',
        tips: [
          'Avoid walking or driving through flood waters',
          'Never underestimate the power of moving water',
          'Stay informed through official channels',
          'Prepare emergency kits with essentials'
        ]
      },
      {
        category: 'General Safety',
        icon: '🛟',
        tips: [
          'Learn CPR and basic first aid',
          'Know your community\'s emergency plans',
          'Stay connected with family and neighbors',
          'Report hazards immediately when spotted'
        ]
      }
    ];

    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Awareness & Tips</h1>
          <p>Educational resources and safety guidelines for ocean hazard preparedness</p>
        </div>
        <div className="dashboard-grid">
          {awarenessTips.map((section, index) => (
            <motion.div
              key={section.category}
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h2 style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '1.5rem'}}>{section.icon}</span>
                {section.category}
              </h2>
              <ul style={{paddingLeft: '20px'}}>
                {section.tips.map((tip, tipIndex) => (
                  <motion.li
                    key={tipIndex}
                    style={{marginBottom: '8px', lineHeight: '1.5'}}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (tipIndex * 0.05), duration: 0.3 }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // For admins: Show data export/backup functionality
  if (isAdmin) {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Data Export / Backup</h1>
          <p>Export system data and manage backups</p>
        </div>
        <div className="dashboard-grid">
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Data Export</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Export Type</label>
                <select style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="reports">All Reports</option>
                  <option value="users">User Data</option>
                  <option value="hazards">Hazard Data</option>
                  <option value="analytics">Analytics Data</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Date Range</label>
                <select style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="all">All Time</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Format</label>
                <select style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
              <button
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Export Data
              </button>
            </div>
          </motion.div>
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2>System Backup</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px'}}>
                <h4>Last Backup: 2 hours ago</h4>
                <p>Status: Successful</p>
              </div>
              <button
                style={{
                  padding: '12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Create Manual Backup
              </button>
              <button
                style={{
                  padding: '12px',
                  backgroundColor: '#ffc107',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Restore from Backup
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Default support page for other roles (researchers, government)
  const supportRequests = [
    { id: 1, user: 'John Doe', issue: 'App not loading', status: 'open', date: '2023-10-01' },
    { id: 2, user: 'Jane Smith', issue: 'Report submission failed', status: 'resolved', date: '2023-09-28' },
    { id: 3, user: 'Bob Johnson', issue: 'Map not displaying', status: 'in-progress', date: '2023-09-25' },
  ];

  const filteredRequests = statusFilter === 'all' ? supportRequests : supportRequests.filter(req => req.status === statusFilter);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Support Center</h1>
        <p>Manage user support requests and system status</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>System Status</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h4>API Status</h4>
              <p style={{color: '#28a745'}}>Operational</p>
            </motion.div>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h4>Database</h4>
              <p style={{color: '#28a745'}}>Healthy</p>
            </motion.div>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h4>Notifications</h4>
              <p style={{color: '#ffc107'}}>Degraded</p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Support Requests</h2>
          <div style={{marginBottom: '20px'}}>
            <label style={{marginRight: '10px'}}>Filter by status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>User</th>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Issue</th>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Status</th>
                <th style={{padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9'}}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                >
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{request.user}</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{request.issue}</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      backgroundColor: request.status === 'open' ? '#dc3545' : request.status === 'resolved' ? '#28a745' : '#ffc107',
                      color: 'white'
                    }}>
                      {request.status}
                    </span>
                  </td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{request.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
