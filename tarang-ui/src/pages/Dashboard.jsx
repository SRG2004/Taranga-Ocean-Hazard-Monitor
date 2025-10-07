import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const { user } = useAuth();
  const userRoles = user?.roles || [];
  const [users, setUsers] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users if admin
        if (userRoles.includes('admin')) {
          const { data: usersData, error: usersError } = await supabase
            .from('profiles')
            .select('*');
          if (!usersError) setUsers(usersData || []);
        }

        // Fetch hazards
        const { data: hazardsData, error: hazardsError } = await supabase
          .from('hazards')
          .select('*');
        if (!hazardsError) setHazards(hazardsData || []);

        // Fetch weather (dummy for now)
        setWeather({ temp: 28, wind: 15, tide: 'High', wave: 1.5 });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    if (user) fetchData();
  }, [user, userRoles]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.email}</p>
      </div>
      <div className="dashboard-grid">
        {userRoles.includes('admin') && (
          <>
            {/* Admin Features */}
            <motion.div className="dashboard-card" style={{gridColumn: 'span 2'}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2>User Management</h2>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>Name</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>Email</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={{padding: '10px', border: '1px solid #ddd'}}>{user.name || 'N/A'}</td>
                      <td style={{padding: '10px', border: '1px solid #ddd'}}>{user.email}</td>
                      <td style={{padding: '10px', border: '1px solid #ddd'}}>{user.role || 'user'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <h2>System Health</h2>
              <p>Data Feed: Active</p>
              <p>API Status: Online</p>
              <p>Storage: 45%</p>
            </motion.div>
          </>
        )}

        {(userRoles.includes('citizen') || userRoles.includes('researcher') || userRoles.includes('government')) && (
          <>
            {/* Citizen/Researcher/Government Features */}
            <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2>Hazard Status</h2>
              <div style={{display: 'flex', gap: '10px'}}>
                <div style={{backgroundColor: hazards.length > 0 ? '#ffc107' : '#28a745', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '24px'}}>{hazards.length > 0 ? '⚠️' : '✅'}</div>
                  <div>{hazards.length > 0 ? 'Warning' : 'Safe'}</div>
                </div>
              </div>
            </motion.div>

            <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <h2>Live Weather</h2>
              {weather && (
                <div>
                  <p>Temperature: {weather.temp}°C</p>
                  <p>Wind Speed: {weather.wind} m/s</p>
                  <p>Tide Level: {weather.tide}</p>
                  <p>Wave Height: {weather.wave}m</p>
                </div>
              )}
            </motion.div>

            <motion.div className="dashboard-card" style={{gridColumn: 'span 2'}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <h2>Hazard Map</h2>
              <MapContainer center={[20, 78]} zoom={5} style={{ height: '300px', width: '100%', borderRadius: '8px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {hazards.map((hazard) => (
                  <Marker key={hazard.id} position={[hazard.lat || 20, hazard.lng || 78]}>
                    <Popup>
                      <div>
                        <h4>{hazard.type}</h4>
                        <p>{hazard.description}</p>
                        <p>Severity: {hazard.severity}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </>
        )}

        {userRoles.includes('researcher') && (
          <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <h2>Data Visualization</h2>
            <p>Charts and graphs for researchers</p>
            {/* Add charts here */}
          </motion.div>
        )}

        {userRoles.includes('government') && (
          <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <h2>Real-Time Alerts</h2>
            <p>Color-coded alerts for officials</p>
            {/* Add alerts here */}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
