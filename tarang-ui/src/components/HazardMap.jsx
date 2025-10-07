import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../supabase';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const HazardMap = () => {
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHazards = async () => {
      const { data, error } = await supabase
        .from('hazards')
        .select('*')
        .eq('status', 'verified'); // Only show verified hazards

      if (error) {
        console.error('Error fetching hazards:', error);
      } else {
        setHazards(data);
      }
      setLoading(false);
    };

    fetchHazards();
  }, []);

  const getMarkerIcon = (severity) => {
    let color;
    switch (severity) {
      case 'critical': color = 'red'; break;
      case 'high': color = 'orange'; break;
      case 'medium': color = 'yellow'; break;
      case 'low': color = 'green'; break;
      default: color = 'blue';
    }

    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hazards.map(hazard => (
        <Marker
          key={hazard.id}
          position={[hazard.lat, hazard.lng]}
          icon={getMarkerIcon(hazard.severity)}
        >
          <Popup>
            <div>
              <h4>{hazard.type} - {hazard.severity}</h4>
              <p>{hazard.description}</p>
              <p><strong>Location:</strong> {hazard.location}</p>
              <p><strong>Reported:</strong> {new Date(hazard.created_at).toLocaleString()}</p>
              {hazard.media_urls && hazard.media_urls.length > 0 && (
                <div>
                  <strong>Media:</strong>
                  {hazard.media_urls.map((url, index) => (
                    <div key={index}>
                      {url.includes('.mp4') || url.includes('.webm') ? (
                        <video src={url} controls style={{maxWidth: '200px'}} />
                      ) : (
                        <img src={url} alt={`Media ${index + 1}`} style={{maxWidth: '200px'}} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HazardMap;
