"use client";
import React, { useState, useEffect, useMemo } from "react";
import "../style.css";
import profileicon from "../../../../public/assets/Image/profile121212.png";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import policy from "../../../../public/assets/Image/policy.png";
import termcondition from "../../../../public/assets/Image/Terms&Condition.png";
import { CiDark, CiSun } from "react-icons/ci";
import language from "../../../../public/assets/Image/language-square.png";
import share from "../../../../public/assets/Image/share.png";
import feedback from "../../../../public/assets/Image/feednack.png";
import logouticon from "../../../../public/assets/Image/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "@/app/storeApp/Slice/activeComponentSlice";
import { AiOutlineClose } from "react-icons/ai";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { RWebShare } from "react-web-share";
import useTranslation from "@/app/hooks/useTranslation";
import Cookies from "js-cookie";

function LeftSide() {
  const [isOpen, setIsOpen] = useState(false);

  // Get active component from Redux store
  const activeComponent = useSelector((state: any) => state.activeComponent.activeComponent);

  useMemo(() => {
    console.log("Active Component is " + activeComponent);
  }, [activeComponent]);
  const dispatch = useDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    dispatch(setDarkMode(savedMode));

    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch]);

  // Handler to set active component in Redux
  const handleSetActiveComponent = (component: string) => {
    dispatch(setActiveComponent(component));
  };

  // Handle the dark mode toggle and persist the state in localStorage
  const handleToggle = () => {
    const newMode = !isDarkMode;
    dispatch(setDarkMode(newMode));
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Initialize dark mode based on localStorage when the component mounts
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    dispatch(setDarkMode(savedMode));
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch]);

  // Log the current state for debugging purposes
  useMemo(() => {
    console.log("Current Dark Mode state:", isDarkMode);
  }, [isDarkMode]);

  console.log(" my current satet mode", isDarkMode);


  const { getTranslation } = useTranslation();

  const Demo = Cookies.get("demoUser") === "true";



  return (
    <div className=" w-full">
      {/* Mobile Menu Button */}
      <div className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-light-button-base p-4 xl:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <span className="text-2xl">&#9776;</span> {/* Hamburger menu */}
        </button>
      </div>

      {/* Left Side Menu for Mobile and Desktop */}
      <div
        className={`       bg-light-background  dark:bg-dark-secondarybg  xl:dark:bg-transparent  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        
        
        
        scrollhide fixed left-0 top-[4rem] z-50 h-svh w-[18rem] overflow-y-auto md:rounded-r-lg  px-4 transition-transform duration-300 ease-in-out md:top-[3.9rem] md:w-[24rem] xl:static xl:block xl:h-auto xl:w-auto xl:translate-x-0`}
      >
        {/* Close Icon */}
        <div className="absolute right-4 top-4 flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-light-button-base xl:hidden">
          <button onClick={() => setIsOpen(false)}>
            <AiOutlineClose className="text-xl text-white" />
          </button>
        </div>

        <div className="mt-10 grid h-auto w-full grid-cols-1 gap-6 pt-7   xl:pt-0">
          {/* Profile route */}
          <div
            className={` flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg 
    ${activeComponent === "Profile"
                ? " bg-light-button-base text-white"
                : isDarkMode
                  ? "dark:bg-[#2F2F2F]  text-white"
                  : "bg-white text-black bordercolor"
              }`}
            onClick={() => handleSetActiveComponent("Profile")}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover ${activeComponent === "Profile"
                  ? "bg-circle-icon"
                  : isDarkMode
                    ? "bg-circle-icon"
                    : ""
                  }
                
                `}
                src={profileicon}
                alt="Profile icon"
              />
              <h5 className={`font-poppins text-[16px]     ${activeComponent === "Profile" ? " font-medium  " : " font-normal"
                }`}>   {getTranslation("Profile", "Profile")}</h5>
            </div>
            <MdOutlineKeyboardArrowRight className="text-xl " />
          </div>

          {/* Favorites route */}
          <div
            className={` flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg 
             ${activeComponent === "Favorite"
                ? "bg-light-button-base text-white"
                : isDarkMode
                  ? "dark:bg-[#2F2F2F]  text-white"
                  : "bg-white text-black bordercolor"
              }
            
            
            `}
            onClick={() => handleSetActiveComponent("Favorite")}
          >
            <div className="flex items-center justify-center gap-2">
              <GoHeart className="font-poppins h-6 w-6" />


              <h5 className={`font-poppins text-[16px]     ${activeComponent === "Favorite" ? " font-medium  " : " font-normal"
                }`}>   {getTranslation("Favorites", "Favorites")}</h5>

            </div>
            <MdOutlineKeyboardArrowRight className="text-xl " />
          </div>

          {/* My review Route */}
          <div
            className={` flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg 
             ${activeComponent === "My review"
                ? "bg-light-button-base text-white"
                : isDarkMode
                  ? "dark:bg-[#2F2F2F]  text-white"
                  : "bg-white text-black bordercolor"
              }
            
            
            `}
            onClick={() => handleSetActiveComponent("My review")}
          >
            <div className="flex items-center justify-center gap-2">
              <FaRegStar className="font-poppins h-6 w-6" />


              <h5 className={`font-poppins text-[16px]     ${activeComponent === "My review" ? " font-medium  " : " font-normal"
                }`}>   {getTranslation("My review", "My review")}</h5>
            </div>
            <MdOutlineKeyboardArrowRight className="text-xl" />
          </div>

          {/* Privacy & Policy Route */}
          <div
            className={` flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg
             ${activeComponent === "Privacy Policy"
                ? "bg-light-button-base text-white"
                : isDarkMode
                  ? "dark:bg-[#2F2F2F]  text-white"
                  : "bg-white text-black bordercolor"
              }
            
            `}
            onClick={() => handleSetActiveComponent("Privacy Policy")}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover
                
                ${activeComponent === "Privacy Policy"
                    ? "bg-circle-icon"
                    : isDarkMode
                      ? "bg-circle-icon"
                      : ""
                  }
                `}
                src={policy}
                alt="Privacy icon"
              />



              <h5 className={`font-poppins text-[16px]     ${activeComponent === "Privacy Policy" ? " font-medium  " : " font-normal"
                }`}>   {getTranslation("Privacy Policy", "Privacy Policy")}</h5>
            </div>
            <MdOutlineKeyboardArrowRight className="text-xl " />
          </div>

          {/* Terms & Condition Route */}
          <div
            className={` flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg 
           
             ${activeComponent === "Terms and Condition"
                ? "bg-light-button-base text-white"
                : isDarkMode
                  ? "dark:bg-[#2F2F2F]  text-white"
                  : "bg-white text-black bordercolor"
              }
            
            `}
            onClick={() => handleSetActiveComponent("Terms and Condition")}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover  ${activeComponent === "Terms and Condition"
                  ? "bg-circle-icon"
                  : isDarkMode
                    ? "bg-circle-icon"
                    : ""
                  }`}
                src={termcondition}
                alt="Terms icon"
              />
              <h5 className={`font-poppins text-[16px]     ${activeComponent === "Terms & Condition" ? " font-medium  " : " font-normal"
                }`}>   {getTranslation("Terms & Condition", "Terms & Condition")}</h5>
            </div>
            <MdOutlineKeyboardArrowRight className="text-xl " />
          </div>

          {/* Dark and light mode toggle */}
          <div
            className={`flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 ${isDarkMode
              ? "dark:bg-[#2F2F2F] dark:text-white shadow-lg"
              : "bg-white text-[#212121] shadow-lg"
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                {/* Toggle icon based on the mode */}
                {isDarkMode ? (
                  <CiSun className="font-poppins h-full w-full   text-white" />
                ) : (
                  <CiDark className="font-poppins h-full w-full text-black" />
                )}
              </div>
              <div>
                <h5
                  className={`font-poppins  text-[16px]  ${activeComponent === "Profile" ? " font-medium  " : " font-normal"
                    } font-normal ${isDarkMode ? "dark:text-[#FFFFFF]" : "bg-white"
                    }`}
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </h5>


              </div>
            </div>
            <div>
              <div className="toggle flex flex-row justify-between">
                <label className="flex cursor-pointer items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="dark-mode"
                      id="dark-toggle"
                      className="checkbox hidden"
                      checked={isDarkMode}
                      onChange={handleToggle}
                    />
                    <div className="flex h-8 w-14 items-center justify-center rounded-full border-[2px] border-light-button-base"></div>
                    <div
                      className={`dot absolute left-1 top-1 h-6 w-6 rounded-full transition ${isDarkMode ? "translate-x-6 bg-white" : "bg-light-button-base"
                        }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Web language */}
          <div
            className={`flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 ${isDarkMode
              ? "dark:bg-[#2F2F2F] dark:text-white shadow-lg"
              : "bg-white text-[#212121] shadow-lg"
              }`}
            onClick={() => dispatch(showModal("AppLanguage"))}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover ${isDarkMode ? "bg-circle-icon" : ""
                  }
                
                `}
                src={language}
                alt="Profile icon"
              />
              <div className="">


                <h5 className={`font-poppins text-[16px]     ${activeComponent === "App Language" ? " font-medium  " : " font-normal"
                  }`}>   {getTranslation("App Language", "App Language")}</h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight
                className={`font-poppins text-[18px] font-normal   ${isDarkMode ? "dark:text-[#FFFFFF]" : " bg-white "
                  }`}
              />
            </div>
          </div>

          {/* Share App */}
          <RWebShare
            data={{
              text: "Meg Market Africa",
              url: "https://web.nlytical.online/",
              title: "Meg Market Africa",
            }}
            onClick={() => console.log("Shared successfully!")}
          >
            <div
              className={`flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 ${isDarkMode
                ? "dark:bg-[#2F2F2F] dark:text-white shadow-lg"
                : "bg-white text-[#212121] shadow-lg"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  className={`h-6 w-6 object-cover ${isDarkMode ? "bg-circle-icon" : ""}`}
                  src={share}
                  alt="Profile icon"
                />
                <div>
                  <h5
                    className={`font-poppins text-[16px] ${activeComponent === "Share" ? "font-medium" : "font-normal"
                      }`}
                  >
                    {getTranslation("Share", "Share")}
                  </h5>
                </div>
              </div>
              <div>
                <MdOutlineKeyboardArrowRight
                  className={`font-poppins text-[18px] font-normal ${isDarkMode ? "dark:text-[#FFFFFF]" : "bg-white"
                    }`}
                />
              </div>
            </div>
          </RWebShare>

          {/* App Feedback */}
          <div
            className={`flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 ${isDarkMode
              ? "dark:bg-[#2F2F2F] dark:text-white shadow-lg"
              : "bg-white text-[#212121] shadow-lg"
              }`}
            onClick={() => {


              dispatch(showModal("AppFeedback"));
            }}
          >

            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover ${isDarkMode ? "bg-circle-icon" : ""
                  }
                
                `}
                src={feedback}
                alt="Profile icon"
              />
              <div className="">
                <h5
                  className={`font-poppins  text-[16px] font-normal   ${isDarkMode ? "dark:text-[#FFFFFF]" : " bg-white "
                    }`}
                >
                  {getTranslation("App Feedback", "App Feedback")}
                </h5>


              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight
                className={`font-poppins text-[18px] font-normal   ${isDarkMode ? "dark:text-[#FFFFFF]" : " bg-white "
                  }`}
              />
            </div>
          </div>

          {/* Logout  btn */}
          <div
            className={`flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 ${isDarkMode
              ? "dark:bg-[#2F2F2F] dark:text-white shadow-lg"
              : "bg-white text-[#212121] shadow-lg"
              }`}
            onClick={() => {
              dispatch(showModal("LogoutModal"));
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className="h-6 w-6 object-cover"
                src={logouticon}
                alt="Profile icon"
              />
              <div className="">
                {/* <h5 className="font-poppins text-[18px] font-normal text-[#FF2525]">
                  {getTranslation("Logout", "Logout")}
                </h5> */}

                <h5 className={`font-poppins text-[16px]   text-[#FF2525]   ${activeComponent === "Logout" ? " font-medium  " : " font-normal"
                  }`}>   {getTranslation("Logout", "Logout")}</h5>
              </div>
            </div>
          </div>

          {/* Delete Account Button */}
          <div
            className={` bordercolordeletebtn mx-auto flex h-auto w-[70%] cursor-pointer items-center justify-center rounded-xl p-3 shadow-lg xl:p-4       ${isDarkMode
              ? "dark:bg-light-button-base dark:text-white shadow-lg"
              : "   border border-light-button-base "
              }`}
            onClick={() => {

              dispatch(showModal("DeleteAccount"));
            }}
          >
            <div className="">
              <h5
                className={`font-poppins items-center   text-[18px] font-normal  ${isDarkMode ? "dark:text-[#FFFFFF]" : "text-[#226FE4]"
                  }`}
              >
                {getTranslation("Delete", "Delete")}
              </h5>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LeftSide;
