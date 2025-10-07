import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const SocialMonitoring = () => {
  const [activeSection, setActiveSection] = useState('trends');

  const sections = [
    { id: 'trends', label: 'Social Trends' },
    { id: 'alerts', label: 'Real-time Alerts' },
    { id: 'sentiment', label: 'Sentiment Analysis' },
  ];

  const trendsData = [
    { topic: 'Tsunami Warning', mentions: 1250, sentiment: 'negative', change: '+15%' },
    { topic: 'Storm Surge', mentions: 890, sentiment: 'neutral', change: '+8%' },
    { topic: 'High Waves', mentions: 675, sentiment: 'positive', change: '-5%' },
  ];

  const alertsData = [
    { type: 'Urgent', message: 'Multiple reports of unusual wave activity in Coastal Area A', time: '2 min ago' },
    { type: 'Warning', message: 'Social media buzz about potential storm in Bay Area B', time: '5 min ago' },
    { type: 'Info', message: 'Community discussion on flood preparedness in Delta Region', time: '10 min ago' },
  ];

  const sentimentData = [
    { platform: 'Twitter', positive: 65, negative: 20, neutral: 15 },
    { platform: 'Facebook', positive: 70, negative: 15, neutral: 15 },
    { platform: 'Instagram', positive: 80, negative: 10, neutral: 10 },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Social Monitoring</h1>
        <p>Real-time analysis of social media and community discussions about ocean hazards</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 3'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{display: 'flex', marginBottom: '20px'}}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: activeSection === section.id ? 'var(--primary-color)' : '#f0f0f0',
                  color: activeSection === section.id ? 'white' : '#333',
                  cursor: 'pointer',
                  borderRadius: '6px 6px 0 0',
                  marginRight: '5px'
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
          {activeSection === 'trends' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Social Media Trends</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                {trendsData.map((trend, index) => (
                  <motion.div
                    key={trend.topic}
                    className="support-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h4>{trend.topic}</h4>
                    <p>Mentions: {trend.mentions.toLocaleString()}</p>
                    <p>Sentiment: <span style={{color: trend.sentiment === 'positive' ? '#28a745' : trend.sentiment === 'negative' ? '#dc3545' : '#ffc107'}}>{trend.sentiment}</span></p>
                    <p>Change: {trend.change}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {activeSection === 'alerts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Real-time Alerts</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {alertsData.map((alert, index) => (
                  <motion.div
                    key={index}
                    style={{
                      padding: '15px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: alert.type === 'Urgent' ? '#ffe6e6' : alert.type === 'Warning' ? '#fff3cd' : '#f8f9fa'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        backgroundColor: alert.type === 'Urgent' ? '#dc3545' : alert.type === 'Warning' ? '#ffc107' : '#28a745',
                        color: 'white'
                      }}>
                        {alert.type}
                      </span>
                      <small style={{color: '#666'}}>{alert.time}</small>
                    </div>
                    <p style={{marginTop: '10px'}}>{alert.message}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {activeSection === 'sentiment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Sentiment Analysis</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
                {sentimentData.map((platform, index) => (
                  <motion.div
                    key={platform.platform}
                    className="support-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <h4>{platform.platform}</h4>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                      <span>Positive: {platform.positive}%</span>
                      <div style={{width: '60px', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px'}}>
                        <motion.div
                          style={{height: '100%', backgroundColor: '#28a745', width: `${platform.positive}%`}}
                          initial={{ width: 0 }}
                          animate={{ width: `${platform.positive}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                      <span>Negative: {platform.negative}%</span>
                      <div style={{width: '60px', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px'}}>
                        <motion.div
                          style={{height: '100%', backgroundColor: '#dc3545', width: `${platform.negative}%`}}
                          initial={{ width: 0 }}
                          animate={{ width: `${platform.negative}%` }}
                          transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span>Neutral: {platform.neutral}%</span>
                      <div style={{width: '60px', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px'}}>
                        <motion.div
                          style={{height: '100%', backgroundColor: '#ffc107', width: `${platform.neutral}%`}}
                          initial={{ width: 0 }}
                          animate={{ width: `${platform.neutral}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMonitoring;
