import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, onValue } from 'firebase/database';
import {db} from "@/app/firebaseConfig"
// import HeatmapLayer from './heatmaplayer';
// import { sensor_Data } from '@/app/data';

const GeoHeatmap = () => {
  const [data, setData] = useState({});

  // Custom hook to set map view on click
  function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });
    return null;
  }

  useEffect(() => {
    const fetchData = () => {
      const usersRef = ref(db, 'sensor/data'); // Correct reference to Realtime Database
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        setData(data);
        console.log("final output data", data);
      });
    };
  
    fetchData();
  
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);
  
  
  return (
    
    <MapContainer center={[0,0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewOnClick />
      {/* <HeatmapLayer data={data} /> */}
    </MapContainer>

  );
};

export default GeoHeatmap;

