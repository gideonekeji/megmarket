"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import { usePathname } from "next/navigation";
import { setSelectedUser } from "../storeApp/Slice/userSlice";
import ServiceListBreadCome from "../componets/AllBreadCome/ServiceListBreadCome";
import SerachDesing from "../componets/Listing/LeftSide/SerachDesing";
import CardListing from "../componets/Listing/RightSide/CardListing";




function StoreComponet() {
  const dispatch = useAppDispatch();

  const [direction, setDirection] = useState(0);


  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/listing") {
      dispatch(
        setSelectedUser({
          id: null,
          second_id: null,
          firstName: null,
          lastName: null,
          profilePic: null,
          lastMessage: null,
          lastSeen: null,
          isOnline: null,
          unreadMessageCount: null,
          userRole: null,
          time: null,
          isBlocked: null,
        })
      );
    }
  }, [pathname, dispatch]); // Dependency array ensures useEffect runs only when pathname changes

  console.log("My business is:!!!!!!!!!!!!!!!!!!!!!!!!!!!!@", pathname);



  const handleDirection = () => {
    setDirection(prev => (prev === 1 ? 0 : 1));
  };






  console.log("my direction values ", direction)



  return (
    <div className={`w-full h-auto   ${isDarkMode ? "bg-[#181818]" : ""}`}>
      {/* Header */}

      <ServiceListBreadCome />



      {/* button */}



      <div
        className={`mx-auto  2xl:w-[68%] w-[90%] mt-[5rem] grid grid-cols-1  bg-light-background dark:bg-dark-background gap-6
    
    ${direction === 1 ? "xl:grid-cols-[77%_23%]" : "xl:grid-cols-[23%_77%]"}
  `}
      >
        {/* First column */}
        <div className={`h-auto ${direction === 1 ? "xl:order-2" : "xl:order-1"}`}>
          <SerachDesing />
        </div>

        {/* Second column */}
        <div className={`h-auto ${direction === 1 ? "xl:order-1" : "xl:order-2"}`}>
          <CardListing />
        </div>
      </div>

    </div>
  );
}

export default StoreComponet;
