import React from 'react';
import { motion } from 'framer-motion';

const Reports = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Reports</h2>
      <div className="tabs">
        <div className="tab">Tab 1</div>
        <div className="tab">Tab 2</div>
        <div className="tab">Tab 3</div>
      </div>
      <div className="spinner"></div>
    </motion.div>
  );
};

export default Reports;