import React from 'react';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Analytics</h2>
      <div className="chart-bar"></div>
      <ul className="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </motion.div>
  );
};

export default Analytics;