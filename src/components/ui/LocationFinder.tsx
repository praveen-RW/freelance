// components/LocationMarker.js
import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon (optional)
const markerIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', // Optional marker icon URL
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationMarker = ({ setLat, setLng }) => {
  const [position, setPosition] = useState(null);

  // Listen for map click events to update the marker and input fields
  useMapEvents({
    click(e) {
      setPosition(e.latlng); // Set marker position
      setLat(e.latlng.lat);   // Update latitude state
      setLng(e.latlng.lng);   // Update longitude state
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>
        Latitude: {position.lat}, Longitude: {position.lng}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
