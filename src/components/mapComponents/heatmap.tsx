"use client"
// components/Heatmap.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import heatmap layer
import L from 'leaflet';
import { database, db, Query } from "../../lib/appwrite";
import { Microchip } from 'lucide-react';
import { Button } from '../ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { useRouter } from 'next/router';


interface Point {
  lat : number,
  lng : number,
  intensity : number
}

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
interface HeatmapLayerProps {
  points: Point[];
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(
      points.map((point) => [point.lat, point.lng, point.intensity]),
      { radius: 15, blur: 10, maxZoom: 17, minOpacity: 0.5 }
    );
    heatLayer.addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

const Heatmap = () => {
  const [heatData, setHeatData] = useState<Point[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  //  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const now : any = new Date();
      const threeSecondsAgo : any  = new Date(now.getTime() - 3000); // 3 seconds ago
      const oneSecondAgo : any = new Date(now.getTime() - 1000); // 1 second ago

      const data = await database.listDocuments(
        db.database ,
        db.collections.log,
        [
          Query.between("timestamp", threeSecondsAgo, oneSecondAgo), // Fetch data within the last 3 seconds
          Query.select([
            "timestamp",
            "decibelReading",
            "deviceData.latitude",
            "deviceData.longitude",
            "timestampString"
          ])
        ]
      );

      console.log("data", data);

      // Process and filter data based on time difference
      const newHeatData: ((prevState: never[]) => never[]) | {
        lat: number; // Hardcoded latitude
        lng: number; // Hardcoded longitude
        intensity: any; // Assuming decibelReading as intensity
      }[] = [];

      data.documents.forEach(reading => {
        const readingTime : any = new Date(reading.timestamp);
        const timeDiff = (now - readingTime) / 1000; // Convert milliseconds to seconds

        // Check if the time difference is between 1 and 3 seconds
        if (timeDiff >= 1 && timeDiff <= 3) {
          // Hardcode the latitude and longitude
          newHeatData.push({
            lat: 13.0396129, // Hardcoded latitude
            lng: 80.2475092, // Hardcoded longitude
            intensity: reading.decibelReading // Assuming decibelReading as intensity
          });
        }
      });

      // Update the heatmap data
      if (newHeatData.length > 0) {
        setHeatData(newHeatData);
      }
      else {
        setHeatData([])
      }
    };

    // Fetch data every second
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  console.log("data n", heatData)

  

  return (
    
    <div className="relative h-screen w-screen">
  <MapContainer 
    center={[13.0396129, 80.2475092]} 
    zoom={10} 
    className="h-full w-full absolute top-0 left-0 z-0"
    maxBounds={[
      [-90, -180],
      [90, 180],
    ]}
    minZoom={2}
    scrollWheelZoom={true}
  >
    <TileLayer 
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />

    <HeatmapLayer points={heatData} />
  </MapContainer>

  {/* Overlay container on top of the map */}
    <div
      className={`flex flex-col fixed bottom-10 right-9 p-3 z-10 justify-center items-center bg-white rounded-xl transition-all duration-300 ${
        isHovered ? "w-[300px] p-5" : "w-[150px]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conditionally render the additional content when hovered */}
      {isHovered && (
        <div className="flex items-center justify-between ml-5">
          <span className="text-sm text-gray-600">Do you want to contribute?</span>
          <Link href="/devices" passHref>
            <Button className="ml-3 px-3 py-1 bg-[#009933] text-white text-sm font-semibold rounded-md hover:bg-[#007a29]">
              Click here
            </Button>
          </Link>
        </div>
      )}
      <div className="flex items-center">
        <div className="h-3 w-3 items-center rounded-full bg-[#00b33c] animate-pulse"></div>
        <div className="ml-1 flex items-center">
          <span className="font-bold mr-2 text-[#009933]">Live Devices</span>
          <span className="font-bold text-md">1</span>
        </div>
      </div>

    </div>




    </div>

  
    // <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
    //   <MapContainer center={[13.0396129, 80.2475092]} zoom={10} style={{ height: '100%', width: '100%', position: 'relative' }}>
    //     <TileLayer
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     />
    //     <HeatmapLayer points={heatData} />
    //     <div className='flex absolute top-0 right-0 w-[40%] z-[30px]' style={{ justifyContent: 'center', alignItems: 'center', height: '60px', backgroundColor: 'rgba(255,255,255,0.8)' }}>
    //     <div>
    //       <Microchip />
    //     </div>
    //     <div>
    //       23
    //     </div>
    //     </div>
    //   </MapContainer>
    // </div>
  );
};

export default Heatmap;


