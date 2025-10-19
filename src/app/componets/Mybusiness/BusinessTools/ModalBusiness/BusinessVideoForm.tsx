"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";

function BusinessVideoForm() {
  const dispatch = useDispatch();

  const [error, setError] = useState<string | null>(null);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { isLoading, data }] = useUpdateServiceMutation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // State for video URL
  const [videoUrl, setVideoUrl] = useState<string>("");

  // useEffect(() => {
  //   sessionStorage.setItem("video_url", videoUrl);
  // });

  // Fetch data and update state when API response is received
  useEffect(() => {
    updateService({ vendor_id, service_id });
  }, []);

  useEffect(() => {
    if (data?.service?.video_url) {
      setVideoUrl(data.service.video_url);
    }
  }, [data]);

  console.log("My video_url:", data?.service?.video_url);

  const Demo = Cookies.get("demoUser") === "true";


  const handleSubmit = async (e: React.FormEvent) => {


    e.preventDefault();


    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    if (!videoUrl.trim()) {
      toast.error("Please enter a valid video URL.");

      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append("vendor_id", vendor_id || "");
    formData.append("service_id", service_id || "");
    formData.append("video_url", videoUrl);

    try {
      const response = await updateService(formData).unwrap();

      if (response?.message) {
        toast.success(response.message);
      }


      console.log(
        " my api respoince values from business video",
        response.service.video_url
      );
      localStorage.setItem("video_url", response.service.video_url || "")

      dispatch(hideModal("BusinessVideoModal"));
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Failed to update service.");
    }
  };

  const { getTranslation } = useTranslation();

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-1">
        <div className=" w-full">
          <label
            className="text-sm font-medium "
            htmlFor="service_name"
          >
            {getTranslation("Business Video Url", "Business Video Url")}
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
              placeholder="Enter Business Video Url "
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-center">

          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className={`w-fit px-[5rem] py-3 rounded-lg font-poppins text-white 
      ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                  ></path>
                </svg>
                {getTranslation("Loading...", "Loading...")}
              </span>
            ) : (
              getTranslation("Save", "Save")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessVideoForm;
