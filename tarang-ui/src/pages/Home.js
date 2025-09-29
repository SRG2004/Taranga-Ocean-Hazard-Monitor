
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const rescueImages = [
    "https://images.unsplash.com/photo-1562254293-9b3a5b86b744?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609026922595-67366349435e?q=80&w=1932&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548658146-f4366010a2a5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584364299925-0538a5eb2277?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525507119028-ed4c624a9a4d?q=80&w=1974&auto=format&fit=crop",
];

const Home = () => {
  return (
    <div className="page-content">
      <motion.div 
        className="hero-section" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to Tarang</h1>
        <p>An Early Warning System for Ocean-Related Hazards</p>
      </motion.div>
      <motion.div 
        className="about-section" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>About the Project</h2>
        <p>
          Tarang is a comprehensive platform designed to provide timely and accurate warnings for various ocean-related hazards such as tsunamis, storm surges, and high waves. Our goal is to empower communities, researchers, and government authorities with the data and tools they need to make informed decisions and ensure public safety.
        </p>
      </motion.div>

      <motion.div className="dashboard-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
        <h2>Rescue and Hazard Efforts</h2>
        <div className="image-scroller">
            <div className="image-track">
                {rescueImages.concat(rescueImages).map((url, index) => (
                    <div className="image-item" key={index}>
                        <img src={url} alt={`Rescue effort ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;
