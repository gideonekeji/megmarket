"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  ButtonGroup,
} from "@mui/material";
import DistanceRangeInputBox from "./DistanceRangeInputBox";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useAppSelector } from "@/app/hooks/hooks";
import { setSponsorLocation } from "@/app/storeApp/Slice/sponsorLocation";
import { useDispatch, useSelector } from "react-redux";

export default function GoogleMapInputBoxSponsor() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA",
    libraries: ["places"],
  });

  const dispatch = useDispatch();

  const { address, latLng } = useSelector((state) => state.sponsorLocation);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my location@@@@@@@@  ", latLng.lat);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data }] = useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  useEffect(() => {
    if (data?.service?.lat && data?.service?.lon) {
      Cookies.set("lat", data.service.lat);
      Cookies.set("lng", data.service.lon);
    }
  }, [data]);

  useEffect(() => {
    if (latLng) {
      Cookies.set("lat", latLng.lat);
      Cookies.set("lng", latLng.lng);
    }
  }, [latLng]);

  useEffect(() => {
    const lat = Cookies.get("lat");
    const lng = Cookies.get("lng");

    if (!lat || !lng) {
      console.log("Cookies are not set");
    }
  }, []);

  const lat = parseFloat(Cookies.get("lat") || "0");
  const lng = parseFloat(Cookies.get("lng") || "0");

  console.log(" my lat long values ", lat, lng);

  const [markerPosition, setMarkerPosition] = useState({ lat, lng });
  const [map, setMap] = useState(null);
  const locationRef = useRef();
  const [circle, setCircle] = useState(null);
  const [locationAddress, setLocationAddress] = useState(""); // State to store the location address

  console.log(" my location is values ", map);

  //

  useEffect(() => {
    dispatch(
      setSponsorLocation({
        address: data?.service.address,
        latLng: { lat: data?.service.lat, lng: data?.service.lon },
      })
    );
  }, [data]);

  const handleSearchLocation = () => {
    const location = locationRef.current.value;
    if (!location) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const latLng = results[0].geometry.location;
        const formattedAddress = results[0].formatted_address;

        // Dispatch the action to store address and lat/lng values in Redux store
        dispatch(
          setSponsorLocation({
            address: formattedAddress,
            latLng: { lat: latLng.lat(), lng: latLng.lng() },
          })
        );

        console.log("My address values: ", formattedAddress);
        console.log("My lat and lng values: ", latLng.lat());

        const newPosition = { lat: latLng.lat(), lng: latLng.lng() };
        setMarkerPosition(newPosition);
        map.panTo(newPosition);

        // Always clear the previous circle and add a new one (if needed)
        if (circle) {
          circle.setCenter(newPosition);
          circle.setRadius(400); // default radius
        } else {
          const newCircle = new google.maps.Circle({
            center: newPosition,
            radius: 400, // default radius
            fillColor: "#226FE421",
            fillOpacity: 0.3,
            strokeColor: "#226FE421",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map,
          });
          setCircle(newCircle); // Update the state with the new circle
        }

        // Update the input box with the formatted address
        setLocationAddress(formattedAddress);
      } else {
        alert("Location not found. Please try again.");
      }
    });
  };

  const distanceValue = useAppSelector((state) => state.distance.distance);
  const [zoomvalues, setZoomValues] = useState(200);
  // if distance values increase or decrease, then update zoom values
  useEffect(() => {
    // Check for conditions when you want to update the zoom
    if (distanceValue === 10) {
      setZoomValues(15);
    } else {
      // You can have other conditions here to update zoom based on distance
      setZoomValues(10);
    }
  }, [distanceValue]); // Only include distanceValue here

  console.log("My zoom values", zoomvalues);

  useEffect(() => {
    if (map && distanceValue !== undefined) {
      let newRadius;

      // Gradual increase in radius based on distanceValue (1 to 100)
      // Scaling the radius more evenly across the full range
      if (distanceValue <= 30) {
        newRadius = 10000 + (distanceValue - 1) * 300; // Increase by 300 meters for values 1-30
      } else {
        newRadius = 10000 + 30 * 300 + (distanceValue - 30) * 500; // Increase by 500 meters for values 31-100
      }

      // Optional: Cap the radius if needed (to prevent excessively large circles)
      if (newRadius > 500000) {
        // Cap at 500 km
        newRadius = 500000;
      }

      // Update the circle's position and radius
      if (circle) {
        circle.setCenter(markerPosition);
        circle.setRadius(newRadius);
      } else {
        const newCircle = new google.maps.Circle({
          center: markerPosition,
          radius: newRadius,
          fillColor: "#226FE4",
          fillOpacity: 0.3,
          strokeColor: "#226FE4",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          map,
        });
        setCircle(newCircle);
      }
    }
  }, [map, markerPosition, distanceValue, circle]);

  if (!isLoaded) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        height: "600px",
        borderRadius: "18px",
      }}
    >
      <Box position="absolute" left={0} top={0} height="100%" width="100%">
        <GoogleMap
          center={markerPosition}
          zoom={zoomvalues}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </Box>

      <Box
        p={2}
        borderRadius="8px"
        m={2}
        bgcolor="white"
        boxShadow={3}
        minWidth="md"
        zIndex="1"
        width="90%"
      >
        <Stack direction="row" spacing={2} justifyContent="center">
          <Box
            flexGrow={1}
            sx={{
              width: "100%",
            }}
          >
            <Autocomplete>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Serach your location"
                inputRef={locationRef}
                value={locationAddress} // Bind the input value to the state
                onChange={(e) => setLocationAddress(e.target.value)} // Update the state on input change
                onBlur={handleSearchLocation} // Call the handleSearchLocation function when the input loses focus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.8rem",
                    backgroundColor: isDarkMode ? "#212121" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    border: "none",
                    borderRadius: "8px",
                    borderColor: "#B4B4B4",
                    "&:focus-within": {
                      borderColor: "#B5843F66",
                      boxShadow: "0 0 0 1px #B5843F66",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: isDarkMode ? "#ffffff" : "#000000",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
              />
            </Autocomplete>
          </Box>
        </Stack>
      </Box>

      <div className="w-full absolute bottom-8 z-30">
        <DistanceRangeInputBox />
      </div>
    </Box>
  );
}
