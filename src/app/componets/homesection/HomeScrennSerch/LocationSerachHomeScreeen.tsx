import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import location from "../../../../../public/assets/Image/locationicon.png";
import { useGetCountryApi } from "@/app/storeApp/api/usegetCountryApi";
import { setLocation } from "@/app/storeApp/Slice/locationSearchHomeSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";
import detectcurrentlocqationicon from "../../../../../public/assets/Image/search_locat_icon.svg";
import useTranslation from "@/app/hooks/useTranslation";
import "./homeseccion.css";
import { sessionService } from "@/app/utils/sessionService.ts";

const LocationSearchHomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, locationName } = useAppSelector(
    (state) => state.currentLocation
  );

  const currentLocation = locationName ?? "";
  let extractedCity = "";

  console.log("My current location:", currentLocation);

  if (currentLocation && typeof currentLocation === "string") {
    const locationParts = currentLocation.split(",").map((part) => part.trim());
    extractedCity =
      locationParts.length >= 3 ? locationParts[locationParts.length - 3] : "";
  }

  console.log("Extracted city:@!@!", extractedCity);

  const [recentSearch, setRecentSearch] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [useLatLon, setUseLatLon] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  console.log(" my searchValue values  ######################", searchValue);

  const { data, refetch } = useGetCountryApi(
    searchValue,
    useLatLon ? latitude : undefined,
    useLatLon ? longitude : undefined
  );

  useEffect(() => {
    refetch();
  }, [searchValue, latitude, longitude, refetch]);

  useEffect(() => {
    let storedLocation = sessionStorage.getItem("recentLocation");

    if (!storedLocation && extractedCity) {
      // sessionStorage.setItem("recentLocation", extractedCity);
      sessionService.setRecentLocation(extractedCity);

      storedLocation = extractedCity; // Use extractedCity for the first time
    }

    setSearchValue(storedLocation || "Ahmedabad"); // Use storedLocation if exists, else "Patna"

    console.log("Stored location:", sessionStorage.getItem("recentLocation"));
  }, [extractedCity]);

  useEffect(() => {
    if (showDropdown && searchValue.trim() !== "") {
      refetch();
    }
  }, [showDropdown, searchValue, refetch]);

  const handleSelectLocation = (location: string) => {
    setSearchValue(location);
    setRecentSearch(location);
    dispatch(setLocation(location));
    setShowDropdown(false);
    // sessionStorage.setItem("recentLocation", location);
    sessionService.setRecentLocation(location);

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setUseLatLon(true);
      setShowDropdown(true);
    } else {
      setUseLatLon(false);
    }
  };

  const handleFocus = () => {
    setUseLatLon(true);
    setShowDropdown(true);
    refetch();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 10);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const hnadaldetectcurrentLocation = () => {
    if (extractedCity) {
      setSearchValue(extractedCity);
      setRecentSearch(extractedCity);
      dispatch(setLocation(extractedCity));
      setShowDropdown(false);
      // sessionStorage.setItem("recentLocation", extractedCity);
      sessionService.setRecentLocation(extractedCity);

    }
  };

  const { getTranslation } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-1 relative    ">
      <label
        className={`font-poppins text-B4  ${isDarkMode ? "text-white" : "text-black"
          }`}
        htmlFor="location"
      >
        {getTranslation("Location", "Location")}
      </label>

      <div className="relative mt-2 flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={location}
            alt="Location Icon"
            className="h-[1.1rem] w-[1.1rem] object-cover"
          />
        </span>

        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`font-poppins w-full rounded-[10px] py-3 pl-10  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput  focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
          placeholder="Search Location"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}

        />
      </div>

      {showDropdown && (
        <ul className="absolute top-[6rem] left-0 w-full  dark:bg-dark-secondarybg  dark:text-dark-darkcolor  bg-light-background rounded-lg shadow-lg  xl:min-w-[30rem] h-fit max-h-[30rem] overflow-y-auto z-10 border dark:border-dark-bordercolorinput border-[#226FE480]">
          <div className="w-full justify-start items-start flex p-3">
            <div
              className="w-full flex gap-4 cursor-pointer"
              onMouseDown={hnadaldetectcurrentLocation}
            >
              <Image
                src={detectcurrentlocqationicon}
                alt="Detect Location Icon"
              />
              <p className="font-poppins text-light-button-base">
                {" "}
                {getTranslation("Detect Location", "Detect Location")}
              </p>
            </div>
          </div>

          {data?.countriesList?.length ? (
            data.countriesList.map((location: string, index: number) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black dark:text-dark-darkcolor"
                onMouseDown={() => handleSelectLocation(location)}
              >
                {location}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 font-poppins text-center">
              {getTranslation("Location Not Found", "Location Not Found")}
            </li>
          )}
        </ul>
      )}

      <div className="hidden">
        <Currentlocation />
      </div>
    </div>
  );
};

export default LocationSearchHomeScreen;
