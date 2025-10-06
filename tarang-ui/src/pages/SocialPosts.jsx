
import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';

const SocialPosts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Social Posts</h2>
      <ul className="list">
        <Card>Post 1</Card>
        <Card>Post 2</Card>
        <Card>Post 3</Card>
      </ul>
    </motion.div>
  );
};

export default SocialPosts;
