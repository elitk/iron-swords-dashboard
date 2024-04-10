import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MarkerData {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  info?: string;
}

const center = {
  lat: 31.5,
  lng: 34.9,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "administrative.country",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

interface MapProps {
  markers?: MarkerData[];
}
const test = [
  { id: "1", position: { lat: 32.109333, lng: 34.855499 }, info: "Tel Aviv" },
  { id: "2", position: { lat: 31.046051, lng: 34.851612 }, info: "Beersheba" },
  { id: "3", position: { lat: 32.794046, lng: 34.989571 }, info: "Haifa" },
  { id: "4", position: { lat: 31.768319, lng: 35.21371 }, info: "Jerusalem" },
  { id: "5", position: { lat: 29.557669, lng: 34.951925 }, info: "Eilat" },
  // Add more markers as needed
];

const MapChart: React.FC<MapProps> = ({ markers }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">Total Israel map markers</h3>
      <LoadScript googleMapsApiKey="AIzaSyBH8Y_KaKDM7vPCGB8Uxz3n6HhqCycwhwY">
        <GoogleMap
          options={options}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
        >
          {test.map((marker) => (
            <Marker
              onClick={() => {
                console.log(marker.id);
              }}
              key={marker.id}
              // label={marker.info}
              position={marker.position}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapChart;
// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import axios from 'axios';

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: 31.0461,
//   lng: 34.8516
// };

// const rawData = [
//   {
//     data: "יפתח",
//     date: "18.03.2024",
//     time: "17:29:26",
//     alertDate: "2024-03-18T17:29:00",
//     category: 1,
//     category_desc: "ירי רקטות וטילים",
//     matrix_id: 1,
//     rid: 28721
//   },
//   // Add more data as needed
// ];

// const MapChart: React.FC = () => {
//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {
//     // Example function to fetch coordinates for a given location name
//     const fetchCoordinatesForLocation = async (locationName: string) => {
//       const apiKey = "YOUR_API_KEY"; // Replace with your Google Maps API key
//       const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${apiKey}`);
//       if (response.data.results.length > 0) {
//         const { lat, lng } = response.data.results[0].geometry.location;
//         return { lat, lng };
//       }
//       return null;
//     };

//     const fetchAllCoordinates = async () => {
//       const markerData = await Promise.all(rawData.map(async (item) => {
//         const coords = await fetchCoordinatesForLocation(item.data);
//         if (coords) {
//           return {
//             ...item,
//             position: coords
//           };
//         }
//         return null;
//       }));
//       setMarkers(markerData.filter(marker => marker !== null));
//     };

//     fetchAllCoordinates();
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey="YOUR_API_KEY">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker.position} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapChart;
