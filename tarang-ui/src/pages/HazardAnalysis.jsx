import React from 'react';
import { motion } from 'framer-motion';

const HazardAnalysis = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Hazard Analysis</h2>
      <div className="chart-placeholder"></div>
      <table>
        <thead>
          <tr>
            <th>Hazard</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tsunami</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Cyclone</td>
            <td>Medium</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export default HazardAnalysis;