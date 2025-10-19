"use client";

import HeadingText from "@/app/componets/Profile/HeadingText";
import MyFavoriteCard from "@/app/componets/Profile/MyFavorite/MyFavoriteCard";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Ensure you import Image correctly
import video from "../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { useFavouriteProperties } from "@/app/storeApp/api/LikeService";
import Cookies from "js-cookie";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function MyFavorite() {

  const { getTranslation } = useTranslation();


  // Modify API call to include pagination parameters
  const { data, error, isLoading, refetch } = useFavouriteProperties();
  const user_id = Cookies.get("user_id");

  // State to manage favorite properties if needed (useEffect is useful to update state after fetching)
  const [favorites, setFavorites] = useState([]);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    if (data) {
      console.log("API Data:", data);
      setFavorites(data.ServiceLikedList || []);
      // If there are more properties to load, call refetch() to fetch them
      refetch();
    }
  }, [data]);

  // Check if the API call is still in progress
  if (isLoading) {
    return (
      <div className="flex items-center  dark:bg-dark-secondarybg  justify-center">
        <AvatarWithSpinner />
      </div>
    );
  }

  // Check if the API call failed
  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div>Error: {error.message}</div>
      </div>
    );
  }




  return (
    <div className="h-full w-full py-[2rem]  px-[30px]  xl:px-[20px]   xl:px-[50px] ">
      {/* Heading */}

      <div className="flex w-full items-center justify-center gap-4">
        <h3
          className={`AmericanSign text-H2  text-light-button-base `}
        >
          {getTranslation("My", "My")}

        </h3>

        <h3
          className={`AmericanSign   text-H2  text-light-button-base`}
        >
          {getTranslation("Favorite", "Favorite")}
        </h3>
      </div>

      {/* Card rendering */}
      {favorites.length > 0 ? (
        <div className="mt-[3rem] grid h-auto min-h-screen w-full grid-cols-1 gap-6 md:grid-cols-2">
          {favorites.map((favorite) => (
            <MyFavoriteCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      ) : (
        <div className="flex   h-full w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium  ${isDarkMode ? "text-white" : "text-black"
              }`}
          >
            No Data Found
          </h2>
        </div>
      )}
    </div>
  );
}

export default MyFavorite;
