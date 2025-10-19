import { useEffect, useState } from "react";
import "./Sponsorleftside.css";
import { SlLocationPin } from "react-icons/sl";
import DistanceRangeInputBox from "./DistanceRangeInputBox";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useAppSelector } from "@/app/hooks/hooks";

declare global {
  interface Window {
    google: typeof google;
  }
}

const GoogleMapInputBoxSponser = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const distanceValue = useAppSelector((state) => state.distance.distance);

  const [prevDistanceValue, setPrevDistanceValue] = useState<
    number | undefined
  >(undefined);
  const [markerScale, setMarkerScale] = useState(400); // Initial scale of the marker

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data }] = useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  useEffect(() => {
    if (data && data.service?.lat && data.service?.lon) {
      setLatitude(parseFloat(data.service.lat));
      setLongitude(parseFloat(data.service.lon));
    }
  }, [data]);

  // Dynamically load Google Maps script when the component mounts
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA&libraries=places&v=weekly";
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);
    };

    if (typeof window !== "undefined" && !window.google) {
      loadGoogleMapsScript();
    } else {
      setMapLoaded(true); // Google Maps is already loaded
    }

    return () => {
      const script = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Update marker scale when the distance value changes
  useEffect(() => {
    if (
      prevDistanceValue !== undefined &&
      distanceValue !== prevDistanceValue
    ) {
      const newScale = Math.max(50, distanceValue * 20);
      setMarkerScale(newScale);
    }

    setPrevDistanceValue(distanceValue);
  }, [distanceValue, prevDistanceValue]);

  const [inputValue, setInputValue] = useState(data?.service?.address || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    if (mapLoaded && latitude !== undefined && longitude !== undefined) {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
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
      let circle: google.maps.Circle | null = null;

      // Handle places search
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        markers.forEach((marker) => marker.setMap(null));
        markers = [];

        if (circle) {
          circle.setMap(null);
          circle = null;
        }

        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) return;

          const iconUrl = "https://www.svgrepo.com/show/362123/map-marker.svg";

          const marker = new google.maps.Marker({
            map,
            icon: {
              url: iconUrl,
              scaledSize: new google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 30),
            },
            title: place.formatted_address,
            position: place.geometry.location,
          });

          markers.push(marker);

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }

          if (place.geometry.location) {
            circle = new google.maps.Circle({
              map: map,
              center: place.geometry.location,
              radius: markerScale, // Adjust radius based on scale
              fillColor: "#226FE421",
              fillOpacity: 0.2,
              strokeWeight: 0.5,
              strokeColor: "white",
            });
          }
        });

        map.fitBounds(bounds);
      });

      const iconUrl = "https://www.svgrepo.com/show/362123/map-marker.svg";
      const initialMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 30),
        },
        title: "Initial Location",
      });

      map.setCenter(initialMarker.getPosition()!);

      // Add the initial circle
      circle = new google.maps.Circle({
        map: map,
        center: { lat: latitude, lng: longitude },
        radius: markerScale,
        fillColor: "#226FE421",
        fillOpacity: 1,
        strokeWeight: 0.5,
        strokeColor: "white",
      });

      input?.addEventListener("input", () => {
        if (!input.value) {
          map.setCenter({ lat: latitude, lng: longitude });

          markers.forEach((marker) => marker.setMap(null));
          markers = [];

          if (circle) {
            circle.setMap(null);
          }
        }
      });
    }
  }, [mapLoaded, latitude, longitude, markerScale, data]);

  useEffect(() => {
    if (data?.service?.address) {
      setInputValue(data.service.address);
    }
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col relative rounded-xl">
      <div className="relative flex w-full items-center justify-center p-4">
        <div className="relative">
          <input
            id="pac-input"
            className="input-important w-[80%] rounded-lg border p-4 pl-10 text-sm outline-none"
            type="text"
            placeholder="Science city, Sola, Ahmedabad"
            value={inputValue}
            onChange={handleInputChange}
          />
          <SlLocationPin className="absolute bottom-[-5.7rem] left-[-11.5rem] z-20 -translate-y-1/2 transform text-xl text-gray-500" />
        </div>
      </div>

      {/ Range Button /}
      <div className="w-full absolute bottom-8 z-30">
        <DistanceRangeInputBox />
      </div>
      <div id="map" className="flex-1 rounded-xl"></div>
    </div>
  );
};

export default GoogleMapInputBoxSponser;
