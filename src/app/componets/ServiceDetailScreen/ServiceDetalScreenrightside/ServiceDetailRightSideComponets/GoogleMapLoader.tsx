import Script from "next/script";
import { useEffect } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA"; // Replace with your API key

const GoogleMapLoader = ({ onLoad }: { onLoad: () => void }) => {
  useEffect(() => {
    if (window.google && window.google.maps) {
      onLoad(); // Ensure Google Maps is loaded only once
    }
  }, [onLoad]);

  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
      strategy="lazyOnload"
      onLoad={onLoad}
      onError={() => console.error("Google Maps failed to load")}
    />
  );
};

export default GoogleMapLoader;
