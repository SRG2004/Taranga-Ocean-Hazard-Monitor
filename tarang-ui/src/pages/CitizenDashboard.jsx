import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HazardMap from '../components/HazardMap';
import { fetchHazards, fetchWeather } from '../utils/api';

const CitizenDashboard = () => {
  const [hazards, setHazards] = useState([]);
  const [weather, setWeather] = useState(null);
  const [language, setLanguage] = useState('en');
  const [seaCondition, setSeaCondition] = useState('green'); // green, yellow, red

  useEffect(() => {
    const getHazards = async () => {
      try {
        const data = await fetchHazards();
        setHazards(data);
      } catch (error) {
        console.error('Failed to fetch hazards:', error);
      }
    };
    getHazards();

    const getWeather = async () => {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };
    getWeather();
  }, []);

  const hazardStatus = hazards.length > 0 ? 'warning' : 'safe';

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Citizen Dashboard</h1>
        <Link to="/report-hazard" className="btn" style={{backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '6px'}}>
          Report a Hazard
        </Link>
      </div>
      <div className="dashboard-grid">

        {/* Simple Hazard Status Cards */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2>Hazard Status</h2>
          <div style={{display: 'flex', gap: '10px'}}>
            <div style={{backgroundColor: hazardStatus === 'safe' ? '#28a745' : hazardStatus === 'warning' ? '#ffc107' : '#dc3545', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{fontSize: '24px'}}>{hazardStatus === 'safe' ? '✅' : hazardStatus === 'warning' ? '⚠️' : '🚨'}</div>
              <div>{hazardStatus === 'safe' ? 'Safe' : hazardStatus === 'warning' ? 'Warning' : 'Danger'}</div>
            </div>
          </div>
        </motion.div>

        {/* Live Weather Panel */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h2>Live Weather Panel</h2>
          {weather ? (
            <div>
              <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
              <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
              <p><strong>Tide Level:</strong> Low</p>
              <p><strong>Wave Height:</strong> 1.2m</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </motion.div>

        {/* Interactive Map */}
        <motion.div className="dashboard-card" style={{gridColumn: 'span 2'}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          <h2>Interactive Map</h2>
          <HazardMap />
          <div style={{marginTop: '10px'}}>
            <span style={{backgroundColor: '#dc3545', color: 'white', padding: '2px 8px', borderRadius: '4px'}}>Danger Zone</span>
            <span style={{backgroundColor: '#ffc107', color: 'white', padding: '2px 8px', borderRadius: '4px', marginLeft: '10px'}}>Warning Zone</span>
          </div>
        </motion.div>

        {/* Preparedness Tips Panel */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <h2>Preparedness Tips</h2>
          <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
            <li>Stay informed through official alerts.</li>
            <li>Prepare an emergency kit with essentials.</li>
            <li>Know evacuation routes in your area.</li>
            <li>Secure your home against flooding.</li>
          </ul>
        </motion.div>

        {/* Multi-Language Selector */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
          <h2>Language</h2>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </motion.div>

        {/* Alert Subscription Widget */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }}>
          <h2>Alert Subscription</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input type="email" placeholder="Email" style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '10px'}} />
            <input type="tel" placeholder="Phone" style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '10px'}} />
            <button type="submit" style={{width: '100%', backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Subscribe</button>
          </form>
        </motion.div>

        {/* Emergency Action Panel */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
          <h2>What To Do Now</h2>
          <ol style={{paddingLeft: '20px'}}>
            <li>Move to higher ground immediately.</li>
            <li>Contact emergency services.</li>
            <li>Follow official evacuation orders.</li>
          </ol>
        </motion.div>

        {/* Sea Condition Indicator */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.5 }}>
          <h2>Sea Condition</h2>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div style={{width: '30px', height: '30px', borderRadius: '50%', backgroundColor: seaCondition === 'green' ? '#28a745' : seaCondition === 'yellow' ? '#ffc107' : '#dc3545'}}></div>
            <span>{seaCondition === 'green' ? 'Safe' : seaCondition === 'yellow' ? 'Caution' : 'Unsafe'}</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CitizenDashboard;
