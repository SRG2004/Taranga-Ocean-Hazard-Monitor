import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const SocialPosts = () => {
  const [filter, setFilter] = useState('all');

  const posts = [
    {
      id: 1,
      platform: 'Twitter',
      user: '@oceanwatcher',
      content: 'Just spotted some unusual wave patterns off the coast. Anyone else noticing this? #OceanSafety',
      sentiment: 'neutral',
      likes: 45,
      retweets: 12,
      time: '2 hours ago',
      badge: 'verified'
    },
    {
      id: 2,
      platform: 'Facebook',
      user: 'Coastal Community Group',
      content: 'URGENT: Storm surge warning for our area. Please evacuate to higher ground immediately!',
      sentiment: 'negative',
      likes: 89,
      shares: 34,
      time: '4 hours ago',
      badge: 'official'
    },
    {
      id: 3,
      platform: 'Instagram',
      user: '@beachlife_pro',
      content: 'Beautiful sunset today, but staying alert for any weather changes. Love our coastal life! 🌅',
      sentiment: 'positive',
      likes: 156,
      comments: 23,
      time: '6 hours ago',
      badge: 'influencer'
    },
    {
      id: 4,
      platform: 'Twitter',
      user: '@marine_research',
      content: 'New data shows increasing frequency of high wave events. Climate change impact is real. #ClimateAction',
      sentiment: 'negative',
      likes: 78,
      retweets: 45,
      time: '8 hours ago',
      badge: 'expert'
    },
  ];

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.sentiment === filter);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'verified': return '#1da1f2';
      case 'official': return '#dc3545';
      case 'influencer': return '#ffc107';
      case 'expert': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Social Posts</h1>
        <p>Community discussions and real-time updates from social media platforms</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Filter Posts</h2>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            {['all', 'positive', 'neutral', 'negative'].map(sentiment => (
              <button
                key={sentiment}
                onClick={() => setFilter(sentiment)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  backgroundColor: filter === sentiment ? 'var(--primary-color)' : '#f0f0f0',
                  color: filter === sentiment ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Recent Posts</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                style={{
                  padding: '20px',
                  border: '1px solid #e9ecef',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: getBadgeColor(post.badge),
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {post.badge}
                    </span>
                    <span style={{fontWeight: 'bold'}}>{post.user}</span>
                    <small style={{color: '#666'}}>on {post.platform}</small>
                  </div>
                  <small style={{color: '#666'}}>{post.time}</small>
                </div>
                <p style={{margin: '15px 0', lineHeight: '1.5'}}>{post.content}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex', gap: '15px'}}>
                    {post.likes && <span>❤️ {post.likes}</span>}
                    {post.retweets && <span>🔄 {post.retweets}</span>}
                    {post.shares && <span>📤 {post.shares}</span>}
                    {post.comments && <span>💬 {post.comments}</span>}
                  </div>
                  <motion.span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      backgroundColor: post.sentiment === 'positive' ? '#d4edda' : post.sentiment === 'negative' ? '#f8d7da' : '#fff3cd',
                      color: post.sentiment === 'positive' ? '#155724' : post.sentiment === 'negative' ? '#721c24' : '#856404',
                      fontWeight: 'bold'
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    {post.sentiment}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialPosts;
