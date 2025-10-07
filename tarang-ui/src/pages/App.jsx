import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const App = () => {
  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Advanced sensors and AI-powered systems track ocean conditions 24/7',
      icon: '🌊'
    },
    {
      title: 'Early Warning System',
      description: 'Instant alerts via multiple channels to protect coastal communities',
      icon: '🚨'
    },
    {
      title: 'Community Engagement',
      description: 'Crowdsourced reporting and volunteer networks enhance response capabilities',
      icon: '🤝'
    },
    {
      title: 'Data Analytics',
      description: 'Comprehensive analysis of hazard patterns and trends for better planning',
      icon: '📊'
    },
    {
      title: 'Emergency Response',
      description: 'Coordinated response teams and resources for rapid deployment',
      icon: '🚁'
    },
    {
      title: 'Educational Resources',
      description: 'Training materials and awareness programs for public safety',
      icon: '📚'
    }
  ];

  return (
    <div className="page-content">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to Tarang</h1>
        <p>Revolutionizing Ocean Hazard Monitoring with Technology and Community</p>
      </motion.div>

      <motion.div
        className="about-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>Our Mission</h2>
        <p>
          Tarang combines cutting-edge technology with community-driven initiatives to create a comprehensive
          ocean hazard monitoring and early warning system. We empower coastal communities with real-time data,
          predictive analytics, and rapid response capabilities to save lives and protect livelihoods.
        </p>
      </motion.div>

      <motion.div
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h2>Key Features</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div style={{textAlign: 'center', marginBottom: '15px'}}>
                <span style={{fontSize: '48px'}}>{feature.icon}</span>
              </div>
              <h3 style={{textAlign: 'center', marginBottom: '10px'}}>{feature.title}</h3>
              <p style={{textAlign: 'center', color: '#666'}}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="cta-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <h2>Join Our Network</h2>
        <p>Be part of the solution. Whether you're a citizen, researcher, or official, your contribution matters.</p>
        <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <motion.button
            style={{
              padding: '15px 30px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button
            style={{
              padding: '15px 30px',
              backgroundColor: 'transparent',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
