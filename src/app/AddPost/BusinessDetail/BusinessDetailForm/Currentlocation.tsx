// pages/index.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  setCityImage,
  setCurrentLocation,
  setError,
} from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/CurrentLocation";
import axios from "axios";

const Currentlocation = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, locationName, errorMessage } = useAppSelector(
    (state) => state.currentLocation
  );

  

  const UNSPLASH_ACCESS_KEY = "lBX8myYcdmcBjtVdOhJWfc4BEGxe-_m0kwzsbr6fLVk"; // demo key
  const GOOGLE_API_KEY = "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA"; // your key

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

    // Fetch location name from Google
    getLocationName(lat, lon);

    // Temporary store lat/lon
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
      default:
        errorMsg = "An unknown error occurred.";
    }
    dispatch(setError(errorMsg));
  };

  const getLocationName = async (lat, lon) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "OK" && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        const city = extractCity(data.results[0].address_components);

        // Update location in Redux
        dispatch(
          setCurrentLocation({
            latitude: lat,
            longitude: lon,
            locationName: address,
          })
        );

        if (city) {
          fetchCityImage(city);
        }
      } else {
        dispatch(
          setCurrentLocation({
            latitude: lat,
            longitude: lon,
            locationName: "Unable to get location name.",
          })
        );
      }
    } catch (err) {
      dispatch(
        setCurrentLocation({
          latitude: lat,
          longitude: lon,
          locationName: "Error retrieving location data.",
        })
      );
    }
  };

  const extractCity = (components) => {
    const cityComp = components.find((c) => c.types.includes("locality"));
    return cityComp ? cityComp.long_name : null;
  };

  const fetchCityImage = async (city) => {
    try {
      const resp = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: `${city} cityscape`,
          per_page: 1,
          orientation: "landscape",
          order_by: "relevant",
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      const imageUrl = resp.data.results.length
        ? resp.data.results[0].urls.regular
        : "https://via.placeholder.com/800x400?text=No+Image+Available";

      console.log("Live Location City Image URL:", imageUrl);

      // ✅ Store in Redux
      dispatch(setCityImage(imageUrl));
    } catch (err) {
      console.error("Error fetching city image:", err);
      dispatch(setCityImage("https://via.placeholder.com/800x400?text=Image+Error"));
    }
  };


  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <p>{locationName}</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Currentlocation;
