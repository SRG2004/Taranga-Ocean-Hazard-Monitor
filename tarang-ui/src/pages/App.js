
import React from 'react';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>App Overview</h2>
      <p>This is an overview of the Tarang application.</p>
    </motion.div>
  );
};

export default App;
