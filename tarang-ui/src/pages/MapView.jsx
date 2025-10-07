import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import '../App.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const { user } = useAuth();
  const userRoles = user?.roles || [];
  const isAdmin = userRoles.includes('admin');
  const isResearcher = userRoles.includes('researcher');
  const isGovernment = userRoles.includes('government');
  const isCitizen = !isAdmin && !isResearcher && !isGovernment;

  const [filters, setFilters] = useState({
    hazardType: 'all',
    severity: 'all',
    timeRange: '24h',
    source: 'all'
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHazards = async () => {
      const { data, error } = await supabase
        .from('hazards')
        .select('*');
      if (!error) setHazards(data || []);
      setLoading(false);
    };
    fetchHazards();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredLocations = hazards.filter(location => {
    if (filters.hazardType !== 'all' && location.type !== filters.hazardType) return false;
    if (filters.severity !== 'all' && location.severity !== filters.severity) return false;
    return true;
  });

  const stats = [
    { label: 'Active Alerts', value: 12, color: '#dc3545' },
    { label: 'Monitoring', value: 8, color: '#ffc107' },
    { label: 'Resolved', value: 25, color: '#28a745' },
  ];

  // Role-based content rendering
  if (isCitizen) {
    // Citizen view: Nearby Hazards - simplified interface
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Nearby Hazards</h1>
          <p>View verified hazards and safety information in your area</p>
        </div>
        <div className="dashboard-grid">
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Safety Information</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #2196f3'}}>
                <h4 style={{margin: '0 0 10px 0', color: '#1976d2'}}>⚠️ Current Alerts</h4>
                <p style={{margin: '0', fontSize: '14px'}}>Stay informed about hazards in your vicinity. Check the map for verified incidents and safety zones.</p>
              </div>
              <div style={{padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '8px', border: '1px solid #9c27b0'}}>
                <h4 style={{margin: '0 0 10px 0', color: '#7b1fa2'}}>🏠 Safe Zones</h4>
                <p style={{margin: '0', fontSize: '14px'}}>Green markers indicate designated safe zones and shelters in case of emergency.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="dashboard-card"
            style={{gridColumn: 'span 2'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2>Hazard Map</h2>
            <MapContainer center={[20, 78]} zoom={5} style={{ height: '400px', width: '100%', borderRadius: '8px' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredLocations.filter(location => location.status === 'verified').map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]}>
                  <Popup>
                    <div>
                      <h4 style={{margin: '0 0 8px 0', color: '#d32f2f'}}>🚨 Hazard Alert</h4>
                      <p style={{margin: '4px 0'}}><strong>Type:</strong> {location.hazard}</p>
                      <p style={{margin: '4px 0'}}><strong>Severity:</strong>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          marginLeft: '5px',
                          backgroundColor: location.severity === 'high' ? '#dc3545' : location.severity === 'medium' ? '#ffc107' : '#28a745',
                          color: 'white'
                        }}>{location.severity}</span>
                      </p>
                      <p style={{margin: '4px 0'}}><strong>Status:</strong> {location.status}</p>
                      <p style={{margin: '8px 0 0 0', fontSize: '12px', color: '#666'}}>Stay safe and follow local authorities' instructions.</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2>Emergency Contacts</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <div style={{padding: '10px', backgroundColor: '#fff3e0', borderRadius: '6px'}}>
                <strong>🚔 Police:</strong> 100
              </div>
              <div style={{padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '6px'}}>
                <strong>🚑 Ambulance:</strong> 108
              </div>
              <div style={{padding: '10px', backgroundColor: '#fce4ec', borderRadius: '6px'}}>
                <strong>🌊 Coast Guard:</strong> 1554
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Researcher, Government, and Admin view: Full analytical map
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{isResearcher ? 'Map Visualization' : isGovernment ? 'Live Map' : 'Map View'}</h1>
        <p>{isResearcher ? 'Interactive visualization for hazard analysis and research' :
             isGovernment ? 'Real-time monitoring of incidents and response coordination' :
             'Interactive map showing real-time hazard locations and alerts'}</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Filters</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Hazard Type</label>
              <select
                value={filters.hazardType}
                onChange={(e) => handleFilterChange('hazardType', e.target.value)}
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
              >
                <option value="all">All Types</option>
                <option value="tsunami">Tsunami</option>
                <option value="storm">Storm Surge</option>
                <option value="flood">Flood</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Severity</label>
              <select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Time Range</label>
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Interactive Map</h2>
          <MapContainer center={[20, 78]} zoom={5} style={{ height: '400px', width: '100%', borderRadius: '8px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredLocations.map((location) => (
              <Marker key={location.id} position={[location.lat, location.lng]}>
                <Popup>
                  <div>
                    <h4>{location.name}</h4>
                    <p>Hazard: {location.hazard}</p>
                    <p>Severity: {location.severity}</p>
                    <p>Status: {location.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          {selectedLocation && (
            <motion.div
              style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4>{selectedLocation.name}</h4>
              <p>Hazard: {selectedLocation.hazard}</p>
              <p>Severity: <span style={{
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                backgroundColor: selectedLocation.severity === 'high' ? '#dc3545' : selectedLocation.severity === 'medium' ? '#ffc107' : '#28a745',
                color: 'white'
              }}>{selectedLocation.severity}</span></p>
              <p>Status: {selectedLocation.status}</p>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Legend</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <div style={{width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#dc3545'}}></div>
              <span>High Severity</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <div style={{width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#ffc107'}}></div>
              <span>Medium Severity</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <div style={{width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#28a745'}}></div>
              <span>Low Severity</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2>Quick Stats</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
              >
                <span>{stat.label}</span>
                <span style={{
                  fontWeight: 'bold',
                  color: stat.color,
                  fontSize: '18px'
                }}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapView;
