"use client";

import React, { useEffect, useRef } from "react";
import locationIcon from "../../../../public/assets/Image/locationicondetail1.png";
import { useGoogleMaps } from "@/app/hooks/useGoogleMaps";
import { useAppSelector } from "@/app/hooks/hooks";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";

const Googlemap: React.FC = () => {
  const googleMapRef = useRef<HTMLDivElement | null>(null);
  const googleLoaded = useGoogleMaps();
  const current_address = useAppSelector((state) => state.currentLocation);

  console.log("  my  current location ", current_address);

  // Default property location
  const propertyData = {
    lat: current_address.latitude, // Default latitude (Los Angeles, CA)
    lon: current_address.longitude, // Default longitude (Los Angeles, CA)
    title: current_address.locationName,
  };

  useEffect(() => {
    if (googleLoaded && window.google && googleMapRef.current) {
      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        center: { lat: propertyData.lat, lng: propertyData.lon },
        zoom: 13,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: propertyData.lat, lng: propertyData.lon },
        map: googleMap,
        icon: {
          url: locationIcon,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      // Open Google Maps on marker click
      marker.addListener("click", () => {
        window.open(
          `https://www.google.com/maps?q=${propertyData.lat},${propertyData.lon}`,
          "_blank"
        );
      });
    }
  }, [googleLoaded]);

  return (
    <div className="w-full h-full rounded-lg">
      <div
        className="h-full"
        ref={googleMapRef}
        style={{
          width: "100%",
          borderRadius: "8px",
        }}
      />
      <div className=" hidden">
        <Currentlocation />
      </div>
    </div>
  );
};

export default Googlemap;
