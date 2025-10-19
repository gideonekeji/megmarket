"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { showModal } from "../storeApp/Slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useTranslation from "../hooks/useTranslation";

// Dynamic imports
const Rightside = dynamic(
  () => import("./RightsideSideMenuProfile/Rightside"),
  { ssr: false, loading: () => <div></div> }
);

const LeftSide = dynamic(
  () => import("./LeftSideMenuProfile/LeftSide"),
  { ssr: false, loading: () => <div></div> }
);

const HeadingProfile = dynamic(
  () => import("../componets/Profile/HeadingProfile"),
  { ssr: false, loading: () => <div></div> }
);

const MyProfileBreadCome = dynamic(
  () => import("../componets/AllBreadCome/MyProfileBreadCome"),
  { ssr: false, loading: () => <div></div> }
);

function Profile() {
  const [activeComponent, setActiveComponent] = useState("ProfileForm");
  const user_id = Cookies.get("user_id");
  const router = useRouter(); // Initialize the router for redirection
  const dispatch = useAppDispatch(); // Import the dispatch function from your Redux store

  useEffect(() => {
    if (!user_id) {
      // If user_id doesn't exist, show the login modal and prevent access to the profile page
      dispatch(showModal("loginModal"));
    }
  }, [user_id, router, dispatch]); // Ensure router and dispatch are in the dependency array

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" saved mode: ", isDarkMode);





  const { getTranslation } = useTranslation();

  const demo = Cookies.get("demo");
  return (
    <div
      className={`h-auto w-full    ${isDarkMode ? "dark:bg-[#181818]" : ""}  `}
    >
      {/* MyProfileBreadCome for showing the current route */}
      <div className="h-auto w-full">
        <MyProfileBreadCome />
      </div>
      <div className="mx-auto mt-[5rem] flex h-auto flex-col gap-6 w-[90%] 2xl:max-w-[68%]">
        {/* Description */}
        {
          demo && (
            <div className="flex w-full items-end justify-end ">
              <div className=" w-full xl:w-[55%] xl:pr-[9rem] ">
                <HeadingProfile />
              </div>
            </div>
          )
        }

        <div className="grid h-auto xl:grid-cols-[430px,830px] gap-6 bg-transparent">
          {/* Left side */}
          <div className="h-fit">
            <LeftSide
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          </div>

          {/* Right side */}
          <Rightside activeComponent={activeComponent} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
