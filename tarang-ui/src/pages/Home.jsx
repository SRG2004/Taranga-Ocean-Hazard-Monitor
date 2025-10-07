import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Stats from '../components/Stats.jsx';
import Support from '../components/Support.jsx';
import '../App.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "Real-Time Alerts",
      description: "Get instant notifications about ocean hazards in your area",
      icon: "🚨"
    },
    {
      title: "Interactive Maps",
      description: "Visualize hazard zones and safe areas with our advanced mapping system",
      icon: "🗺️"
    },
    {
      title: "Community Reports",
      description: "Crowd-sourced hazard reporting from local communities",
      icon: "👥"
    },
    {
      title: "Weather Integration",
      description: "Live weather data and tide information for better decision making",
      icon: "🌊"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Marine Researcher",
      content: "Tarang has revolutionized how we monitor coastal hazards. The real-time data is invaluable for our research."
    },
    {
      name: "Captain Rajesh Kumar",
      role: "Fisherman",
      content: "Thanks to Tarang's alerts, our fishing community stays safe during rough weather conditions."
    },
    {
      name: "Ms. Priya Sharma",
      role: "Government Official",
      content: "The platform's comprehensive data helps us make informed decisions for public safety."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Welcome to Tarang</h1>
        <p>Protecting Coastal Communities from Ocean Hazards</p>
      </div>

      <div className="dashboard-grid">
        {/* Hero Section */}
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 3'}}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <h2>Advanced Early Warning System</h2>
            <p>Providing real-time alerts, interactive maps, and community-driven hazard reporting to keep you safe.</p>
            <div className="hero-buttons">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => navigate('/signup')} className="btn-primary">Get Started</button>
                  <button onClick={() => navigate('/login')} className="btn-secondary">Sign In</button>
                </>
              ) : (
                <button onClick={() => navigate('/dashboard')} className="btn-primary">Go to Dashboard</button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 3'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h3>Why Choose Tarang?</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3>Our Impact</h3>
          <Stats />
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <h3>What Our Users Say</h3>
          <div className="testimonial-slider">
            <motion.div
              className="testimonial"
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote>"{testimonials[currentSlide].content}"</blockquote>
              <cite>
                <strong>{testimonials[currentSlide].name}</strong><br />
                {testimonials[currentSlide].role}
              </cite>
            </motion.div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 3'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <h3>Ready to Stay Safe?</h3>
          <p>Join thousands of users who trust Tarang for their coastal safety needs.</p>
          {!isAuthenticated ? (
            <button onClick={() => navigate('/signup')} className="btn-primary">Create Free Account</button>
          ) : (
            <button onClick={() => navigate('/report-hazard')} className="btn-primary">Report a Hazard</button>
          )}
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 3'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <Support />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
