import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import location from "../../../../../public/assets/Image/location12.png";
import { useGetCountryApi } from "@/app/storeApp/api/usegetCountryApi";
import { resetLocation, setLocation } from "@/app/storeApp/Slice/locationSearchHomeSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import "./leftSide.css"
import corssicon from "../../../../../public/assets/Image/cross12.png";
import { usePathname } from "next/navigation";
import { sessionService } from "@/app/utils/sessionService.ts";


const ListingLocation: React.FC = () => {
  const dispatch = useDispatch();



  const pathname = usePathname(); // e.g., "/naranpura-ahmedabad/store"

  // Get first segment
  const firstSegment = pathname.replace(/^\/+/, "").split("/")[0];

  // Replace hyphen with comma and space, capitalize words
  const formattedLocation = firstSegment
    .replace("-", ", ")
    .split(", ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(", ");

  console.log("Formatted location:@@@@@", formattedLocation);



  // Ensure sessionStorage is accessed only in the browser
  const extractedCity =
    typeof window !== "undefined"
      ? sessionStorage.getItem("recentLocation") || formattedLocation
      : "";


  console.log("extractedCityextractedCityextractedCity@!@!@!", extractedCity)

  // State management
  const [searchValue, setSearchValue] = useState<string>(extractedCity);
  const [recentSearch, setRecentSearch] = useState<string>(extractedCity);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);


  const locationSearchHome = useAppSelector((state) => state.locationSearchHome.selectedLocation)


  console.log("locationSearchHome", locationSearchHome)

  useEffect(() => {
    if (locationSearchHome) {
      setSearchValue(locationSearchHome);
    } else {
      setSearchValue("");
    }
  }, [locationSearchHome]);

  // API call for country list based on input value
  const { data, refetch } = useGetCountryApi(searchValue);

  useEffect(() => {
    if (extractedCity) {
      setSearchValue(extractedCity);
      setRecentSearch(extractedCity);
      dispatch(setLocation(extractedCity));
    }
  }, [extractedCity, dispatch]);

  useEffect(() => {
    if (searchValue.trim().length > 0 && searchValue !== recentSearch) {
      refetch();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchValue, refetch, recentSearch]);

  const handleSelectLocation = (location: string) => {
    setSearchValue(location);
    setRecentSearch(location);
    dispatch(setLocation(location));
    setShowDropdown(false);
    sessionService.setRecentLocation(location);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      // ✅ Clear sessionStorage and update Redux state when input is empty
      sessionStorage.removeItem("recentLocation");
      setRecentSearch(""); // Clear recent search state
      dispatch(setLocation("")); // Update Redux store
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };



  const handalreset = () => {
    dispatch(resetLocation())
  }


  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <div className="relative mt-2 flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={location}
            alt="Location Icon"
            className={`h-[1.1rem] w-[1.1rem] object-cover ${isDarkMode && "bg-circle-icon"}`}
          />
        </span>

        <input
          type="text"
          id="location"
          name="location"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`font-poppins w-full     placeholder:text-T9 rounded-[10px] py-3 pl-10  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput  focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
          placeholder="Search Location"
          value={searchValue}
          onChange={handleInputChange}
          onBlur={handleBlur}

          style={{
            backgroundColor: searchValue ? "#226FE45C" : "",
            border: searchValue ? "none" : ""
          }}
        />

        {searchValue && (
          <button
            className="absolute right-3 text-[#226FE4]"
            onClick={handalreset}
          >
            <Image
              src={corssicon}
              alt="crossicon"
              className={`h-[1.5rem] w-[1.5rem] object-cover ${isDarkMode && "bg-circle-icon"}`}

            />
          </button>
        )}
      </div>

      {showDropdown && (data?.countriesList?.length ?? 0) > 0 && (
        <ul className="absolute top-[4rem] left-0 w-full     bg-light-background   dark:bg-dark-secondarybg   text-black  dark:border-none  dark:text-dark-darkcolor rounded-lg shadow-lg h-fit max-h-[30rem] overflow-y-auto z-10 border border-[#226FE480]">
          {data?.countriesList?.map((location: string, index: number) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 "
              onMouseDown={() => handleSelectLocation(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingLocation;
