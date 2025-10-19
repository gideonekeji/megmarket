import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA"; // Replace with your API key

export function useGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      console.log("Google Maps API already loaded.");
      setLoaded(true);
      return;
    }

    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps API loaded.");
        setLoaded(true);
      };

      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  return loaded;
}
