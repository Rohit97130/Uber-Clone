

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '100%'
// };

// // Default to a location in India
// const defaultCenter = {
//   lat: 28.7041,
//   lng: 77.1025
// };

// // Map options to improve UX
// const mapOptions = {
//   disableDefaultUI: false,
//   zoomControl: true,
//   mapTypeControl: true,
//   scaleControl: true,
//   streetViewControl: true,
//   rotateControl: true,
//   fullscreenControl: true
// };

// function LiveTracking() {
//   const [currentPosition, setCurrentPosition] = useState(defaultCenter);
//   const [loadError, setLoadError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLoadError("Geolocation is not supported by your browser");
//       setIsLoading(false);
//       return;
//     }

//     // Get initial position
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log('Initial position:', { latitude, longitude });
//         setCurrentPosition({ lat: latitude, lng: longitude });
//         setLastUpdate(new Date().toLocaleTimeString());
//         setIsLoading(false);
//       },
//       (error) => {
//         console.error("Error getting initial location:", error);
//         setLoadError("Failed to get your location");
//         setIsLoading(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 30000, // Increased timeout
//         maximumAge: 0
//       }
//     );

//     // Watch for position updates
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude, accuracy } = position.coords;
//         console.log('Position update:', { latitude, longitude, accuracy });
        
//         // Only update if accuracy is good enough (less than 100 meters)
//         if (accuracy <= 100) {
//           setCurrentPosition({ lat: latitude, lng: longitude });
//           setLastUpdate(new Date().toLocaleTimeString());
//         }
//       },
//       (error) => {
//         console.error("Error watching location:", error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 30000, // Increased timeout
//         maximumAge: 1000, // Update if position is older than 1 second
//       }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   if (loadError) {
//     return <div className="text-red-500 p-4">{loadError}</div>;
//   }

//   if (isLoading) {
//     return <div className="p-4">Loading map...</div>;
//   }

//   return (
//     <div className="relative w-full h-full">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={currentPosition}
//         zoom={15}
//         options={mapOptions}
//         onLoad={() => setMapLoaded(true)}
//       >
//         {currentPosition && mapLoaded && (
//           <Marker
//             position={currentPosition}
//             icon={{
//               url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//               scaledSize: window.google?.maps ? new window.google.maps.Size(40, 40) : null
//             }}
//           />
//         )}
//       </GoogleMap>
//       {lastUpdate && (
//         <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-10">
//           <div className="text-sm">Last update: {lastUpdate}</div>
//           <div className="text-xs text-gray-600">
//             Lat: {currentPosition.lat.toFixed(4)}, Lng: {currentPosition.lng.toFixed(4)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LiveTracking;


import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { useContext } from 'react';
import { SocketDataContext } from '../context/SocketContext';


const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

// ✅ Keep libraries constant outside component
const libraries = ['marker'];

function LiveTracking() {
  const [currentPosition, setCurrentPosition] = useState(center);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
   

  const { socket } = useContext(SocketDataContext);

  // 🔹 Track live position
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.error('Location error:', error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 🔹 Update marker when location changes
  useEffect(() => {
    if (markerRef.current && currentPosition) {
      markerRef.current.position = currentPosition;
    }
  }, [currentPosition]);

  // 🔹 Initialize map and marker once
  const handleMapLoad = (map) => {
    mapRef.current = map;

    // Create new AdvancedMarkerElement
    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: currentPosition,
      title: 'You are here',
    });
  };



  


  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries} // ✅ static reference
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID} // ✅ required for Advanced Marker
        onLoad={handleMapLoad}
      />
    </LoadScript>
  );
}

export default LiveTracking;
