// pages/index.js
import { useAppSelector } from "@/app/hooks/hooks";
import { useEffect } from "react";
import {
  setCurrentLocation,
  setError,
} from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/CurrentLocation";
import { useDispatch } from "react-redux";

const CurrentLocation = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, locationName, errorMessage } = useAppSelector(
    (state) => state.currentLocation
  );
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      dispatch(setError("Geolocation is not supported by this browser."));
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Call reverse geocoding function
    getLocationName(lat, lon);

    // Dispatch location to Redux store
    dispatch(
      setCurrentLocation({
        latitude: lat,
        longitude: lon,
        locationName: "Fetching location name...",
      })
    );
  };

  const showError = (error) => {
    let errorMsg = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMsg = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorMsg = "An unknown error occurred.";
        break;
      default:
        errorMsg = "An error occurred.";
    }
    dispatch(setError(errorMsg));
  };

  const getLocationName = async (lat, lon) => {
    const apiKey = "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA"; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        // Dispatch location name to Redux store
        dispatch(
          setCurrentLocation({
            latitude: lat,
            longitude: lon,
            locationName: data.results[0].formatted_address,
          })
        );
      } else {
        dispatch(
          setCurrentLocation({
            latitude: lat,
            longitude: lon,
            locationName: "Unable to get location name.",
          })
        );
      }
    } catch (error) {
      dispatch(
        setCurrentLocation({
          latitude: lat,
          longitude: lon,
          locationName: "Error retrieving location data.",
        })
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  console.log(" fjkhbsdagbfjkhsadfhagsdjkasdf", locationName);

  return (
    <div>
      <p>{locationName}</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default CurrentLocation;
