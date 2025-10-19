"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci"; // Define types for Google Maps
import {
  setSearchLocationCategory,
  clearSearchLocationCategory,
} from "@/app/storeApp/Slice/category/SerachLocationSlice";
import { useAppSelector } from "@/app/hooks/hooks";

declare global {
  interface Window {
    google: typeof google;
    initAutocomplete: () => void;
  }
}

const LocationInputBox = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // To track the input value

  console.log(" my input box values", inputValue);

  useEffect(() => {
    // Load the Google Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA&callback=initAutocomplete&libraries=places&v=weekly";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.initAutocomplete = initAutocomplete;
    };
  }, []);

  function initAutocomplete() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 23.0225, lng: 72.5714 },
        zoom: 10,
        mapTypeId: "roadmap",
      }
    );

    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Clear existing markers
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        // Create marker for each place
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map,
          icon,
          title: place.formatted_address,
          position: place.geometry.location,
        });

        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        // Log the latitude and longitude values for debugging
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log("Latitude: ", lat, "Longitude: ", lng);

        // Dispatch the selected location to Redux
        dispatch(
          setSearchLocationCategory({
            name: place.formatted_address,
            location: place.geometry.location,
            vicinity: place.name || "",
            lat, // Pass latitude
            lng, // Pass longitude
          })
        );
      });

      // Fit map bounds to the places
      map.fitBounds(bounds);
    });
  }

  const location = useAppSelector(
    (state) => state.SerachLocationSlice.selectedLocation
  );

  console.log("Location:  1212121212121", location);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value, "selected");

    setInputValue(value);

    // If input is empty, clear the Redux slice state
    if (value.trim() === "") {
      dispatch(clearSearchLocationCategory());
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-xl ">
      <div className="relative h-full flex w-full items-center justify-center p-4">
        <div className="w-full absolute h-full right-[2rem] bottom-6">
          <input
            id="pac-input"
            className="input-important w-full rounded-lg border p-4 text-sm outline-none"
            type="text"
            placeholder="Search only state name"
            value={inputValue} // Controlled input
            onChange={handleInputChange} // Handle input changes
          />
        </div>
      </div>
      <div
        id="map"
        className="flex-1 rounded-xl"
        style={{ height: "400px" }}
      ></div>
    </div>
  );
};

export default LocationInputBox;
