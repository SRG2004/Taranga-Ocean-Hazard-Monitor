import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';

const CitizenDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Citizen Dashboard</h2>
      <div className="grid-container">
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
        <Card>Card 4</Card>
        <Card>Card 5</Card>
      </div>
    </motion.div>
  );
};

export default CitizenDashboard;