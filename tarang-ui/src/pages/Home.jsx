import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Stats from '../components/Stats.jsx';
import Support from '../components/Support.jsx';
import '../App.css';

const rescueImages = [
    "https://i.imgur.com/3h0kY9f.jpeg",
    "https://i.imgur.com/7g462sN.jpeg",
    "https://i.imgur.com/a/9YJ9z0c.jpeg",
    "https://i.imgur.com/a/hQ7aC1A.jpeg",
    "https://i.imgur.com/a/p8t8gGk.jpeg",
    "https://i.imgur.com/a/gH5jYjA.jpeg",
    "https://i.imgur.com/a/W44aZkL.jpeg",
    "https://i.imgur.com/a/v3Sg8m9.jpeg",
];

const ImageScroller = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % rescueImages.length);
        }, 10000); // Scroll every 10 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollerRef.current) {
            const scroller = scrollerRef.current;
            const imageWidth = scroller.children[0].clientWidth;
            scroller.scrollTo({
                left: imageWidth * currentIndex,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    return (
        <div className="image-scroller-container">
            <div className="image-scroller" ref={scrollerRef}>
                {rescueImages.map((url, index) => (
                    <div 
                        key={index} 
                        className={`image-item ${index === currentIndex ? 'center' : ''}`}
                    >
                        <img src={url} alt={`Rescue effort ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Home = () => {
  return (
    <div className="page-content page-content-home">
      <motion.div 
        className="hero-section" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to Tarang</h1>
        <p>Your Comprehensive Early Warning System for Ocean Hazards</p>
      </motion.div>

      <motion.div 
        className="about-section" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>Empowering Communities, Saving Lives</h2>
        <p>
          Tarang provides real-time alerts and critical data for ocean-related hazards like tsunamis, storm surges, and high waves. Our mission is to equip communities, researchers, and government authorities with the tools needed for proactive decision-making and public safety.
        </p>
      </motion.div>

      <motion.div className="stats-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
        <h2>Our Impact in Numbers</h2>
        <Stats />
      </motion.div>

      <motion.div className="dashboard-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
        <h2>Glimpses of Rescue & Hazard Efforts</h2>
        <ImageScroller />
      </motion.div>

      <motion.div className="support-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
        <Support />
      </motion.div>

    </div>
  );
};

export default Home;
