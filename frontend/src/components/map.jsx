import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ asteroidPosition }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {asteroidPosition && (
        <Marker position={asteroidPosition}>
          <Popup>Asteroid Impact Point</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
