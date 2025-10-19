import React, { useEffect } from "react";
import "../businesscss.css";
import EditProfile from "./EditProfile";
import AddPhotos from "./AddPhotos";
import AddContact from "./AddContact";
import BusinessTimings from "./BusinessTimings";
import Reviews from "./Reviews";
import AddWebsite from "./AddWebsite";
import AddVideo from "./AddVideo";
import AddSocialLinks from "./AddSocialLinks";
import { useAppSelector } from "@/app/hooks/hooks";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  addServiceImage,
  updateServiceField,
} from "@/app/storeApp/Slice/serviceSlice";
import useTranslation from "@/app/hooks/useTranslation";

function MainSectionQuickLink() {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // Handle the different states of the API call
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error fetching service:", error);
    }

    if (data) {
      console.log("API Response:@@!!", data);

      dispatch(updateServiceField(data.service));
      dispatch(addServiceImage(data.service_images));
    }
  }, [data, isLoading, error]);
  return (
    <div
      className={`mx-auto  2xl:w-[68%]  w-[90%]    gap-5 flex-col rounded-xl xl:rounded-3xl py-[3.47rem] px-6 md:px-16 flex  justify-center   items-center    ${isDarkMode ? "bg-[#2F2F2F]  " : "bg-[#ffffff]   businesslable"
        }`}
    >
      {/*  heading */}
      <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
        <h3
          className={`font-poppins text-xl font-semibold xl:text-H6 ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
            }`}
        >
          {getTranslation("Quick Links", "Quick Links")}
        </h3>
        <p
          className={`font-poppins xl:text-T3 ${isDarkMode ? "text-[#FFFFFF9E]" : "text-[#0000009E]"
            }`}
        >
          {getTranslation(
            "Quick Links: Your Gateway to Essential Resources",
            "Quick Links: Your Gateway to Essential Resources"
          )}
        </p>
      </div>


      {/*   all type of links  */}
      <div className=" w-full  grid grid-cols-2   pt-2  justify-items-center gap-6  xl:grid-cols-8   ">
        <EditProfile />
        <AddPhotos />
        <AddContact />
        <BusinessTimings />
        <Reviews />
        <AddWebsite />
        <AddVideo />
        <AddSocialLinks />
      </div>
    </div>
  );
}

export default MainSectionQuickLink;
