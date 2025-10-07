import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Official = () => {
  const announcements = [
    { title: 'New Safety Protocol Released', date: '2023-10-01', priority: 'high' },
    { title: 'Coastal Monitoring System Update', date: '2023-09-28', priority: 'medium' },
    { title: 'Emergency Response Drill Scheduled', date: '2023-09-25', priority: 'low' },
  ];

  const quickActions = [
    { label: 'Issue Alert', icon: '🚨', color: '#dc3545' },
    { label: 'View Reports', icon: '📊', color: '#28a745' },
    { label: 'Contact Teams', icon: '📞', color: '#007bff' },
    { label: 'System Status', icon: '⚙️', color: '#ffc107' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Official Dashboard</h1>
        <p>Official tools and announcements for government and emergency personnel</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Quick Actions</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                style={{
                  padding: '20px',
                  backgroundColor: action.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <span style={{fontSize: '24px'}}>{action.icon}</span>
                {action.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>System Overview</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Active Monitoring Stations</span>
              <span style={{fontWeight: 'bold', color: '#28a745'}}>24/25</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Response Teams on Duty</span>
              <span style={{fontWeight: 'bold', color: '#007bff'}}>12</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Alerts Issued Today</span>
              <span style={{fontWeight: 'bold', color: '#ffc107'}}>7</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Emergency Contacts Updated</span>
              <span style={{fontWeight: 'bold', color: '#dc3545'}}>98%</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Official Announcements</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.title}
                style={{
                  padding: '15px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  backgroundColor: announcement.priority === 'high' ? '#fff5f5' : announcement.priority === 'medium' ? '#fffbf0' : '#f8f9fa',
                  borderLeft: `4px solid ${announcement.priority === 'high' ? '#dc3545' : announcement.priority === 'medium' ? '#ffc107' : '#28a745'}`
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                  <h4 style={{margin: 0}}>{announcement.title}</h4>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: announcement.priority === 'high' ? '#dc3545' : announcement.priority === 'medium' ? '#ffc107' : '#28a745',
                    color: 'white'
                  }}>
                    {announcement.priority}
                  </span>
                </div>
                <p style={{margin: 0, color: '#666'}}>{announcement.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Official;
