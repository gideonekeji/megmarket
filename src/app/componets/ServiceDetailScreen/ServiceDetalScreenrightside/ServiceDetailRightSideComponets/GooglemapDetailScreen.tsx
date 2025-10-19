"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import locationicon from "../../../../../../public/assets/Image/locationicondetail.png";
import { useGoogleMaps } from "@/app/hooks/useGoogleMaps";
import location from "../../../../../../public/assets/Image/locationicondetail1.png";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { usePathname } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";

const GoogleMapDetailScreen: React.FC = () => {
  const googleMapRef = useRef<HTMLDivElement | null>(null);
  const [address, setAddress] = useState("");
  const googleLoaded = useGoogleMaps();
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const lastSegment = decodeString(lastSegment1);

  // Fetch service details
  const { data, isLoading } = useServiceDetailApi(lastSegment);

  // Extract lat/lon safely
  const lat = data?.serviceDetail?.lat
    ? parseFloat(data.serviceDetail.lat)
    : null;
  const lon = data?.serviceDetail?.lon
    ? parseFloat(data.serviceDetail.lon)
    : null;

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Function to get address from coordinates
  const getAddressFromCoordinates = (latitude: number, longitude: number) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error("Geocoder failed:", status);
      }
    });
  };

  // Initialize Google Map
  const initMap = () => {
    if (
      !window.google ||
      !window.google.maps ||
      !googleMapRef.current ||
      lat === null ||
      lon === null
    ) {
      console.error("Google Maps API not available or invalid lat/lon.");
      return;
    }

    const map = new window.google.maps.Map(googleMapRef.current, {
      center: { lat, lng: lon },
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });

    const marker = new window.google.maps.Marker({
      position: { lat, lng: lon },
      map: map,
      icon: {
        url: location,
        scaledSize: new window.google.maps.Size(10, 10),
      },
    });

    marker.addListener("click", () => {
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
    });

    getAddressFromCoordinates(lat, lon);
  };

  // Initialize the map when Google API is loaded and lat/lon are available
  useEffect(() => {
    if (googleLoaded && lat !== null && lon !== null) {
      initMap();
    }
  }, [googleLoaded, lat, lon]);

  const { getTranslation } = useTranslation();


  return (
    <div className="items-center justify-center w-full p-4 h-full rounded-lg photoservicedetailborderandshado">
      {/* Heading */}
      <div
        className={`text-lg font-medium items-start font-poppins ${
          isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"
        }`}
      >
          {getTranslation(
            "Map",
            "Map"
          )}
      </div>

      {/* Address Display */}
      <div className="w-full flex gap-2 h-full hidden">
        <Image
          src={locationicon}
          alt="Location Icon"
          className={`w-6 h-6 ${isDarkMode ? "bg-circle-icon" : ""}`}
        />
        <h1
          className={`text-sm font-medium font-poppins pt-[2px] ${
            isDarkMode ? "text-[#ffffff]" : "text-black"
          }`}
        >
          {address || "Fetching address..."}
        </h1>
      </div>

      {/* Map Container */}
      <div
        ref={googleMapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
        }}
        className="mt-3"
      >
        {isLoading ? <p>Loading map...</p> : null}
      </div>
    </div>
  );
};

export default GoogleMapDetailScreen;
