
import React from 'react';
import { motion } from 'framer-motion';

const SocialMonitoring = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Social Monitoring</h2>
      <div className="grid-container">
        <div className="grid-item">Grid Item 1</div>
        <div className="grid-item">Grid Item 2</div>
        <div className="grid-item">Grid Item 3</div>
        <div className="grid-item">Grid Item 4</div>
      </div>
    </motion.div>
  );
};

export default SocialMonitoring;
