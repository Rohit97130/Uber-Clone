// import React from 'react';
// import { LoadScript } from '@react-google-maps/api';

// // Define libraries array outside component to prevent recreation
// const libraries = ['places'];

// // Memoize the LoadScript options to prevent reloads
// const loadScriptProps = {
//   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   libraries
// };

// export function GoogleMapsProvider({ children }) {
//   return (
//     <LoadScript {...loadScriptProps}>
//       {children}
//     </LoadScript>
//   );
// }