import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';

const Support = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Support</h2>
      <p>Subtitle</p>
      <div className="grid-container">
        <Card>Card 1</Card>
        <Card>Card 2</Card>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Open</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Closed</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export default Support;