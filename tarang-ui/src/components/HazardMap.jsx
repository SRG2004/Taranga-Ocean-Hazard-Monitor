import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Dummy data for hazard hotspots
const hazardHotspots = [
  { id: 1, position: [12.9716, 77.5946], name: 'Hazard Spot 1', description: 'High risk of flooding.' },
  { id: 2, position: [12.972, 77.6], name: 'Hazard Spot 2', description: 'Landslide warning.' },
  { id: 3, position: [12.975, 77.59], name: 'Hazard Spot 3', description: 'Earthquake prone zone.' },
];

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const HazardMap = () => {
  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hazardHotspots.map(hotspot => (
        <Marker key={hotspot.id} position={hotspot.position}>
          <Popup>
            <b>{hotspot.name}</b><br />{hotspot.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HazardMap;
