import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../style.css";
import { CiSearch } from "react-icons/ci";
import { setLocation } from "@/app/storeApp/Slice/locationSlice";
import { useGoogleMaps } from "@/app/hooks/useGoogleMaps";
import Cookies from "js-cookie";
import axios from "axios";
import { RootState } from "@/app/storeApp/store"; // adjust path to your store

const GooglemapInput = () => {
  const dispatch = useDispatch();
  const googleLoaded = useGoogleMaps();
  const locationImage = useSelector((state: RootState) => state.location.image);

  const UNSPLASH_ACCESS_KEY = "lBX8myYcdmcBjtVdOhJWfc4BEGxe-_m0kwzsbr6fLVk";

  useEffect(() => {
    if (googleLoaded) initAutocomplete();
  }, [googleLoaded]);

  const initAutocomplete = () => {
    if (!window.google) return;

    const lat0 = parseFloat(Cookies.get("lat") || "23.0225");
    const lon0 = parseFloat(Cookies.get("lon") || "72.5714");

    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: lat0, lng: lon0 },
      zoom: 10,
      mapTypeId: "roadmap",
    });

    const input = document.getElementById("pac-input") as HTMLInputElement;
    if (!input) return;

    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds()!);
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (!places || !places.length) return;

      markers.forEach((m) => m.setMap(null));
      markers = [];

      const bounds = new google.maps.LatLngBounds();
      const place = places[0];
      if (!place.geometry?.location) return;

      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.formatted_address,
      });
      markers.push(marker);

      if (place.geometry.viewport) bounds.union(place.geometry.viewport);
      else bounds.extend(place.geometry.location);

      map.fitBounds(bounds);

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      Cookies.set("lat", lat.toString(), { expires: 7 });
      Cookies.set("lon", lng.toString(), { expires: 7 });

      const cityName = extractCity(place);
      if (cityName) {
        fetchCityImage(cityName, place, lat, lng);
      }
    });
  };

  const extractCity = (place: google.maps.places.PlaceResult): string | null => {
    if (!place.address_components) return null;
    const comp = place.address_components.find((c) => c.types.includes("locality"));
    return comp?.long_name || null;
  };

  const fetchCityImage = async (
    city: string,
    place: google.maps.places.PlaceResult,
    lat: number,
    lng: number
  ) => {
    try {
      const resp = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: `${city} cityscape`,
          per_page: 1,
          orientation: "landscape",
          order_by: "relevant"
        },
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      });

      const imageUrl = resp.data.results.length
        ? resp.data.results[0].urls.regular
        : "https://via.placeholder.com/800x400?text=No+Image+Available";

      dispatch(
        setLocation({
          name: place.formatted_address || city,
          location: place.geometry?.location || {},
          lat,
          lng,
          image: imageUrl,
        })
      );
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      dispatch(
        setLocation({
          name: place.formatted_address || city,
          location: place.geometry?.location || {},
          lat,
          lng,
          image: "https://via.placeholder.com/800x400?text=Image+Error",
        })
      );
    }
  };

  return (
    <div className="flex h-[25rem] md:h-[20rem] xl:h-full w-full flex-col rounded-xl">
      {/* Search Input */}
      <div className="relative flex w-full items-center justify-center p-4">
        <div className="relative">
          <input
            id="pac-input"
            className="input-important w-full md:w-[70%] xl:w-[80%] 2xl:w-[70%] rounded-lg border p-4 pl-10 text-sm outline-none"
            type="text"
            placeholder="Search for an area or street name"
          />
          <CiSearch className="absolute responsivedesingicon bottom-[-4.5rem] md:bottom-[-5.7rem] left-[-9rem] md:left-[-16.5rem] lg:left-[-23rem] xl:left-[-9.5rem] 2xl:left-[-12rem] z-20 -translate-y-1/2 transform text-xl text-gray-500" />
        </div>
      </div>

      {/* Google Map */}
      <div id="map" className="flex-1 rounded-xl"></div>

      {/* City Image from Redux */}
      {/* {locationImage && (
        <div className="mt-4 flex justify-center">
          <img
            src={locationImage}
            alt="City view"
            className="rounded-lg shadow-md max-h-60 object-cover"
          />
        </div>
      )} */}
    </div>
  );
};

export default GooglemapInput;
