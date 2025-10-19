"use client";

import React from "react";
import dynamic from "next/dynamic"; 
import "../style.css";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";

// Dynamic imports without loading placeholders
const Profile = dynamic(() => import("@/app/componets/Profile/ProfileForm"), {
  ssr: false,
});
const Myreview = dynamic(() => import("../Myreview/page"), {
  ssr: false,
});
const TermCondition = dynamic(() => import("../TermCondition/page"), {
  ssr: false,
});
const Privacypolicy = dynamic(() => import("../../privacy-policy/page"), {
  ssr: false,
});
const Favorite = dynamic(() => import("../MyFavorite/Page"), {
  ssr: false,
});
function Rightside() {
  // Get active component from Redux store
  const activeComponent = useSelector(
    (state) => state.activeComponent.activeComponent
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={` w-full h-auto rounded-[2rem]    xl:py-10   ${
        isDarkMode
          ? "dark:bg-[#2F2F2F] dark:text-white"
          : "bg-white text-gray-800 rightsidebordershadow"
      }`}
    >
      {/* Render component based on active component from Redux */}
      {activeComponent === "Profile" && <Profile />}
      {activeComponent === "Favorite" && <Favorite />}
      {activeComponent === "My review" && <Myreview />}
      {activeComponent === "Privacy Policy" && <Privacypolicy />}
      {activeComponent === "Terms and Condition" && <TermCondition />}
    </div>
  );
}

export default Rightside;
